const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const imagesDir = path.join(__dirname, '..', 'assets', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Lista de imagens REAIS da Pousada Vila Matury e de Icapuí / Praia da Redonda
const imagesToDownload = [
  {
    filename: 'vila_hero_deck.jpg',
    url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/813486731.jpg?k=5ca44dfce4d754f9d2d0c1590740cfbca5dd37996c561b36e84be19f4492bfd9&o=',
    desc: 'Deck panorâmico da Pousada Vila Matury com vista para o mar da Redonda'
  },
  {
    filename: 'vila_quarto_suite.jpg',
    url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/813486734.jpg?k=2f72a6a12bb564c7e6c38ebbd7aa9ddff1d05aa9c60e326c7104b2b0051e7ef1&o=',
    desc: 'Quarto/Suíte da Pousada Vila Matury com janela de madeira rústica e vista mar'
  },
  {
    filename: 'vila_varanda_redes.jpg',
    url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/813486738.jpg?k=424c56e09e99a813735749723dbdb2b8109bfdb93a55fb12c8ff46452285a8a6&o=',
    desc: 'Varanda coberta com redes de descanso da Vila Matury'
  },
  {
    filename: 'vila_banheiro_cimento.jpg',
    url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/813486736.jpg?k=0ef7cae4dbcdb62b1b36b438b9a911bb5c90b6a2267b2d5804ef3a7f80ef2013&o=',
    desc: 'Banheiro orgânico em cimento queimado da Pousada Vila Matury'
  },
  {
    filename: 'vila_cozinha_compartilhada.jpg',
    url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/813486737.jpg?k=a8df62ff4bb73db551528659d83df1e5be0275811776ceee3ff91d1e7bcfa148&o=',
    desc: 'Cozinha e área gourmet compartilhada da Pousada Vila Matury'
  },
  {
    filename: 'vila_jardim_noturno.jpg',
    url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/813486739.jpg?k=3f4e3c9d2b70fbb101a1c97a8100ef2a2810a90e3860bb481ec651fb2c6a0c00&o=',
    desc: 'Jardim iluminado com cordão de luzes da Vila Matury'
  },
  {
    filename: 'redonda_falesias_praia.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Falesias_na_praia_redonda_-_icapui_-_ceara.jpg/1280px-Falesias_na_praia_redonda_-_icapui_-_ceara.jpg',
    desc: 'Falésias coloridas na Praia da Redonda em Icapuí - Ceará'
  },
  {
    filename: 'redonda_jangadas.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Jangadas_na_praia_de_Redonda_-_Icapu%C3%AD_-_Cear%C3%A1.jpg/1280px-Jangadas_na_praia_de_Redonda_-_Icapu%C3%AD_-_Cear%C3%A1.jpg',
    desc: 'Jangadas tradicionais na Praia de Redonda em Icapuí'
  },
  {
    filename: 'icapui_ponta_grossa.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Ponta_Grossa%2C_Icapu%C3%AD%2C_Cear%C3%A1.jpg/1280px-Ponta_Grossa%2C_Icapu%C3%AD%2C_Cear%C3%A1.jpg',
    desc: 'Duna e falésia de Ponta Grossa em Icapuí'
  },
  {
    filename: 'icapui_requenguela_passarela.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Passarela_do_manguezal_de_Requenguela_-_Icapu%C3%AD_-_Cear%C3%A1.jpg/1280px-Passarela_do_manguezal_de_Requenguela_-_Icapu%C3%AD_-_Cear%C3%A1.jpg',
    desc: 'Passarela ecológica suspensa de Requenguela em Icapuí'
  }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith('https') ? https : http;
    
    const request = client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }, (response) => {
      // Handle redirects
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        file.close();
        fs.unlink(dest, () => {});
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }

      if (response.statusCode !== 200) {
        file.close();
        fs.unlink(dest, () => {});
        return reject(new Error(`Failed with status code: ${response.statusCode}`));
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(dest));
      });
    });

    request.on('error', (err) => {
      file.close();
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log('Iniciando download das imagens reais de Vila Matury e Icapuí/Redonda...');
  for (const item of imagesToDownload) {
    const dest = path.join(imagesDir, item.filename);
    try {
      console.log(`Baixando: ${item.filename} (${item.desc})...`);
      await downloadFile(item.url, dest);
      const stat = fs.statSync(dest);
      console.log(`✓ Concluído: ${item.filename} (${(stat.size / 1024).toFixed(1)} KB)`);
    } catch (e) {
      console.error(`✗ Erro ao baixar ${item.filename}:`, e.message);
    }
  }
}

run();
