// Download UI click from a different Mixkit URL
import https from 'https';
import fs from 'fs';

const url = 'https://assets.mixkit.co/active_storage/sfx/2568/2568.wav'; // Soft UI click
const dest = 'ui-click.wav';

const file = fs.createWriteStream(dest);
https.get(url, (response) => {
  response.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('✅ Downloaded ui-click.wav');
  });
}).on('error', (err) => {
  fs.unlink(dest, () => {});
  console.error('❌ Error:', err.message);
});
