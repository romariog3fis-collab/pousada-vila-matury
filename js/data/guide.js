/**
 * Guia Turístico Hiperlocal de Icapuí - CE
 * Curadoria da Pousada Vila Matury para os hóspedes
 * Imagens 100% REAIS de Icapuí e Praia da Redonda
 */
const VILA_GUIDE = [
  {
    id: "praia-da-redonda",
    category: "praias",
    categoryLabel: "Praias Paradisíacas",
    title: "Praia da Redonda",
    distance: "A 2 minutos a pé (Pé na Areia)",
    tag: "A nossa praia",
    description: "Uma vila de pescadores autêntica e serena, emoldurada por falésias avermelhadas e águas mornas e mansas. De manhãzinha, veja as jangadas partindo para a pesca; à tarde, caminhe pela orla deserta sentindo a brisa suave.",
    tips: "Visite a enseada de maré mansa e suba as falésias para um pôr do sol inesquecível.",
    image: "assets/images/icapui_redonda_praia.jpg"
  },
  {
    id: "mirante-serra-redonda",
    category: "mirantes",
    categoryLabel: "Mirantes & Falésias",
    title: "Mirante da Serra de Redonda",
    distance: "5 minutos de carro / 15 min de caminhada",
    tag: "Vista 360° Imperdível",
    description: "O ponto mais alto de Icapuí, proporcionando uma visão panorâmica espetacular de toda a enseada da Redonda, do mar verde-esmeralda e das falésias coloridas que se estendem até o horizonte.",
    tips: "Suba no final da tarde para contemplar as cores douradas do céu refletindo nas jangadas no mar.",
    image: "assets/images/icapui_mirante_serra.jpg"
  },
  {
    id: "praia-ponta-grossa",
    category: "praias",
    categoryLabel: "Praias Paradisíacas",
    title: "Praia de Ponta Grossa",
    distance: "12 minutos de carro ou buggy",
    tag: "Cenário de Novela",
    description: "Conhecida por sua grandiosa duna fóssil avermelhada e pelas esculturas naturais esculpidas pelo vento e pelo mar de Icapuí. Ponto de encontro de turistas que buscam ecoturismo e fotos inesquecíveis.",
    tips: "Aproveite a maré baixa para caminhar ao redor da ponta de pedra e tirar fotos incríveis.",
    image: "assets/images/icapui_ponta_grossa_duna.jpg"
  },
  {
    id: "rota-da-lagosta",
    category: "gastronomia",
    categoryLabel: "Rota Gastronômica",
    title: "Icapuí: Capital Cearense da Lagosta",
    distance: "Restaurantes locais na vila",
    tag: "Gastronomia Afetiva",
    description: "Icapuí é reconhecida nacionalmente pela pesca artesanal da lagosta. Na Praia da Redonda, o crustáceo é servido fresquíssimo — grelhado na manteiga da terra, na brasa ou em moquecas aromáticas com leite de coco natural.",
    tips: "Peça lagosta fresca servida nas barracas pé na areia da Redonda com vista para as jangadas.",
    image: "assets/images/icapui_costa_falesias.jpg"
  },
  {
    id: "passeio-jangada-tradicional",
    category: "aventuras",
    categoryLabel: "Aventuras & Passeios",
    title: "Passeio de Jangada com Pescadores",
    distance: "Saída direta da Praia da Redonda",
    tag: "Tradição Cearense",
    description: "Viva a sensação de velejar numa jangada de pano tradicional em mar calmo, guiado por pescadores nativos da Praia da Redonda. Parada para banho refrescante em piscinas naturais de maré baixa.",
    tips: "Consulte a recepção da Vila Matury para agendar o passeio com maré favorável.",
    image: "assets/images/icapui_redonda_jangadas.jpg"
  },
  {
    id: "falesias-costa-icapui",
    category: "mirantes",
    categoryLabel: "Mirantes & Falésias",
    title: "Falésias Vivas e Orla Costeira",
    distance: "A poucos passos da pousada",
    tag: "Natureza Preservada",
    description: "A costa leste de Icapuí é famosa por suas formações geológicas singulares, onde as falésias avermelhadas e ocres tocam diretamente a areia da praia, criando labirintos naturais exuberantes.",
    tips: "Excelente para caminhadas matinais revigorantes com a maré seca.",
    image: "assets/images/icapui_falesias_mar.jpg"
  }
];

window.VILA_GUIDE = VILA_GUIDE;
