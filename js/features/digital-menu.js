/**
 * Cardápio Digital Interativo - Bar & Restaurante Vila Matury
 */
class DigitalMenu {
  constructor(containerId = 'menuItemsContainer', tabContainerId = 'menuTabs') {
    this.container = document.getElementById(containerId);
    this.tabContainer = document.getElementById(tabContainerId);
    this.activeCategory = 'lagosta-mar';
    this.init();
  }

  init() {
    if (!this.container || !window.VILA_MENU) return;
    this.renderTabs();
    this.renderItems();
  }

  renderTabs() {
    if (!this.tabContainer) return;
    this.tabContainer.innerHTML = window.VILA_MENU.map((cat, idx) => `
      <button 
        class="menu-tab-btn ${this.activeCategory === cat.category ? 'active' : ''}" 
        data-cat="${cat.category}"
        onclick="window.digitalMenu.switchCategory('${cat.category}')"
      >
        ${cat.categoryName}
      </button>
    `).join('');
  }

  switchCategory(catKey) {
    this.activeCategory = catKey;
    if (this.tabContainer) {
      this.tabContainer.querySelectorAll('.menu-tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-cat') === catKey);
      });
    }
    this.renderItems();
  }

  renderItems() {
    const categoryData = window.VILA_MENU.find(c => c.category === this.activeCategory);
    if (!categoryData) return;

    this.container.innerHTML = categoryData.items.map(item => `
      <div class="menu-item-card">
        <div class="menu-item-header">
          <div class="menu-item-title-wrap">
            <h4 class="menu-item-name">${item.name}</h4>
            ${item.tag ? `<span class="menu-item-tag">${item.tag}</span>` : ''}
          </div>
          <div class="menu-item-price">
            ${item.price > 0 ? `R$ ${item.price.toFixed(2).replace('.', ',')}` : `<span class="badge-free">Incluso</span>`}
          </div>
        </div>
        <p class="menu-item-desc">${item.description}</p>
        <div class="menu-item-footer">
          <span class="menu-item-serves">👥 ${item.serves}</span>
          ${item.price > 0 ? `
            <button class="btn-ask-item" onclick="window.digitalMenu.askViaWhatsApp('${item.name}')">
              Consultar / Pedir
            </button>
          ` : ''}
        </div>
      </div>
    `).join('');
  }

  askViaWhatsApp(itemName) {
    const whatsappNum = (window.VILA_CONFIG && window.VILA_CONFIG.whatsappNumber) || "5588981914175";
    const text = `Olá! Estou na Pousada Vila Matury (ou planejando minha estada) e gostaria de saber mais sobre o prato "${itemName}" do cardápio!`;
    window.open(`https://wa.me/${whatsappNum}?text=${encodeURIComponent(text)}`, '_blank');
  }
}

window.DigitalMenu = DigitalMenu;
