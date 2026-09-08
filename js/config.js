/**
 * Configuração Geral - Pousada Vila Matury
 * Praia da Redonda, Icapuí - CE
 * 
 * Permite ao proprietário alterar dados de contato, redes e valores de forma centralizada.
 */
const VILA_CONFIG = {
  name: "Pousada Vila Matury",
  tagline: "Paz, tranquilidade e aconchego entre o mar e as falésias",
  address: "Rua Serra de Redonda, 1316 - Praia de Redonda, Icapuí - CE, 62810-000",
  whatsappNumber: "5588981914175", // Número oficial da Pousada Vila Matury
  whatsappFormatted: "(88) 98191-4175",
  instagramUrl: "https://www.instagram.com/vilamatury/",
  instagramHandle: "@vilamatury",
  googleRating: 4.8,
  totalReviews: 128,
  coordinates: {
    lat: -4.6784,
    lng: -37.2891
  },
  amenitiesHighlights: [
    "Pé na areia na Praia da Redonda",
    "Café da manhã regional artesanal incluso",
    "Varandas privativas com redes",
    "Wi-Fi de alta velocidade em toda a pousada",
    "Estacionamento privativo gratuito",
    "Bar & Petiscaria à beira-mar"
  ],
  policies: {
    checkInTime: "14:00",
    checkOutTime: "12:00",
    cancellation: "Cancelamento gratuito até 7 dias antes do check-in."
  }
};

window.VILA_CONFIG = VILA_CONFIG;
