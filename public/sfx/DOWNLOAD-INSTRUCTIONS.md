# Sound Effects Download Instructions

## Required Sound Effects

All sound effects are **royalty-free for commercial use** from Mixkit.

### Directory
Save all files to: `C:/Users/chris/video-components/public/sfx/`

---

## 1. Whoosh Sound (Scene Transitions)

**Source:** [Mixkit Whoosh Effects](https://mixkit.co/free-sound-effects/whoosh/)

**Recommended:** "Fast whoosh transition" (Duration: 0:01)
- Click the sound preview to test
- Click "Download Free SFX" button
- Save as: `whoosh-in.mp3`

**Alternative:** "Air woosh" (Duration: 0:02)

---

## 2. Impact Sound (Soft) - UI Reveals

**Source:** [Mixkit Impact Effects](https://mixkit.co/free-sound-effects/impact/)

**Recommended:** "Impact of a blow" (Duration: 0:01)
- Click the sound preview to test
- Click "Download Free SFX" button
- Save as: `impact-soft.mp3`

---

## 3. Impact Sound (Hard) - Stat Reveals

**Source:** [Mixkit Impact Effects](https://mixkit.co/free-sound-effects/impact/)

**Recommended:** "Strong punches to the body" (Duration: 0:03)
- Click the sound preview to test
- Click "Download Free SFX" button
- Save as: `impact-hard.mp3`

**Alternative Sources:**
- [Mixkit Punch Effects](https://mixkit.co/free-sound-effects/punch/) - 33 punch sounds
- [Mixkit Hit Effects](https://mixkit.co/free-sound-effects/hit/) - 36 hit sounds

---

## 4. UI Click (Micro-Interactions)

**Source:** [Mixkit Click Effects](https://mixkit.co/free-sound-effects/click/)

**Recommended:** "Cool interface click tone" (Duration: 0:01)
- Click the sound preview to test
- Click "Download Free SFX" button
- Save as: `ui-click.mp3`

**Alternative Sources:**
- [Mixkit Beep Effects](https://mixkit.co/free-sound-effects/beep/) - 11 beep sounds
- [Mixkit Interface Effects](https://mixkit.co/free-sound-effects/interface/) - 15 interface sounds

---

## Download Steps (Mixkit)

1. Visit the source URL for each sound effect category
2. Preview sounds by clicking the play button
3. When you find the right sound, click "Download Free SFX"
4. Mixkit downloads are usually WAV or MP3 format (44.1kHz+)
5. Rename the downloaded file according to the list above
6. Move to `C:/Users/chris/video-components/public/sfx/`

---

## License

**Mixkit License:** Free for commercial and personal projects (YouTube, social media, ads)
- No attribution required (but appreciated)
- No sign-up required
- Unlimited downloads

---

## Quality Checklist

Before using each sound:
- [ ] Sample rate: 44.1kHz or higher
- [ ] Duration: 0.3-1.5s (except impact-hard at 0:03s is acceptable)
- [ ] File format: MP3 or WAV
- [ ] No clipping or distortion
- [ ] Clean start/end (no pops or clicks)

---

## Alternative Sources (If Needed)

### Pixabay Sound Effects
- **URL:** https://pixabay.com/sound-effects/
- **Search terms:** "whoosh", "impact", "ui click", "beep"
- **License:** Free for commercial use, no attribution required
- **Note:** May require account creation for downloads

### Freesound
- **URL:** https://freesound.org/
- **Search terms:** "whoosh transition", "soft impact", "punch impact", "ui click"
- **License:** Check individual sounds (most are CC0 or CC-BY)
- **Note:** Requires free account, filter by "Creative Commons 0" for no-attribution sounds
- **Filter:** Duration < 2s, Sort by "Highest Rated"

---

## Conversion (If Needed)

If you download WAV files and need MP3:

```bash
# Using FFmpeg
ffmpeg -i whoosh-in.wav -codec:a libmp3lame -qscale:a 2 whoosh-in.mp3
```

Quality levels:
- `-qscale:a 0` = highest quality (~245 kbps)
- `-qscale:a 2` = high quality (~190 kbps) **← recommended**
- `-qscale:a 4` = medium quality (~165 kbps)
