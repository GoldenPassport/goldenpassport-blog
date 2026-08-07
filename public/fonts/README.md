# Self-hosted fonts

These files are served from the blog's own origin. The browser does not contact
Google Fonts to render site typography.

- `cormorant-garamond-variable.woff2`: normal, weights 300–700
- `cormorant-garamond-italic-variable.woff2`: italic, weights 300–700
- `inter-variable.woff2`: normal, weights 100–900 with optical sizing
- `inter-italic-variable.woff2`: italic, weights 100–900 with optical sizing

`CormorantGaramond-600.woff` is not used for page typography. It is a
single-weight WOFF (v1, not WOFF2) read at runtime by the Open Graph card
generator (`app/blog/[slug]/opengraph-image.tsx`): Satori, the renderer behind
`next/og`, cannot decode WOFF2, so the variable fonts above will not work there.
It is bundled into the serverless function via `outputFileTracingIncludes` in
`next.config.mjs`.

The font files were downloaded from the official
[`google/fonts`](https://github.com/google/fonts) repository:

- [Cormorant Garamond](https://github.com/google/fonts/tree/main/ofl/cormorantgaramond)
- [Inter](https://github.com/google/fonts/tree/main/ofl/inter)

The original variable TTF sources were converted losslessly to WOFF2 without
subsetting. Both families are distributed under the SIL Open Font License 1.1;
the licence texts are stored alongside the font files.
