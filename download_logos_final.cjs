const https = require('https');
const fs = require('fs');
const path = require('path');

const LOGOS_DIR = path.join(__dirname, 'public', 'logos');
if (!fs.existsSync(LOGOS_DIR)) fs.mkdirSync(LOGOS_DIR, { recursive: true });

// Dəqiq Wikimedia fayl adları ilə siyahı
const channels = [
  { id: 'atv',       wikiFile: 'ATV_(2020-h.h.).png' },
  { id: 'arb24',     wikiFile: 'ARB_24_(loqo).png' },
  { id: 'arb',       wikiFile: 'ARB_TV.jpg' },
  { id: 'start',     wikiFile: 'Kanal_S_logo.png' },
  { id: 'kanal35',   wikiFile: 'Kanal_35.png' },
  { id: 'eltv',      wikiFile: 'ELTV_logo.png' },
  { id: 'arbgunesh', wikiFile: 'ARB_G%C3%BCn%C9%99%C5%9F.png' },
  { id: 'cbc',       wikiFile: 'CBC_Television_(Azerbaijan).png' },
  { id: 'haberglobal',wikiFile: 'Haber_Global.png' },
  { id: 'mtvaz',     wikiFile: 'MTV_International.svg' },
];

// Search fallbacks
const searchChannels = [
  { id: 'apatv',    search: 'Azeri Press Agency APA logo' },
  { id: 'tmbtr',    search: 'TMB canal television logo' },
  { id: 'tmbaz',    search: 'TMB Azerbaycan TV' },
  { id: 'tmb',      search: 'Vostok television logo' },
  { id: 'showplus', search: 'Show Plus television logo' },
  { id: 'shtv',     search: 'Şimal Hava TV logo' },
  { id: 'vip',      search: 'VIP HD television logo' },
];

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if ([301, 302].includes(res.statusCode) && res.headers.location) {
        return httpsGet(res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve({ status: res.statusCode, body: Buffer.concat(chunks) }));
    }).on('error', reject);
  });
}

async function getWikiFileUrl(filename) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&titles=File:${filename}&prop=imageinfo&iiprop=url&format=json`;
  try {
    const res = await httpsGet(api);
    const json = JSON.parse(res.body.toString());
    const pages = Object.values(json.query.pages);
    if (pages[0] && pages[0].imageinfo) return pages[0].imageinfo[0].url;
  } catch(e) {}
  return null;
}

async function searchWiki(query) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&prop=imageinfo&iiprop=url&format=json&gsrlimit=8`;
  try {
    const res = await httpsGet(api);
    const json = JSON.parse(res.body.toString());
    if (!json.query) return null;
    const pages = Object.values(json.query.pages);
    pages.sort((a, b) => {
      const au = a.imageinfo[0].url.toLowerCase();
      const bu = b.imageinfo[0].url.toLowerCase();
      if (au.endsWith('.png') && !bu.endsWith('.png')) return -1;
      if (bu.endsWith('.png') && !au.endsWith('.png')) return 1;
      return 0;
    });
    if (pages.length > 0 && pages[0].imageinfo) return pages[0].imageinfo[0].url;
  } catch(e) {}
  return null;
}

async function download(url, dest) {
  let dlUrl = url;
  if (url.includes('wikimedia.org') || url.includes('wikipedia.org')) {
    const clean = url.replace(/^https?:\/\//, '');
    dlUrl = `https://wsrv.nl/?url=${encodeURIComponent(clean)}&output=png`;
  }
  try {
    const res = await httpsGet(dlUrl);
    if (res.status === 200 && res.body.length > 800) {
      fs.writeFileSync(dest, res.body);
      return true;
    }
  } catch(e) {}
  return false;
}

async function run() {
  console.log('=== Spesifik fayl adları ilə endiriliyor ===\n');
  const done = {};

  for (const ch of channels) {
    const dest = path.join(LOGOS_DIR, `${ch.id}.png`);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      console.log(`✓ Artıq var: ${ch.id}`);
      done[ch.id] = true;
      continue;
    }

    let url = null;
    for (const fname of [ch.wikiFile, ch.wikiFile?.replace('.png','.jpg'), ch.wikiFile?.replace('.png','.svg')]) {
      if (!fname) continue;
      url = await getWikiFileUrl(fname);
      if (url) break;
    }

    if (!url) {
      console.log(`✗ Tapılmadı: ${ch.id} (${ch.wikiFile})`);
      continue;
    }

    console.log(`⬇ ${ch.id}: ${url.split('/').pop()}`);
    const ok = await download(url, dest);
    if (ok) {
      console.log(`✓ Saxlanıldı: ${ch.id}.png (${fs.statSync(dest).size} bytes)`);
      done[ch.id] = true;
    } else {
      console.log(`✗ Endirilə bilmədi: ${ch.id}`);
    }
    await new Promise(r => setTimeout(r, 1000));
  }

  console.log('\n=== Axtarış ilə endiriliyor ===\n');
  for (const ch of searchChannels) {
    const dest = path.join(LOGOS_DIR, `${ch.id}.png`);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      console.log(`✓ Artıq var: ${ch.id}`);
      done[ch.id] = true;
      continue;
    }
    const url = await searchWiki(ch.search);
    if (!url) { console.log(`✗ Tapılmadı: ${ch.id}`); continue; }
    console.log(`⬇ ${ch.id}: ${url.split('/').pop()}`);
    const ok = await download(url, dest);
    if (ok) {
      console.log(`✓ Saxlanıldı: ${ch.id}.png`);
      done[ch.id] = true;
    } else {
      console.log(`✗ Endirilə bilmədi: ${ch.id}`);
    }
    await new Promise(r => setTimeout(r, 1000));
  }

  console.log('\n=== Uğurlu endirmələr ===');
  console.log(Object.keys(done).join(', '));
}

run().catch(console.error);
