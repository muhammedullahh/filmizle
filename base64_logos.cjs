const fs = require('fs');
const path = require('path');

let content = fs.readFileSync('channels.js', 'utf8');

const regex = /channelIconC:\s*[\"']logos\/([a-zA-Z0-9_.-]+)[\"']/g;
let match;
while ((match = regex.exec(content)) !== null) {
  const filename = match[1];
  const filepath = path.join('public', 'logos', filename);
  if (fs.existsSync(filepath)) {
    const ext = path.extname(filename).substring(1);
    const mimeType = ext === 'jpg' || ext === 'jpeg' || ext === 'jfif' ? 'image/jpeg' : 'image/png';
    const base64 = fs.readFileSync(filepath).toString('base64');
    const dataUri = `"data:${mimeType};base64,${base64}"`;
    
    // replace just this instance
    content = content.replace(match[0], `channelIconC: ${dataUri}`);
  }
}

fs.writeFileSync('channels.js', content);
console.log('Channels.js updated with inline base64 logos.');
