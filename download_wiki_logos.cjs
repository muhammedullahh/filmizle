const https = require('https');
const fs = require('fs');
const path = require('path');

const logosDir = path.join(__dirname, 'public', 'logos');
if (!fs.existsSync(logosDir)) {
  fs.mkdirSync(logosDir, { recursive: true });
}

// Map channel names to known Wikipedia image filenames
const wikiFiles = {
  azertv: 'AzTV_logo.png',
  xazartv: 'Xəzər_TV_logo.png',
  ictimaitele: 'İTV_logo.png',
  bakutv: 'Baku_TV_logo.png',
  idmantele: 'Idman_TV_logo.png',
  real: 'Real_TV_logo.png',
  atv: 'ATV_Azerbaijan_logo.png',
  arb24: 'ARB_24_logo.png',
  haberglobal: 'Haber_Global_logo.png',
  arb: 'ARB_logo.png',
  cbc: 'CBC_TV_Azerbaijan_logo.png',
  medeniyyettele: 'Mədəniyyət_TV_logo.png',
  space: 'Space_TV_logo.png',
  minikago: 'Minika_GO_logo.png',
  trthaber: 'TRT_Haber_logo.png'
};

async function getWikiImageUrl(filename) {
  return new Promise((resolve) => {
    // MediaWiki API to get image info
    const url = `https://az.wikipedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&format=json`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pageId !== '-1' && pages[pageId].imageinfo && pages[pageId].imageinfo.length > 0) {
            resolve(pages[pageId].imageinfo[0].url);
          } else {
             // Fallback to English Wikipedia
             const enUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&format=json`;
             https.get(enUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res2) => {
                 let data2 = '';
                 res2.on('data', chunk => data2 += chunk);
                 res2.on('end', () => {
                     try {
                         const json2 = JSON.parse(data2);
                         const pages2 = json2.query.pages;
                         const pageId2 = Object.keys(pages2)[0];
                         if (pageId2 !== '-1' && pages2[pageId2].imageinfo) {
                             resolve(pages2[pageId2].imageinfo[0].url);
                         } else {
                             // Fallback to commons
                             const commonsUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&format=json`;
                             https.get(commonsUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res3) => {
                                 let data3 = '';
                                 res3.on('data', chunk => data3 += chunk);
                                 res3.on('end', () => {
                                     try {
                                         const json3 = JSON.parse(data3);
                                         const pages3 = json3.query.pages;
                                         const pageId3 = Object.keys(pages3)[0];
                                         if (pageId3 !== '-1' && pages3[pageId3].imageinfo) {
                                             resolve(pages3[pageId3].imageinfo[0].url);
                                         } else {
                                             resolve(null);
                                         }
                                     } catch(e) { resolve(null); }
                                 });
                             }).on('error', () => resolve(null));
                         }
                     } catch(e) { resolve(null); }
                 });
             }).on('error', () => resolve(null));
          }
        } catch(e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', resolve);
      } else if (res.statusCode === 301 || res.statusCode === 302) {
         https.get(res.headers.location, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res2) => {
            res2.pipe(fs.createWriteStream(filepath)).on('error', reject).once('close', resolve);
         }).on('error', reject);
      } else {
        res.resume();
        reject(new Error(`Status ${res.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function run() {
  for (const [id, filename] of Object.entries(wikiFiles)) {
    console.log(`Checking Wikipedia for ${filename}...`);
    const url = await getWikiImageUrl(filename);
    if (url) {
      console.log(`Found URL: ${url}`);
      try {
        await downloadImage(url, path.join(logosDir, `${id}.png`));
        console.log(`Saved ${id}.png`);
      } catch (e) {
        console.error(`Failed to download ${url}: ${e.message}`);
      }
    } else {
      console.log(`Could not find ${filename}`);
    }
  }
}

run();
