/**
 * AzStream Logo Fixer - Official Sites Edition
 * Hər kanalın rəsmi saytından logo çəkir
 */
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const LOGOS = path.join(__dirname, 'public', 'logos');
if (!fs.existsSync(LOGOS)) fs.mkdirSync(LOGOS, { recursive: true });

// Her kanal için rəsmi URL-lər (mənbə: rəsmi saytlar)
const DIRECT_LOGOS = [
  // ARB TV
  { id: 'arb',       url: 'https://arb.az/wp-content/uploads/2021/10/arb-logo.png' },
  { id: 'arb',       url: 'https://arb.az/wp-content/themes/arb/images/logo.png', fallback: true },
  
  // ARB 24
  { id: 'arb24',     url: 'https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/az/8/8a/ARB_24_logo1.png&output=png' },
  
  // APA TV  
  { id: 'apatv',     url: 'https://apa.az/images/logo.png' },
  { id: 'apatv',     url: 'https://avatars.githubusercontent.com/u/apa-tv', fallback: true },

  // Kanal S
  { id: 'start',     url: 'https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/az/thumb/2/23/Kanal_s_logo.png/320px-Kanal_s_logo.png&output=png' },
  
  // Kanal 35
  { id: 'kanal35',   url: 'https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/az/6/66/Kanal_35_loqo.png&output=png' },
  
  // ELTV
  { id: 'eltv',      url: 'https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/az/d/d1/ELTV.png&output=png' },
  
  // ARB Günəş
  { id: 'arbgunesh', url: 'https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/az/3/38/ARB_G%C3%BCn%C9%99%C5%9F_loqo.png&output=png' },
  
  // CBC TV
  { id: 'cbc',       url: 'https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/az/f/f7/CBC_TV_loqosu.png&output=png' },
  { id: 'cbc',       url: 'https://cbc.az/assets/img/logo.png', fallback: true },
  
  // Show Plus (Show TV Azerbaijan)
  { id: 'showplus',  url: 'https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/az/1/13/Show_TV_Az%C9%99rbaycan_loqosu.png&output=png' },

  // Haber Global
  { id: 'haberglobal', url: 'https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Haber_Global_logo.svg/320px-Haber_Global_logo.svg.png&output=png' },
  { id: 'haberglobal', url: 'https://haberglobal.com.tr/images/haberGlobalLogo.png', fallback: true },

  // TMB TV
  { id: 'tmbtr',     url: 'https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/commons/e/e9/Logo_TMB_TV.png&output=png&w=400' },

  // MTV Azerbaijan  
  { id: 'mtvaz',     url: 'https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/commons/8/8f/MTV_2021_logo_used_in_Asia.svg&output=png&w=400' },
];

function fetch(url) {
  return new Promise((resolve, reject) => {
    try {
      const u = new URL(url);
      const mod = u.protocol === 'https:' ? https : http;
      mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'image/*,*/*' }, timeout: 15000 }, res => {
        if ([301,302,303,307,308].includes(res.statusCode) && res.headers.location) {
          const next = res.headers.location.startsWith('http') ? res.headers.location : `${u.protocol}//${u.hostname}${res.headers.location}`;
          return fetch(next).then(resolve).catch(reject);
        }
        const bufs = [];
        res.on('data', b => bufs.push(b));
        res.on('end', () => resolve({ status: res.statusCode, body: Buffer.concat(bufs), ct: res.headers['content-type'] || '' }));
      }).on('error', reject).on('timeout', () => reject(new Error('timeout')));
    } catch(e) { reject(e); }
  });
}

function isRealImage(buf, ct) {
  if (buf.length < 500) return false;
  if (ct.includes('html') || ct.includes('text/plain')) return false;
  // Check PNG header
  if (buf[0] === 0x89 && buf[1] === 0x50) return true;
  // Check JPEG header
  if (buf[0] === 0xFF && buf[1] === 0xD8) return true;
  // Check GIF header
  if (buf.slice(0,3).toString() === 'GIF') return true;
  // Check WebP
  if (buf.slice(8,12).toString() === 'WEBP') return true;
  // For wsrv.nl we trust PNG output
  if (ct.includes('image/')) return true;
  return false;
}

async function trySave(channel_id, url) {
  const dest = path.join(LOGOS, `${channel_id}.png`);
  try {
    console.log(`    ⬇ ${url.substring(0,80)}...`);
    const res = await fetch(url);
    if (res.status === 200 && isRealImage(res.body, res.ct)) {
      fs.writeFileSync(dest, res.body);
      console.log(`    ✅ Saxlanıldı: ${res.body.length} bytes`);
      return true;
    }
    console.log(`    ✗ Status: ${res.status}, size: ${res.body.length}, ct: ${res.ct.substring(0,30)}`);
  } catch(e) {
    console.log(`    ✗ Xəta: ${e.message}`);
  }
  return false;
}

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  console.log('🚀 Rəsmi mənbə logoları başladı\n');

  // Group by channel ID
  const byId = {};
  for (const entry of DIRECT_LOGOS) {
    if (!byId[entry.id]) byId[entry.id] = [];
    byId[entry.id].push(entry.url);
  }

  const results = {};

  for (const [id, urls] of Object.entries(byId)) {
    const dest = path.join(LOGOS, `${id}.png`);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1500) {
      console.log(`  ⏭  ${id} — artıq mövcuddur (${fs.statSync(dest).size} bytes)`);
      results[id] = true;
      continue;
    }

    console.log(`\n▶ ${id}`);
    let saved = false;
    for (const url of urls) {
      if (await trySave(id, url)) { saved = true; break; }
      await sleep(500);
    }
    results[id] = saved;
    await sleep(800);
  }

  console.log('\n\n━━━ XÜLASƏHESABİ ━━━');
  const ok = Object.entries(results).filter(([,v])=>v).map(([k])=>k);
  const fail = Object.entries(results).filter(([,v])=>!v).map(([k])=>k);
  console.log(`✅ Uğurlu (${ok.length}): ${ok.join(', ')}`);
  console.log(`❌ Tapılmadı (${fail.length}): ${fail.join(', ')}`);

  // Print channels.js snippet for saved logos
  if (ok.length) {
    console.log('\n=== channels.js üçün snippet ===');
    for (const id of ok) {
      console.log(`  channelIconC: "/logos/${id}.png",  // ${id}`);
    }
  }
}

main().catch(console.error);
