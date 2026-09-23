/**
 * Ambient Audio Feature - Pousada Vila Matury
 * Fundo sonoro suave e relaxante das ondas do mar da Praia da Redonda (Icapuí - CE)
 * Desenhado para performance máxima: 0ms no carregamento inicial (preload="none"),
 * fade-in / fade-out orgânico, sincronização entre botão flutuante e menu lateral.
 */

class AmbientAudio {
  constructor() {
    this.audio = document.getElementById('oceanAudio');
    this.widget = document.getElementById('oceanSoundWidget');
    this.btn = document.getElementById('oceanSoundBtn');
    this.label = document.getElementById('oceanSoundLabel');
    this.tooltip = document.getElementById('oceanTooltip');
    this.drawerToggle = document.getElementById('drawerSoundToggle');
    this.drawerLabel = document.getElementById('drawerSoundStatus');

    this.isPlaying = false;
    this.targetVolume = 0.35; // Nível ideal para som ambiente sem cansar ou incomodar
    this.fadeInterval = null;
    this.hasUserInteracted = false;

    if (!this.audio) return;

    this.init();
  }

  init() {
    // Configurações iniciais do elemento de áudio
    this.audio.volume = 0;
    this.audio.loop = true;

    // Vincula cliques aos botões
    if (this.btn) {
      this.btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggle();
      });
    }

    if (this.drawerToggle) {
      this.drawerToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggle();
      });
    }

    // Fechar tooltip ao clicar no botão 'x' ou interagir
    if (this.tooltip) {
      const closeBtn = this.tooltip.querySelector('.ocean-tooltip-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.dismissTooltip();
        });
      }

      // Desaparece automaticamente o tooltip após 9 segundos
      setTimeout(() => {
        this.dismissTooltip();
      }, 9000);
    }

    // Verifica preferência anterior salva pelo visitante
    const savedState = localStorage.getItem('vila_ocean_sound');
    if (savedState === 'active') {
      // Navegadores bloqueiam autoplay sem interação: ativa no primeiro clique do usuário na página
      const enableOnFirstGesture = () => {
        if (!this.isPlaying && localStorage.getItem('vila_ocean_sound') === 'active') {
          this.fadePlay();
        }
        window.removeEventListener('click', enableOnFirstGesture);
        window.removeEventListener('touchstart', enableOnFirstGesture);
      };
      window.addEventListener('click', enableOnFirstGesture, { once: true, passive: true });
      window.addEventListener('touchstart', enableOnFirstGesture, { once: true, passive: true });
    }

    // Eventos do próprio elemento de áudio caso termine ou pause externamente
    this.audio.addEventListener('pause', () => {
      if (!this.isFading) {
        this.isPlaying = false;
        this.updateUI(false);
      }
    });

    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      this.updateUI(true);
    });
  }

  toggle() {
    this.dismissTooltip();
    if (this.isPlaying) {
      this.fadePause();
    } else {
      this.fadePlay();
    }
  }

  fadePlay() {
    clearInterval(this.fadeInterval);
    this.isFading = true;

    // Se estiver em pausa, inicia reprodução a volume 0
    this.audio.volume = 0;
    const playPromise = this.audio.play();

    if (playPromise !== undefined) {
      playPromise.then(() => {
        this.isPlaying = true;
        this.updateUI(true);
        localStorage.setItem('vila_ocean_sound', 'active');

        // Fade-in gradual até o volume alvo em 1.6 segundos
        const step = this.targetVolume / 32;
        this.fadeInterval = setInterval(() => {
          if (this.audio.volume + step < this.targetVolume) {
            this.audio.volume += step;
          } else {
            this.audio.volume = this.targetVolume;
            this.isFading = false;
            clearInterval(this.fadeInterval);
          }
        }, 50);
      }).catch(err => {
        console.warn('Vila Matury Audio: Autoplay restrito pelo navegador até interação.', err);
        this.isFading = false;
        this.isPlaying = false;
        this.updateUI(false);
      });
    }
  }

  fadePause() {
    clearInterval(this.fadeInterval);
    this.isFading = true;
    localStorage.setItem('vila_ocean_sound', 'paused');

    // Fade-out gradual de volume em 800ms antes de pausar
    const step = this.audio.volume / 16;
    this.fadeInterval = setInterval(() => {
      if (this.audio.volume - step > 0.02) {
        this.audio.volume -= step;
      } else {
        this.audio.volume = 0;
        this.audio.pause();
        this.isPlaying = false;
        this.isFading = false;
        clearInterval(this.fadeInterval);
        this.updateUI(false);
      }
    }, 50);
  }

  updateUI(playing) {
    if (this.btn) {
      this.btn.classList.toggle('playing', playing);
      this.btn.setAttribute('aria-pressed', playing ? 'true' : 'false');
      this.btn.setAttribute('title', playing ? 'Pausar música ambiente' : 'Tocar música ambiente');
    }

    if (this.widget) {
      this.widget.classList.toggle('playing', playing);
    }

    if (this.label) {
      this.label.textContent = playing ? 'Ouvindo Música' : 'Música Ambiente';
    }

    // Toggle no Menu Lateral (Side Drawer)
    if (this.drawerToggle) {
      this.drawerToggle.classList.toggle('active', playing);
      this.drawerToggle.setAttribute('aria-checked', playing ? 'true' : 'false');
    }

    if (this.drawerLabel) {
      this.drawerLabel.textContent = playing ? 'Tocando suavemente' : 'Toque para ativar';
    }
  }

  dismissTooltip() {
    if (this.tooltip) {
      this.tooltip.classList.add('dismissed');
      setTimeout(() => {
        if (this.tooltip && this.tooltip.parentNode) {
          this.tooltip.style.display = 'none';
        }
      }, 400);
    }
  }
}

// Expõe globalmente para inicialização no app.js
window.AmbientAudio = AmbientAudio;
