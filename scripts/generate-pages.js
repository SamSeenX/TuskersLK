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
      <div style="display: flex; gap: 0.6rem; align-items: center; margin-bottom: 1rem; flex-wrap: wrap;">
        <span class="badge ${statusBadgeClass}">${elephant.status}</span>
        <span class="badge badge-category">${elephant.category}</span>
        <span style="font-size: 0.85rem; color: var(--text-muted);">${elephant.lifespan}</span>
      </div>
      <h1 style="font-size: 2.4rem; line-height: 1.15; margin: 0 0 0.3rem;">${elephant.name}</h1>
      <div style="font-size: 1.25rem; color: var(--accent-gold); font-family: var(--font-serif); margin-bottom: 1.5rem;">
        ${elephant.sinhalaName}
      </div>

      ${figureHtml}

      <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.5rem; margin-bottom: 2rem;">
        <h2 style="font-size: 1.1rem; margin-top: 0; color: var(--accent-gold); text-transform: uppercase; letter-spacing: 0.05em;">
          Registry Record
        </h2>
        <ul style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.95rem;">
          <li><strong>Roaming Territory:</strong> ${elephant.locationName}</li>
          <li><strong>Habitat & Sanctuary:</strong> ${elephant.habitat}</li>
          <li><strong>Physical Anatomy:</strong> ${elephant.physicalTraits}</li>
          <li><strong>Geographic Coordinates:</strong> [${elephant.coordinates[0]}, ${elephant.coordinates[1]}]</li>
          ${elephant.causeOfDeath ? `<li><strong>Fate & Cause of Death:</strong> ${elephant.causeOfDeath}</li>` : ''}
        </ul>
      </div>

      <h2>Significance & Cultural Legacy</h2>
      <p style="font-size: 1.1rem; line-height: 1.8; color: var(--text-primary);">
        ${elephant.whyFamous}
      </p>

      <blockquote style="margin: 2rem 0;">
        "Sri Lankan tuskers represent an ancient biological and cultural heritage. Only a rare percentage of Sri Lankan Asian elephant bulls develop majestic ivory tusks, making each individual a living national treasure."
      </blockquote>

      <div style="margin-top: 3rem; display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="/catalog.html" class="btn btn-secondary">&larr; Return to Tusker Registry</a>
        <a href="/map.html" class="btn btn-primary">Locate on Sanctuary Map &rarr;</a>
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
