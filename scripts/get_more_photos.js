const fs = require('fs');
const path = require('path');
const https = require('https');

const contentPath = 'C:\\Users\\romar\\.gemini\\antigravity-ide\\brain\\1be66487-e628-4c2a-8d8c-a9d06ac5f3d0\\.system_generated\\steps\\70\\content.md';
const content = fs.readFileSync(contentPath, 'utf8');

const regex = /contentUrl":\s*"([^"]+)"/g;
let m;
const urls = [];
while ((m = regex.exec(content)) !== null) {
  urls.push(m[1]);
}

console.log(`Total de fotos da pousada disponíveis: ${urls.length}`);

// Baixar lote adicional (do 16 ao 30)
const outputDir = path.join(__dirname, '..', 'assets', 'images');

async function downloadBatch() {
  for (let i = 15; i < Math.min(30, urls.length); i++) {
    const filename = `vila_matury_${i + 1}.jpg`;
    const dest = path.join(outputDir, filename);
    const fullUrl = `https://pousada-vila-manzua.ceara-hotels.com${urls[i]}`;
    
    await new Promise((resolve) => {
      https.get(fullUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        if (res.statusCode === 200) {
          res.pipe(fs.createWriteStream(dest)).on('finish', () => {
            console.log(`✓ Baixada ${filename} (${(fs.statSync(dest).size / 1024).toFixed(1)} KB)`);
            resolve();
          });
        } else {
          resolve();
        }
      }).on('error', () => resolve());
    });
  }
  console.log('Lote concluído com sucesso!');
}

downloadBatch();
