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

  // Centered on Sri Lanka
  const map = window.L.map(mapElementId, {
    center: [7.8731, 80.7718],
    zoom: 8,
    minZoom: 7,
    maxZoom: 13,
    scrollWheelZoom: false
  });

  // Dark Carto tile layer for immersive aesthetic
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
  const tileUrl = isDark
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

  window.L.tileLayer(tileUrl, {
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    subdomains: 'abcd',
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
          <a href="/elephants/${elephant.id}.html" class="map-popup-link">Explore Full Chronicle &rarr;</a>
        </div>
      `;

      const marker = window.L.marker(elephant.coordinates, { icon: customIcon });
      marker.bindPopup(popupHtml);
      markersGroup.addLayer(marker);
    });
  }

  renderPins('all');

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
