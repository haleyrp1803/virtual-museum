# Era Theme Design Specification

## Status and role

Current synchronized checkpoint at the start of the accepted theme-design sequence:

```text
bde9bfe — Add historical theme taxonomy typography and design preview
Branch: main
```

This document is the authoritative design-direction record for reusable historical design packs: typography, color roles, texture, layout character, transitions, asset provenance, and deferred continuity work.

Pedagogical reasons for historical transitions remain in `core_documentation/LESSON_DESIGN_AND_TEACHING_GUIDE.md`. Current technical architecture remains in `core_documentation/MAINTAINERS_GUIDE.md`. Full core-document synchronization is reserved for Pass 8 of the theme implementation sequence.

## Approved period taxonomy

The reusable design packs are:

1. Course-neutral / Introduction
2. 18th century / Colonial era
3. Pre–Civil War 19th century / Victorian era
4. Post–Civil War 19th century / Jim Crow era
5. Early 20th century / World Wars era
6. 1960s–1970s / Civil Rights era
7. 1980–present / Modern schooling era
8. Course-neutral / Conclusion

Historical transitions are separate curated packs. They are not calculated by averaging the palettes of adjacent eras.

## Design principle

Each historical pack should communicate interpretation through a coordinated system of:

- semantic color roles;
- typography;
- material and background texture;
- border and frame character;
- spatial order and density;
- document treatment;
- media framing;
- motion and transition rhythm.

Visual differences must carry pedagogical meaning rather than operate as decorative theme changes. The same component vocabulary should remain recognizable across the course, while each period changes how that vocabulary looks and feels.

## Palette implementation contract

Pass 2 defined each approved palette through durable `--pack-*` semantic tokens for page, surface, raised surface, deep surface, text, muted text, primary/secondary/tertiary accents, hover, border, focus, and accent contrast. The internal preview exposes every role as a labeled swatch.

Pass 3 maps the approved Colonial and Victorian pack roles onto the active learner-facing vertical slice. Shared components retain their structure and behavior while their page, text, surface, border, accent, focus, button, source-frame, and supporting-card treatments now consume the approved semantic values. Jim Crow, World Wars, Civil Rights, and Modern schooling now have complete preview-only packs; live-course use remains deferred until corresponding lesson modules exist.

## Course-neutral framing

The Introduction and Conclusion sit outside a specific historical era.

| Role | Approved direction | Hex |
|---|---|---:|
| Page | Neutral parchment | `#E8E1D3` |
| Surface | Light paper | `#F4EFE6` |
| Text | Dark brown-black | `#292621` |
| Primary accent | Academic green | `#365B4B` |
| Secondary accent | Burgundy | `#713B48` |
| Border | Muted bronze | `#88765F` |

The Conclusion should echo the Introduction while facing the learner toward the present rather than implying historical finality. It may carry restrained traces of earlier periods through a divider or controlled accent sequence, but it should not become a collage.

# Historical design packs

## 18th century / Colonial era

### Interpretive direction

The atmosphere is domestic, coastal, mercantile, and Atlantic-facing:

- parchment and aged paper;
- dark wood;
- ocean travel and coastal trade;
- American Revolution;
- iron-gall ink;
- maritime charts;
- household education;
- young wives schooling children at home while husbands participate in smuggling and seafaring economies.

The pack should feel active and ocean-facing, not simply generically old.

### Semantic palette

| Role | Approved color | Hex |
|---|---|---:|
| Page parchment | Warm aged paper | `#E8D9B8` |
| Raised surface | Light parchment | `#F4E9CF` |
| Deep surface | Weathered oak | `#5A3B2A` |
| Primary text | Iron-gall ink | `#262A2D` |
| Muted text | Faded brown-grey | `#6F665B` |
| Primary accent | Deep ocean navy | `#173B55` |
| Light accent | Coastal blue | `#91B6C5` |
| Accent hover | Storm blue | `#285A73` |
| Border | Tarnished brass-brown | `#8B7354` |
| Focus | Clear sea blue | `#3D7EA0` |

### Texture and layout

- parchment fibers;
- faint chart lines;
- subtle water staining;
- dark wood in framing and navigation;
- restrained brass details;
- intimate scale and looser domestic arrangement;
- no nautical iconography unless historically or pedagogically justified.

### Typography

| Role | Typeface | Designer / foundry | Source |
|---|---|---|---|
| Expressive display | Antiquarian Scribe Regular | Richard Kegler / Three Islands Press | https://fonts.adobe.com/fonts/antiquarian-scribe |
| Supporting headings and labels | ATF Garamond Subhead Medium | Mark van Bronkhorst / American Type Founders Collection | https://fonts.adobe.com/fonts/atf-garamond-subhead |
| Sustained body text | Adobe Caslon Pro Regular; italic and bold where needed | Carol Twombly / Adobe Originals | https://fonts.adobe.com/fonts/adobe-caslon |

Antiquarian Scribe is reserved for short prominent text. ATF Garamond Subhead provides controlled hierarchy. Adobe Caslon carries paragraphs and extended reading.

## Pre–Civil War 19th century / Victorian era

### Interpretive direction

The pack stages tension between:

- the industrial North and agricultural South;
- machinery, rail, metal, and bureaucracy;
- cotton, linen, soil, and leaves;
- expanding common-school systems;
- increasing institutional regularity.

It should feel more structured than the Colonial pack without yet becoming stark or bureaucratically severe.

### Semantic palette

| Role | Approved color | Hex |
|---|---|---:|
| Page | Unbleached cotton | `#E7DDC7` |
| Raised surface | Pale linen | `#F1E9D9` |
| Deep surface | Oxidized iron | `#474A46` |
| Primary text | Charcoal | `#292B29` |
| Muted text | Weathered taupe | `#756F63` |
| Primary accent | Rust | `#98533B` |
| Secondary accent | Cotton-leaf green | `#5E704C` |
| Metal accent | Aged steel | `#777E7B` |
| Border | Dark iron | `#5A5C56` |
| Focus | Clear leaf green | `#718C59` |

### Texture and layout

- woven cotton or linen;
- oxidized iron;
- engraved rules and printer’s ornaments;
- faint mechanical grids;
- occasional botanical cotton-leaf forms;
- controlled asymmetry between industrial and agricultural materials;
- stronger grids and institutional scale than the Colonial era.

### Typography

| Role | Typeface | Designer / foundry | Source |
|---|---|---|---|
| Primary display | HWT Slab Columbian | Hamilton Wood Type Collection | https://fonts.adobe.com/fonts/hwt-slab |
| Alternate display candidate | HWT Slab Antique | Hamilton Wood Type Collection | https://fonts.adobe.com/fonts/hwt-slab |
| Condensed labels | HWT Gothic Round | Hamilton Wood Type Collection | https://fonts.adobe.com/fonts/hwt-gothic-round |
| Sustained body and secondary headings | Clarendon Text Regular, Italic, and Bold | Patrick Griffin / Canada Type | https://fonts.adobe.com/fonts/clarendon-text |
| Selective artifact accent | Coronette | Chank Diesel / Chank Co | https://fonts.adobe.com/fonts/coronette |

The pack follows controlled variety found in nineteenth-century printer’s specimens: emphatic wood-type display faces, condensed institutional labels, and a quieter slab-serif body. Coronette is not a governing era face and is reserved for historically appropriate ephemera.

## Post–Civil War 19th century / Jim Crow era

### Interpretive direction

The aesthetic makes division and imposed hierarchy legible without turning racial oppression into decorative spectacle.

The system may use:

- hard partitions;
- sharp black-and-white contrast;
- restricted greyscale;
- parallel but unequal columns;
- separated frames;
- interrupted rules;
- deliberate misalignment;
- occasional muted warning color used sparingly.

The historical argument must remain explicit. Styling should not depend on learners intuiting that monochrome signifies segregation.

### Semantic palette

| Role | Approved color | Hex |
|---|---|---:|
| Page | Cold off-white | `#EEEDE8` |
| Raised surface | Paper white | `#F8F7F3` |
| Deep surface | Near black | `#1E1F1F` |
| Primary text | Black charcoal | `#202121` |
| Muted text | Mid grey | `#676A69` |
| Primary accent | Graphite | `#3D4142` |
| Secondary accent | Pale grey | `#B7BAB8` |
| Restricted warning accent | Dark oxblood | `#672F32` |
| Border | Black | `#242525` |
| Focus | Medium cool blue | `#356D8C` |

### Texture and layout

- newsprint;
- carbon copy;
- institutional forms;
- courthouse and school-board paperwork;
- stark dividing lines;
- repeated blocks;
- black-and-white photography;
- minimal decorative texture.

Avoid prison-stripe imagery, decorative replicas of segregated doors or signs, stylized distress that trivializes violence, and broad dramatic red washes. Oxblood is restricted to content notices, emphasis, or specific historical stakes.

### Typography

Typography remains provisional. Century Gothic and Grad may be tested as candidates, but this pack requires a dedicated later design decision rather than inheriting a generic late-nineteenth/early-twentieth system.

## Early 20th century / World Wars era

### Interpretive direction

The visual language combines:

- victory gardens;
- wartime classrooms;
- home-front labor;
- Rosie the Riveter;
- ration books;
- public-information posters;
- faded red, blue, and cream;
- practical optimism under strain.

It should balance mobilization and domestic labor rather than becoming generically patriotic.

### Semantic palette

| Role | Approved color | Hex |
|---|---|---:|
| Page | Aged cream | `#EEE1C8` |
| Raised surface | Poster paper | `#F5EAD4` |
| Deep surface | Navy slate | `#344D5D` |
| Primary text | Deep blue-grey | `#29343A` |
| Muted text | Dusty taupe | `#756F66` |
| Primary accent | Faded federal blue | `#547A91` |
| Secondary accent | Rosie red | `#A94E4B` |
| Garden accent | Victory green | `#657552` |
| Border | Dusty navy | `#4A616D` |
| Focus | Strong blue | `#376E91` |

### Texture and layout

- screen-printed poster grain;
- seed packets;
- ration-card paper;
- faded fabric;
- stamped labels;
- painted metal;
- modest geometric structure.

### Typography

Typography remains provisional. Century Gothic and Grad may be tested for institutional, textbook, and poster roles, but the period may require a distinct display family.

## 1960s–1970s / Civil Rights era

### Interpretive direction

The visual tone should be bold, public, energetic, hopeful, and vibrant without implying inevitable progress. It may draw from:

- posters;
- community print;
- protest graphics;
- television;
- youth culture;
- movement organizing.

### Semantic palette

| Role | Approved color | Hex |
|---|---|---:|
| Page | Warm off-white | `#F1E5C9` |
| Raised surface | Pale cream | `#F8EFD9` |
| Deep surface | Deep indigo | `#263C68` |
| Primary text | Ink navy | `#202A3A` |
| Muted text | Warm grey | `#6E685F` |
| Primary accent | Vivid orange | `#D86A32` |
| Secondary accent | Bright teal | `#2B8C88` |
| Supporting accent | Mustard yellow | `#D6A62F` |
| Additional accent | Movement magenta | `#A94769` |
| Border | Deep indigo | `#334A72` |
| Focus | Strong cyan-blue | `#167DA3` |

### Texture and layout

- poster ink;
- screen print;
- restrained offset-registration variation;
- bold geometric blocks;
- photographic halftone;
- community-flyer layering;
- energetic but controlled composition.

### Typography

| Role | Typeface | Source |
|---|---|---|
| Display and secondary | Goodland Variable | https://fonts.adobe.com/fonts/goodland-variable |
| Sustained body | News Gothic | https://fonts.adobe.com/fonts/news-gothic |

Goodland supplies period personality and variation. News Gothic provides a disciplined reading and interface face.

## 1980–present / Modern schooling era

### Interpretive direction

The visual language should evoke:

- modern universities;
- computer labs;
- overhead transparencies;
- early educational software;
- geometric institutional branding;
- 1980s and 1990s print design;
- laminated surfaces;
- fluorescent accents used carefully;
- gradual movement toward contemporary digital systems.

It should not look like a current generic software dashboard.

### Semantic palette

| Role | Approved color | Hex |
|---|---|---:|
| Page | Warm institutional grey | `#E7E5DF` |
| Raised surface | Pale computer beige | `#F2F0E8` |
| Deep surface | Dark campus teal | `#244B50` |
| Primary text | Dark graphite | `#262B2D` |
| Muted text | Cool grey | `#687074` |
| Primary accent | Deep teal | `#287B7A` |
| Secondary accent | University purple | `#64527D` |
| Bright accent | Electric coral | `#D96862` |
| Supporting accent | Muted aqua | `#73AAA6` |
| Border | Blue-grey | `#60747B` |
| Focus | Bright cyan | `#2587A2` |

### Texture and layout

- speckled institutional paper;
- laminate;
- photocopy grain;
- CRT glow used very lightly;
- geometric grids;
- campus wayfinding;
- 1980s–1990s textbook and brochure layouts;
- restrained Memphis-style forms only where historically appropriate.

### Typography

| Role | Typeface | Source |
|---|---|---|
| Display and labels | Centrifuge | https://fonts.adobe.com/fonts/centrifuge |
| Secondary and body | Aktiv Grotesk | https://fonts.adobe.com/fonts/aktiv-grotesk |

Centrifuge is especially appropriate for higher education, laboratories, research, STEM, and institutional labels. Aktiv Grotesk carries sustained reading and technical information.

# Transition architecture

Transitions are teaching and design structures, not decorative gradients. Each transition must define what persists, fades, enters, and changes in visual order.

Implementation status after Pass 5:

- all five thresholds are registered as independent reusable design packs;
- every threshold exposes structured `persists`, `fades`, `emerges`, and `structure` metadata in the preview;
- the current Colonial → Victorian course stop uses its approved transition palette and material shift;
- later thresholds remain preview-only and do not create placeholder course modules.

## Colonial → Victorian

- parchment remains;
- navy recedes;
- rust and cotton green emerge;
- wood becomes iron and textile;
- layout becomes more gridded;
- handwriting gives way to print.

## Victorian → Jim Crow

- Clarendon and institutional print persist;
- warmth drains from the palette;
- green and rust recede;
- black, white, and grey dominate;
- page divisions become harder and more explicit.

## Jim Crow → World Wars

- greyscale persists initially;
- faded blue and red enter gradually;
- bureaucratic forms turn into civic posters;
- the page becomes more mobilized and public-facing.

## World Wars → Civil Rights

- faded patriotic colors become brighter and less controlled;
- poster language persists;
- teal, orange, mustard, and magenta emerge;
- layouts become bolder and more participatory.

## Civil Rights → Modern schooling

- strong color remains;
- poster texture gives way to geometric systems;
- teal carries forward;
- the palette cools;
- analog print gradually shifts toward institutional digital design.

# Adobe Fonts delivery and licensing

The site currently loads one Adobe Fonts Web Project:

```html
<link rel="stylesheet" href="https://use.typekit.net/caf5rgw.css">
```

Adobe serves the webfont files. No downloaded `.otf`, `.ttf`, `.woff`, or `.woff2` files may be committed to this repository under the current subscription-based delivery arrangement.

Font credits must record:

- family and styles used;
- designer;
- foundry;
- Adobe Fonts source page;
- delivery method;
- applicable license;
- fallback stack;
- date verified;
- replacement plan if Adobe hosting becomes unavailable.

## Deferred pre-completion work — final backup-font plan

Before final publication or the end of development:

1. choose a deliberate backup or open-source substitute for every Adobe family used in the final course;
2. test each complete theme pack with Adobe Fonts blocked;
3. confirm that headings do not overflow and every stop retains viewport containment;
4. record the final fallback family, license, source, and reason for selection;
5. decide whether long-term font delivery will remain attached to a durable Adobe account or move to separately licensed, self-hosted, or open-source fonts.

This is required before development ends but intentionally low priority during most development because the current Brown Adobe subscription is expected to remain available for several more years.

Adobe-hosted fonts create third-party requests to Adobe’s font network. Public privacy language and publication-readiness review must identify this provider accurately. The course must remain readable if the request fails.

# Approved implementation sequence

## Pass 1 — Historical taxonomy and design-direction documentation

- Rename design packs and preview labels.
- Update current course-era mappings.
- Preserve live colors and behavior.
- Add this complete approved design-direction record.

## Pass 2 — Semantic color-token system

- Add all six historical palettes and the course-neutral palette.
- Define semantic roles rather than page-specific colors.
- Use flat colors, borders, gradients, and generated textures only.

## Pass 3 — Live Colonial and Victorian packs

- Applied the approved Colonial palette to the current Early America and Further Study material.
- Applied the approved Victorian palette to the current Common School landing.
- Mapped shared page, surface, text, muted, accent, border, focus, button, source-frame, and supporting-card roles without changing component structure.
- Preserved navigation, notebook behavior, and viewport containment.
- Left the active Colonial → Victorian transition unchanged for the dedicated transition architecture in Pass 5.

## Pass 4 — Future era preview packs (implemented)

- Implemented preview-only packs for Jim Crow, World Wars, Civil Rights, and Modern schooling, including approved palettes, provisional typography, generated material cues, framing, and layout character.

## Pass 5 — Transition packs (implemented)

- Added all five historical transition systems to the reusable design-pack registry and internal preview.
- Recorded explicit persistence, fading, emergence, and structural-change logic for every threshold.
- Applied the curated Colonial → Victorian transition to the current live transition stop.
- Kept the remaining four transitions preview-only until matching course content exists.
- Used staged materials, typography, palette emphasis, and layout behavior rather than flat palette averaging.

## Pass 6 — Design-system QA

### Navigation symmetry and card alignment

- Historical material cues must not depend on physically tilted content cards. Cards remain level across live and preview packs; texture, borders, offsets, and shadows carry period character instead.
- The persistent Previous and Next controls use the same visual treatment so directional hierarchy is conveyed by position and labels rather than unequal button emphasis.


- Audit contrast, font-role clarity, heading overflow, density, spacing, hierarchy, texture interference, reduced motion, forced colors, and preview/live consistency.

## Pass 7 — Historical texture and background assets

- Select or create actual textures only after palettes stabilize.
- Verify rights, provenance, file size, legibility, and credits.

## Pass 8 — Full core-documentation refresh

Synchronize the root README, all four core documents, and this design specification. Update the synchronized checkpoint, architecture ownership, active backlog, Adobe disclosure, deferred fallback task, accepted design packs, and transition architecture.

## Pass 6 Design-System QA Record

Pass 6 audited every era and transition pack for normal-text contrast, functional accent use, preview containment, reduced-motion behavior, increased-contrast presentation, and Windows forced-colors compatibility.

### Accessible functional color roles

The approved historical palettes retain their expressive accent colors, but two additional semantic roles now distinguish decoration from interface meaning:

- `--pack-accent-text`: a palette-related color that reaches readable contrast when used for links, labels, dates, and other normal-sized text;
- `--pack-action-bg`: a sufficiently dark palette-related background for primary actions paired with `--pack-accent-contrast`.

This distinction is especially important for the Civil Rights, World Wars, and Modern schooling packs, whose brighter expressive accents are appropriate for blocks, borders, poster fields, and ornament but are not consistently dark enough for small text or white button labels.

Muted-text values were modestly deepened where necessary so normal-sized muted copy remains readable on both page and surface colors. The Civil Rights magenta was also deepened slightly because it carries a text-label role in the preview. These are accessibility corrections within the approved palette families, not changes to the historical design direction.

### Layout and typography safeguards

- Preview cards shift from three columns to two and then one as available desktop width narrows.
- Transition logic shifts from four columns to two and then one, preventing compressed lists and heading overflow.
- Palette swatches reduce from six columns to four and then two.
- Toolbar controls wrap rather than colliding with the selected-period label.
- Existing font stacks remain unchanged; the QA pass does not replace the approved or provisional families.

### Motion and contrast modes

- Reduced-motion mode removes decorative card rotations and effectively disables preview transitions and animations.
- Increased-contrast mode suppresses texture fields and shadows, strengthens borders, and promotes secondary copy to the primary text color.
- Forced-colors mode removes decorative pseudo-elements, filters, textures, and shadows; restores system colors; preserves visible borders; and gives controls and focus indicators explicit system-color treatment.

### Pass 6 outcome

The QA pass changes no course data, learner workspace behavior, notebook architecture, or historical content. Colonial, Victorian, and the active Colonial-to-Victorian transition remain the only design packs mapped to the live vertical slice. Later packs and transitions remain preview-only.


## Pass 7 Historical Texture and Background Asset Record

Pass 7 replaces the generated demonstration textures with optimized local image assets selected from Wikimedia Commons. Every committed image is stored as WebP under `public/assets/themes/textures/`; the original downloads are not retained in the repository. Images were resized to a maximum dimension of 1,600 pixels and compressed for web delivery. Color overlays remain in CSS so the approved semantic palettes continue to govern contrast and mood.

### Asset provenance

| Local file | Design use | Source | Creator / institution | Rights status | Review status |
|---|---|---|---|---|---|
| `colonial-paper.webp` | Colonial page parchment | `https://commons.wikimedia.org/wiki/File:Old_paper6.jpg` | Digital Yard Sale; author not identified | Public domain dedication | Approved |
| `colonial-wood.webp` | Colonial source-frame wood | `https://commons.wikimedia.org/wiki/File:Pressed_pine_wood_grain_and_texture_close_up.jpg` | Kurt Kaiser | CC0 1.0 | Approved substitute |
| `victorian-linen.webp` | Victorian woven page material | `https://commons.wikimedia.org/wiki/File:Linen_Cloth_MET_12.187.46_EGDP020594.jpg` | Metropolitan Museum of Art | CC0 1.0 | Approved |
| `victorian-rust.webp` | Victorian iron/rust surfaces | `https://commons.wikimedia.org/wiki/File:Wheelbarrowbottom.jpg` | Clump | CC0 1.0 | Approved by Haley |
| `jim-crow-paper.webp` | Jim Crow institutional paper | `https://commons.wikimedia.org/wiki/File:Blank_page,_brown_paper_texture_(14802136533).jpg` | Internet Archive Book Images; source volume published 1902 | No known copyright restrictions | Approved by Haley |
| `world-wars-cloth.webp` | World Wars faded textile/poster material | `https://commons.wikimedia.org/wiki/File:Cloth_texture.jpg` | Titus Tscharntke | Public domain dedication | Approved for staging |
| `civil-rights-noise.webp` | Civil Rights screen-print grain | `https://commons.wikimedia.org/wiki/File:1k_Dissolve_Noise_Texture.png` | Spamrakuen | CC0 1.0 | Approved for staging |
| `civil-rights-print.webp` | Civil Rights print/compression field | `https://commons.wikimedia.org/wiki/File:JPG_compression_of_printing_texture.png` | Unknown photographer; source published 1922 | Public domain in the United States | Provisional pending visual review |
| `modern-laminate.webp` | Modern schooling laminate/media surface | `https://commons.wikimedia.org/wiki/File:Decorative_laminate_07850.jpg` | Андрей Перцев 1967 | CC0 1.0 | Provisional pending visual review |
| `modern-paper.webp` | Modern schooling institutional-paper field | `https://commons.wikimedia.org/wiki/File:Paper003_PREVIEW.jpg` | ambientCG / Lennart Demes | CC0 1.0 | Provisional pending visual review |

The previously proposed oak photograph was not used because its Commons file page identifies the operative license as CC BY 2.0 rather than public domain. The CC0 pressed-pine texture replaces it while preserving the intended wood-grain role.

### Application rules

- Textures remain decorative and never carry historical claims by themselves.
- CSS color overlays keep each asset subordinate to the approved palette.
- Increased-contrast and forced-colors modes suppress image textures entirely.
- If an image fails to load, the semantic page color and gradient remain sufficient.
- Transition packs layer outgoing and incoming materials asymmetrically; they do not average two images or palettes.
- The Civil Rights print texture and both Modern schooling assets remain provisional and may be replaced after in-context review.

### Pass 7 outcome

Colonial and Victorian textures are applied to the live vertical slice. Jim Crow, World Wars, Civil Rights, Modern schooling, and the later transitions remain preview-only. The active Colonial → Victorian threshold now stages parchment and linen as outgoing and incoming materials.

### Pass 7D — Transition texture proportion correction

All transition textures now render in overlapping, independently cropped fields. Photographic and material textures use `background-size: cover` so their native proportions are preserved; patterned noise retains a fixed repeat scale. Soft masks blend the two fields across the threshold. Transition imagery must be cropped at its boundary rather than stretched to a percentage width and full height.


### Accepted transition texture blending refinement — Pass 7E

Transition textures are supporting material evidence, not dominant split-screen fields. Every threshold now uses:

- overlapping texture fields spanning most of the viewport;
- low-opacity material layers beneath a dominant multi-stop color wash;
- long feathered masks that begin fading well before the midpoint and continue well beyond it;
- per-material opacity controls for dark or visually forceful sources such as hessian, cloth, halftone, and photocopy grain;
- native aspect-ratio preservation through cropping rather than stretching.

The intended result is gradual historical movement. A learner should perceive the outgoing material receding and the incoming one becoming more salient without encountering a visible seam or a stark half-and-half composition.
