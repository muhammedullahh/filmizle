const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

let google;
try {
    google = require('googlethis');
} catch (e) {
    console.error("googlethis is not installed.");
    process.exit(1);
}

const logosDir = path.join(__dirname, 'public', 'logos');
if (!fs.existsSync(logosDir)) {
  fs.mkdirSync(logosDir, { recursive: true });
}

const channels = [
  { id: "azertv", query: "AzTV logo png transparent" },
  { id: "xazartv", query: "Xəzər TV logo png transparent" },
  { id: "ictimaitele", query: "İTV İctimai logo png transparent" },
  { id: "bakutv", query: "Baku TV logo png transparent" },
  { id: "idmantele", query: "İdman TV logo png transparent" },
  { id: "biznestv", query: "Biznes TV logo png" },
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
      } else if (res.statusCode === 301 || res.statusCode === 302) {
          const redirectUrl = res.headers.location;
          const redirectClient = redirectUrl.startsWith('https') ? https : http;
          redirectClient.get(redirectUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res2) => {
             res2.pipe(fs.createWriteStream(filepath)).on('error', reject).once('close', () => resolve(filepath));
          }).on('error', reject);
      } else {
        res.resume();
        reject(new Error(`Status Code: ${res.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function run() {
  for (const channel of channels) {
      // Skip if already downloaded to save time
      const filepath = path.join(logosDir, `${channel.id}.png`);
      if (fs.existsSync(filepath)) {
          console.log(`${channel.id} already exists, skipping.`);
          continue;
      }

    try {
      console.log(`Searching for ${channel.query}...`);
      const images = await google.image(channel.query, { safe: false });
      if (images && images.length > 0) {
        // Try the first 3 images if one fails
        let saved = false;
        for (let i = 0; i < Math.min(3, images.length); i++) {
            const url = images[i].url;
            if (!url.startsWith('http')) continue;
            console.log(`Downloading ${url} to ${filepath}...`);
            try {
                await downloadImage(url, filepath);
                console.log(`Saved ${channel.id}`);
                saved = true;
                break;
            } catch (e) {
                console.log(`Failed to download ${url}: ${e.message}`);
            }
        }
        if (!saved) {
            console.log(`Could not save any image for ${channel.id}`);
        }
      } else {
          console.log(`No images found for ${channel.query}`);
      }
    } catch (e) {
      console.error(`Search failed for ${channel.id}:`, e.message);
    }
    // Delay to avoid Google rate limit
    await new Promise(r => setTimeout(r, 1500));
  }
}

run();
