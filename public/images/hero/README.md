# Hero images

The slider uses four client-supplied images. Source files are archived in `assets-source`, outside the public folder.

## Installed files

| Slide | File | Original source | Pixel size | Status |
| --- | --- | --- | --- | --- |
| Skin | `skin.webp` | Client-supplied model photo, archived as `skin-source.png` | 1622x941 | Cropped 3% from the left; needs a larger original |
| Hair | `microneedling-hairline.webp` | `Microneedling Hairline Treatment.png` | 1670x942 | needs a larger file |
| Laser | `carbon-laser-facial.webp` | `Carbon Laser Facial Treatment.png` | 1536x1024 | needs a larger file |
| Confidence | `clinical-jawline.webp` | `Clinical Jawline Treatment Spa.png` | 1672x941 | needs a larger file |

Every installed photo is under 2400 px wide. Do not upscale them. Replace them with 2400x1350 originals when available for sharper display on high-density screens. All files are local, so `next.config.ts` needs no image host entries.

## Image requirements

- Recommended dimensions: 2400 x 1350 px.
- Format: WebP or AVIF. JPEG is acceptable only as a source file before optimisation.
- File size: 250 KB or less per image.
- Composition: keep the main subject on the right side. Leave the left third calm for desktop text and keep the lower left area clear for mobile text.
- Consent: do not publish a patient image without written consent.
- Claims: do not add before/after images or imagery that implies a treatment result.

## Replacing an image

Update `src/data/heroSlides.ts`:

```ts
image: {
  src: "/images/hero/clinical-jawline.webp",
  alt: "Clinical jawline treatment at Dermverse",
  objectPosition: "center",
}
```

Use a specific `alt` description. Set `objectPosition` when the subject needs a different crop on mobile. Set `src` to `null` to use the gradient placeholder. Record the source, licence, model release, date, and approver in `LICENSES.md` before publishing.
