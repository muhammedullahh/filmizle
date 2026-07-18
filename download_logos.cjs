const { image_search } = require('duckduckgo-images-api');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const logosDir = path.join(__dirname, 'logos');
if (!fs.existsSync(logosDir)) {
  fs.mkdirSync(logosDir, { recursive: true });
}

const channels = [
  { id: "azertv", query: "AzTV logo png transparent" },
  { id: "xazartv", query: "Xəzər TV logo png transparent" },
  { id: "ictimaitele", query: "İctimai TV logo png transparent" },
  { id: "bakutv", query: "Baku TV logo png transparent" },
  { id: "idmantele", query: "İdman TV logo png transparent" },
  { id: "biznestv", query: "Biznes TV azerbaijan logo png" },
  { id: "ntv", query: "Naxçıvan TV logo png" },
  { id: "real", query: "Real TV azerbaijan logo png transparent" },
  { id: "qafkaz", query: "Qafqaz TV logo png" },
  { id: "atv", query: "ATV azerbaijan logo png transparent" },
  { id: "arb24", query: "ARB 24 logo png transparent" },
  { id: "apatv", query: "APA TV logo png" },
  { id: "haberglobal", query: "Haber Global logo png transparent" },
  { id: "tmbtr", query: "TMB TV logo png" },
  { id: "arb", query: "ARB TV azerbaijan logo png transparent" },
  { id: "start", query: "Kanal S azerbaijan logo png" },
  { id: "kanal35", query: "Kanal 35 azerbaijan logo png" },
  { id: "eltv", query: "ELTV azerbaijan logo png" },
  { id: "arbgunesh", query: "ARB Günəş logo png" },
  { id: "cbc", query: "CBC TV Azerbaijan logo png transparent" },
  { id: "medeniyyettele", query: "Mədəniyyət TV logo png transparent" },
  { id: "space", query: "Space TV Azerbaijan logo png transparent" },
  { id: "minikago", query: "Minika GO logo png transparent" },
  { id: "trthaber", query: "TRT Haber logo png transparent" }
];

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else {
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function run() {
  for (const channel of channels) {
    try {
      console.log(`Searching for ${channel.query}...`);
      const results = await image_search({ query: channel.query, moderate: true });
      if (results && results.length > 0) {
        let url = results[0].image;
        if (!url.startsWith('http')) {
             console.log(`Invalid url ${url}`);
             continue;
        }
        const filename = `${channel.id}.png`; 
        const filepath = path.join(logosDir, filename);
        
        console.log(`Downloading ${url} to ${filepath}...`);
        try {
          await downloadImage(url, filepath);
          console.log(`Saved ${channel.id}`);
        } catch (e) {
          console.log(`Failed to download ${channel.id}: ${e.message}`);
        }
      }
    } catch (e) {
      console.error(`Search failed for ${channel.id}:`, e.message);
    }
  }
}

run();
