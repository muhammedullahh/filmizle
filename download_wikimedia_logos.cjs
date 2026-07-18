const fs = require('fs');
const path = require('path');
const https = require('https');

const logosDir = path.join(__dirname, 'public', 'logos');
if (!fs.existsSync(logosDir)) {
  fs.mkdirSync(logosDir, { recursive: true });
}

const channelsJsPath = path.join(__dirname, 'channels.js');
let channelsContent = fs.readFileSync(channelsJsPath, 'utf8');

const channels = [
  { id: "azertv", search: "AzTV logo" },
  { id: "xazartv", search: "Xəzər TV logo" },
  { id: "ictimaitele", search: "İctimai Televiziya logo" },
  { id: "bakutv", search: "Baku TV logo" },
  { id: "idmantele", search: "İdman TV logo" },
  { id: "biznestv", search: "Biznes TV logo" },
  { id: "ntv", search: "Naxçıvan TV logo" },
  { id: "real", search: "Real TV Azerbaijan logo" },
  { id: "qafkaz", search: "Qafqaz TV logo" },
  { id: "atv", search: "ATV Azerbaijan logo" },
  { id: "arb24", search: "ARB 24 logo" },
  { id: "apatv", search: "APA TV logo" },
  { id: "haberglobal", search: "Haber Global logo" },
  { id: "tmbtr", search: "TMB TV logo" },
  { id: "arb", search: "ARB TV Azerbaijan logo" },
  { id: "start", search: "Kanal S logo" },
  { id: "kanal35", search: "Kanal 35 logo" },
  { id: "eltv", search: "ELTV logo" },
  { id: "arbgunesh", search: "ARB Günəş logo" },
  { id: "cbc", search: "CBC TV Azerbaijan logo" },
  { id: "medeniyyettele", search: "Mədəniyyət TV logo" },
  { id: "space", search: "Space TV Azerbaijan logo" },
  { id: "minikago", search: "Minika GO logo" },
  { id: "trthaber", search: "TRT Haber logo" }
];

async function searchWikimediaCommons(query) {
  return new Promise((resolve) => {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&prop=imageinfo&iiprop=url&format=json`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.query && json.query.pages) {
            const pages = Object.values(json.query.pages);
            pages.sort((a, b) => {
               const aUrl = a.imageinfo[0].url.toLowerCase();
               const bUrl = b.imageinfo[0].url.toLowerCase();
               if (aUrl.endsWith('.png') && !bUrl.endsWith('.png')) return -1;
               if (bUrl.endsWith('.png') && !aUrl.endsWith('.png')) return 1;
               return 0;
            });
            if (pages.length > 0 && pages[0].imageinfo) {
              resolve(pages[0].imageinfo[0].url);
              return;
            }
          }
          resolve(null);
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

async function downloadImage(originalUrl, filepath) {
  return new Promise((resolve, reject) => {
    // Strip https:// to use with wsrv.nl proxy to bypass Wikipedia 429 rate limit
    const cleanUrl = originalUrl.replace('https://', '').replace('http://', '');
    const proxyUrl = `https://wsrv.nl/?url=${encodeURIComponent(cleanUrl)}`;
    
    https.get(proxyUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
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
  for (const channel of channels) {
      const existingFiles = fs.readdirSync(logosDir);
      const userDownloaded = existingFiles.find(f => f.startsWith(channel.id) || f.startsWith(channel.search.split(' ')[0].toLowerCase()));
      if (userDownloaded) {
          console.log(`Skipping ${channel.id}, user already has ${userDownloaded}`);
          continue;
      }

    console.log(`Searching Wikimedia for ${channel.search}...`);
    const url = await searchWikimediaCommons(channel.search);
    if (url) {
      const ext = url.split('.').pop().split('?')[0];
      const filename = `${channel.id}.${ext}`;
      const filepath = path.join(logosDir, filename);
      console.log(`Downloading (via proxy) ${url} to ${filepath}`);
      try {
        await downloadImage(url, filepath);
        
        const regex = new RegExp(`(channelID:\\s*"${channel.id}"[\\s\\S]*?channelIconC:\\s*")[^"]+(")`, 'g');
        channelsContent = channelsContent.replace(regex, `$1/logos/${filename}$2`);
        fs.writeFileSync(channelsJsPath, channelsContent);
        
      } catch (e) {
        console.error(`Failed to download ${url}: ${e.message}`);
      }
    } else {
      console.log(`Could not find logo for ${channel.search}`);
    }
    await new Promise(r => setTimeout(r, 1000));
  }
  console.log("Done updating logos.");
}

run();
