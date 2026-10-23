import fs from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { getHeaderHtml, getFooterHtml, getSeoMetaHtml } from '../src/core/layout-template.js';
import { ELEPHANTS } from '../src/data/elephants.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = resolve(__dirname, '..');
const ELEPHANTS_DIR = resolve(ROOT_DIR, 'elephants');

function generateElephantPage(elephant) {
  const currentPath = `/elephants/${elephant.id}.html`;
  const headerHtml = getHeaderHtml(currentPath);
  const footerHtml = getFooterHtml();
  const pageTitle = `${elephant.name} (${elephant.sinhalaName}) | Wanali Tusker Archive`;
  const pageDesc = `${elephant.name} - ${elephant.category} of Sri Lanka. ${elephant.whyFamous.slice(0, 150)}...`;

  const seoMetaHtml = getSeoMetaHtml({
    title: pageTitle,
    description: pageDesc,
    path: currentPath,
    image: elephant.image,
    type: 'article'
  });

  const schemaJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': `${elephant.name} - Sri Lankan Elephant Chronicle`,
    'image': elephant.image,
    'description': elephant.whyFamous,
    'about': {
      '@type': 'Thing',
      'name': elephant.name,
      'alternateName': elephant.sinhalaName,
      'description': elephant.physicalTraits
    },
    'spatialCoverage': elephant.locationName
  }, null, 2);

  const statusBadgeClass = elephant.status === 'Alive' ? 'badge-alive' :
    (elephant.status === 'Deceased' ? 'badge-deceased' : 'badge-historical');

  const figureHtml = elephant.image ? `
      <figure class="tusker-figure">
        <img src="${elephant.image}" alt="${elephant.name}" class="tusker-figure-img" loading="lazy">
        <figcaption class="tusker-figcaption">
          <span>${elephant.imageCaption}</span>
          <span class="tusker-license-badge">Credit: ${elephant.imageCredit} (${elephant.imageLicense})</span>
        </figcaption>
      </figure>
  ` : '';

  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageTitle}</title>
  <meta name="description" content="${pageDesc}">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="stylesheet" href="/src/styles/main.css">
${seoMetaHtml}
  <script type="application/ld+json">
${schemaJson}
  </script>
</head>
<body>
  ${headerHtml}
  <main class="container" style="padding-top: 2.5rem; padding-bottom: 4rem;">
    <article class="prose">
      <div class="archival-profile-header">
        <div class="archival-meta-line">
          <span class="badge ${statusBadgeClass}">${elephant.status}</span>
          <span class="badge badge-category">${elephant.category}</span>
          <span class="archival-lifespan">${elephant.lifespan}</span>
        </div>
        <h1 class="tusker-profile-title">${elephant.name}</h1>
        <div class="tusker-profile-sinhala">${elephant.sinhalaName}</div>
      </div>

      ${figureHtml}

      <div class="field-record-card">
        <h2 class="field-record-heading">Archival Field Dossier</h2>
        <div class="field-record-grid">
          <div class="field-record-item">
            <span class="record-label">Roaming Territory</span>
            <span class="record-value">${elephant.locationName}</span>
          </div>
          <div class="field-record-item">
            <span class="record-label">Habitat Sanctuary</span>
            <span class="record-value">${elephant.habitat}</span>
          </div>
          <div class="field-record-item">
            <span class="record-label">Geographic Coordinates</span>
            <span class="record-value">${elephant.coordinates[0]} N, ${elephant.coordinates[1]} E</span>
          </div>
          <div class="field-record-item full-width">
            <span class="record-label">Physical Anatomy &amp; Tusks</span>
            <span class="record-value">${elephant.physicalTraits}</span>
          </div>
          ${elephant.causeOfDeath && elephant.causeOfDeath !== 'None' ? `
          <div class="field-record-item full-width fate-record">
            <span class="record-label">Fate and Cause of Death</span>
            <span class="record-value">${elephant.causeOfDeath}</span>
          </div>` : ''}
        </div>
      </div>

      <h2>Significance and Cultural Legacy</h2>
      <p style="font-size: 1.1rem; line-height: 1.8; color: var(--text-primary);">
        ${elephant.whyFamous}
      </p>

      <blockquote style="margin: 2rem 0;">
        "Sri Lankan tuskers represent an ancient biological and cultural heritage. Only a rare percentage of Sri Lankan Asian elephant bulls develop majestic ivory tusks, making each individual a living national treasure."
      </blockquote>

      <div style="margin-top: 3rem; display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="/catalog.html" class="btn btn-secondary">Return to Tusker Registry</a>
        <a href="/map.html" class="btn btn-primary">Locate on Sanctuary Map</a>
      </div>
    </article>
  </main>
  ${footerHtml}
  <script type="module" src="/src/main.js"></script>
</body>
</html>`;
}

function main() {
  if (!fs.existsSync(ELEPHANTS_DIR)) {
    fs.mkdirSync(ELEPHANTS_DIR, { recursive: true });
  }

  ELEPHANTS.forEach((elephant) => {
    const filePath = resolve(ELEPHANTS_DIR, `${elephant.id}.html`);
    const content = generateElephantPage(elephant);
    fs.writeFileSync(filePath, content, 'utf-8');
  });

  console.log(`[Wanali SSG] Successfully pre-rendered ${ELEPHANTS.length} tusker static pages in /elephants`);
}

main();
