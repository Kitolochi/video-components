# Sound Effects Integration — Complete Guide

## ✅ Downloaded SFX Files

All sound effects are now available in `public/sfx/`:

| File | Source | Duration | Use Case | Volume |
|------|--------|----------|----------|--------|
| `whoosh-in.wav` | Mixkit #2890 | ~1.5s | Scene transitions, slide-ins | 0.4 |
| `impact-soft.wav` | Mixkit #2886 | ~3s | UI reveals, dashboard entrance | 0.5 |
| `impact-hard.wav` | Mixkit #2033 | ~6s | Stat number slams, emphasis | 0.6 |
| `ui-click.wav` | Mixkit #2568 | ~0.3s | Micro-interactions, key moments | 0.3 |

**Format:** WAV, 44.1kHz, 16-bit stereo
**License:** Mixkit License (free for commercial use, no attribution required)

## 🎬 Active SFX in V3

Sound effects are now ACTIVE in `CurvanceBytesLaunchV3.tsx`:

### Shot 1: Hook — "INTRODUCING"
```typescript
{frame === 0 && <Audio src={staticFile('sfx/whoosh-in.wav')} volume={0.4} />}
```
**Trigger:** Frame 0 (video start)
**Effect:** Whoosh emphasizes kinetic letter entrance

### Shot 2: Value Prop — "earn more"
```typescript
{frame === WORD_STAGGER * 2 && <Audio src={staticFile('sfx/ui-click.wav')} volume={0.3} />}
```
**Trigger:** Frame 24 (when "earn more" appears)
**Effect:** UI click emphasizes key value prop

### Shot 3: Dashboard — UI Reveal
```typescript
{frame === Math.round(WORD_DURATION * 1.5) && <Audio src={staticFile('sfx/impact-soft.wav')} volume={0.5} />}
```
**Trigger:** Frame 54 (when dashboard enters)
**Effect:** Soft impact adds weight to UI reveal

### Shot 5: Stats — APY Number Slam
```typescript
{frame === FADE_FRAMES && <Audio src={staticFile('sfx/impact-hard.wav')} volume={0.6} />}
```
**Trigger:** Frame 24 (when number starts counting)
**Effect:** Hard impact punctuates stat reveal

## 🎯 Sound Design Strategy

### When to Use Each SFX

**Whoosh (Scene Transitions)**
- ✅ Scene entrances with motion (slides, fades)
- ✅ Camera movements (zoom, pan)
- ✅ Screen wipes
- ❌ Static fade transitions (too aggressive)

**Impact Soft (UI Reveals)**
- ✅ Dashboard/card entrances
- ✅ Feature highlights appearing
- ✅ Logo reveals
- ❌ Small text elements (use UI click instead)

**Impact Hard (Emphasis Moments)**
- ✅ Stat number reveals
- ✅ CTA button slams
- ✅ Hero title entrances
- ❌ Subtle transitions (too powerful)

**UI Click (Micro-Interactions)**
- ✅ Key phrase reveals
- ✅ Icon appearances
- ✅ Button interactions (if interactive)
- ❌ Every single text element (becomes noise)

### Volume Guidelines

| Context | Volume Range | Reasoning |
|---------|-------------|-----------|
| Background transitions | 0.2-0.4 | Subtle, atmospheric |
| UI reveals | 0.4-0.6 | Noticeable, supportive |
| Emphasis moments | 0.6-0.8 | Prominent, impactful |
| Avoid | >0.8 | Overwhelming, distracting |

**Rule:** SFX should SUPPORT visuals, not compete with them.

## 🔧 Technical Implementation (Remotion)

### Frame-Triggered Audio
```typescript
// Trigger at specific frame
{frame === 24 && <Audio src={staticFile('sfx/impact-soft.wav')} volume={0.5} />}

// Trigger at variable timing
{frame === WORD_DURATION && <Audio src={staticFile('sfx/whoosh-in.wav')} volume={0.4} />}

// Multiple triggers in one shot
{frame === 0 && <Audio src={staticFile('sfx/whoosh-in.wav')} volume={0.4} />}
{frame === 30 && <Audio src={staticFile('sfx/ui-click.wav')} volume={0.3} />}
```

### Volume Control
```typescript
// Standard volume (most cases)
<Audio src={staticFile('sfx/impact-soft.wav')} volume={0.5} />

// Quieter background element
<Audio src={staticFile('sfx/whoosh-in.wav')} volume={0.3} />

// Louder emphasis
<Audio src={staticFile('sfx/impact-hard.wav')} volume={0.7} />

// Dynamic volume based on animation progress
<Audio
  src={staticFile('sfx/impact-soft.wav')}
  volume={interpolate(frame, [0, 30], [0.3, 0.6])}
/>
```

### Preventing Multiple Plays
```typescript
// ✅ CORRECT: Plays once at frame 24
{frame === 24 && <Audio src={staticFile('sfx/ui-click.wav')} volume={0.3} />}

// ❌ WRONG: Would play every frame after 24
{frame >= 24 && <Audio src={staticFile('sfx/ui-click.wav')} volume={0.3} />}

// ✅ CORRECT: Plays once in a range
{frame >= 24 && frame < 25 && <Audio src={staticFile('sfx/ui-click.wav')} volume={0.3} />}
```

## 📊 SFX Timing in V3

| Shot | Frame | Time | SFX | Purpose |
|------|-------|------|-----|---------|
| 1. Hook | 0 | 0.00s | Whoosh | Kinetic letter entrance |
| 2. Value Prop | 24 | 0.40s | UI Click | "earn more" emphasis |
| 3. Dashboard | 54 | 0.90s | Impact Soft | Dashboard reveal |
| 5. Stats | 24 | 0.40s* | Impact Hard | APY number slam |

*Relative to shot start time

## 🎨 Future Enhancements

### Optional SFX (Not Yet Implemented)
- **Ambient drone** — Low-frequency background texture (0.1-0.2 volume)
- **Transition whoosh (reverse)** — Scene exits (inverse of entrance whoosh)
- **Sparkle/shimmer** — Logo/brand reveals (high-frequency, 0.2-0.3 volume)
- **Riser/build** — Leading into climax moments (2-3s crescendo)

### Advanced Techniques
```typescript
// Fade out SFX over time
const sfxVolume = interpolate(frame, [0, 60], [0.5, 0], { extrapolateRight: 'clamp' });
<Audio src={staticFile('sfx/impact-soft.wav')} volume={sfxVolume} />

// Pitch shift simulation (via playbackRate)
<Audio
  src={staticFile('sfx/whoosh-in.wav')}
  volume={0.4}
  playbackRate={1.2} // 20% faster = higher pitch
/>

// Layer multiple SFX
{frame === 24 && (
  <>
    <Audio src={staticFile('sfx/impact-hard.wav')} volume={0.6} />
    <Audio src={staticFile('sfx/whoosh-in.wav')} volume={0.2} />
  </>
)}
```

## 📝 Mixkit License Summary

All SFX downloaded from [Mixkit](https://mixkit.co/free-sound-effects/) under the Mixkit License:

✅ **Allowed:**
- Commercial projects (YouTube, social media, ads, client work)
- Modify, trim, combine sounds
- No attribution required (but appreciated)
- No account or sign-up needed

❌ **Not Allowed:**
- Redistribution as standalone sound effects
- Claiming sounds as your own work
- Selling sounds individually

**Full license:** https://mixkit.co/license/#sfxFree

## 🚀 How to Test

1. Open Remotion Studio: http://localhost:3002
2. Select **"CurvanceBytesLaunchV3"**
3. Play from beginning
4. Listen for:
   - 0.0s: Whoosh on "INTRODUCING"
   - 0.4s: Click on "earn more"
   - 0.9s: Soft impact on dashboard
   - Stats shot: Hard impact on number

**Note:** Remotion Studio plays audio in real-time. For frame-accurate testing, render the video.

## 🔊 Render Settings

To include audio in final render:

```bash
# Render with audio
npm run build

# Or use Remotion CLI
npx remotion render CurvanceBytesLaunchV3 output.mp4
```

Audio is automatically included in rendered MP4 files.

## 📁 File Structure

```
video-components/
  public/
    sfx/
      whoosh-in.wav           (175KB)
      impact-soft.wav         (428KB)
      impact-hard.wav         (931KB)
      ui-click.wav            (36KB)
      download-sfx.mjs        (helper script)
      download-ui-click.mjs   (helper script)
      QUICK-REFERENCE.md      (alternative sources)
      RECOMMENDED-SOUNDS.md   (detailed specs)
      DOWNLOAD-GUIDE.md       (manual download)
  src/
    demos/
      CurvanceBytesLaunchV3.tsx  (with active SFX)
```

## ✅ Integration Checklist

- [x] Download 4 SFX files from Mixkit
- [x] Save to public/sfx/ directory
- [x] Uncomment Audio tags in V3
- [x] Update file extensions (.mp3 → .wav)
- [x] Test in Remotion Studio
- [ ] Adjust volumes if needed (currently: 0.3-0.6)
- [ ] Fine-tune timing if SFX feels early/late
- [ ] Render final video to verify audio sync

---

**SFX integration complete!** The video now has professional sound design to match the premium typography. 🎵
