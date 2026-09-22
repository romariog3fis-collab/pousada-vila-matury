/**
 * Sidebar Navigation (Menu Lateral de Navegação)
 * Pousada Vila Matury
 * Gerencia abertura via botão da Navbar, aba lateral flutuante,
 * gestos de arraste (drag), scroll spy e atalhos de teclado.
 */
class SidebarNav {
  constructor() {
    this.drawer = document.getElementById('sideDrawer');
    this.pullTab = document.getElementById('sideDrawerTab');
    this.overlay = document.getElementById('sideDrawerOverlay');
    this.closeBtn = document.getElementById('sideDrawerClose');
    this.navMenuBtn = document.getElementById('openSideDrawerBtn');
    this.mobileMenuBtn = document.getElementById('mobileMenuToggle');
    this.links = document.querySelectorAll('.side-drawer-link');
    
    this.isDragging = false;
    this.startX = 0;
    this.currentX = 0;
    this.leaveTimeout = null;
    this.openedViaClick = false;

    if (!this.drawer) return;

    this.initEvents();
    this.initScrollSpy();
  }

  isOpen() {
    return this.drawer && this.drawer.classList.contains('active');
  }

  open(fromClick = false) {
    if (this.leaveTimeout) {
      clearTimeout(this.leaveTimeout);
      this.leaveTimeout = null;
    }
    if (fromClick) {
      this.openedViaClick = true;
    }
    if (this.drawer) this.drawer.classList.add('active');
    if (this.overlay) this.overlay.classList.add('active');
    if (this.pullTab) this.pullTab.classList.add('hidden');
    document.body.style.overflow = 'hidden';
  }

  close() {
    if (this.leaveTimeout) {
      clearTimeout(this.leaveTimeout);
      this.leaveTimeout = null;
    }
    this.openedViaClick = false;
    if (this.drawer) this.drawer.classList.remove('active');
    if (this.overlay) this.overlay.classList.remove('active');
    if (this.pullTab) this.pullTab.classList.remove('hidden');
    document.body.style.overflow = '';
  }

  toggle(fromClick = true) {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open(fromClick);
    }
  }

  initEvents() {
    // 1. Hover na aba lateral abre suavemente para espiar
    if (this.pullTab) {
      this.pullTab.addEventListener('mouseenter', () => {
        this.open(false);
      });
    }

    // 6. Mouse Leave com tolerância na gaveta (apenas se aberta por hover)
    this.drawer.addEventListener('mouseleave', () => {
      if (this.openedViaClick) return; // Se abriu por clique, mantém aberto até ação explícita
      this.leaveTimeout = setTimeout(() => {
        if (!this.isDragging && !this.openedViaClick) {
          this.close();
        }
      }, 400);
    });

    this.drawer.addEventListener('mouseenter', () => {
      if (this.leaveTimeout) {
        clearTimeout(this.leaveTimeout);
        this.leaveTimeout = null;
      }
    });

    // 7. Detecção de proximidade da margem direita (hover)
    // Ignora quando cursor está no cabeçalho/navbar para nunca conflitar com botões
    window.addEventListener('mousemove', (e) => {
      if (e.clientY < 90 || (e.target && e.target.closest && (e.target.closest('#mainNavbar') || e.target.closest('#openSideDrawerBtn')))) {
        return;
      }
      const screenWidth = window.innerWidth;
      if (screenWidth - e.clientX <= 30 && !this.isOpen()) {
        this.open(false);
      }
    });

    // 8. Arraste com o Mouse (Drag to Open)
    window.addEventListener('mousedown', (e) => {
      if (e.clientY < 90 || (e.target && e.target.closest && (e.target.closest('#mainNavbar') || e.target.closest('#openSideDrawerBtn')))) {
        return;
      }
      const screenWidth = window.innerWidth;
      if ((e.target && e.target.closest && e.target.closest('#sideDrawerTab')) || (screenWidth - e.clientX <= 50 && !this.isOpen())) {
        this.isDragging = true;
        this.startX = e.clientX;
      }
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      this.currentX = e.clientX;
      const deltaX = this.startX - this.currentX;
      if (deltaX > 25 && !this.isOpen()) {
        this.open(true);
        this.isDragging = false;
      }
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    // 9. Suporte a Gestos Touch (Mobile / Tablet)
    let touchStartX = 0;
    window.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches[0]) {
        touchStartX = e.touches[0].clientX;
      }
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
      if (!e.changedTouches || !e.changedTouches[0]) return;
      const touchEndX = e.changedTouches[0].clientX;
      const screenWidth = window.innerWidth;
      const deltaX = touchStartX - touchEndX;

      if (screenWidth - touchStartX < 60 && deltaX > 40 && !this.isOpen()) {
        this.open(true);
      }
      if (this.isOpen() && deltaX < -45) {
        this.close();
      }
    }, { passive: true });

    // 10. Fechar ao clicar em qualquer link interno
    this.links.forEach((link) => {
      link.addEventListener('click', () => {
        setTimeout(() => this.close(), 180);
      });
    });

    // 11. Atalhos de teclado: ESC fecha, M abre/fecha
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
      if ((e.key === 'm' || e.key === 'M') && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        this.toggle(true);
      }
    });
  }

  initScrollSpy() {
    const sections = document.querySelectorAll('section[id], header[id]');
    if (!sections.length) return;

    window.addEventListener('scroll', () => {
      let currentSectionId = '';
      const scrollPos = window.scrollY + 220;

      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSectionId = section.getAttribute('id');
        }
      });

      if (currentSectionId) {
        this.links.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
          }
        });
      }
    }, { passive: true });
  }
}

// Global toggle sincronizado com a instância se existir
window.toggleVilaMenu = function() {
  if (window.sidebarNavInstance) {
    window.sidebarNavInstance.toggle(true);
  } else {
    const drawer = document.getElementById('sideDrawer');
    const overlay = document.getElementById('sideDrawerOverlay');
    const tab = document.getElementById('sideDrawerTab');
    if (!drawer) return;
    const isAct = drawer.classList.contains('active');
    if (isAct) {
      drawer.classList.remove('active');
      if (overlay) overlay.classList.remove('active');
      if (tab) tab.classList.remove('hidden');
      document.body.style.overflow = '';
    } else {
      drawer.classList.add('active');
      if (overlay) overlay.classList.add('active');
      if (tab) tab.classList.add('hidden');
      document.body.style.overflow = 'hidden';
    }
  }
};

window.toggleSideDrawer = window.toggleVilaMenu;
window.SidebarNav = SidebarNav;

function initSidebarNav() {
  if (!window.sidebarNavInstance) {
    window.sidebarNavInstance = new SidebarNav();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSidebarNav);
} else {
  initSidebarNav();
}
