# Theme Asset Provenance

## Current implementation checkpoint

```text
0d0d09d — Add full-course era design flow samples
Branch: main
```

This file is the compact asset ledger for historical design-pack textures. Detailed design rationale remains in `ERA_THEME_DESIGN_SPECIFICATION.md`.

All local assets are WebP files stored in `public/assets/themes/textures/`. Original source files are not redistributed in the repository. Most assets were resized to a maximum dimension of 1,600 pixels, converted to RGB where necessary, and compressed. The approved Hessian source was already WebP and is retained under a normalized stable local filename.

| Local asset | Commons source | Creator / source institution | License or status | Changes |
|---|---|---|---|---|
| `colonial-paper.webp` | https://commons.wikimedia.org/wiki/File:Old_paper6.jpg | Digital Yard Sale; author unknown | Public domain dedication | resized, converted, compressed |
| `colonial-wood.webp` | https://commons.wikimedia.org/wiki/File:Pressed_pine_wood_grain_and_texture_close_up.jpg | Kurt Kaiser | CC0 1.0 | resized, converted, compressed |
| `victorian-linen.webp` | https://commons.wikimedia.org/wiki/File:Hessian_230_(Rico_Cilliers_and_colormass_via_Poly_Haven).webp | Rico Cilliers (processing), colormass (photography), via Poly Haven | CC0 1.0 | original WebP retained; local filename normalized for stable theme references |
| `victorian-rust.webp` | https://commons.wikimedia.org/wiki/File:Wheelbarrowbottom.jpg | Clump | CC0 1.0 | resized, converted, compressed |
| `jim-crow-paper.webp` | https://commons.wikimedia.org/wiki/File:Blank_page,_brown_paper_texture_(14802136533).jpg | Internet Archive Book Images; source volume 1902 | No known copyright restrictions | resized, converted, compressed |
| `world-wars-cloth.webp` | https://commons.wikimedia.org/wiki/File:Cloth_texture.jpg | Titus Tscharntke | Public domain dedication | resized, converted, compressed |
| `civil-rights-noise.webp` | https://commons.wikimedia.org/wiki/File:1k_Dissolve_Noise_Texture.png | Spamrakuen | CC0 1.0 | converted, compressed |
| `civil-rights-print.webp` | https://commons.wikimedia.org/wiki/File:JPG_compression_of_printing_texture.png | unknown photographer; source published 1922 | Public domain in the United States | converted, compressed; provisional |
| `modern-laminate.webp` | https://commons.wikimedia.org/wiki/File:Decorative_laminate_07850.jpg | Андрей Перцев 1967 | CC0 1.0 | resized, converted, compressed; provisional |
| `modern-paper.webp` | https://commons.wikimedia.org/wiki/File:Paper003_PREVIEW.jpg | ambientCG / Lennart Demes | CC0 1.0 | converted, compressed; provisional |

Before replacing an asset, verify the current file page, record the operative license, and preserve the prior decision in the design specification or Changelog as appropriate.


## Implementation rules

- Textures are decorative and do not carry historical claims.
- Flat semantic colors remain sufficient when an asset fails to load.
- Increased-contrast and forced-colors modes suppress textures.
- Transition textures preserve aspect ratio, overlap gradually, and remain subordinate to color progression.
- Repeatable pattern fields may tile at a fixed scale; photographic and material fields crop with `cover`.
- The Civil Rights noise field repeats at 240px in both adjacent transitions.
- Before replacing an asset, verify the current source page and operative license, update this ledger, and preserve the superseded decision in the design specification or Changelog.
