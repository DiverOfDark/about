# kirillorlov.pro

Personal site for Kirill Orlov. Next.js 15 / React 19 / TypeScript.

## Develop

```
npm install
npm run dev
```

## Build

```
npm run build
npm start
```

## Docker

Built and pushed to `ghcr.io/<owner>/about/website:latest` by
`.github/workflows/dockerimage.yml` on pushes to `master`/`main` and on tags.

Locally:

```
docker build -t kirillorlov-pro .
docker run --rm -p 3000:3000 kirillorlov-pro
```

## Shortcuts (client)

- `⌘K` / `?` — command palette
- `t` — toggle theme
- `g h / e / l / s / i / c` — jump to intro / experience / homelab / education / interests / contact

Tweaks panel (theme, accent, density, availability, homelab toggle) opens from the
rail button at the bottom-left.
