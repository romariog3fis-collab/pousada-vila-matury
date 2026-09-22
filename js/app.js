/**
 * Orquestrador Geral da Aplicação - Pousada Vila Matury
 */
document.addEventListener('DOMContentLoaded', () => {
  // Inicialização dos módulos de negócios
  window.bookingEngine = new window.BookingEngine();
  window.roomShowcase = new window.RoomShowcase();
  window.localGuide = new window.LocalGuide();
  window.digitalMenu = new window.DigitalMenu();
  if (window.SidebarNav && !window.sidebarNavInstance) {
    window.sidebarNavInstance = new window.SidebarNav();
  }
  if (window.AmbientAudio) {
    window.ambientAudio = new window.AmbientAudio();
  }

  // Configuração de dados dinâmicos do VILA_CONFIG
  setupDynamicConfig();

  // Interatividade de navegação e Navbar
  setupNavigation();

  // Accordion de FAQ
  setupFaqAccordion();

  // Configuração do ano no footer
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

function setupDynamicConfig() {
  if (!window.VILA_CONFIG) return;
  const cfg = window.VILA_CONFIG;

  // Atualiza links com WhatsApp
  document.querySelectorAll('.js-whatsapp-link').forEach(link => {
    const defaultMsg = "Olá! Vim pelo site da Pousada Vila Matury e gostaria de mais informações.";
    link.href = `https://wa.me/${cfg.whatsappNumber}?text=${encodeURIComponent(defaultMsg)}`;
    link.target = "_blank";
  });

  // Atualiza links com Instagram
  document.querySelectorAll('.js-instagram-link').forEach(link => {
    link.href = cfg.instagramUrl;
    link.target = "_blank";
  });
}

function setupNavigation() {
  const navbar = document.getElementById('mainNavbar');

  // Efeito blur e sombra no Navbar ao rolar a página
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // Ancoragem suave
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navOffset = navbar ? navbar.offsetHeight : 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navOffset - 16;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

function setupFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        // Fecha outros
        faqItems.forEach(other => other.classList.remove('active'));
        if (!isOpen) {
          item.classList.add('active');
        }
      });
    }
  });
}
