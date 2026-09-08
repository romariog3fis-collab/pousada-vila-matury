const fs = require('fs');
const path = require('path');
const https = require('https');

const outputDir = path.join(__dirname, '..', 'assets', 'images');

const icapuiPhotos = [
  {
    filename: 'icapui_redonda_praia.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Praiaredondace.jpg',
    title: 'Praia da Redonda - Icapuí'
  },
  {
    filename: 'icapui_redonda_jangadas.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/37/Jangada_And_The_Sun_%28168070269%29.jpeg',
    title: 'Jangada ao pôr do sol em Icapuí'
  },
  {
    filename: 'icapui_falesias_mar.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Icapu%C3%AD_%286890433420%29.jpg',
    title: 'Falésias e mar límpido de Icapuí'
  },
  {
    filename: 'icapui_costa_falesias.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Icapu%C3%AD_%286890440064%29.jpg',
    title: 'Falésias e orla costeira de Icapuí'
  },
  {
    filename: 'icapui_ponta_grossa_duna.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Encontro_da_duna_com_o_mar.JPG',
    title: 'Encontro da duna com o mar em Ponta Grossa Icapuí'
  },
  {
    filename: 'icapui_mirante_serra.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Morro_do_Alibe_-_panoramio.jpg',
    title: 'Mirante e morros de Icapuí'
  }
];

function downloadWiki(item) {
  return new Promise((resolve) => {
    const dest = path.join(outputDir, item.filename);
    const file = fs.createWriteStream(dest);

    https.get(item.url, {
      headers: {
        'User-Agent': 'VilaMaturyApp/1.0 (https://vilamatury.com.br; contato@vilamatury.com.br)'
      }
    }, (res) => {
      if (res.statusCode !== 200) {
        console.error(`Erro ${res.statusCode} ao baixar ${item.filename}`);
        file.close();
        fs.unlink(dest, () => {});
        return resolve(false);
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          const stat = fs.statSync(dest);
          console.log(`✓ Baixada ${item.filename} (${(stat.size / 1024).toFixed(1)} KB) - ${item.title}`);
          resolve(true);
        });
      });
    }).on('error', (err) => {
      console.error(`Falha em ${item.filename}:`, err.message);
      file.close();
      fs.unlink(dest, () => {});
      resolve(false);
    });
  });
}

async function run() {
  console.log('Baixando fotos reais de Icapuí e Redonda...');
  for (const item of icapuiPhotos) {
    await downloadWiki(item);
  }
  console.log('Finalizado download de fotos reais de Icapuí e Redonda!');
}

run();
