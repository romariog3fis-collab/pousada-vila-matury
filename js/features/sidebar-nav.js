/**
 * Sidebar Navigation (Menu Lateral Escondido)
 * Pousada Vila Matury
 * Permite navegação ultrarrápida abrindo ao passar o mouse, arrastar ou clicar na aba lateral.
 */
class SidebarNav {
  constructor() {
    this.drawer = document.getElementById('sideDrawer');
    this.pullTab = document.getElementById('sideDrawerTab');
    this.overlay = document.getElementById('sideDrawerOverlay');
    this.closeBtn = document.getElementById('sideDrawerClose');
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
    // 1. Abrir ao clicar na aba
    if (this.pullTab) {
      this.pullTab.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggle();
      });

      // Hover sobre a aba abre suavemente
      this.pullTab.addEventListener('mouseenter', () => {
        this.open();
      });
    }

    // 2. Fechar com o botão X ou Overlay
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    if (this.overlay) {
      this.overlay.addEventListener('click', () => this.close());
    }

    // 3. Mouse Leave com tolerância para evitar fechamentos acidentais
    this.drawer.addEventListener('mouseleave', () => {
      this.leaveTimeout = setTimeout(() => {
        if (!this.isDragging) {
          this.close();
        }
      }, 450);
    });

    this.drawer.addEventListener('mouseenter', () => {
      if (this.leaveTimeout) {
        clearTimeout(this.leaveTimeout);
        this.leaveTimeout = null;
      }
    });

    // 4. Detecção de proximidade da borda direita da tela (arrastar / hover na margem)
    window.addEventListener('mousemove', (e) => {
      const screenWidth = window.innerWidth;
      // Se o cursor estiver nos últimos 18px da borda direita e o drawer estiver fechado
      if (screenWidth - e.clientX <= 18 && !this.isOpen) {
        this.open();
      }
    });

    // 5. Gesto de Arraste com o Mouse (Drag to Open / Close)
    window.addEventListener('mousedown', (e) => {
      const screenWidth = window.innerWidth;
      // Inicia arraste se clicar na aba ou nos últimos 40px da direita
      if (e.target.closest('#sideDrawerTab') || (screenWidth - e.clientX <= 40 && !this.isOpen)) {
        this.isDragging = true;
        this.startX = e.clientX;
      }
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      this.currentX = e.clientX;
      const deltaX = this.startX - this.currentX;

      // Se arrastou mais de 35px para a esquerda, abre
      if (deltaX > 35 && !this.isOpen) {
        this.open();
        this.isDragging = false;
      }
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    // 6. Suporte a Gestos Touch (Mobile / Tablets)
    let touchStartX = 0;
    window.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const screenWidth = window.innerWidth;
      const deltaX = touchStartX - touchEndX;

      // Deslize da borda direita para esquerda abre
      if (screenWidth - touchStartX < 50 && deltaX > 45 && !this.isOpen) {
        this.open();
      }
      // Deslize da esquerda para a direita fecha quando aberto
      if (this.isOpen && deltaX < -50) {
        this.close();
      }
    }, { passive: true });

    // 7. Fechar ao clicar em qualquer link interno
    this.links.forEach((link) => {
      link.addEventListener('click', () => {
        setTimeout(() => this.close(), 180);
      });
    });

    // 8. Tecla ESC fecha
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
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
    this.drawer.classList.add('active');
    if (this.overlay) this.overlay.classList.add('active');
    if (this.pullTab) this.pullTab.classList.add('hidden');
  }

  close() {
    this.isOpen = false;
    this.drawer.classList.remove('active');
    if (this.overlay) this.overlay.classList.remove('active');
    if (this.pullTab) this.pullTab.classList.remove('hidden');
  }

  initScrollSpy() {
    const sections = document.querySelectorAll('section[id], header[id]');
    if (!sections.length) return;

    window.addEventListener('scroll', () => {
      let currentSectionId = '';
      const scrollPos = window.scrollY + 200;

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

document.addEventListener('DOMContentLoaded', () => {
  window.sidebarNavInstance = new SidebarNav();
});
