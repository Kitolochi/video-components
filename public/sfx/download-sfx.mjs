// Quick SFX downloader for Mixkit (no account needed)
import https from 'https';
import fs from 'fs';
import path from 'path';

const sounds = [
  {
    name: 'whoosh-in.mp3',
    // Mixkit - Fast whoosh transition
    url: 'https://assets.mixkit.co/active_storage/sfx/2890/2890.wav',
    description: 'Fast whoosh transition'
  },
  {
    name: 'impact-soft.mp3',
    // Mixkit - Impact of a blow
    url: 'https://assets.mixkit.co/active_storage/sfx/2886/2886.wav',
    description: 'Impact of a blow (soft)'
  },
  {
    name: 'impact-hard.mp3',
    // Mixkit - Strong punches to the body
    url: 'https://assets.mixkit.co/active_storage/sfx/2033/2033.wav',
    description: 'Strong punches (hard)'
  },
  {
    name: 'ui-click.mp3',
    // Mixkit - Cool interface click tone
    url: 'https://assets.mixkit.co/active_storage/sfx/2571/2571.wav',
    description: 'Cool interface click'
  }
];

function download(url, dest, callback) {
  const file = fs.createWriteStream(dest);
  https.get(url, (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close(callback);
    });
  }).on('error', (err) => {
    fs.unlink(dest, () => {});
    callback(err);
  });
}

async function downloadAll() {
  console.log('🎵 Downloading SFX from Mixkit...\n');

  for (const sound of sounds) {
    const dest = path.join(process.cwd(), sound.name);
    console.log(`⏳ Downloading: ${sound.description}`);
    console.log(`   → ${sound.name}`);

    await new Promise((resolve, reject) => {
      download(sound.url, dest, (err) => {
        if (err) {
          console.log(`   ❌ Failed: ${err.message}\n`);
          reject(err);
        } else {
          console.log(`   ✅ Downloaded!\n`);
          resolve();
        }
      });
    });
  }

  console.log('🎉 All SFX downloaded successfully!');
  console.log('\n📝 Next step: Uncomment <Audio> tags in CurvanceBytesLaunchV3.tsx');
}

downloadAll().catch(console.error);
