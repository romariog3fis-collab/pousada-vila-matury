const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const outputDir = path.join(__dirname, '..', 'assets', 'images');

const foodPhotos = [
  {
    filename: 'gastronomia_deck_refeicoes.jpg',
    url: 'https://pousada-vila-manzua.ceara-hotels.com/data/Images/OriginalPhoto/16423/1642398/1642398252/image-icapui-pousada-vila-matury-6.JPEG',
    title: 'Deck com mesas e vista mar da Vila Matury'
  },
  {
    filename: 'gastronomia_lounge_jantar.jpg',
    url: 'https://pousada-vila-manzua.ceara-hotels.com/data/Images/OriginalPhoto/16423/1642398/1642398254/image-icapui-pousada-vila-matury-8.JPEG',
    title: 'Lounge noturno e área de refeições ao ar livre'
  },
  {
    filename: 'gastronomia_cozinha_cafe.jpg',
    url: 'https://pousada-vila-manzua.ceara-hotels.com/data/Images/OriginalPhoto/16423/1642398/1642398256/image-icapui-pousada-vila-matury-10.JPEG',
    title: 'Balcão e cozinha de café da manhã da Vila Matury'
  },
  {
    filename: 'gastronomia_lagosta_icapui.jpg',
    url: 'https://www.icapui.ce.gov.br/fotos/1247/G1.jpg',
    title: 'Lagosta Grelhada tradicional de Icapuí'
  },
  {
    filename: 'gastronomia_frutos_do_mar.jpg',
    url: 'https://www.icapui.ce.gov.br/fotos/1090/G1.jpg',
    title: 'Culinária de frutos do mar da Praia da Redonda'
  }
];

function download(item) {
  return new Promise((resolve) => {
    const dest = path.join(outputDir, item.filename);
    const file = fs.createWriteStream(dest);
    const client = item.url.startsWith('https') ? https : http;

    client.get(item.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    }, (res) => {
      if (res.statusCode !== 200) {
        console.error(`Status ${res.statusCode} para ${item.filename}`);
        file.close();
        fs.unlink(dest, () => {});
        return resolve(false);
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          const stat = fs.statSync(dest);
          console.log(`✓ Baixado ${item.filename} (${(stat.size / 1024).toFixed(1)} KB) - ${item.title}`);
          resolve(true);
        });
      });
    }).on('error', (err) => {
      console.error(`Erro em ${item.filename}:`, err.message);
      file.close();
      fs.unlink(dest, () => {});
      resolve(false);
    });
  });
}

async function run() {
  console.log('Baixando fotos reais de café da manhã e gastronomia...');
  for (const item of foodPhotos) {
    await download(item);
  }
  console.log('Download concluído!');
}

run();
