# Theme Asset Provenance

## Current implementation basis

```text
7979037 — Add visual asset reference library
Branch: main
```

This ledger distinguishes optimized live textures from preserved source assets. Detailed design rationale remains in `ERA_THEME_DESIGN_SPECIFICATION.md`; the full organized source inventory and approved development roles are recorded in `THEME_SOURCE_ASSET_CATALOG.md`.

## Asset locations

- Optimized live derivatives: `public/assets/themes/textures/`
- Licensed and public-domain source originals: `public/assets/themes/source-assets/`
- Notebook inspiration references: `public/assets/design-references/notebook/`

The former catch-all `public/assets/reference-library/` folder has been replaced by this semantic organization. Source files retain a descriptive filename and their original Adobe Stock identifier remains documented in the source catalog.

## Previously approved live theme textures

| Local asset | Source | Creator / source institution | License or status | Changes |
|---|---|---|---|---|
| `colonial-paper.webp` | Wikimedia Commons: `Old_paper6.jpg` | Digital Yard Sale; author unknown | Public domain dedication | resized, converted, compressed |
| `colonial-wood.webp` | Wikimedia Commons: `Pressed_pine_wood_grain_and_texture_close_up.jpg` | Kurt Kaiser | CC0 1.0 | resized, converted, compressed |
| `victorian-linen.webp` | Wikimedia Commons: `Hessian_230` | Rico Cilliers; colormass; Poly Haven | CC0 1.0 | retained for historical compatibility but no longer used by the expanded Victorian sample stops |
| `victorian-rust.webp` | Wikimedia Commons: `Wheelbarrowbottom.jpg` | Clump | CC0 1.0 | resized, converted, compressed |
| `jim-crow-paper.webp` | Wikimedia Commons: `Blank_page, brown paper texture` | Internet Archive Book Images | No known copyright restrictions | resized, converted, compressed |
| `world-wars-cloth.webp` | Wikimedia Commons: `Cloth_texture.jpg` | Titus Tscharntke | Public domain dedication | retained for compatibility; expanded samples use non-repeating cloth derivatives |
| `civil-rights-noise.webp` | Wikimedia Commons: `1k_Dissolve_Noise_Texture.png` | Spamrakuen | CC0 1.0 | converted, compressed |
| `civil-rights-print.webp` | Wikimedia Commons: `JPG_compression_of_printing_texture.png` | unknown photographer; source published 1922 | Public domain in the United States | converted, compressed; provisional |
| `modern-laminate.webp` | Wikimedia Commons: `Decorative_laminate_07850.jpg` | Андрей Перцев 1967 | CC0 1.0 | resized, converted, compressed; provisional |
| `modern-paper.webp` | Wikimedia Commons: `Paper003_PREVIEW.jpg` | ambientCG / Lennart Demes | CC0 1.0 | converted, compressed; provisional |

## New organized source library

Adobe Stock originals were supplied by Haley under her project-use license. The complete stock-ID-to-filename mapping is in `THEME_SOURCE_ASSET_CATALOG.md`. Optimized WebP derivatives are named by era and visual role, for example:

```text
textures/victorian/page-cream-twill.webp
textures/jim-crow/card-geometric-blocks.webp
textures/world-wars/page-blue-linen.webp
textures/civil-rights/card-dense-geometry.webp
textures/modern-schooling/page-library.webp
```

Public-domain notebook leather sources:

| Organized source file | Source page | Status |
|---|---|---|
| `source-assets/course-neutral/notebook/fine-dark-brown-leather-public-domain.jpg` | `photos-public-domain.com/2012/01/11/brown-leather-close-up-texture/` | Public domain statement on source site |
| `source-assets/course-neutral/notebook/alternate-brown-leather-public-domain.jpg` | `photos-public-domain.com/2011/02/07/brown-leather-texture/` | Public domain statement on source site |

## Implementation rules

- Textures are decorative and do not carry historical claims.
- Flat semantic colors remain sufficient when an asset fails to load.
- Increased-contrast and forced-colors modes suppress textures.
- Neutral materials may alternate between page and card roles but should not occupy both roles on one stop.
- Busy backgrounds require solid readable cards; quiet backgrounds may support stronger bounded card patterns.
- Bright 1960s–1970s graphic patterns are confined to the Civil Rights era.
- Modern photographic backgrounds are blurred, faded, veiled, and cropped so they read as ambiance rather than lesson media.
- World Wars cloth uses a single broad crop and does not visibly tile.
- Transition textures preserve aspect ratio, overlap gradually, and remain subordinate to color progression.
