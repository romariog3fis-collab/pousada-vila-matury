const fs = require('fs');
const path = require('path');
const https = require('https');

const contentPath = 'C:\\Users\\romar\\.gemini\\antigravity-ide\\brain\\1be66487-e628-4c2a-8d8c-a9d06ac5f3d0\\.system_generated\\steps\\70\\content.md';
const outputDir = path.join(__dirname, '..', 'assets', 'images');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const content = fs.readFileSync(contentPath, 'utf8');

// Extrai todas as URLs de fotos originais
const regex = /contentUrl":\s*"([^"]+)"/g;
let match;
const urls = new Set();

while ((match = regex.exec(content)) !== null) {
  urls.add(match[1]);
}

console.log(`Encontradas ${urls.size} fotos reais da Pousada Vila Matury!`);

function downloadImage(relUrl, index) {
  return new Promise((resolve) => {
    const fullUrl = `https://pousada-vila-manzua.ceara-hotels.com${relUrl}`;
    const filename = `vila_matury_${index + 1}.jpg`;
    const dest = path.join(outputDir, filename);

    const file = fs.createWriteStream(dest);
    https.get(fullUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode !== 200) {
        console.error(`Erro ${res.statusCode} ao baixar ${filename}`);
        file.close();
        fs.unlink(dest, () => {});
        return resolve(null);
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          const size = fs.statSync(dest).size;
          console.log(`✓ Baixada foto ${filename} (${(size / 1024).toFixed(1)} KB)`);
          resolve({ filename, fullUrl, size });
        });
      });
    }).on('error', (err) => {
      console.error(`Falha em ${filename}:`, err.message);
      file.close();
      fs.unlink(dest, () => {});
      resolve(null);
    });
  });
}

async function start() {
  const urlList = Array.from(urls).slice(0, 15); // Baixar as 15 primeiras de alta resolução
  console.log(`Iniciando download de ${urlList.length} fotos reais...`);
  
  const downloaded = [];
  for (let i = 0; i < urlList.length; i++) {
    const result = await downloadImage(urlList[i], i);
    if (result) downloaded.push(result);
  }

  console.log(`\nFinalizado com sucesso! ${downloaded.length} imagens salvas em assets/images.`);
  fs.writeFileSync(path.join(outputDir, 'metadata.json'), JSON.stringify(downloaded, null, 2));
}

start();
