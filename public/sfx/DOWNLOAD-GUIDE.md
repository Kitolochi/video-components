# Sound Effects Download Guide

## Quick Download Instructions

Since automated downloads from Freesound and Mixkit require authentication/browser access, follow these manual steps:

---

## Option 1: Freesound (CC0 - Public Domain)

**All sounds are Creative Commons 0 licensed** - free for commercial use, no attribution required.

### 1. Whoosh Sound (Scene Transitions)

**Recommended:** "Whoosh" by qubodup
- **URL:** https://freesound.org/people/qubodup/sounds/60013/
- **Duration:** 0.426s
- **Format:** FLAC (44.1kHz, 24-bit, stereo)
- **Downloads:** 205K+
- **Instructions:**
  1. Visit the URL above
  2. Click the download button (may require free Freesound account)
  3. Save as `whoosh-in.flac` (convert to MP3 if needed)

**Alternative:** "Woosh" by florianreichelt
- **URL:** https://freesound.org/people/florianreichelt/sounds/683096/
- **Duration:** 1.716s
- **Format:** MP3 (48kHz, stereo)
- **Downloads:** 29.8K

---

### 2. Impact Sound (Soft) - UI Reveals

**Recommended:** "Cinematic Low Pitch Impact" by Jofae
- **URL:** https://freesound.org/people/Jofae/sounds/408141/
- **Duration:** 6.977s (trim to desired length)
- **Format:** MP3 (44.1kHz, stereo)
- **Downloads:** 4.9K
- **Rating:** 4.9/5
- **Note:** Gentle slam that gradually fades - perfect for UI reveals
- **Instructions:**
  1. Visit the URL above
  2. Click download button
  3. Save as `impact-soft-full.mp3`
  4. Trim to 0.5-1s using Audacity or FFmpeg (see below)

---

### 3. Impact Sound (Hard) - Stat Reveals

**Recommended:** "Punch" by Ekokubza123
- **URL:** https://freesound.org/people/Ekokubza123/sounds/104183/
- **Duration:** 1.188s
- **Format:** WAV (44.1kHz)
- **Downloads:** 77K+
- **Note:** Strong, punchy impact - perfect for stat reveals
- **Instructions:**
  1. Visit the URL above
  2. Click download button
  3. Save as `impact-hard.wav` (convert to MP3 if needed)

---

### 4. UI Click (Micro-Interactions)

**Recommended:** "Soft UI Button Click" by Jummit
- **URL:** https://freesound.org/people/Jummit/sounds/528561/
- **Duration:** 0.238s
- **Format:** OGG (44.1kHz, mono)
- **Downloads:** 3.3K
- **Note:** Soft sci-fi button click - perfect for UI interactions
- **Instructions:**
  1. Visit the URL above
  2. Click download button
  3. Save as `ui-click.ogg` (convert to MP3 if needed)

**Alternative:** "8-bit Soft Beep Impact" by JapanYoshiTheGamer
- **URL:** https://freesound.org/people/JapanYoshiTheGamer/sounds/361266/
- **Duration:** 0.323s
- **Format:** WAV (44.1kHz, mono)

---

## Option 2: Mixkit (Mixkit License - Free Commercial Use)

**No account required** - easier for quick downloads.

### Direct Links to Categories:

1. **Whoosh/Transition:**
   - https://mixkit.co/free-sound-effects/whoosh/
   - Recommended: "Fast whoosh transition" (0:01)

2. **Impact:**
   - https://mixkit.co/free-sound-effects/impact/
   - Recommended (Soft): "Impact of a blow" (0:01)
   - Recommended (Hard): "Strong punches to the body" (0:03)

3. **UI Click:**
   - https://mixkit.co/free-sound-effects/click/
   - Recommended: "Cool interface click tone" (0:01)

**Instructions:**
1. Visit category page
2. Preview sounds by clicking play button
3. Click "Download Free SFX" button
4. Rename downloaded file according to target name
5. Move to `C:/Users/chris/video-components/public/sfx/`

---

## Converting Audio Formats

### Using FFmpeg (Recommended)

#### FLAC to MP3
```bash
ffmpeg -i whoosh-in.flac -codec:a libmp3lame -qscale:a 2 whoosh-in.mp3
```

#### WAV to MP3
```bash
ffmpeg -i impact-hard.wav -codec:a libmp3lame -qscale:a 2 impact-hard.mp3
```

#### OGG to MP3
```bash
ffmpeg -i ui-click.ogg -codec:a libmp3lame -qscale:a 2 ui-click.mp3
```

#### Trim Long Audio (e.g., 6.9s impact to 1s)
```bash
# Extract first 1 second
ffmpeg -i impact-soft-full.mp3 -t 1.0 -codec:a libmp3lame -qscale:a 2 impact-soft.mp3

# Or extract from specific timestamp (e.g., 0.5s to 1.5s)
ffmpeg -i impact-soft-full.mp3 -ss 0.5 -t 1.0 -codec:a libmp3lame -qscale:a 2 impact-soft.mp3
```

**Quality Levels:**
- `-qscale:a 0` = ~245 kbps (highest)
- `-qscale:a 2` = ~190 kbps (recommended)
- `-qscale:a 4` = ~165 kbps (good)

---

## Target File Structure

After downloading and converting, you should have:

```
C:/Users/chris/video-components/public/sfx/
├── whoosh-in.mp3       (0.4-1s, smooth transition)
├── impact-soft.mp3     (0.5-1s, gentle UI reveal)
├── impact-hard.mp3     (1-1.5s, punchy stat reveal)
└── ui-click.mp3        (0.2-0.3s, subtle interaction)
```

---

## Quick Batch Download Script (Mixkit)

Since Mixkit doesn't require authentication, you can use browser automation or manual download:

1. Open https://mixkit.co/free-sound-effects/whoosh/
2. Search for "Fast whoosh transition"
3. Right-click download button → Save as `whoosh-in.mp3`
4. Repeat for other categories

---

## Quality Checklist

Before using each sound:
- [ ] Sample rate: 44.1kHz or higher ✓
- [ ] Duration: 0.3-1.5s (or trimmed to spec)
- [ ] File format: MP3 (or converted from FLAC/WAV/OGG)
- [ ] No clipping or distortion
- [ ] Clean start/end (no pops or clicks)
- [ ] Stereo or mono is acceptable

---

## License Summary

### Freesound CC0 (Public Domain)
- ✓ Commercial use
- ✓ Modify
- ✓ Distribute
- ✓ No attribution required
- ✓ No permission needed

### Mixkit License
- ✓ Commercial use (YouTube, social media, ads)
- ✓ Personal projects
- ✓ No attribution required (but appreciated)
- ✓ No sign-up required

---

## Troubleshooting

### Freesound Downloads Not Working?
- **Solution:** Create a free Freesound account (takes 1 minute)
- Account URL: https://freesound.org/home/register/

### Need Different Sound Characteristics?
- **Browse by tags:** https://freesound.org/browse/tags/
  - Search: "whoosh", "transition", "swoosh"
  - Filter by: Creative Commons 0, Duration < 2s
  - Sort by: Highest rated or Most downloaded

### Audio Too Long?
- Use FFmpeg trim commands above
- Or use Audacity (free): File → Import → Select range → Export Selection

---

## Additional Resources

- **Mixkit Sound Effects:** https://mixkit.co/free-sound-effects/
- **Freesound Homepage:** https://freesound.org/
- **BBC Sound Effects:** https://sound-effects.bbcrewind.co.uk/ (research/educational only)
- **FFmpeg Download:** https://ffmpeg.org/download.html
- **Audacity (Free Audio Editor):** https://www.audacityteam.org/
