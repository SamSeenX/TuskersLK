/**
 * Catalog Filter & Search Controller
 * Provides real-time instant search, category filtering, and status filtering
 */

import { renderElephantCard } from './elephant-card.js';

export function initCatalogFilter(elephants, containerSelector = '#tusker-grid-container') {
  const container = document.querySelector(containerSelector);
  const searchInput = document.querySelector('#search-input');
  const countDisplay = document.querySelector('#filter-results-count');
  const statusPills = document.querySelectorAll('[data-filter-status]');
  const categoryPills = document.querySelectorAll('[data-filter-category]');

  if (!container) return;

  let currentStatus = 'all';
  let currentCategory = 'all';
  let currentQuery = '';

  function applyFilters() {
    const filtered = elephants.filter((elephant) => {
      const matchStatus = currentStatus === 'all' || elephant.status.toLowerCase() === currentStatus.toLowerCase();
      const matchCategory = currentCategory === 'all' || elephant.category.toLowerCase() === currentCategory.toLowerCase();
      
      const query = currentQuery.toLowerCase().trim();
      const matchQuery = !query ||
        elephant.name.toLowerCase().includes(query) ||
        elephant.sinhalaName.includes(query) ||
        elephant.locationName.toLowerCase().includes(query) ||
        elephant.whyFamous.toLowerCase().includes(query);

      return matchStatus && matchCategory && matchQuery;
    });

    if (countDisplay) {
      countDisplay.textContent = `Showing ${filtered.length} of ${elephants.length} records`;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: var(--bg-surface); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <p style="color: var(--text-muted); font-size: 1.1rem; margin-bottom: 1rem;">No tuskers matched your search criteria.</p>
          <button id="reset-filter-btn" class="btn btn-secondary" style="font-size: 0.85rem;">Clear Filters</button>
        </div>
      `;
      const resetBtn = document.querySelector('#reset-filter-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          currentStatus = 'all';
          currentCategory = 'all';
          currentQuery = '';
          if (searchInput) searchInput.value = '';
          statusPills.forEach((p) => p.classList.toggle('active', p.dataset.filterStatus === 'all'));
          categoryPills.forEach((p) => p.classList.toggle('active', p.dataset.filterCategory === 'all'));
          applyFilters();
        });
      }
      return;
    }

    container.innerHTML = filtered.map(renderElephantCard).join('');
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentQuery = e.target.value;
      applyFilters();
    });
  }

  statusPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      statusPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      currentStatus = pill.dataset.filterStatus;
      applyFilters();
    });
  });

  categoryPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      categoryPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.dataset.filterCategory;
      applyFilters();
    });
  });

  applyFilters();
}
