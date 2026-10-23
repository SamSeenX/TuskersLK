import { themeManager } from './core/theme-manager.js';
import { ELEPHANTS } from './data/elephants.js';
import { renderElephantCard } from './modules/elephant-card.js';
import { initCatalogFilter } from './modules/catalog-filter.js';
import { initTuskerMap } from './modules/map-controller.js';

function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const nav = document.getElementById('site-nav');
  if (!menuBtn || !nav) return;

  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = nav.classList.toggle('is-open');
    menuBtn.classList.toggle('is-active', isOpen);
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', (e) => {
    if (nav.classList.contains('is-open') && !nav.contains(e.target) && !menuBtn.contains(e.target)) {
      nav.classList.remove('is-open');
      menuBtn.classList.remove('is-active');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  themeManager.init();
  initMobileMenu();

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
