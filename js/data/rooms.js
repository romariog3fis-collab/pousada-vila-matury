/**
 * Dados das Acomodações - Pousada Vila Matury
 * Praia da Redonda, Icapuí - CE
 * Fotos 100% REAIS da Pousada Vila Matury
 */
const VILA_ROOMS = [
  {
    id: "suite-master-vista-mar",
    name: "Suíte Master Vista Mar",
    category: "Casal / Premium",
    price: 460,
    capacity: "Até 2 adultos + 1 criança",
    maxGuests: 3,
    shortDescription: "Acorde com a brisa do oceano e o canto dos pássaros. Varanda ampla com rede artesanal e vista panorâmica para a Praia da Redonda.",
    fullDescription: "A Suíte Master é o refúgio perfeito para quem busca desconectar da rotina e viver momentos de puro aconchego na Vila Matury. Com arquitetura acolhedora, paredes charmosas e vista privilegiada para o mar da Redonda, dispõe de cama Queen, varanda ventilada com rede e banheiro espaçoso.",
    images: [
      "assets/images/vila_matury_1.jpg",
      "assets/images/vila_matury_4.jpg",
      "assets/images/vila_matury_11.jpg"
    ],
    amenities: [
      { name: "Cama Queen Size", icon: "bed" },
      { name: "Varanda com Rede & Vista Mar", icon: "sun" },
      { name: "Ar-Condicionado Split Silencioso", icon: "snowflake" },
      { name: "Frigobar Silencioso", icon: "wine" },
      { name: "Wi-Fi Fibra Óptica", icon: "wifi" },
      { name: "Banheiro Privativo & Ducha Relaxante", icon: "bath" },
      { name: "Café da Manhã Incluso", icon: "coffee" }
    ],
    badge: "Mais Procurada"
  },
  {
    id: "chale-jardim-tropical",
    name: "Chalé Jardim Tropical",
    category: "Casal / Tranquilidade",
    price: 390,
    capacity: "Até 2 adultos",
    maxGuests: 2,
    shortDescription: "Imerso na vegetação nativa e coqueirais da pousada. Silêncio absoluto, conforto térmico natural e muita privacidade.",
    fullDescription: "Construído em harmonia com a natureza da Vila Matury, o Chalé Jardim Tropical oferece uma experiência intimista cercada de coqueiros e brisa do litoral. Conta com acabamento em madeira, rede preguiçosa e luz suave que convida ao descanso após um dia nas praias de Icapuí.",
    images: [
      "assets/images/vila_matury_5.jpg",
      "assets/images/vila_matury_6.jpg",
      "assets/images/vila_matury_13.jpg"
    ],
    amenities: [
      { name: "Cama Casal Confortável", icon: "bed" },
      { name: "Deck Privativo no Jardim", icon: "leaf" },
      { name: "Ar-Condicionado Split", icon: "snowflake" },
      { name: "Frigobar", icon: "wine" },
      { name: "Wi-Fi Rápido", icon: "wifi" },
      { name: "Café Regional na Pousada", icon: "coffee" }
    ],
    badge: "Paz & Natureza"
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
