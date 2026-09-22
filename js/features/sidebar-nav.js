/**
 * Sidebar Navigation (Menu Lateral de Navegação)
 * Pousada Vila Matury
 * Gerencia gestos touch, atalhos de teclado e links internos.
 */
class SidebarNav {
  constructor() {
    this.drawer = document.getElementById('sideDrawer');
    this.pullTab = document.getElementById('sideDrawerTab');
    this.links = document.querySelectorAll('.side-drawer-link');
    
    this.isDragging = false;
    this.startX = 0;
    this.currentX = 0;

    if (!this.drawer) return;

    this.initEvents();
    this.initScrollSpy();
  }

  isOpen() {
    return this.drawer && this.drawer.classList.contains('active');
  }

  open() {
    if (typeof window.openVilaMenu === 'function') {
      window.openVilaMenu();
    }
  }

  close() {
    if (typeof window.closeVilaMenu === 'function') {
      window.closeVilaMenu();
    }
  }

  toggle() {
    if (typeof window.toggleVilaMenu === 'function') {
      window.toggleVilaMenu();
    }
  }

  initEvents() {
    // 1. Aba flutuante lateral (hover para espiar no desktop)
    if (this.pullTab) {
      this.pullTab.addEventListener('mouseenter', () => {
        if (!this.isOpen()) {
          this.open();
        }
      });
    }

    // 2. Fechar ao clicar em qualquer link interno com scroll suave
    this.links.forEach((link) => {
      link.addEventListener('click', () => {
        setTimeout(() => this.close(), 160);
      });
    });

    // 3. Atalhos de teclado: ESC fecha, M abre/fecha (quando não estiver digitando)
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
      if ((e.key === 'm' || e.key === 'M') && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        this.toggle();
      }
    });

    // 4. Suporte a Gestos Touch (Mobile / Tablet)
    let touchStartX = 0;
    let touchStartY = 0;

    window.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches[0]) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
      if (!e.changedTouches || !e.changedTouches[0]) return;
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaX = touchStartX - touchEndX;
      const deltaY = Math.abs(touchStartY - touchEndY);

      // Deslize horizontal predominante
      if (deltaY < 80) {
        const screenWidth = window.innerWidth;
        // Deslize da borda direita para a esquerda -> Abre
        if (screenWidth - touchStartX < 50 && deltaX > 35 && !this.isOpen()) {
          this.open();
        }
        // Deslize da esquerda para a direita quando aberto -> Fecha
        if (this.isOpen() && deltaX < -40) {
          this.close();
        }
      }
    }, { passive: true });
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
