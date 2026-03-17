import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, Img, staticFile } from 'remotion';

/**
 * Curvance Bytes Launch V2 — Real Assets + Dynamic Timing
 *
 * IMPROVEMENTS FROM V1:
 * - Real Curvance brand colors (#5740ce purple, #06001a dark)
 * - Real Curvance logo and product screenshots
 * - Dynamic timing based on information density (not uniform 3s)
 * - Asset-first approach: scrape → plan → build
 *
 * TIMING STRATEGY:
 * - Ultra-short (1-2s): Impact moments, single words
 * - Short (2-3s): Simple statements, feature highlights
 * - Medium (3-4s): Dashboard reveals, feature+description
 * - Long (4-6s): Complex UI, multi-stat grids
 *
 * Total: ~22s (optimized down from 24s)
 */

// REAL Curvance brand colors (scraped from website)
const COLORS = {
  purple: '#5740ce',           // Primary brand accent
  dark: '#06001a',             // Near-black background
  white: '#ffffff',
  lightGray: '#f9f9fb',        // Surface color
  muted: '#656375',            // Muted text
  // Yield/stats colors (DeFi semantic)
  green: '#10b981',            // Positive yield
  greenBright: '#34d399',
  cyan: '#06b6d4',             // Liquidity accent
};

// Premium easing (MarkKnd fluidity)
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// DYNAMIC TIMING (frames at 60fps) — Based on information density
const SHOTS = [
  { name: 'Hook', frames: 90 },              // 1.5s — "Introducing" (ultra-short impact)
  { name: 'ValueProp', frames: 150 },        // 2.5s — "Click less, earn more" (short statement)
  { name: 'Dashboard', frames: 270 },        // 4.5s — Full dashboard UI (long — complex visual)
  { name: 'AutoCompound', frames: 210 },     // 3.5s — Feature + description (medium)
  { name: 'Stats', frames: 180 },            // 3.0s — APY counter animation (medium)
  { name: 'Liquidity', frames: 240 },        // 4.0s — Liquidity pool UI (medium-long)
  { name: 'Security', frames: 150 },         // 2.5s — Security badges (short)
  { name: 'BrandClose', frames: 180 },       // 3.0s — Logo + tagline (medium)
];

const TOTAL_FRAMES = SHOTS.reduce((sum, shot) => sum + shot.frames, 0);
const OVERLAP_FRAMES = 12; // 200ms cross-fade overlap

// Calculate cumulative start times
const getShotStart = (index: number): number => {
  return SHOTS.slice(0, index).reduce((sum, shot) => sum + shot.frames, 0) - (index * OVERLAP_FRAMES);
};

// Shared animation constants
const FADE_FRAMES = 24;     // 400ms
const WORD_DURATION = 36;   // 600ms
const WORD_STAGGER = 12;    // 200ms

export const CurvanceBytesLaunchV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: COLORS.dark }}>
      {/* Shot 1: Hook — "Introducing" (1.5s) */}
      <Sequence from={getShotStart(0)} durationInFrames={SHOTS[0].frames}>
        <Shot1Hook frame={frame - getShotStart(0)} fps={fps} />
      </Sequence>

      {/* Shot 2: Value Prop — "Click less, earn more" (2.5s) */}
      <Sequence from={getShotStart(1)} durationInFrames={SHOTS[1].frames}>
        <Shot2ValueProp frame={frame - getShotStart(1)} fps={fps} />
      </Sequence>

      {/* Shot 3: Dashboard — Product screenshot with yield stats (4.5s) */}
      <Sequence from={getShotStart(2)} durationInFrames={SHOTS[2].frames}>
        <Shot3Dashboard frame={frame - getShotStart(2)} fps={fps} />
      </Sequence>

      {/* Shot 4: Auto-Compound — Feature + description (3.5s) */}
      <Sequence from={getShotStart(3)} durationInFrames={SHOTS[3].frames}>
        <Shot4AutoCompound frame={frame - getShotStart(3)} fps={fps} />
      </Sequence>

      {/* Shot 5: Stats — APY counter (3.0s) */}
      <Sequence from={getShotStart(4)} durationInFrames={SHOTS[4].frames}>
        <Shot5Stats frame={frame - getShotStart(4)} fps={fps} />
      </Sequence>

      {/* Shot 6: Liquidity — Instant access UI (4.0s) */}
      <Sequence from={getShotStart(5)} durationInFrames={SHOTS[5].frames}>
        <Shot6Liquidity frame={frame - getShotStart(5)} fps={fps} />
      </Sequence>

      {/* Shot 7: Security — Audit badges (2.5s) */}
      <Sequence from={getShotStart(6)} durationInFrames={SHOTS[6].frames}>
        <Shot7Security frame={frame - getShotStart(6)} fps={fps} />
      </Sequence>

      {/* Shot 8: Brand Close — Logo + tagline (3.0s) */}
      <Sequence from={getShotStart(7)} durationInFrames={SHOTS[7].frames}>
        <Shot8BrandClose frame={frame - getShotStart(7)} fps={fps} />
      </Sequence>
    </AbsoluteFill>
  );
};

// ============================================================================
// SHOT 1: Hook — "Introducing" (ultra-short impact)
// ============================================================================
const Shot1Hook: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = interpolate(frame, [0, FADE_FRAMES, SHOTS[0].frames - FADE_FRAMES, SHOTS[0].frames], [0, 1, 1, 0], {
    easing: easeOutExpo,
  });

  const scale = interpolate(frame, [0, SHOTS[0].frames], [0.9, 1.05], { easing: easeOutExpo });

  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          transform: `scale(${scale})`,
        }}
      >
        <h1
          style={{
            fontFamily: 'Work Sans, sans-serif',
            fontWeight: 600,
            fontSize: '96px',
            color: COLORS.white,
            letterSpacing: '-0.025em',
            textAlign: 'center',
          }}
        >
          Introducing
        </h1>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// SHOT 2: Value Prop — "Click less, earn more" (short statement)
// ============================================================================
const Shot2ValueProp: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = interpolate(frame, [0, FADE_FRAMES, SHOTS[1].frames - FADE_FRAMES, SHOTS[1].frames], [0, 1, 1, 0], {
    easing: easeOutExpo,
  });

  const words = ['Click less,', 'earn more.'];

  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          gap: '20px',
        }}
      >
        {words.map((word, i) => {
          const startFrame = i * (WORD_DURATION + WORD_STAGGER);
          const wordProgress = interpolate(
            frame,
            [startFrame, startFrame + WORD_DURATION],
            [0, 1],
            { easing: easeOutExpo, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );

          const wordOpacity = interpolate(wordProgress, [0, 1], [0, 1]);
          const translateY = interpolate(wordProgress, [0, 1], [20, 0]);

          return (
            <h2
              key={i}
              style={{
                fontFamily: 'Work Sans, sans-serif',
                fontWeight: 700,
                fontSize: '72px',
                color: i === 1 ? COLORS.purple : COLORS.white,
                letterSpacing: '-0.025em',
                margin: 0,
                opacity: wordOpacity,
                transform: `translateY(${translateY}px)`,
              }}
            >
              {word}
            </h2>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// SHOT 3: Dashboard — Real Curvance product screenshot (long — complex UI)
// ============================================================================
const Shot3Dashboard: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = interpolate(frame, [0, FADE_FRAMES, SHOTS[2].frames - FADE_FRAMES, SHOTS[2].frames], [0, 1, 1, 0], {
    easing: easeOutExpo,
  });

  const scale = interpolate(frame, [0, SHOTS[2].frames * 0.6], [0.9, 1.0], { easing: easeOutExpo });
  const rotateX = interpolate(frame, [0, SHOTS[2].frames * 0.6], [-20, -15], { easing: easeInOutCubic });
  const rotateY = interpolate(frame, [0, SHOTS[2].frames * 0.6], [5, 0], { easing: easeInOutCubic });

  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          gap: '40px',
          padding: '80px',
        }}
      >
        {/* Title */}
        <h3
          style={{
            fontFamily: 'Work Sans, sans-serif',
            fontWeight: 600,
            fontSize: '48px',
            color: COLORS.white,
            margin: 0,
          }}
        >
          Optimize your yields
        </h3>

        {/* Dashboard Screenshot (3D tilted) */}
        <div
          style={{
            perspective: '1200px',
          }}
        >
          <div
            style={{
              transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
              transformStyle: 'preserve-3d',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: `
                0 0 40px rgba(87, 64, 206, 0.3),
                0 20px 60px rgba(0, 0, 0, 0.5)
              `,
            }}
          >
            <Img
              src={staticFile('curvance-assets/app-dashboard-screenshot.png')}
              style={{
                width: '1200px',
                height: 'auto',
                display: 'block',
              }}
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// SHOT 4: Auto-Compound — Feature + description (medium)
// ============================================================================
const Shot4AutoCompound: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = interpolate(frame, [0, FADE_FRAMES, SHOTS[3].frames - FADE_FRAMES, SHOTS[3].frames], [0, 1, 1, 0], {
    easing: easeOutExpo,
  });

  const titleProgress = interpolate(frame, [0, WORD_DURATION], [0, 1], { easing: easeOutExpo, extrapolateRight: 'clamp' });
  const descProgress = interpolate(frame, [WORD_STAGGER, WORD_STAGGER + WORD_DURATION], [0, 1], {
    easing: easeOutExpo,
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Pulsing glow effect (active compounding state)
  const pulseProgress = (frame % (fps * 2)) / (fps * 2);
  const pulseIntensity = interpolate(Math.sin(pulseProgress * Math.PI * 2), [-1, 1], [0.5, 1.0]);

  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          gap: '40px',
        }}
      >
        {/* Feature Title */}
        <h3
          style={{
            fontFamily: 'Work Sans, sans-serif',
            fontWeight: 700,
            fontSize: '64px',
            color: COLORS.purple,
            opacity: interpolate(titleProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(titleProgress, [0, 1], [20, 0])}px)`,
          }}
        >
          Auto-compound yields
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: 'Work Sans, sans-serif',
            fontWeight: 500,
            fontSize: '28px',
            color: COLORS.muted,
            textAlign: 'center',
            maxWidth: '800px',
            lineHeight: 1.6,
            opacity: interpolate(descProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(descProgress, [0, 1], [20, 0])}px)`,
          }}
        >
          Maximize returns with automated<br />
          reinvestment strategies
        </p>

        {/* Visual indicator (pulsing icon) */}
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: `rgba(87, 64, 206, ${0.2 * pulseIntensity})`,
            border: `2px solid rgba(87, 64, 206, ${pulseIntensity})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 0 ${30 * pulseIntensity}px rgba(87, 64, 206, ${0.6 * pulseIntensity})`,
          }}
        >
          <Img
            src={staticFile('curvance-assets/icon-comp.svg')}
            style={{ width: '40px', height: '40px', opacity: pulseIntensity }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// SHOT 5: Stats — APY Counter Animation (medium)
// ============================================================================
const Shot5Stats: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = interpolate(frame, [0, FADE_FRAMES, SHOTS[4].frames - FADE_FRAMES, SHOTS[4].frames], [0, 1, 1, 0], {
    easing: easeOutExpo,
  });

  const countProgress = interpolate(frame, [FADE_FRAMES, SHOTS[4].frames * 0.7], [0, 1], {
    easing: easeOutExpo,
    extrapolateRight: 'clamp',
  });

  const apy = 8.7 + countProgress * 6.3; // Count from 8.7% to 15.0%

  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          gap: '20px',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontFamily: 'Work Sans, sans-serif',
              fontWeight: 700,
              fontSize: '120px',
              background: `linear-gradient(90deg, ${COLORS.green} 0%, ${COLORS.greenBright} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.03em',
            }}
          >
            {apy.toFixed(1)}%
          </div>
          <div
            style={{
              fontFamily: 'Work Sans, sans-serif',
              fontWeight: 500,
              fontSize: '36px',
              color: COLORS.muted,
              marginTop: '10px',
            }}
          >
            Average APY
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// SHOT 6: Liquidity — Instant access UI (medium-long)
// ============================================================================
const Shot6Liquidity: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = interpolate(frame, [0, FADE_FRAMES, SHOTS[5].frames - FADE_FRAMES, SHOTS[5].frames], [0, 1, 1, 0], {
    easing: easeOutExpo,
  });

  const titleProgress = interpolate(frame, [0, WORD_DURATION], [0, 1], { easing: easeOutExpo, extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          gap: '60px',
          padding: '80px',
        }}
      >
        <h3
          style={{
            fontFamily: 'Work Sans, sans-serif',
            fontWeight: 700,
            fontSize: '64px',
            color: COLORS.cyan,
            opacity: interpolate(titleProgress, [0, 1], [0, 1]),
          }}
        >
          Instant liquidity
        </h3>

        {/* Borrow screenshot */}
        <div
          style={{
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: `0 0 40px rgba(6, 182, 212, 0.3), 0 20px 60px rgba(0, 0, 0, 0.5)`,
          }}
        >
          <Img
            src={staticFile('curvance-assets/app-borrow-screenshot.png')}
            style={{
              width: '1000px',
              height: 'auto',
              display: 'block',
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// SHOT 7: Security — Audit badges (short)
// ============================================================================
const Shot7Security: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = interpolate(frame, [0, FADE_FRAMES, SHOTS[6].frames - FADE_FRAMES, SHOTS[6].frames], [0, 1, 1, 0], {
    easing: easeOutExpo,
  });

  const partners = [
    'branding-trail-of-bits.svg',
    'branding-spearbit.svg',
    'branding-trust-sec.svg',
  ];

  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          gap: '40px',
        }}
      >
        <h3
          style={{
            fontFamily: 'Work Sans, sans-serif',
            fontWeight: 600,
            fontSize: '48px',
            color: COLORS.white,
          }}
        >
          Audited by the best
        </h3>

        <div style={{ display: 'flex', gap: '60px', alignItems: 'center' }}>
          {partners.map((partner, i) => {
            const stagger = i * 8;
            const partnerProgress = interpolate(
              frame,
              [stagger, stagger + FADE_FRAMES],
              [0, 1],
              { easing: easeOutExpo, extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
            );

            return (
              <Img
                key={i}
                src={staticFile(`curvance-assets/${partner}`)}
                style={{
                  width: '120px',
                  height: '120px',
                  opacity: interpolate(partnerProgress, [0, 1], [0, 1]),
                  transform: `scale(${interpolate(partnerProgress, [0, 1], [0.9, 1.0])})`,
                  filter: 'brightness(0) invert(1)', // Make logos white
                }}
              />
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// SHOT 8: Brand Close — Logo + tagline (medium)
// ============================================================================
const Shot8BrandClose: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = interpolate(frame, [0, FADE_FRAMES, SHOTS[7].frames - FADE_FRAMES, SHOTS[7].frames], [0, 1, 1, 0], {
    easing: easeOutExpo,
  });

  const logoProgress = interpolate(frame, [0, WORD_DURATION], [0, 1], { easing: easeOutExpo, extrapolateRight: 'clamp' });
  const taglineProgress = interpolate(frame, [WORD_STAGGER, WORD_STAGGER + WORD_DURATION], [0, 1], {
    easing: easeOutExpo,
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          gap: '40px',
        }}
      >
        {/* Curvance Logo */}
        <Img
          src={staticFile('curvance-assets/curvance-logo-black.svg')}
          style={{
            width: '400px',
            height: 'auto',
            opacity: interpolate(logoProgress, [0, 1], [0, 1]),
            transform: `scale(${interpolate(logoProgress, [0, 1], [0.95, 1.0])})`,
            filter: 'brightness(0) invert(1)', // Make logo white on dark background
          }}
        />

        {/* Tagline */}
        <p
          style={{
            fontFamily: 'Work Sans, sans-serif',
            fontWeight: 500,
            fontSize: '32px',
            color: COLORS.muted,
            opacity: interpolate(taglineProgress, [0, 1], [0, 1]),
          }}
        >
          Curvance Bytes
        </p>
      </div>
    </AbsoluteFill>
  );
};
