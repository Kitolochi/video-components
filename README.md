# Video Components

Production Remotion components implementing video engagement techniques from the [video-engagement-techniques](https://github.com/Kitolochi/video-engagement-techniques) framework.

## Structure

```
video-components/
├── src/
│   ├── techniques/           # Organized by technique type
│   │   ├── edge-glow/       # Asymmetric edge accent glows
│   │   ├── isometric-cards/ # 3D tilted card components
│   │   └── ui-mockups/      # Flat UI mockup showcases
│   ├── effects/             # Reusable effects (particles, grain, etc)
│   └── demos/               # Full demo compositions
│       ├── MarkKndActual.tsx        # Frame-accurate 4 technique reconstruction
│       ├── UIShowcaseRange.tsx      # 8 variations showing technique range
│       ├── UIShowcasePolished.tsx   # Production 3D + VFX polish
│       └── IsometricShowcase.tsx    # Multiple card sizes & angles
```

## Demos

### MarkKndActual
**360 frames (12s) at 30fps**

Frame-accurate reconstruction of techniques from MarkKnd's Remotion announcement video:
- **Scene 1**: Fullscreen UI mockup with magenta edge glow (left side only)
- **Scene 2**: Isolated recording button scaled 2.5x with typography overlay
- **Scene 3**: Dropdown list with cyan edge accent (left edge only)
- **Scene 4**: True isometric card with 3D perspective tilt

Key insight: 80% of the original video uses flat UI mockups with asymmetric edge glows, NOT isometric cards.

### UIShowcaseRange
**720 frames (24s) at 30fps**

8 variations (3s each) demonstrating the range of discovered techniques:
1. Left edge glow (magenta)
2. Right edge glow (cyan)
3. Isolated scaled element with typography
4. Split-screen comparison
5. Small isometric card
6. Large isometric card
7. Layered card stack
8. Grid layout

### UIShowcasePolished
**720 frames (24s) at 30fps**

Production-quality version with full 3D depth and visual effects:

**Global effects (always-on):**
- Film grain overlay at 0.08 opacity
- 25 ambient particles floating upward
- Parallax backgrounds

**Per-element polish:**
- 3D perspective transforms (1200px depth)
- Glass reflections + inset highlights
- Multi-layer shadow systems (depth + accent + inset)
- Light leaks (diagonal gradient)
- Shimmer effects
- Pulsing glows (sine wave animation)

### IsometricShowcase
**360 frames (12s) at 30fps**

Multi-size gallery demonstrating card variations:
- Large hero card (800px, rotateX -5°, rotateY 3°)
- Medium card (600px, rotateX -8°, rotateY 5°)
- Small card (400px, rotateX -10°, rotateY 8°)
- Grid of 3 cards with staggered animations

## Development

```bash
npm install
npm start
```

Preview compositions in the Remotion Studio at http://localhost:3000

## Rendering

Render individual compositions:

```bash
npm run build          # MarkKndActual
npm run build:range    # UIShowcaseRange
npm run build:polished # UIShowcasePolished
npm run build:iso      # IsometricShowcase
```

## Framework Integration

These components implement techniques documented in:
- [docs/video-teardown-takeaways.md](https://github.com/Kitolochi/video-engagement-techniques/blob/master/docs/video-teardown-takeaways.md)
- [guides/video-analysis-framework.md](https://github.com/Kitolochi/video-engagement-techniques/blob/master/guides/video-analysis-framework.md)
- [docs/reference-videos/product-showcase/markknd-remotion/](https://github.com/Kitolochi/video-engagement-techniques/tree/master/docs/reference-videos/product-showcase/markknd-remotion)

## License

MIT
