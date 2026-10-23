/**
 * Elephant Card Component
 * Renders individual tusker cards for catalog and featured grids
 */

export function renderElephantCard(elephant) {
  const statusClass = elephant.status === 'Alive' ? 'badge-alive' :
    (elephant.status === 'Deceased' ? 'badge-deceased' : 'badge-historical');

  const causeOfDeathHtml = elephant.causeOfDeath && elephant.causeOfDeath !== 'None' ? `
    <li class="tusker-info-item">
      <strong>Fate / Cause:</strong>
      <span>${elephant.causeOfDeath}</span>
    </li>
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
      <ul class="tusker-info-list">
        <li class="tusker-info-item">
          <strong>Lifespan:</strong>
          <span>${elephant.lifespan}</span>
        </li>
        <li class="tusker-info-item">
          <strong>Location:</strong>
          <span>${elephant.locationName}</span>
        </li>
        <li class="tusker-info-item">
          <strong>Tusks & Traits:</strong>
          <span>${elephant.physicalTraits}</span>
        </li>
        ${causeOfDeathHtml}
      </ul>
      <div class="tusker-famous-quote">
        ${elephant.whyFamous}
      </div>
      <div class="card-footer">
        <a href="/elephants/${elephant.id}.html" class="btn btn-secondary" style="font-size: 0.85rem; padding: 0.4rem 0.85rem;">
          Full Chronicle &rarr;
        </a>
      </div>
    </article>
  `;
}
