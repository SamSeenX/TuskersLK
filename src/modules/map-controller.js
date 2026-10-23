/**
 * Interactive Map Controller
 * Visualizes Sri Lankan elephant and tusker territories and memorial sites
 */

export function initTuskerMap(elephants, mapElementId = 'tusker-map-canvas') {
  const mapElement = document.getElementById(mapElementId);
  if (!mapElement) return;

  if (typeof window.L === 'undefined') {
    mapElement.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--text-muted);padding:2rem;text-align:center;">
        <p>Interactive Map requires Leaflet. Please verify internet connection or reload.</p>
      </div>
    `;
    return;
  }

  // Centered on the national geographic center of Sri Lanka
  const map = window.L.map(mapElementId, {
    center: [7.65, 80.70],
    zoom: 8,
    minZoom: 7,
    maxZoom: 13,
    scrollWheelZoom: false
  });

  // OpenStreetMap tile layer (100% free, zero API key required)
  window.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
    maxZoom: 19
  }).addTo(map);

  const markersGroup = window.L.layerGroup().addTo(map);

  function renderPins(filterStatus = 'all') {
    markersGroup.clearLayers();

    elephants.forEach((elephant) => {
      if (filterStatus !== 'all' && elephant.status.toLowerCase() !== filterStatus.toLowerCase()) {
        return;
      }

      const statusKey = elephant.status.toLowerCase();
      const customIcon = window.L.divIcon({
        className: `custom-tusker-pin ${statusKey}`,
        html: '<span>🐘</span>',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -18]
      });

      const popupHtml = `
        <div class="map-popup-card">
          <h4 class="map-popup-title">${elephant.name}</h4>
          <div class="map-popup-sinhala">${elephant.sinhalaName}</div>
          <div class="map-popup-meta">
            <div><strong>Status:</strong> ${elephant.status}</div>
            <div><strong>Territory:</strong> ${elephant.locationName}</div>
            ${elephant.causeOfDeath && elephant.causeOfDeath !== 'None' ? `<div><strong>Fate:</strong> ${elephant.causeOfDeath}</div>` : ''}
          </div>
          <a href="/elephants/${elephant.id}.html" class="map-popup-link">Explore Full Chronicle</a>
        </div>
      `;

      const marker = window.L.marker(elephant.coordinates, { icon: customIcon });
      marker.bindPopup(popupHtml);
      markersGroup.addLayer(marker);
    });
  }

  renderPins('all');

  // Trigger size recalculation after DOM/layout finishes mounting
  setTimeout(() => {
    map.invalidateSize();
  }, 120);

  window.addEventListener('resize', () => {
    map.invalidateSize();
  });

  // Wire map filter buttons if present
  const mapFilters = document.querySelectorAll('[data-map-filter]');
  mapFilters.forEach((button) => {
    button.addEventListener('click', () => {
      mapFilters.forEach((b) => b.classList.remove('active'));
      button.classList.add('active');
      renderPins(button.dataset.mapFilter);
    });
  });

  return { map, renderPins };
}
