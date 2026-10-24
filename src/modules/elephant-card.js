/**
 * Elephant Card Component
 * Renders streamlined tusker cards with uniform heights and contained metadata
 */

export function renderElephantCard(elephant) {
  const statusClass = elephant.status === 'Alive' ? 'badge-alive' :
    (elephant.status === 'Deceased' ? 'badge-deceased' : 'badge-historical');

  const slug = elephant.id || (elephant.image ? elephant.image.split('/').pop().replace(/\.jpg$/, '') : '');
  const dossierUrl = `/elephants/${elephant.id}.html`;

  const imageHtml = elephant.image ? `
    <a href="${dossierUrl}" class="card-image-wrap" aria-label="View dossier for ${elephant.name}">
      <picture>
        <source srcset="/images/elephants/480p/${slug}.avif" type="image/avif">
        <source srcset="/images/elephants/480p/${slug}.webp" type="image/webp">
        <img src="${elephant.image}" alt="${elephant.name}" class="card-image" loading="lazy" width="480" height="270">
      </picture>
      <span class="card-image-credit">${elephant.imageCredit}</span>
    </a>
  ` : '';

  return `
    <article class="tusker-card" data-id="${elephant.id}" data-status="${elephant.status}" data-category="${elephant.category}">
      ${imageHtml}
      <div class="card-header-meta">
        <span class="badge ${statusClass}">${elephant.status}</span>
        <span class="badge badge-category">${elephant.category}</span>
      </div>
      <h3 class="tusker-name">
        <a href="${dossierUrl}" class="tusker-name-link">${elephant.name}</a>
      </h3>
      <div class="tusker-sinhala">${elephant.sinhalaName}</div>
      <div class="dossier-meta-list">
        <div class="dossier-row">
          <span class="dossier-label">Lifespan</span>
          <span class="dossier-value">${elephant.lifespan}</span>
        </div>
        <div class="dossier-row">
          <span class="dossier-label">Location</span>
          <span class="dossier-value">${elephant.locationName}</span>
        </div>
      </div>
      <p class="tusker-narrative">
        ${elephant.whyFamous}
      </p>
      <div class="card-footer">
        <a href="${dossierUrl}" class="card-action">
          <span>View Dossier</span>
          <svg class="action-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>
    </article>
  `;
}
