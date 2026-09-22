/**
 * Sidebar Navigation (Menu Lateral Escondido)
 * Pousada Vila Matury
 * Permite navegação ultrarrápida abrindo ao passar o mouse, arrastar, clicar na aba lateral
 * ou clicar no botão "Menu" no topo do Navbar.
 */
class SidebarNav {
  constructor() {
    this.drawer = document.getElementById('sideDrawer');
    this.pullTab = document.getElementById('sideDrawerTab');
    this.overlay = document.getElementById('sideDrawerOverlay');
    this.closeBtn = document.getElementById('sideDrawerClose');
    this.navTriggerBtn = document.getElementById('openSideDrawerBtn');
    this.links = document.querySelectorAll('.side-drawer-link');
    
    this.isOpen = false;
    this.isDragging = false;
    this.startX = 0;
    this.currentX = 0;
    this.leaveTimeout = null;

    if (!this.drawer) return;

    this.initEvents();
    this.initScrollSpy();
  }

  initEvents() {
    // 1. Botão "Menu" na Navbar Superior
    if (this.navTriggerBtn) {
      this.navTriggerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggle();
      });
    }

    // 2. Abrir ao clicar ou passar o mouse na aba flutuante
    if (this.pullTab) {
      this.pullTab.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggle();
      });

      // Hover sobre a aba abre suavemente
      this.pullTab.addEventListener('mouseenter', () => {
        this.open();
      });
    }

    // 3. Fechar com o botão X ou Overlay
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.close();
      });
    }

    if (this.overlay) {
      this.overlay.addEventListener('click', (e) => {
        e.preventDefault();
        this.close();
      });
    }

    // 4. Mouse Leave com tolerância para evitar fechamentos acidentais ao navegar
    this.drawer.addEventListener('mouseleave', () => {
      this.leaveTimeout = setTimeout(() => {
        if (!this.isDragging) {
          this.close();
        }
      }, 500);
    });

    this.drawer.addEventListener('mouseenter', () => {
      if (this.leaveTimeout) {
        clearTimeout(this.leaveTimeout);
        this.leaveTimeout = null;
      }
    });

    // 5. Detecção de aproximação da borda direita da tela (hover/arrastar próximo à margem)
    window.addEventListener('mousemove', (e) => {
      const screenWidth = window.innerWidth;
      // Se o cursor estiver nos últimos 42px da borda direita e o drawer estiver fechado
      if (screenWidth - e.clientX <= 42 && !this.isOpen) {
        this.open();
      }
    });

    // 6. Gesto de Arraste com o Mouse (Drag to Open / Close)
    window.addEventListener('mousedown', (e) => {
      const screenWidth = window.innerWidth;
      // Inicia arraste se clicar na aba ou nos últimos 60px da direita
      if (e.target.closest('#sideDrawerTab') || (screenWidth - e.clientX <= 60 && !this.isOpen)) {
        this.isDragging = true;
        this.startX = e.clientX;
      }
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      this.currentX = e.clientX;
      const deltaX = this.startX - this.currentX;

      // Se arrastou mais de 25px para a esquerda, abre
      if (deltaX > 25 && !this.isOpen) {
        this.open();
        this.isDragging = false;
      }
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    // 7. Suporte a Gestos Touch (Mobile / Tablets)
    let touchStartX = 0;
    window.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const screenWidth = window.innerWidth;
      const deltaX = touchStartX - touchEndX;

      // Deslize da borda direita para esquerda abre
      if (screenWidth - touchStartX < 60 && deltaX > 40 && !this.isOpen) {
        this.open();
      }
      // Deslize da esquerda para a direita fecha quando aberto
      if (this.isOpen && deltaX < -45) {
        this.close();
      }
    }, { passive: true });

    // 8. Fechar ao clicar em qualquer link interno após scroll
    this.links.forEach((link) => {
      link.addEventListener('click', () => {
        setTimeout(() => this.close(), 180);
      });
    });

    // 9. Teclas de Atalho: ESC fecha, 'M' abre/fecha (quando fora de inputs)
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
      if ((e.key === 'm' || e.key === 'M') && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        this.toggle();
      }
    });
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    if (this.leaveTimeout) {
      clearTimeout(this.leaveTimeout);
      this.leaveTimeout = null;
    }
    this.isOpen = true;
    if (this.drawer) this.drawer.classList.add('active');
    if (this.overlay) this.overlay.classList.add('active');
    if (this.pullTab) this.pullTab.classList.add('hidden');
  }

  close() {
    this.isOpen = false;
    if (this.drawer) this.drawer.classList.remove('active');
    if (this.overlay) this.overlay.classList.remove('active');
    if (this.pullTab) this.pullTab.classList.remove('hidden');
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

// Global toggle helper para funcionamento garantido e chamadas inline
window.toggleSideDrawer = function() {
  if (window.sidebarNavInstance) {
    window.sidebarNavInstance.toggle();
  } else {
    const drawer = document.getElementById('sideDrawer');
    const overlay = document.getElementById('sideDrawerOverlay');
    const pullTab = document.getElementById('sideDrawerTab');
    if (drawer) drawer.classList.toggle('active');
    if (overlay) overlay.classList.toggle('active');
    if (pullTab) pullTab.classList.toggle('hidden');
  }
};

window.SidebarNav = SidebarNav;

function initSidebarNavInstance() {
  if (!window.sidebarNavInstance) {
    window.sidebarNavInstance = new SidebarNav();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSidebarNavInstance);
} else {
  initSidebarNavInstance();
}
