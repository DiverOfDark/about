#!/usr/bin/env python3
"""Get a LinkedIn token for publish-social.py and store it in the repo's GitHub settings.

Run it yourself, every ~2 months (LinkedIn member tokens last 60 days):

  LINKEDIN_CLIENT_ID=... LINKEDIN_CLIENT_SECRET=... python3 scripts/linkedin-auth.py

It opens the LinkedIn consent page, catches the redirect on http://localhost:53682/callback
(add that exact URL to the app's "Authorized redirect URLs"), exchanges the code, and sets:
  secret   LINKEDIN_TOKEN
  variable LINKEDIN_PERSON_URN, LINKEDIN_TOKEN_EXPIRES
with `gh`. The token is passed to gh on stdin and never printed.
"""
import datetime as dt
import http.server
import json
import os
import secrets
import subprocess
import sys
import urllib.parse
import urllib.request
import webbrowser

REPO = "DiverOfDark/about"
REDIRECT = "http://localhost:53682/callback"
SCOPES = "openid profile w_member_social"


def main() -> int:
    cid, csecret = os.environ.get("LINKEDIN_CLIENT_ID"), os.environ.get("LINKEDIN_CLIENT_SECRET")
    if not cid or not csecret:
        print("Set LINKEDIN_CLIENT_ID and LINKEDIN_CLIENT_SECRET (app → Auth tab).", file=sys.stderr)
        return 2
    state = secrets.token_urlsafe(16)
    auth_url = "https://www.linkedin.com/oauth/v2/authorization?" + urllib.parse.urlencode({
        "response_type": "code", "client_id": cid, "redirect_uri": REDIRECT, "state": state, "scope": SCOPES,
    })
    got = {}

    class Handler(http.server.BaseHTTPRequestHandler):
        def do_GET(self):
            q = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
            got.update({k: v[0] for k, v in q.items()})
            self.send_response(200)
            self.send_header("Content-Type", "text/plain; charset=utf-8")
            self.end_headers()
            self.wfile.write("Done, you can close this tab.".encode())

        def log_message(self, *args):
            pass

    server = http.server.HTTPServer(("127.0.0.1", 53682), Handler)
    print(f"Opening LinkedIn consent page. If it does not open, visit:\n{auth_url}\n")
    webbrowser.open(auth_url)
    while "code" not in got and "error" not in got:
        server.handle_request()
    if "error" in got:
        print(f"LinkedIn refused: {got.get('error')}: {got.get('error_description')}", file=sys.stderr)
        return 1
    if got.get("state") != state:
        print("State mismatch, aborting.", file=sys.stderr)
        return 1

    body = urllib.parse.urlencode({
        "grant_type": "authorization_code", "code": got["code"], "redirect_uri": REDIRECT,
        "client_id": cid, "client_secret": csecret,
    }).encode()
    req = urllib.request.Request("https://www.linkedin.com/oauth/v2/accessToken", data=body,
                                 headers={"Content-Type": "application/x-www-form-urlencoded"})
    tok = json.load(urllib.request.urlopen(req, timeout=30))
    token, expires_in = tok["access_token"], int(tok.get("expires_in", 0))

    me = json.load(urllib.request.urlopen(urllib.request.Request(
        "https://api.linkedin.com/v2/userinfo", headers={"Authorization": f"Bearer {token}"}), timeout=30))
    urn = f"urn:li:person:{me['sub']}"
    expires = (dt.date.today() + dt.timedelta(seconds=expires_in)).isoformat()

    subprocess.run(["gh", "secret", "set", "LINKEDIN_TOKEN", "-R", REPO], input=token.encode(), check=True)
    subprocess.run(["gh", "variable", "set", "LINKEDIN_PERSON_URN", "-R", REPO, "--body", urn], check=True)
    subprocess.run(["gh", "variable", "set", "LINKEDIN_TOKEN_EXPIRES", "-R", REPO, "--body", expires], check=True)
    print(f"Stored. Posting as {me.get('name', urn)}; the token expires on {expires}.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
