# Phase E debt inventory

## MDX loaders for profile and experience

`content/profile.mdx` and `content/experience.mdx` stay `status: draft` and are not published. The home UI reads `lib/i18n/profile.ts` and `lib/profile/links.ts`. A typed MDX loader (parity with projects) remains for Phase G if Diego wants a single content pipeline.

## Hero contact CTA

Hero secondary CTA pointed to `#approach` during Phase E; **Phase G** updated it to `#capabilities`. A contact CTA on the Hero was not added in Phase E.

## LinkedIn reachability

The LinkedIn URL matches the author’s prior published GitHub Pages site. Automated HEAD checks may return LinkedIn bot responses (HTTP 999); treat human verification in a browser as the source of truth.

## Approach hash rename — **done in Phase G**

Section id is `capabilities`; unused Approach components removed; `#approach` compat anchor temporary (see Phase G inventory).
