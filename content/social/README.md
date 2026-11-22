# Social texts

One file per post, named like the post: `content/social/<slug>.md`. It is reviewed in the
same PR as the post. Once the post is published (`status` is not `draft`) and live on
kirillorlov.pro, `.github/workflows/social.yml` posts each section exactly as written:

```
Notes before the first section are ignored.

## telegram
Russian text for the Telegram channel. Plain text; the post link is added at the end
and shows as a preview card.

## linkedin
English text for LinkedIn. Plain text; the post is attached as an article card.
```

Leave a section out to skip that channel. After posting, the workflow commits
`<slug>.posted.json` with the links; delete an entry there to post again.

Check the texts before merging:

```bash
python3 scripts/publish-social.py --dry-run
```

(it only lists posts that are no longer drafts.)
