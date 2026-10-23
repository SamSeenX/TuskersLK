# Wanali: Sri Lankan Tuskers & Elephants Registry

Wanali is an open-access archival registry and geospatial sanctuary map documenting Sri Lanka iconic wild tuskers, sacred temple custodians, and historical legends.

Built on the **Vanilla SSG standard** using Vite, modern ES6 modules, and clean modular CSS with zero third-party UI framework dependencies.

---

## Key Features

- **Geospatial Sanctuary Map**: Interactive coordinate mapping of roaming territories, protected corridors, and memorial sites across Sri Lanka.
- **National Tusker Registry**: Searchable database featuring status indicators (Alive, Deceased, Historical), cause of death, tusk characteristics, and cultural significance.
- **Static Multi-Page Pre-rendering**: Every tusker profile is pre-rendered as physical HTML under `/elephants/` for instantaneous edge delivery and zero-JS search crawling.
- **Anthropic Frontend Design Compliance**: Crafted with intentional design tokens reflecting Sri Lanka dry-zone wilderness, deep canopy hues, and raw ivory accents.
- **Strict Sub-200-Line Modularity**: Every module in the codebase remains well under the 200-line limit for long-term maintainability.

---

## Documented Giants

1. **Nadungamuwa Raja**: Celebrated 10.5 ft tall casket bearer and National Treasure
2. **Galgamuwa Dala Poottuwa**: Beloved wild tusker with rare crossed tusks
3. **Millangoda Raja**: Carried the longest recorded tusks among Asian elephants
4. **Panamure Hasthi Rajaya**: Defiant protector whose sacrifice ended the elephant kraal capture system
5. **Thirappane Agbo**: Resilient living wild tusker of the Rajarata
6. **Kala Wewa Revatha**: Gentle giant of the Kala Wewa tank wetlands
7. **Heiyantuduwa Raja**: Sacred relic bearer whose upward tusks were gifted to the National Museum
8. **Kandula the War Tusker**: Ancient war elephant recorded in the Mahavamsa
9. **Kataragama Wasana**: Premier ceremonial tusker of Ruhunu Kataragama
10. **Indiraja**: Senior ceremonial tusker of Sri Dalada Maligawa
11. **Barana of Kala Wewa**: Wild patriarch of the North Central tank basins
12. **Podi Dala Poottuwa**: Young wild tusker carrying the rare crossed-tusk lineage

---

## Local Development & Build Commands

```bash
# Install dependencies
npm install

# Pre-render static pages and build for production
node scripts/generate-pages.js
node scripts/generate-sitemap.js
node scripts/run-cross-linking.js
node scripts/sync-layout.js
node scripts/sync-seo-meta.js
npx vite build

# Run local development server
npx vite
```
