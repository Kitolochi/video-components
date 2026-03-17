# 🎵 Sound Effects - Quick Reference Card

## 🎯 Download These 4 Files

### 1. Whoosh Sound → `whoosh-in.mp3`
**Best:** https://freesound.org/people/qubodup/sounds/60013/
- ⏱️ 0.426s | 📦 FLAC → MP3
- 👥 205K downloads
- 🎨 Smooth bamboo stick whoosh

### 2. Soft Impact → `impact-soft.mp3`
**Best:** https://freesound.org/people/Jofae/sounds/408141/
- ⏱️ 6.9s (trim to 1s) | 📦 MP3
- ⭐ 4.9/5 rating
- 🎨 Cinematic gentle slam
- ✂️ `ffmpeg -i input.mp3 -t 1.0 -qscale:a 2 impact-soft.mp3`

### 3. Hard Impact → `impact-hard.mp3`
**Best:** https://freesound.org/people/Ekokubza123/sounds/104183/
- ⏱️ 1.188s | 📦 WAV → MP3
- 👥 77K downloads
- 🎨 Strong punch, perfect for stats

### 4. UI Click → `ui-click.mp3`
**Best:** https://freesound.org/people/Jummit/sounds/528561/
- ⏱️ 0.238s | 📦 OGG → MP3
- 👥 3.3K downloads
- 🎨 Soft sci-fi button click

---

## 🚀 Fast Alternative (No Account)

**Mixkit** - https://mixkit.co/free-sound-effects/

| Category | URL | Pick |
|----------|-----|------|
| Whoosh | [/whoosh/](https://mixkit.co/free-sound-effects/whoosh/) | "Fast whoosh transition" |
| Impact (soft) | [/impact/](https://mixkit.co/free-sound-effects/impact/) | "Impact of a blow" |
| Impact (hard) | [/punch/](https://mixkit.co/free-sound-effects/punch/) | "Strong punches to the body" |
| UI Click | [/click/](https://mixkit.co/free-sound-effects/click/) | "Cool interface click tone" |

---

## 🔧 Convert & Trim

```bash
# Whoosh: FLAC → MP3
ffmpeg -i 60013__qubodup__whoosh.flac -qscale:a 2 whoosh-in.mp3

# Impact Soft: Trim + MP3
ffmpeg -i 408141__jofae__cinematic-low-pitch-impact.mp3 -t 1.0 -qscale:a 2 impact-soft.mp3

# Impact Hard: WAV → MP3
ffmpeg -i 104183__ekokubza123__punch.wav -qscale:a 2 impact-hard.mp3

# UI Click: OGG → MP3
ffmpeg -i 528561__jummit__soft-ui-button-click.ogg -qscale:a 2 ui-click.mp3
```

---

## 📊 Usage Matrix

| Sound | When | Duration | Energy | Example |
|-------|------|----------|--------|---------|
| whoosh-in | Scene transition | 0.4-1s | Smooth | `.scene { opacity: [0,1] }` |
| impact-soft | UI reveal | 0.5-1s | Gentle | `.card { scale: [0.9,1] }` |
| impact-hard | Stat reveal | 1-1.5s | Punchy | `.number { scale: [1.2,1] }` |
| ui-click | Micro-interaction | 0.2-0.3s | Subtle | `button:hover` |

---

## 📝 License

**All CC0 (Public Domain)**
- ✅ Commercial use
- ✅ No attribution required
- ✅ Modify freely
- ✅ No permission needed

---

## ✅ Checklist

- [ ] Download 4 sounds from Freesound or Mixkit
- [ ] Convert to MP3 if needed (FLAC, WAV, OGG → MP3)
- [ ] Trim soft impact from 6.9s → 1s
- [ ] Rename to target filenames
- [ ] Move to `C:/Users/chris/video-components/public/sfx/`
- [ ] Test in video project

---

## 🆘 Help

**Account required?**
- Freesound: Yes (free, 1 minute)
- Mixkit: No

**Can't convert formats?**
- Install FFmpeg: https://ffmpeg.org/download.html
- Or use Audacity: https://www.audacityteam.org/

**Need different sounds?**
- See `RECOMMENDED-SOUNDS.md` → Alternative Discovery
