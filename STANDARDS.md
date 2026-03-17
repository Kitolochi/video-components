# Video Components Standards

## Frame Rate: 60fps ALWAYS

**Rule:** All Remotion compositions MUST use 60fps.

**Why:**
- **Smoother animations** — Spring physics, easing curves, particle motion all benefit from higher temporal resolution
- **Professional output** — Modern screens (120Hz+) downsample cleanly from 60fps
- **Better scrubbing** — 2x frame density = more precise timeline navigation
- **Export flexibility** — Easy to downsample to 30fps/24fps if needed (just drop every other frame)

**Implementation:**
```tsx
// Root.tsx
const FPS = 60;

<Composition
  id="MyVideo"
  component={MyComponent}
  durationInFrames={600}  // 10 seconds at 60fps
  fps={FPS}
  width={1920}
  height={1080}
/>
```

**Duration calculation:**
- **30fps reference:** 360 frames = 12 seconds
- **60fps equivalent:** 720 frames = 12 seconds
- **Formula:** `durationInFrames = seconds * 60`

**Never use 30fps or 24fps.** If you're porting from a 30fps project, double the frame counts.

---

## Resolution: 1920×1080 Default

**Standard resolution:** 1920×1080 (16:9 landscape)

**Other supported:**
- 1080×1920 (9:16 vertical) — Social media
- 1080×1080 (1:1 square) — Instagram feed

---

## Component Structure

### File Organization
```
src/
├── demos/              # Full compositions (complete videos)
├── techniques/         # Reusable technique components
│   ├── edge-glow/
│   ├── isometric-cards/
│   └── ui-mockups/
└── effects/            # Reusable effects
    ├── FilmGrain.tsx
    ├── AmbientParticles.tsx
    └── GlassReflection.tsx
```

### Naming Conventions
- **Demos:** `MarkKndActual.tsx`, `UIShowcasePolished.tsx`
- **Techniques:** `EdgeGlowContainer.tsx`, `IsolatedElement.tsx`
- **Effects:** `FilmGrain.tsx`, `LightLeak.tsx`

---

## Animation Standards

### Spring Configurations
```tsx
// Entry animations
const entryProgress = spring({
  frame,
  fps,
  config: {
    damping: 200,  // Smooth, professional
  },
});

// Avoid: damping < 100 (too bouncy, unprofessional)
```

### Interpolation
```tsx
// Scale: 0.9 → 1.0 (subtle entry)
const scale = interpolate(entryProgress, [0, 1], [0.9, 1]);

// Opacity: 0 → 1 (standard fade)
const opacity = interpolate(entryProgress, [0, 1], [0, 1]);

// Avoid: [0.5, 1.5] ranges (too dramatic)
```

### Idle Animations
```tsx
// Subtle float: ±6px max
const floatY = Math.sin((frame / fps) * Math.PI) * 6;

// Rotation: ±2° max
const idleRotate = Math.sin((frame / fps) * Math.PI * 0.5) * 2;

// Never exceed ±10px translation or ±5° rotation
```

---

## Visual Effects Standards

### Film Grain
- **Opacity:** 0.08 (always-on subtle texture)
- **Blend mode:** overlay
- **z-index:** 900

### Ambient Particles
- **Count:** 25 max
- **Size:** 2-4px
- **Speed:** 0.3-0.8 vertical
- **z-index:** 100

### Glass Reflections
- **Background:** `linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)`
- **Position:** Top-left corner
- **Size:** 50% width, 40% height

### Shadows
```tsx
// Multi-layer depth
boxShadow: `
  0 40px 100px rgba(0, 0, 0, 0.8),      // Depth
  0 0 60px rgba(217, 70, 239, 0.2),     // Accent glow
  inset 0 1px 0 rgba(255, 255, 255, 0.1) // Inset highlight
`
```

---

## Performance Standards

### Frame Budget
- **Target:** <16.67ms per frame (60fps)
- **Max particles:** 50 total
- **Max shadows:** 3 per element
- **Image optimization:** Use staticFile() for public assets

### Avoid
- ❌ Heavy blur on large elements (use backdrop-filter: blur(20px) max)
- ❌ More than 3 nested perspective transforms
- ❌ Particle counts >50
- ❌ Animated gradients (use static with opacity instead)

---

## Code Standards

### TypeScript
All files MUST be `.tsx` with proper typing:
```tsx
interface SceneProps {
  frame: number;
  fps: number;
  scale?: number;
}

export const Scene: React.FC<SceneProps> = ({ frame, fps, scale = 1 }) => {
  // ...
};
```

### Component Props
```tsx
// Required props first, optional props with defaults
interface CardProps {
  frame: number;        // Required
  fps: number;          // Required
  title: string;        // Required
  scale?: number;       // Optional with default
  gradient?: string;    // Optional with default
}
```

### Hooks Usage
```tsx
// Always at top of component
const frame = useCurrentFrame();
const { fps, width, height } = useVideoConfig();

// Then derived calculations
const progress = spring({ frame, fps, config: { damping: 200 } });
```

---

## Documentation Standards

### Component Comments
```tsx
// Scene 1: Fullscreen UI mockup with magenta edge glow
// Frame reference: 10s from MarkKnd video
// Key elements: Flat mockup, asymmetric glow (left side only)
<Sequence from={0} durationInFrames={fps * 3}>
  <Scene1 frame={frame} fps={fps} />
</Sequence>
```

### Inline Explanations
```tsx
// CRITICAL: Use display:none to prevent scene stacking bug
// Opacity alone does NOT hide child animations
<div style={{ display: isVisible ? 'flex' : 'none' }}>
```

---

## Git Standards

### Commit Messages
```
feat(demos): add MarkKnd edge glow reconstruction
fix(effects): correct particle z-index stacking
refactor(techniques): extract IsolatedElement component
docs(standards): add 60fps rule
```

### Branch Strategy
- `master` — Stable, production-ready
- Feature work in temporary branches, squash merge to master

---

## Quality Checklist

Before committing any composition:
- [ ] 60fps (never 30fps or 24fps)
- [ ] All imports use correct paths
- [ ] No console.log statements
- [ ] Spring damping ≥ 100
- [ ] Idle animations ≤ 6px / ≤ 2°
- [ ] Particles ≤ 50 total
- [ ] Film grain at 0.08 opacity
- [ ] TypeScript types defined
- [ ] Comments explain technique origins

---

## Export Standards

### Render Commands
```bash
# Individual compositions
npm run build              # MarkKndActual
npm run build:range        # UIShowcaseRange
npm run build:polished     # UIShowcasePolished
npm run build:iso          # IsometricShowcase

# All at once
npm run build:all
```

### Output Settings
- **Codec:** H.264
- **CRF:** 18 (high quality)
- **Preset:** slow (best compression)
- **Format:** MP4

---

## Related Documentation

- `README.md` — Project overview
- `TECHNIQUES.md` — Technique mapping from analysis
- [video-engagement-techniques](https://github.com/Kitolochi/video-engagement-techniques) — Framework repo
  - `methodology/` — How to analyze reference videos
  - `catalog/` — Technique catalog
  - `production/` — Production rules
