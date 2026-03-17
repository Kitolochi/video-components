# Recommended Sound Effects - Quick Reference

## Final File List (Target)

```
C:/Users/chris/video-components/public/sfx/
├── whoosh-in.mp3       # Scene transitions (0.4-1s)
├── impact-soft.mp3     # UI reveals (0.5-1s)
├── impact-hard.mp3     # Stat reveals (1-1.5s)
└── ui-click.mp3        # Micro-interactions (0.2-0.3s)
```

---

## Best Sources (Ranked)

### 🥇 Freesound.org (CC0 - Public Domain)
**Pros:** Highest quality, most downloads, community-vetted
**Cons:** Requires free account for downloads

### 🥈 Mixkit (Mixkit License)
**Pros:** No account needed, instant downloads, all commercial-friendly
**Cons:** Smaller selection than Freesound

---

## Specific Recommendations

### 1️⃣ Whoosh Sound (Scene Transitions)

#### **Winner:** "Whoosh" by qubodup (Freesound)
- **URL:** https://freesound.org/people/qubodup/sounds/60013/
- **Why:** 205K downloads, perfect 0.426s duration, bamboo stick recording
- **Specs:** FLAC, 44.1kHz, 24-bit, stereo
- **License:** CC0 Public Domain
- **Vibe:** Natural, smooth, organic whoosh

#### Runner-up: "Fast whoosh transition" (Mixkit)
- **URL:** https://mixkit.co/free-sound-effects/whoosh/
- **Why:** No account needed, 1s duration
- **Specs:** MP3, ready to use
- **License:** Mixkit License

---

### 2️⃣ Impact Sound (Soft) - UI Reveals

#### **Winner:** "Cinematic Low Pitch Impact" by Jofae (Freesound)
- **URL:** https://freesound.org/people/Jofae/sounds/408141/
- **Why:** 4.9K downloads, 4.9/5 rating, "gentle slam that gradually fades"
- **Specs:** MP3, 44.1kHz, stereo, 6.977s (trim to 0.5-1s)
- **License:** CC0 Public Domain
- **Vibe:** Cinematic, gentle, professional
- **Note:** Trim using: `ffmpeg -i input.mp3 -t 1.0 -codec:a libmp3lame -qscale:a 2 impact-soft.mp3`

#### Runner-up: "Impact of a blow" (Mixkit)
- **URL:** https://mixkit.co/free-sound-effects/impact/
- **Why:** No account needed, 1s duration
- **License:** Mixkit License

---

### 3️⃣ Impact Sound (Hard) - Stat Reveals

#### **Winner:** "Punch" by Ekokubza123 (Freesound)
- **URL:** https://freesound.org/people/Ekokubza123/sounds/104183/
- **Why:** 77K+ downloads (most popular), strong punchy impact
- **Specs:** WAV, 44.1kHz, 1.188s
- **License:** CC0 Public Domain
- **Vibe:** Strong, punchy, perfect for stat reveals
- **Tags:** punch, jab, boom, strong

#### Runner-up: "Strong punches to the body" (Mixkit)
- **URL:** https://mixkit.co/free-sound-effects/impact/
- **Why:** No account needed, 3s duration
- **License:** Mixkit License

---

### 4️⃣ UI Click (Micro-Interactions)

#### **Winner:** "Soft UI Button Click" by Jummit (Freesound)
- **URL:** https://freesound.org/people/Jummit/sounds/528561/
- **Why:** 3.3K downloads, perfect 0.238s duration, "soft sci-fi button click"
- **Specs:** OGG, 44.1kHz, mono, 5KB
- **License:** CC0 Public Domain
- **Vibe:** Subtle, sci-fi, modern UI
- **Created:** Audacity

#### Runner-up: "Cool interface click tone" (Mixkit)
- **URL:** https://mixkit.co/free-sound-effects/click/
- **Why:** No account needed, 1s duration
- **License:** Mixkit License

---

## Download Priority

### Fast Track (No Account)
1. Go to Mixkit categories
2. Download all 4 sounds in 5 minutes
3. Rename to target names
4. Done ✓

### Best Quality (Requires Freesound Account)
1. Register at https://freesound.org/home/register/ (1 minute)
2. Download 4 recommended sounds from Freesound
3. Convert formats if needed (FLAC→MP3, WAV→MP3, OGG→MP3)
4. Trim soft impact from 6.9s to 1s
5. Done ✓

---

## Format Conversion Quick Reference

```bash
# FLAC to MP3 (whoosh)
ffmpeg -i 60013__qubodup__whoosh.flac -codec:a libmp3lame -qscale:a 2 whoosh-in.mp3

# MP3 trim (soft impact)
ffmpeg -i 408141__jofae__cinematic-low-pitch-impact.mp3 -t 1.0 -codec:a libmp3lame -qscale:a 2 impact-soft.mp3

# WAV to MP3 (hard impact)
ffmpeg -i 104183__ekokubza123__punch.wav -codec:a libmp3lame -qscale:a 2 impact-hard.mp3

# OGG to MP3 (UI click)
ffmpeg -i 528561__jummit__soft-ui-button-click.ogg -codec:a libmp3lame -qscale:a 2 ui-click.mp3
```

---

## Sound Characteristics

| Sound | Duration | Energy | Use Case |
|-------|----------|--------|----------|
| whoosh-in | 0.4-1s | Smooth, flowing | Scene transitions, slide-ins |
| impact-soft | 0.5-1s | Gentle, cinematic | UI reveals, card appears |
| impact-hard | 1-1.5s | Punchy, strong | Stat reveals, emphasis |
| ui-click | 0.2-0.3s | Subtle, quick | Hover, clicks, micro-interactions |

---

## Usage in Video Code

```javascript
// Preload sounds
const whoosh = new Audio('/sfx/whoosh-in.mp3');
const impactSoft = new Audio('/sfx/impact-soft.mp3');
const impactHard = new Audio('/sfx/impact-hard.mp3');
const uiClick = new Audio('/sfx/ui-click.mp3');

// Scene transition
tl.add({
  targets: '.scene-2',
  opacity: [0, 1],
  translateY: [50, 0],
  duration: 600,
  easing: EZ.smooth,
  begin: () => whoosh.play()
}, 3000);

// UI reveal (card entrance)
tl.add({
  targets: '.feature-card',
  opacity: [0, 1],
  scale: [0.9, 1],
  duration: 400,
  easing: EZ.smooth,
  begin: () => impactSoft.play()
}, 4000);

// Stat reveal (number slam)
tl.add({
  targets: '.stat-number',
  opacity: [0, 1],
  scale: [1.2, 1],
  duration: 500,
  easing: EZ.punch,
  begin: () => impactHard.play()
}, 5000);

// Button hover
button.addEventListener('mouseenter', () => {
  uiClick.currentTime = 0; // Reset to start
  uiClick.play();
});
```

---

## Alternative Discovery

If the recommended sounds don't match your vibe, use these search strategies:

### Freesound Advanced Search
1. Go to: https://freesound.org/search/
2. Enter search term (e.g., "whoosh")
3. Filters:
   - License: "Creative Commons 0"
   - Duration: 0-2 seconds
   - Sort by: "Number of downloads" (DESC)
4. Preview sounds by clicking play button
5. Download your favorite

### Mixkit Browse by Category
1. Go to: https://mixkit.co/free-sound-effects/
2. Browse categories:
   - Transition (36 sounds)
   - Impact (36 sounds)
   - Click (36 sounds)
   - Whoosh (varies)
3. Preview by clicking play
4. Download directly

---

## License Files (Optional)

Create `C:/Users/chris/video-components/public/sfx/LICENSES.txt`:

```
Sound Effects Licenses

whoosh-in.mp3
- Source: Freesound.org
- Creator: qubodup
- License: CC0 Public Domain
- URL: https://freesound.org/people/qubodup/sounds/60013/

impact-soft.mp3
- Source: Freesound.org
- Creator: Jofae
- License: CC0 Public Domain
- URL: https://freesound.org/people/Jofae/sounds/408141/

impact-hard.mp3
- Source: Freesound.org
- Creator: Ekokubza123
- License: CC0 Public Domain
- URL: https://freesound.org/people/Ekokubza123/sounds/104183/

ui-click.mp3
- Source: Freesound.org
- Creator: Jummit
- License: CC0 Public Domain
- URL: https://freesound.org/people/Jummit/sounds/528561/
```
