## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Publishing articles (mandatory)

- Articles live in `src/content/posts/*.md`. Before writing a new article, read a recently published file and `src/data/publication.js`.
- Every article MUST have YAML frontmatter fields: `title`, `date` (YYYY-MM-DD), `category`, `description`. Never use `pubDate`; publication filtering reads `date`.
- Allowed categories: `Novinky`, `Tipy do výuky`, `Ze zákulisí`.
- A date in the future is allowed for scheduled publication; do not change it merely to pass checks.
- File names determine article URLs; date prefixes are a convention, not a requirement. Avoid renaming existing files without a reason.
- Use `templates/article.md.example` as a starting point, not as an article in the content directory.
- Run `npm run check:posts` and `npm run build`. The build runs the validation automatically and fails on missing or malformed required metadata.
- After committing, verify the Cloudflare deployment uses the expected commit and the generated route is present. Verify the public URL where possible. Never claim publication solely because a GitHub commit succeeded.

## Social sharing images

- Optional social-only images go in `public/images/social/` and use exactly the article ID (Markdown filename without `.md`), e.g. `ucite-ve-vice-tridach.webp`.
- Supported extensions, in priority order: `.webp`, `.jpg`, `.png`. Prefer 1200 × 630 px.
- Article pages automatically emit absolute `og:image` and `twitter:image` when a matching image exists at build time. No image is displayed in the article or article listing because of this feature.
- If no image exists, omit image metadata. Verify generated HTML and the public preview after deployment; social networks may cache previous previews.
