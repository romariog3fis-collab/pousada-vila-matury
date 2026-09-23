/**
 * Room Showcase & Modal de Detalhes
 * Apresentação modular de suítes e chalés da Pousada Vila Matury
 * Suporte a Fotos em Alta Definição e Vídeos/Reels dos Chalés
 */
class RoomShowcase {
  constructor(containerId = 'roomsGrid') {
    this.container = document.getElementById(containerId);
    this.modal = document.getElementById('roomModal');
    this.modalBody = document.getElementById('roomModalBody');
    this.init();
  }

  init() {
    if (!this.container || !window.VILA_ROOMS) return;
    this.renderCards();
    this.setupModalListeners();
  }

  getIconSvg(iconName) {
    const icons = {
      bed: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4v16"/><path d="M2 10h20"/><path d="M2 17h20"/><path d="M22 17v3"/><path d="M2 17v3"/><path d="M6 10V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3"/></svg>`,
      sun: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
      snowflake: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>`,
      wine: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="20" x="5" y="2" rx="2"/><line x1="5" x2="19" y1="9" y2="9"/><line x1="8" x2="8" y1="5" y2="7"/><line x1="8" x2="8" y1="12" y2="15"/></svg>`,
      wifi: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/></svg>`,
      bath: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h20"/><path d="M7 12v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/><path d="M4 12v5a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-5"/><path d="M6 20v2"/><path d="M18 20v2"/></svg>`,
      coffee: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" x2="6" y1="2" y2="4"/><line x1="10" x2="10" y1="2" y2="4"/><line x1="14" x2="14" y1="2" y2="4"/></svg>`,
      leaf: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`
    };
    return icons[iconName] || icons.bed;
  }

  renderCards() {
    this.container.innerHTML = window.VILA_ROOMS.map(room => `
      <article class="room-card" data-room-id="${room.id}">
        <div class="room-image-wrapper">
          <img 
            src="${room.images[0]}" 
            alt="${room.name} - Pousada Vila Matury Icapuí" 
            loading="lazy" 
            class="room-main-image"
          />
          <div class="room-badges-stack">
            ${room.badge ? `<span class="room-badge">${room.badge}</span>` : ''}
            ${room.hasVideo ? `
              <button class="room-video-pill" onclick="window.roomShowcase.openModal('${room.id}', 'video')" title="Ver Tour em Vídeo">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                <span>Vídeo</span>
              </button>
            ` : ''}
          </div>
          <span class="room-capacity-tag">${room.capacity}</span>
        </div>

        <div class="room-content">
          <div class="room-header">
            <span class="room-category">${room.category}</span>
            <h3 class="room-title">${room.name}</h3>
            <p class="room-desc">${room.shortDescription}</p>
          </div>

          <div class="room-amenities-pills">
            ${room.amenities.slice(0, 4).map(a => `
              <div class="amenity-item" title="${a.name}">
                ${this.getIconSvg(a.icon)}
                <span>${a.name}</span>
              </div>
            `).join('')}
            ${room.amenities.length > 4 ? `
              <div class="amenity-item more">
                <span>+${room.amenities.length - 4} comodidades</span>
              </div>
            ` : ''}
          </div>

          <div class="room-footer">
            <div class="room-pricing">
              <span class="price-prefix">A partir de</span>
              <div class="price-value-box">
                <span class="currency">R$</span>
                <span class="amount">${room.price}</span>
                <span class="period">/diária</span>
              </div>
            </div>

            <div class="room-action-buttons">
              <button class="btn-room-details" onclick="window.roomShowcase.openModal('${room.id}', 'photos')">
                ${room.hasVideo ? 'Fotos & Vídeo' : 'Ver Fotos'}
              </button>
              <button class="btn-room-select" onclick="window.bookingEngine.selectRoomAndScroll('${room.id}')">
                Reservar
              </button>
            </div>
          </div>
        </div>
      </article>
    `).join('');
  }

  setupModalListeners() {
    if (!this.modal) return;
    const closeBtn = document.getElementById('closeRoomModalBtn');
    if (closeBtn) closeBtn.addEventListener('click', () => this.closeModal());
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeModal();
    });
  }

  switchMediaTab(roomId, tabName) {
    const photosView = document.getElementById('modalPhotosView');
    const videoView = document.getElementById('modalVideoView');
    const btnPhotos = document.getElementById('tabBtnPhotos');
    const btnVideo = document.getElementById('tabBtnVideo');

    if (!photosView || !videoView) return;

    if (tabName === 'video') {
      photosView.style.display = 'none';
      videoView.style.display = 'block';
      if (btnPhotos) btnPhotos.classList.remove('active');
      if (btnVideo) btnVideo.classList.add('active');
    } else {
      photosView.style.display = 'block';
      videoView.style.display = 'none';
      if (btnPhotos) btnPhotos.classList.add('active');
      if (btnVideo) btnVideo.classList.remove('active');
    }
  }

  openModal(roomId, initialTab = 'photos') {
    const room = window.VILA_ROOMS.find(r => r.id === roomId);
    if (!room || !this.modalBody) return;

    const hasVideo = !!room.hasVideo && !!room.videoUrl;

    this.modalBody.innerHTML = `
      <div class="modal-room-content">
        <div class="modal-gallery">
          ${hasVideo ? `
            <div class="modal-media-tabs">
              <button class="modal-tab-btn ${initialTab === 'photos' ? 'active' : ''}" id="tabBtnPhotos" onclick="window.roomShowcase.switchMediaTab('${room.id}', 'photos')">
                📷 Fotos (${room.images.length})
              </button>
              <button class="modal-tab-btn ${initialTab === 'video' ? 'active' : ''}" id="tabBtnVideo" onclick="window.roomShowcase.switchMediaTab('${room.id}', 'video')">
                🎬 Tour em Vídeo (Reel)
              </button>
            </div>
          ` : ''}

          <!-- Visualização de Fotos -->
          <div id="modalPhotosView" style="display: ${initialTab === 'video' && hasVideo ? 'none' : 'block'};">
            <div class="modal-main-image-container">
              <img id="modalMainImg" src="${room.images[0]}" alt="${room.name}" />
            </div>
            <div class="modal-thumb-row">
              ${room.images.map((img, idx) => `
                <img 
                  src="${img}" 
                  alt="Foto ${idx + 1}" 
                  class="modal-thumb ${idx === 0 ? 'active' : ''}" 
                  onclick="document.getElementById('modalMainImg').src = '${img}'; document.querySelectorAll('.modal-thumb').forEach(el => el.classList.remove('active')); this.classList.add('active');"
                />
              `).join('')}
            </div>
          </div>

          <!-- Visualização do Vídeo (Instagram Reel) -->
          ${hasVideo ? `
            <div id="modalVideoView" class="modal-video-view" style="display: ${initialTab === 'video' ? 'block' : 'none'};">
              <div class="modal-video-card">
                <div class="modal-video-wrapper">
                  <iframe 
                    src="${room.videoUrl}" 
                    title="${room.videoTitle || room.name}" 
                    frameborder="0" 
                    scrolling="no" 
                    allowtransparency="true"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    class="modal-reel-iframe">
                  </iframe>
                </div>
                <div class="modal-video-footer">
                  <a href="${room.instagramUrl}" target="_blank" rel="noopener noreferrer" class="btn-reel-external">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    <span>Assistir no Instagram da Vila</span>
                  </a>
                </div>
              </div>
            </div>
          ` : ''}
        </div>

        <div class="modal-room-info">
          <span class="modal-category">${room.category}</span>
          <h2 class="modal-title">${room.name}</h2>
          <p class="modal-lead">${room.fullDescription}</p>

          <div class="modal-amenities-section">
            <h4 class="section-subheading">Comodidades desta acomodação:</h4>
            <div class="modal-amenities-grid">
              ${room.amenities.map(a => `
                <div class="modal-amenity-item">
                  ${this.getIconSvg(a.icon)}
                  <span>${a.name}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="modal-booking-cta">
            <div class="modal-price">
              <span class="label">Valor por diária:</span>
              <span class="val">R$ ${room.price}</span>
            </div>
            <button class="btn-modal-reserve" onclick="window.roomShowcase.closeModal(); window.bookingEngine.selectRoomAndScroll('${room.id}');">
              Simular Reserva & WhatsApp
            </button>
          </div>
        </div>
      </div>
    `;

    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    if (!this.modal) return;
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

window.RoomShowcase = RoomShowcase;
