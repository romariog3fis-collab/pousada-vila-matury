/**
 * Guia Turístico Hiperlocal de Icapuí
 * Apresentação dos atrativos ao redor da Pousada Vila Matury
 */
class LocalGuide {
  constructor(containerId = 'guideGrid', tabContainerId = 'guideTabs') {
    this.container = document.getElementById(containerId);
    this.tabContainer = document.getElementById(tabContainerId);
    this.activeCategory = 'todos';
    this.init();
  }

  init() {
    if (!this.container || !window.VILA_GUIDE) return;
    this.renderTabs();
    this.renderItems();
  }

  renderTabs() {
    if (!this.tabContainer) return;
    const categories = [
      { id: 'todos', label: 'Todos os Atrativos' },
      { id: 'praias', label: '🏖️ Praias & Falésias' },
      { id: 'mirantes', label: '🌅 Mirantes & Natureza' },
      { id: 'gastronomia', label: '🦞 Rota da Lagosta' },
      { id: 'aventuras', label: '⛵ Jangada & Kitesurf' }
    ];

    this.tabContainer.innerHTML = categories.map(cat => `
      <button 
        class="guide-tab-btn ${this.activeCategory === cat.id ? 'active' : ''}" 
        data-cat="${cat.id}"
        onclick="window.localGuide.filterCategory('${cat.id}')"
      >
        ${cat.label}
      </button>
    `).join('');
  }

  filterCategory(catId) {
    this.activeCategory = catId;
    if (this.tabContainer) {
      this.tabContainer.querySelectorAll('.guide-tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-cat') === catId);
      });
    }
    this.renderItems();
  }

  renderItems() {
    const items = this.activeCategory === 'todos' 
      ? window.VILA_GUIDE 
      : window.VILA_GUIDE.filter(item => item.category === this.activeCategory);

    this.container.innerHTML = items.map(item => `
      <div class="guide-card">
        <div class="guide-img-container">
          <img src="${item.image}" alt="${item.title} - Icapuí Ceará" loading="lazy" class="guide-img" />
          <span class="guide-tag">${item.tag}</span>
          <span class="guide-distance">${item.distance}</span>
        </div>
        <div class="guide-body">
          <span class="guide-category-badge">${item.categoryLabel}</span>
          <h3 class="guide-title">${item.title}</h3>
          <p class="guide-description">${item.description}</p>
          <div class="guide-tip-box">
            <span class="tip-icon">💡</span>
            <p class="tip-text"><strong>Dica da Pousada:</strong> ${item.tips}</p>
          </div>
        </div>
      </div>
    `).join('');
  }
}

window.LocalGuide = LocalGuide;
