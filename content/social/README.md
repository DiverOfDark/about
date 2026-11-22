# Social texts

One file per post, named like the post: `content/social/<slug>.md`. It is reviewed in the
same PR as the post. Once the post is published (`status` is not `draft`) and live on
kirillorlov.pro, `.github/workflows/social.yml` posts each section exactly as written:

```
Notes before the first section are ignored.

## telegram
Russian text for the Telegram channel, posted exactly as written. Links are written
inline as [words](https://...). It must link the post itself (https://kirillorlov.pro/blog/<slug>),
or it is not sent; the preview card under the message is always the post.

## linkedin
English text for LinkedIn. Plain text; the post is attached as an article card.
```

Each text is read in the channel, away from the post: refer to the site as "my site" or
"my personal website", never "this blog" or "this post".

Leave a section out to skip that channel. After posting, the workflow commits
`<slug>.posted.json` with the links; delete an entry there to post again.

Check the texts before merging:

```bash
python3 scripts/publish-social.py --dry-run
```

(it only lists posts that are no longer drafts.)
