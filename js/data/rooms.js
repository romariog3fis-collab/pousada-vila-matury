/**
 * Dados das Acomodações - Pousada Vila Matury
 * Praia da Redonda, Icapuí - CE
 * Fotos e Vídeos 100% REAIS da Pousada Vila Matury
 */
const VILA_ROOMS = [
  {
    id: "suite-mandacaru",
    name: "Suíte Mandacaru",
    category: "Casal / Queridinha da Vila",
    price: 460,
    capacity: "Até 2 adultos + 1 criança",
    maxGuests: 3,
    shortDescription: "A queridinha da Vila e filha pródiga. Acomodação charmosa e acolhedora com arquitetura rústico-chique e atmosfera única.",
    fullDescription: "A Suíte Mandacaru é a queridinha da Pousada Vila Matury e nossa verdadeira filha pródiga! Pensada nos mínimos detalhes para acolher casais em busca de paz, ar puro e romantismo na Praia da Redonda. Conta com cama acolhedora, varanda ventilada com rede, ducha relaxante, frigobar e todo o charme praiano do litoral cearense.",
    videoUrl: "https://www.instagram.com/reel/DaD-mxnJes1/embed",
    instagramUrl: "https://www.instagram.com/reel/DaD-mxnJes1/",
    hasVideo: true,
    videoTitle: "Tour Suíte Mandacaru - A queridinha da Vila",
    images: [
      "assets/images/vila_matury_1.jpg",
      "assets/images/vila_matury_4.jpg",
      "assets/images/vila_matury_11.jpg"
    ],
    amenities: [
      { name: "Cama Queen Size", icon: "bed" },
      { name: "Varanda com Rede & Vista Serena", icon: "sun" },
      { name: "Ar-Condicionado Split Silencioso", icon: "snowflake" },
      { name: "Frigobar Silencioso", icon: "wine" },
      { name: "Wi-Fi Fibra Óptica", icon: "wifi" },
      { name: "Banheiro Privativo & Ducha Relaxante", icon: "bath" },
      { name: "Café da Manhã Incluso", icon: "coffee" }
    ],
    badge: "Queridinha da Vila 🌵"
  },
  {
    id: "suite-cajueiro",
    name: "Suíte Cajueiro",
    category: "Casal / Vista Mar",
    price: 420,
    capacity: "Até 2 adultos",
    maxGuests: 2,
    shortDescription: "Para casal com vista direta pro mar, varandinha privativa, ducha quente revigorante e ar-condicionado silencioso.",
    fullDescription: "A Suíte Cajueiro da Vila Matury foi feita sob medida para casais. Possui vista direta para o mar da Redonda, varandinha com rede preguiçosa para sentir a brisa fresca, ar-condicionado split silencioso, ducha quente revigorante e decoração acolhedora cercada de coqueirais.",
    videoUrl: "https://www.instagram.com/reel/Dakjuddxy0A/embed",
    instagramUrl: "https://www.instagram.com/reel/Dakjuddxy0A/",
    hasVideo: true,
    videoTitle: "Tour Suíte Cajueiro - Vista direta pro mar",
    images: [
      "assets/images/vila_matury_5.jpg",
      "assets/images/vila_matury_6.jpg",
      "assets/images/vila_matury_13.jpg"
    ],
    amenities: [
      { name: "Cama Casal Confortável", icon: "bed" },
      { name: "Vista Direta pro Mar & Varandinha", icon: "sun" },
      { name: "Ducha Quente", icon: "bath" },
      { name: "Ar-Condicionado Split Silencioso", icon: "snowflake" },
      { name: "Frigobar", icon: "wine" },
      { name: "Wi-Fi Rápido", icon: "wifi" },
      { name: "Café da Manhã Regional", icon: "coffee" }
    ],
    badge: "Vista Mar 💕"
  },
  {
    id: "suite-familia-falesias",
    name: "Suíte Família Falésias",
    category: "Família / Grupo",
    price: 580,
    capacity: "Até 4 adultos ou casal + 2 filhos",
    maxGuests: 4,
    shortDescription: "Espaço generoso com ambientes integrados, varandão arejado e acomodação ideal para quem viaja com quem mais ama.",
    fullDescription: "Pensada para proporcionar momentos inesquecíveis em família na Praia da Redonda. Une amplitude e aconchego com camas confortáveis, mesas de apoio, varandão ventilado e banheiro familiar completo.",
    hasVideo: false,
    images: [
      "assets/images/vila_matury_12.jpg",
      "assets/images/vila_matury_7.jpg",
      "assets/images/vila_matury_14.jpg"
    ],
    amenities: [
      { name: "1 Cama Queen + Camas Solteiro", icon: "bed" },
      { name: "Varandão Familiar com Redes", icon: "sun" },
      { name: "Ar-Condicionado Split", icon: "snowflake" },
      { name: "Frigobar Espaçoso", icon: "wine" },
      { name: "Wi-Fi Fibra Óptica", icon: "wifi" },
      { name: "Banheiro Família Amplo", icon: "bath" },
      { name: "Café da Manhã Incluso", icon: "coffee" }
    ],
    badge: "Espaço Família"
  },
  {
    id: "suite-aconchego-casal",
    name: "Suíte Aconchego Redonda",
    category: "Casal / Econômica Charmosa",
    price: 340,
    capacity: "Até 2 adultos",
    maxGuests: 2,
    shortDescription: "Tudo o que você precisa para uma estada serena: aconchego, ar puro e a proximidade da praia com excelente custo-benefício.",
    fullDescription: "Uma opção charmosa e funcional da Vila Matury para quem quer explorar os encantos da Redonda e de Icapuí durante o dia e descansar com tranquilidade e frescor à noite.",
    hasVideo: false,
    images: [
      "assets/images/vila_matury_2.jpg",
      "assets/images/vila_matury_10.jpg",
      "assets/images/test_ceara.jpg"
    ],
    amenities: [
      { name: "Cama Casal", icon: "bed" },
      { name: "Ar-Condicionado Split", icon: "snowflake" },
      { name: "Frigobar", icon: "wine" },
      { name: "Wi-Fi", icon: "wifi" },
      { name: "Café da Manhã Regional", icon: "coffee" }
    ],
    badge: "Melhor Custo-Benefício"
  }
];

window.VILA_ROOMS = VILA_ROOMS;
