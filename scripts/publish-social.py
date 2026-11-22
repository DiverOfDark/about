#!/usr/bin/env python3
"""Announce published blog posts on Telegram and LinkedIn, once each.

A post is announced when all of these hold:
  - content/blog/<slug>.md exists and its status is not "draft";
  - content/social/<slug>.md exists, with a "## telegram" and/or "## linkedin" section
    (both texts link the post themselves: telegram as [words](url), linkedin as a plain URL);
  - content/social/<slug>.posted.json has no entry for that channel yet;
  - https://kirillorlov.pro/blog/<slug> answers 200 (the deploy is done).

The texts are posted exactly as written in the social file, which is reviewed in
the same PR as the post. After each successful post the channel is recorded in
<slug>.posted.json right away, so a rerun never posts twice.

Environment (a channel without its credentials is skipped with a warning):
  TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
  LINKEDIN_TOKEN, LINKEDIN_PERSON_URN, LINKEDIN_TOKEN_EXPIRES (YYYY-MM-DD, for the warning)
  LINKEDIN_VERSION   LinkedIn API version, YYYYMM (default: the month two months back)
  DEPLOY_TIMEOUT     seconds to wait for post URLs, shared by all posts in a run (default 2400)

Usage: publish-social.py [--dry-run] [--no-wait]
"""
import argparse
import datetime as dt
import html
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BLOG = ROOT / "content" / "blog"
SOCIAL = ROOT / "content" / "social"
SITE = "https://kirillorlov.pro"


def default_linkedin_version(today: dt.date | None = None) -> str:
    """The month two months back, as YYYYMM.

    LinkedIn ships a version every month and keeps each one for about a year, so this
    is always released and stays active. A fixed value stops working once it is sunset
    (202510 did on 2026-11-22: 426 NONEXISTENT_VERSION).
    """
    today = today or dt.date.today()
    months = today.year * 12 + today.month - 1 - 2
    return f"{months // 12}{months % 12 + 1:02d}"


LINKEDIN_VERSION = os.environ.get("LINKEDIN_VERSION") or default_linkedin_version()
CHANNELS = ("telegram", "linkedin")


def log(msg: str) -> None:
    print(msg, flush=True)


def warn(msg: str) -> None:
    # GitHub Actions shows ::warning:: lines on the run summary.
    print(f"::warning::{msg}", flush=True)


def front_matter(path: Path) -> dict:
    m = re.match(r"^---\n(.*?)\n---\n", path.read_text(), re.S)
    meta = {}
    for line in (m.group(1) if m else "").splitlines():
        kv = re.match(r"^([A-Za-z][\w-]*):\s*(.*)$", line)
        if kv:
            meta[kv.group(1)] = re.sub(r'^(["\'])(.*)\1$', r"\2", kv.group(2).strip())
    return meta


def social_texts(path: Path) -> dict:
    """Sections "## telegram" and "## linkedin"; anything before the first one is notes."""
    texts, current = {}, None
    for line in path.read_text().splitlines():
        h = re.match(r"^##\s+(\w+)\s*$", line)
        if h:
            current = h.group(1).lower()
            texts[current] = []
        elif current:
            texts[current].append(line)
    return {k: "\n".join(v).strip() for k, v in texts.items() if k in CHANNELS and "\n".join(v).strip()}


def request(method: str, url: str, body=None, headers=None, form=False):
    data = None
    headers = dict(headers or {})
    if body is not None:
        if form:
            data = urllib.parse.urlencode(body).encode()
            headers["Content-Type"] = "application/x-www-form-urlencoded"
        else:
            data = json.dumps(body).encode()
            headers["Content-Type"] = "application/json"
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            raw = r.read()
            return r.status, dict(r.headers), (json.loads(raw) if raw.strip() else None)
    except urllib.error.HTTPError as e:
        detail = e.read().decode(errors="replace")[:500]
        raise RuntimeError(f"{method} {url.split('?')[0]} -> {e.code}: {detail}") from None


def wait_for_deploy(url: str, deadline: float) -> bool:
    """Poll until the URL answers 200 or the run-wide deadline passes (always checks once)."""
    while True:
        try:
            with urllib.request.urlopen(urllib.request.Request(url, method="HEAD"), timeout=15) as r:
                if r.status == 200:
                    return True
        except (urllib.error.URLError, TimeoutError):
            pass
        if time.time() > deadline:
            return False
        log(f"  waiting for {url} ...")
        time.sleep(30)


# --- Telegram -------------------------------------------------------------

MD_LINK = re.compile(r"\[([^\]\n]+)\]\((https?://[^)\s]+)\)")


def telegram_text(text: str, url: str) -> str:
    """The text exactly as written, HTML-escaped; [words](https://...) becomes a link.

    Nothing is added: the author writes the link to the post into the text. A text
    without it is refused, so a forgotten link cannot go out.
    """
    if url not in text:
        raise ValueError(f"the telegram text has no link to {url}; add one, e.g. [Новый пост]({url})")
    return MD_LINK.sub(lambda m: f'<a href="{m.group(2)}">{m.group(1)}</a>', html.escape(text, quote=False))


def post_telegram(text: str, url: str) -> str:
    token, chat = os.environ["TELEGRAM_BOT_TOKEN"], os.environ["TELEGRAM_CHAT_ID"]
    _, _, res = request("POST", f"https://api.telegram.org/bot{token}/sendMessage", {
        "chat_id": chat,
        "text": telegram_text(text, url),
        "parse_mode": "HTML",
        "link_preview_options": {"url": url, "prefer_large_media": True},
    })
    msg = res["result"]
    username = (msg.get("chat") or {}).get("username")
    return f"https://t.me/{username}/{msg['message_id']}" if username else f"message {msg['message_id']}"


# --- LinkedIn -------------------------------------------------------------

def linkedin_text(text: str, url: str) -> str:
    """Posts API "little text": these characters must be escaped or the text is cut.

    LinkedIn shows URLs as they are, so a [words](url) link would go out literally.
    Nothing is added: the author writes the link to the post into the text, or it is refused.
    """
    if MD_LINK.search(text):
        raise ValueError("the linkedin text has a [words](url) link; LinkedIn shows those literally, write the plain URL")
    if url not in text:
        raise ValueError(f"the linkedin text has no link to {url}; add one, e.g. \"More details on my website: {url}\"")
    return re.sub(r"([\\|{}@\[\]()<>#*_~])", r"\\\1", text)


def post_linkedin(text: str, url: str, title: str, summary: str) -> str:
    token, author = os.environ["LINKEDIN_TOKEN"], os.environ["LINKEDIN_PERSON_URN"]
    status, headers, _ = request("POST", "https://api.linkedin.com/rest/posts", {
        "author": author,
        "commentary": linkedin_text(text, url),
        "visibility": "PUBLIC",
        "distribution": {"feedDistribution": "MAIN_FEED", "targetEntities": [], "thirdPartyDistributionChannels": []},
        "content": {"article": {"source": url, "title": title, "description": summary}},
        "lifecycleState": "PUBLISHED",
        "isReshareDisabledByAuthor": False,
    }, headers={
        "Authorization": f"Bearer {token}",
        "LinkedIn-Version": LINKEDIN_VERSION,
        "X-Restli-Protocol-Version": "2.0.0",
    })
    urn = next((v for k, v in headers.items() if k.lower() == "x-restli-id"), None)
    return f"https://www.linkedin.com/feed/update/{urn}/" if urn else f"created ({status})"


def linkedin_expiry_warning() -> None:
    exp = os.environ.get("LINKEDIN_TOKEN_EXPIRES")
    if not exp:
        return
    days = (dt.date.fromisoformat(exp) - dt.date.today()).days
    if days < 10:
        warn(f"LinkedIn token expires in {days} days ({exp}): run scripts/linkedin-auth.py")


# --- main -----------------------------------------------------------------

def has_credentials(channel: str) -> bool:
    need = {"telegram": ("TELEGRAM_BOT_TOKEN", "TELEGRAM_CHAT_ID"),
            "linkedin": ("LINKEDIN_TOKEN", "LINKEDIN_PERSON_URN")}[channel]
    return all(os.environ.get(n) for n in need)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true", help="print what would be sent, send nothing")
    ap.add_argument("--no-wait", action="store_true", help="do not wait for the post URL")
    a = ap.parse_args()
    timeout = int(os.environ.get("DEPLOY_TIMEOUT") or 2400)
    # One wait budget for the whole run, so a post that never goes live cannot use up
    # the job's time before later posts are checked; after it, each URL is tried once.
    deadline = time.time() + timeout
    linkedin_expiry_warning()

    failed = False
    for social in sorted(SOCIAL.glob("*.md")):
        if social.name == "README.md":
            continue
        slug = social.stem
        post = BLOG / f"{slug}.md"
        if not post.exists():
            warn(f"{social.name}: no post {post.name}")
            continue
        meta = front_matter(post)
        if meta.get("status") == "draft":
            continue
        state_file = SOCIAL / f"{slug}.posted.json"
        state = json.loads(state_file.read_text()) if state_file.exists() else {}
        todo = {c: t for c, t in social_texts(social).items() if c not in state}
        if not todo:
            continue

        url = f"{SITE}/blog/{slug}"
        log(f"{slug}: to post on {', '.join(todo)}")
        if a.dry_run:
            for channel, text in todo.items():
                try:
                    shown = telegram_text(text, url) if channel == "telegram" else linkedin_text(text, url)
                except ValueError as e:
                    warn(f"{slug}: {e}")
                    failed = True
                    continue
                log(f"--- {channel} ---\n{shown}\n")
            continue
        if not a.no_wait and not wait_for_deploy(url, deadline):
            warn(f"{slug}: {url} is not live yet; will retry on the next run")
            failed = True
            continue

        for channel, text in todo.items():
            if not has_credentials(channel):
                warn(f"{slug}: no credentials for {channel}, skipped")
                continue
            try:
                if channel == "telegram":
                    link = post_telegram(text, url)
                else:
                    link = post_linkedin(text, url, meta.get("title", slug), meta.get("summary", ""))
            except Exception as e:  # one channel failing must not block the other
                warn(f"{slug}: {channel} failed: {e}")
                failed = True
                continue
            state[channel] = {"at": dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds"), "link": link}
            state_file.write_text(json.dumps(state, indent=2) + "\n")
            log(f"  {channel}: {link}")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
