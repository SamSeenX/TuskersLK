/**
 * Elephant Card Component
 * Renders individual tusker cards for catalog and featured grids
 */

export function renderElephantCard(elephant) {
  const statusClass = elephant.status === 'Alive' ? 'badge-alive' :
    (elephant.status === 'Deceased' ? 'badge-deceased' : 'badge-historical');

  const causeOfDeathHtml = elephant.causeOfDeath && elephant.causeOfDeath !== 'None' ? `
    <div class="dossier-fate">
      <strong>Fate / Cause:</strong> ${elephant.causeOfDeath}
    </div>
  ` : '';

  const imageHtml = elephant.image ? `
    <div class="card-image-wrap">
      <img src="${elephant.image}" alt="${elephant.name}" class="card-image" loading="lazy">
      <span class="card-image-credit">${elephant.imageCredit}</span>
    </div>
  ` : '';

  return `
    <article class="tusker-card" data-id="${elephant.id}" data-status="${elephant.status}" data-category="${elephant.category}">
      ${imageHtml}
      <div class="card-header-meta">
        <span class="badge ${statusClass}">${elephant.status}</span>
        <span class="badge badge-category">${elephant.category}</span>
      </div>
      <h3 class="tusker-name">${elephant.name}</h3>
      <div class="tusker-sinhala">${elephant.sinhalaName}</div>
      <div class="dossier-grid">
        <div class="dossier-field">
          <span class="dossier-label">Lifespan</span>
          <span class="dossier-value">${elephant.lifespan}</span>
        </div>
        <div class="dossier-field">
          <span class="dossier-label">Location</span>
          <span class="dossier-value">${elephant.locationName}</span>
        </div>
        <div class="dossier-field" style="grid-column: 1 / -1;">
          <span class="dossier-label">Tusks &amp; Physical Traits</span>
          <span class="dossier-value">${elephant.physicalTraits}</span>
        </div>
        ${causeOfDeathHtml}
      </div>
      <p class="tusker-narrative">
        ${elephant.whyFamous}
      </p>
      <div class="card-footer">
        <a href="/elephants/${elephant.id}.html" class="card-action">
          View Archival Dossier
        </a>
      </div>
    </article>
  `;
}
