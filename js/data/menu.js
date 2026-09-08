/**
 * Cardápio Digital - Restaurante & Bar da Praia Vila Matury
 * Sabores do litoral cearense, frescor e aconchego à beira-mar
 */
const VILA_MENU = [
  {
    category: "lagosta-mar",
    categoryName: "🦞 Frutos do Mar & Lagosta",
    items: [
      {
        name: "Lagosta Grelhada Vila Matury",
        price: 145,
        description: "Lagosta fresca da Praia da Redonda aberta ao meio, grelhada na manteiga de garrafa e ervas finas. Acompanha arroz de castanha e pirão aromático.",
        tag: "Prato Estrela",
        serves: "Serve 2 pessoas"
      },
      {
        name: "Moqueca Cearense de Robalo com Camarão",
        price: 130,
        description: "Postas tenras de peixe robalo e camarões selecionados, cozidos suavemente em leite de coco fresco, azeite de dendê leve, pimentões e coentro.",
        tag: "Clássico Litorâneo",
        serves: "Serve 2 a 3 pessoas"
      },
      {
        name: "Camarão no Coco Verde",
        price: 115,
        description: "Camarões salteados ao creme suave de requeijão com lascas de coco verde, servidos na própria quenga do coco.",
        tag: "Especial da Casa",
        serves: "Serve 2 pessoas"
      },
      {
        name: "Peixe Inteiro Frito da Maré",
        price: 98,
        description: "Peixe fresco do dia (Tilápia do mar ou Pargo) frito crocante, com rodelas de limão siciliano, macaxeira frita e farofa crocante de cebola roxa.",
        tag: "Tradição de Pescador",
        serves: "Serve 2 pessoas"
      }
    ]
  },
  {
    category: "petiscos-praia",
    categoryName: "🍤 Petiscos & Praia",
    items: [
      {
        name: "Camarão Crocante ao Alho & Óleo",
        price: 68,
        description: "Camarões médios com casca, dourados em azeite extravirgem, lascas fartas de alho tostado e salsinha fresca.",
        tag: "Mais Pedido",
        serves: "Porção generosa"
      },
      {
        name: "Dadinhos de Tapioca com Queijo Coalho",
        price: 38,
        description: "Crocantes por fora e macios por dentro, servidos com melaço de cana de rapadura artesanal e leve toque de pimenta biquinho.",
        tag: "Favorito",
        serves: "12 unidades"
      },
      {
        name: "Iscas de Peixe Crocante com Molho Tártaro",
        price: 54,
        description: "Filés de peixe branco empanados em farinha panko artesanal, super crocantes e leves.",
        tag: "Crocante",
        serves: "Porção"
      },
      {
        name: "Pastéis Artesanais de Lagosta e Camarão",
        price: 44,
        description: "Massa fininha e sequinha com recheio cremoso farto de lagosta e camarão puxados na manteiga.",
        tag: "Artesanal",
        serves: "6 unidades"
      }
    ]
  },
  {
    category: "drinks-sucos",
    categoryName: "🍹 Drinks Tropicais & Bebidas",
    items: [
      {
        name: "Caipirinha Matury de Caju & Limão",
        price: 24,
        description: "Cachaça artesanal envelhecida, caju fresco macerado com limão taiti, açúcar demerara e gelo cristal.",
        tag: "Assinatura",
        serves: "Copo 350ml"
      },
      {
        name: "Caipirosca de Frutas Vermelhas & Siriguela",
        price: 28,
        description: "Vodka premium, polpa de siriguela da época e frutas vermelhas frescas. Doçura e acidez no ponto exato.",
        tag: "Refrescante",
        serves: "Taça 400ml"
      },
      {
        name: "Água de Coco Natural Geladinha",
        price: 8,
        description: "Colhida diretamente dos coqueirais da nossa praia, servida no próprio coco bem gelada.",
        tag: "100% Natural",
        serves: "Coco inteiro"
      },
      {
        name: "Sucos Naturais da Estação",
        price: 12,
        description: "Opções: Caju, Maracujá, Abacaxi com Hortelã, Graviola ou Acerola.",
        tag: "Fruta Pura",
        serves: "Jarra 400ml"
      }
    ]
  },
  {
    category: "cafe-manha",
    categoryName: "☕ Café da Manhã Regional",
    items: [
      {
        name: "Buffet da Manhã Matury (Incluso nas Diárias)",
        price: 0,
        description: "Incluso para todos os hóspedes: Tapiocas preparadas na hora na chapa, cuscuz fofinho com manteiga da terra, ovos caipiras mexidos, bolos caseiros (milho, macaxeira e cenoura), frutas frescas da região, queijo coalho tostado, sucos e café coado quentinho.",
        tag: "Incluso para Hóspedes",
        serves: "Das 7h30 às 10h00"
      }
    ]
  }
];

window.VILA_MENU = VILA_MENU;
