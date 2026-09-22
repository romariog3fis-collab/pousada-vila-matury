# Status do Projeto — Parceria Pousada Vila Matury
**Última Atualização:** 21/09/2026  
**Objetivo:** Parceria estratégica / case de portfólio real de site e boutique digital de alta conversão para a Pousada Vila Matury (Praia da Redonda, Icapuí - CE).

---

## 🌐 1. Links Ativos do Projeto

- **Link Oficial no Netlify (Produção / Demonstração):**  
  👉 [https://pousada-vilamatury.netlify.app](https://pousada-vilamatury.netlify.app)
- **Acesso Direto à Nova Boutique da Vila:**  
  👉 [https://pousada-vilamatury.netlify.app#lojinha](https://pousada-vilamatury.netlify.app#lojinha)
- **Repositório GitHub (Sincronizado):**  
  👉 [https://github.com/romariog3fis-collab/pousada-vila-matury](https://github.com/romariog3fis-collab/pousada-vila-matury)
- **GitHub Pages (Backup/Portfólio):**  
  👉 [https://romariog3fis-collab.github.io/pousada-vila-matury/](https://romariog3fis-collab.github.io/pousada-vila-matury/)

---

## 🎙️ 2. Retorno da Proprietária (Áudio de WhatsApp — 21/09/2026)

A proprietária respondeu calorosamente ao primeiro contato e compartilhou informações estratégicas cruciais:
1. **Status Atual dela:** Já estava tentando desenvolver um site próprio, mas enfrentou dificuldades e atrasos (*"se a gente tivesse se falado antes até ia ver se você me ajudava nisso"*).
2. **Principal Medo:** **Overbooking**. Ela utiliza um **Channel Manager** para centralizar Booking, Decolar e WhatsApp. Ela não quer um motor de reservas isolado que cobre ou feche reservas sem comunicação com a agenda central.
3. **Canal Campeão:** O **WhatsApp** continua sendo o canal onde ela fecha a grande maioria das estadias.
4. **Grande Desejo (Oportunidade):** Foco em **branding/conceito** e em uma **Lojinha Virtual (Boutique da Vila)** para expor e vender camisetas, bonés e artigos que ela produz para a recepção física.
5. **Receptividade:** Ficou muito satisfeita em conhecer o trabalho do Romário e aberta a soluções.

---

## 🛠️ 3. Implementações Realizadas no Projeto

1. **Seção "Lojinha & Boutique da Vila" (#lojinha):**
   - Criada seção com estética praiana de alto padrão alinhada ao design system da pousada.
   - Três produtos autorais em destaque com fotos de alta fidelidade:
     - **Camiseta Vila Matury:** 100% algodão orgânico, tons terracota e minimalismo praiano.
     - **Boné Vila Matury:** Sarja litorânea, bordado artesanal e fecho em metal.
     - **Eco Bag Lona & Couro:** Bolsa ampla para caminhadas na praia e falésias.
   - Botões individuais que abrem o WhatsApp com a mensagem e nome do produto pré-configurados.
   - Banner destacando a lojinha física na recepção da pousada.
   - Menus desktop, gaveta mobile e rodapé atualizados com link direto.

2. **SEO Profissional & Google Search:**
   - **`robots.txt`:** Regras para os rastreadores do Google priorizarem páginas e assets públicos.
   - **`sitemap.xml`:** Inclui metadados de fotos das acomodações, praias de Icapuí e produtos da lojinha para indexação no **Google Imagens**.
   - **Meta Tags:** Adicionadas diretivas `max-image-preview:large` no `<head>` para exibição de cards visuais no Google Mobile e Google Discover.

3. **Segurança HTTP & Performance:**
   - **`_headers` (Netlify):** Proteção contra Clickjacking (`X-Frame-Options: SAMEORIGIN`), MIME Sniffing (`X-Content-Type-Options: nosniff`), XSS e políticas de cache agressivo para Core Web Vitals.

5. **Menu Lateral de Navegação (Sidebar Nav & Botão na Navbar):**
   - **Botão "≡ MENU" na Navbar Superior:** Acesso imediato no topo da página ao lado do botão "Reservar".
   - **Aba Flutuante Terracota com Pulso Suave:** Posicionada na margem direita com gradiente terracota de alto contraste, ícone, texto `MENU` e animação de convite ao clique.
   - **Acesso por Arraste e Proximidade:** Abre ao arrastar o mouse para a esquerda na margem direita da tela (margem ampliada para 42px para contornar a barra de rolagem do Windows), ao passar o mouse ou ao clicar.
   - **Gaveta Lateral Completa:** Navegação rápida numerada (`01` a `08`), atalhos de cotação/reservas, WhatsApp e Loja Nuvemshop.
   - **Atalhos de Teclado:** Tecla `M` abre/fecha e `ESC` fecha.

6. **Vídeo Hero em Looping Infinito sem Barras do YouTube:**
   - **Vídeo de Fundo Cinematográfico:** Reprodução contínua e silenciosa do vídeo oficial da Vila Matury (`3mgxQbcncF4`) no topo (Hero).
   - **Supressão Total da Interface do YouTube:** Aplicada técnica de corte óptico com contêiner `overflow: hidden`, `pointer-events: none` e `transform: scale(1.35)`, empurrando para fora da tela a barra superior (título do vídeo, avatar, botões de compartilhar) e a barra inferior (linha vermelha de progresso, contador `0:21`, botão tela cheia e logo do YouTube).
   - **Loop Contínuo Perpétuo:** Controlador autônomo `hero-video.js` com monitoramento da YouTube IFrame API e `postMessage` que reinicia o vídeo instantaneamente ao atingir o final, evitando qualquer pausa em `0:21`.
   - **Overlay Escuro de Charme:** Gradiente equilibrado para garantir legibilidade impecável dos textos, títulos e motor de reservas sobre o vídeo.

7. **Boutique Oficial "Vila Matury (de usar)":**
   - Substituição dos protótipos conceituais pelos **produtos autorais reais** da loja oficial da pousada:
     - **Camiseta "A Lagosta é Nossa":** Celebrando a história da Guerra da Lagosta de 1963 na Praia da Redonda (R$ 72,00).
     - **Camiseta "Cajucultura":** Com selo de apoio socioambiental ao **Projeto Quem Ama Cuida** em Icapuí (R$ 60,00).
     - **Bolsão Palha de Carnaúba:** Artesanato sustentável cearense feito à mão (R$ 120,00).
   - Botões duplos de conversão: *"Pedir no WhatsApp"* (ideal para hóspedes na pousada) e *"Loja Online ↗"* (para quem quer calcular frete e parcelar na Nuvemshop oficial).

---

## 💡 4. Estratégia Comercial & Integração com Channel Manager

- **Decisão Estratégica do Romário:** Ceder o site em pleno funcionamento para a Pousada Vila Matury **sem custos de desenvolvimento**, utilizando-o como um **case de portfólio real e ativo** para prospectar outras pousadas no Ceará e Nordeste.
- **Viabilidade da Automação com o Channel Manager:**
  - **100% viável e segura.**
  - Pousadas no Brasil usam sistemas como *Hospedin, Cloudbeds, HQbeds ou Omnibees*.
  - Esses sistemas já fornecem um link ou script de motor de reservas oficial.
  - A automação consiste em apontar o botão de simulação diretamente para o motor oficial do Channel Manager dela, sincronizando disponibilidade em tempo real sem qualquer risco de overbooking.

---

## 📲 5. Mensagem Pronta de Resposta para a Proprietária

**Destinatário:** WhatsApp da Vila Matury (`(88) 98191-4175`)

```text
Oi, [Nome dela], que bom te ouvir! Fiquei super feliz com a sua resposta.

Você tocou no ponto mais importante: evitar overbooking e respeitar o seu Channel Manager é prioridade total! Inclusive, sobre a sua dúvida: é 100% possível e super simples integrar o site ao seu Channel Manager! A maioria dos sistemas (seja Hospedin, Cloudbeds, HQbeds, etc.) já fornece um link ou widget de reservas oficial deles. A gente simplesmente conecta esse botão no site e, no segundo em que o hóspede reserva, ele já dá baixa automática na Booking, na Decolar e no seu painel, com risco zero de duplicidade!

E dei uma olhada na loja de vocês (Vila Matury de usar) e achei fantástica a história da camiseta da Lagosta de 1963 e o apoio ao Projeto Quem Ama Cuida na camiseta Cajucultura!

Aproveitei um tempinho hoje e integrei tudo isso no site:
🌿 Coloquei as fotos reais da Camiseta da Lagosta, da Cajucultura e do Bolsão de Carnaúba, com opção do cliente pedir no WhatsApp ou ir direto pra loja online de vocês!
🎬 Adicionei o vídeo oficial da pousada com player de alta resolução.
✨ E criei um menu lateral elegante e rápido que abre ao arrastar o mouse na borda direita.

Dá uma olhada como ficou:
👉 https://pousada-vilamatury.netlify.app#lojinha

E sobre o site: como o projeto já está pronto, lindo e rodando perfeitamente, faço questão de deixar ele no ar funcionando para a Vila Matury sem custo nenhum de desenvolvimento. Para mim é um orgulho enorme ter a pousada de vocês no meu portfólio!

Se você quiser, me fala qual Channel Manager você usa que eu já deixo a automação pronta para vocês, e posso te ajudar a organizar o que faltar pra colocar no ar de forma oficial!
```

---

## 🎯 6. Próximos Passos

1. **Enviar a mensagem de resposta** no WhatsApp da pousada.
2. **Coletar o nome do Channel Manager** dela (Hospedin, Cloudbeds, etc.) para conectar o link/widget oficial de reservas.
3. **Alinhamento de Domínio Próprio:** Quando oficializarem, registrar o domínio oficial (ex: `vilamatury.com.br` no Registro.br) e apontar o DNS no Netlify.
4. **Cadastrar no Google Search Console e Google Meu Negócio** para posicionamento na busca local da Praia da Redonda.
