/**
 * Booking Widget & Engine de Conversão WhatsApp
 * Baseado no padrão 'Frictionless Conversion Flow'
 */
class BookingEngine {
  constructor() {
    this.checkInInput = document.getElementById('bookingCheckIn');
    this.checkOutInput = document.getElementById('bookingCheckOut');
    this.guestsSelect = document.getElementById('bookingGuests');
    this.roomSelect = document.getElementById('bookingRoom');
    this.summaryContainer = document.getElementById('bookingSummary');
    this.submitButton = document.getElementById('bookingSubmitBtn');

    this.init();
  }

  init() {
    if (!this.checkInInput || !this.checkOutInput) return;

    // Preenche opções de quartos
    if (this.roomSelect && window.VILA_ROOMS) {
      this.roomSelect.innerHTML = '<option value="">Qualquer acomodação disponível</option>' +
        window.VILA_ROOMS.map(r => `<option value="${r.id}" data-price="${r.price}">${r.name} (R$ ${r.price}/noite)</option>`).join('');
    }

    // Configura datas mínimas para hoje e amanhã
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const formatDateIso = (d) => d.toISOString().split('T')[0];

    this.checkInInput.min = formatDateIso(today);
    this.checkOutInput.min = formatDateIso(tomorrow);

    // Event listeners
    this.checkInInput.addEventListener('change', () => this.handleCheckInChange());
    this.checkOutInput.addEventListener('change', () => this.updateSummary());
    if (this.guestsSelect) this.guestsSelect.addEventListener('change', () => this.updateSummary());
    if (this.roomSelect) this.roomSelect.addEventListener('change', () => this.updateSummary());
    if (this.submitButton) this.submitButton.addEventListener('click', (e) => this.handleSubmit(e));
  }

  handleCheckInChange() {
    if (!this.checkInInput.value) return;

    const checkInDate = new Date(this.checkInInput.value + 'T00:00:00');
    const minCheckOut = new Date(checkInDate);
    minCheckOut.setDate(minCheckOut.getDate() + 1);

    const minCheckOutStr = minCheckOut.toISOString().split('T')[0];
    this.checkOutInput.min = minCheckOutStr;

    if (this.checkOutInput.value && new Date(this.checkOutInput.value + 'T00:00:00') <= checkInDate) {
      this.checkOutInput.value = minCheckOutStr;
    }

    this.updateSummary();
  }

  calculateNights() {
    if (!this.checkInInput.value || !this.checkOutInput.value) return 0;
    const start = new Date(this.checkInInput.value + 'T00:00:00');
    const end = new Date(this.checkOutInput.value + 'T00:00:00');
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  }

  getSelectedRoom() {
    if (!this.roomSelect || !this.roomSelect.value) return null;
    return window.VILA_ROOMS.find(r => r.id === this.roomSelect.value) || null;
  }

  updateSummary() {
    const nights = this.calculateNights();
    if (!this.summaryContainer) return;

    if (nights <= 0) {
      this.summaryContainer.classList.add('hidden');
      return;
    }

    const room = this.getSelectedRoom();
    let summaryHtml = `
      <div class="booking-summary-pill">
        <span>🌙 <strong>${nights}</strong> ${nights === 1 ? 'diária' : 'diárias'} selecionadas</span>
    `;

    if (room) {
      const estimatedTotal = room.price * nights;
      summaryHtml += `
        <span class="divider">•</span>
        <span>Acomodação: <strong>${room.name}</strong></span>
        <span class="divider">•</span>
        <span class="price-estimate">Total Estimado: <strong>R$ ${estimatedTotal.toLocaleString('pt-BR')}</strong></span>
      `;
    }

    summaryHtml += `</div>`;
    this.summaryContainer.innerHTML = summaryHtml;
    this.summaryContainer.classList.remove('hidden');
  }

  selectRoomAndScroll(roomId) {
    if (this.roomSelect) {
      this.roomSelect.value = roomId;
    }
    const widgetElement = document.getElementById('booking-section') || document.querySelector('.booking-widget-wrapper');
    if (widgetElement) {
      widgetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Destaca temporariamente o widget
      widgetElement.classList.add('highlight-pulse');
      setTimeout(() => widgetElement.classList.remove('highlight-pulse'), 1500);
    }
    this.updateSummary();
  }

  handleSubmit(e) {
    if (e) e.preventDefault();

    const nights = this.calculateNights();
    if (!this.checkInInput.value || !this.checkOutInput.value || nights <= 0) {
      alert("Por favor, selecione as datas de Check-in e Check-out para verificar a disponibilidade.");
      this.checkInInput.focus();
      return;
    }

    const formatDateBr = (isoStr) => {
      const parts = isoStr.split('-');
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    };

    const checkInBr = formatDateBr(this.checkInInput.value);
    const checkOutBr = formatDateBr(this.checkOutInput.value);
    const guests = this.guestsSelect ? this.guestsSelect.value : "2 pessoas";
    const room = this.getSelectedRoom();

    let message = `Olá, Pousada Vila Matury! 🌊✨\n`;
    message += `Gostaria de consultar disponibilidade e reservar minha estadia:\n\n`;
    message += `📅 Check-in: ${checkInBr}\n`;
    message += `📅 Check-out: ${checkOutBr} (${nights} ${nights === 1 ? 'diária' : 'diárias'})\n`;
    message += `👥 Hóspedes: ${guests}\n`;

    if (room) {
      const total = room.price * nights;
      message += `🏡 Acomodação de preferência: ${room.name}\n`;
      message += `💰 Estimativa: R$ ${total.toLocaleString('pt-BR')} (R$ ${room.price}/noite)\n`;
    } else {
      message += `🏡 Acomodação: Gostaria de ver as opções disponíveis\n`;
    }

    message += `\nVi o site de vocês e adorei o clima de paz e aconchego. Poderiam me confirmar a disponibilidade?`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNum = (window.VILA_CONFIG && window.VILA_CONFIG.whatsappNumber) || "5588981914175";
    const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  }
}

window.BookingEngine = BookingEngine;
