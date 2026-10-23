import { themeManager } from './core/theme-manager.js';
import { ELEPHANTS } from './data/elephants.js';
import { renderElephantCard } from './modules/elephant-card.js';
import { initCatalogFilter } from './modules/catalog-filter.js';
import { initTuskerMap } from './modules/map-controller.js';

document.addEventListener('DOMContentLoaded', () => {
  themeManager.init();

  // Initialize Map if canvas is present
  const mapCanvas = document.getElementById('tusker-map-canvas');
  if (mapCanvas) {
    initTuskerMap(ELEPHANTS);
  }

  // Initialize Catalog filter if container is present
  const catalogContainer = document.getElementById('tusker-grid-container');
  if (catalogContainer) {
    initCatalogFilter(ELEPHANTS, '#tusker-grid-container');
  }

  // Render featured preview on Home Page
  const featuredContainer = document.getElementById('featured-tuskers-container');
  if (featuredContainer) {
    const featuredList = ELEPHANTS.slice(0, 6);
    featuredContainer.innerHTML = featuredList.map(renderElephantCard).join('');
  }
});
