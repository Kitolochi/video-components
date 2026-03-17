import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, Img, staticFile, Audio } from 'remotion';
import { loadFont } from '@remotion/google-fonts/SpaceGrotesk';
import { loadFont as loadDMSans } from '@remotion/google-fonts/DMSans';
import { loadFont as loadDMSerifDisplay } from '@remotion/google-fonts/DMSerifDisplay';

// Load Google Fonts
const { fontFamily: spaceGroteskFont } = loadFont();
const { fontFamily: dmSansFont } = loadDMSans();
const { fontFamily: dmSerifFont } = loadDMSerifDisplay();

/**
 * Curvance Bytes Launch V3 — Premium Typography + Sound Effects
 *
 * IMPROVEMENTS FROM V2:
 * - Creative font pairings (Space Grotesk + DM Sans + DM Serif Display)
 * - Visual typography hierarchy with weights, sizes, letter-spacing
 * - Sound effects for transitions, impacts, and UI interactions
 * - Kinetic typography techniques (stagger, rotation, scale, opacity)
 *
 * TYPOGRAPHY SYSTEM:
 * - Hero: Space Grotesk Bold 700 (96-120px) — Tech-forward, geometric
 * - Display: DM Serif Display (72-84px) — Premium accent, humanist
 * - UI/Body: DM Sans Medium 500-600 (24-48px) — Clean, professional
 * - Data: Space Grotesk 600 (48-72px) — Numbers, stats, technical
 *
 * SOUND DESIGN:
 * - Whoosh: Scene transitions (subtle swoosh)
 * - Impact: Title slams, stat reveals (punchy thump)
 * - UI Click: Button highlights, icon entrances (micro-interaction)
 * - Ambience: Background texture (optional low drone)
 *
 * Total: ~22s (same as V2, optimized timing)
 */

// REAL Curvance brand colors
const COLORS = {
  purple: '#5740ce',
  dark: '#06001a',
  white: '#ffffff',
  lightGray: '#f9f9fb',
  muted: '#656375',
  green: '#10b981',
  greenBright: '#34d399',
  cyan: '#06b6d4',
};

// Premium easing
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOutBack = (t: number) => 1 + 2.70158 * Math.pow(t - 1, 3) + 1.70158 * Math.pow(t - 1, 2);

// Dynamic timing (same as V2)
const SHOTS = [
  { name: 'Hook', frames: 90 },
  { name: 'ValueProp', frames: 150 },
  { name: 'Dashboard', frames: 270 },
  { name: 'AutoCompound', frames: 210 },
  { name: 'Stats', frames: 180 },
  { name: 'Liquidity', frames: 240 },
  { name: 'Security', frames: 150 },
  { name: 'BrandClose', frames: 180 },
];

const TOTAL_FRAMES = SHOTS.reduce((sum, shot) => sum + shot.frames, 0);
const OVERLAP_FRAMES = 12;

const getShotStart = (index: number): number => {
  return SHOTS.slice(0, index).reduce((sum, shot) => sum + shot.frames, 0) - (index * OVERLAP_FRAMES);
};

const FADE_FRAMES = 24;
const WORD_DURATION = 36;
const WORD_STAGGER = 12;

export const CurvanceBytesLaunchV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: COLORS.dark }}>
      {/* Background Audio (optional ambient texture) */}
      {/* <Audio src={staticFile('sfx/ambient-drone.mp3')} volume={0.2} /> */}

      <Sequence from={getShotStart(0)} durationInFrames={SHOTS[0].frames}>
        <Shot1Hook frame={frame - getShotStart(0)} fps={fps} />
      </Sequence>

      <Sequence from={getShotStart(1)} durationInFrames={SHOTS[1].frames}>
        <Shot2ValueProp frame={frame - getShotStart(1)} fps={fps} />
      </Sequence>

      <Sequence from={getShotStart(2)} durationInFrames={SHOTS[2].frames}>
        <Shot3Dashboard frame={frame - getShotStart(2)} fps={fps} />
      </Sequence>

      <Sequence from={getShotStart(3)} durationInFrames={SHOTS[3].frames}>
        <Shot4AutoCompound frame={frame - getShotStart(3)} fps={fps} />
      </Sequence>

      <Sequence from={getShotStart(4)} durationInFrames={SHOTS[4].frames}>
        <Shot5Stats frame={frame - getShotStart(4)} fps={fps} />
      </Sequence>

      <Sequence from={getShotStart(5)} durationInFrames={SHOTS[5].frames}>
        <Shot6Liquidity frame={frame - getShotStart(5)} fps={fps} />
      </Sequence>

      <Sequence from={getShotStart(6)} durationInFrames={SHOTS[6].frames}>
        <Shot7Security frame={frame - getShotStart(6)} fps={fps} />
      </Sequence>

      <Sequence from={getShotStart(7)} durationInFrames={SHOTS[7].frames}>
        <Shot8BrandClose frame={frame - getShotStart(7)} fps={fps} />
      </Sequence>
    </AbsoluteFill>
  );
};

// ============================================================================
// SHOT 1: Hook — "Introducing" (Space Grotesk Bold, kinetic entry)
// ============================================================================
const Shot1Hook: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = interpolate(frame, [0, FADE_FRAMES, SHOTS[0].frames - FADE_FRAMES, SHOTS[0].frames], [0, 1, 1, 0], {
    easing: easeOutExpo,
  });

  const scale = interpolate(frame, [0, SHOTS[0].frames * 0.6], [1.2, 1.0], { easing: easeOutExpo });
  const blur = interpolate(frame, [0, FADE_FRAMES], [8, 0], { easing: easeOutExpo });

  // Letter-by-letter entrance with rotation
  const letters = 'INTRODUCING'.split('');

  return (
    <AbsoluteFill style={{ opacity }}>
      {/* SFX: Whoosh on entrance */}
      {frame === 0 && <Audio src={staticFile('sfx/whoosh-in.wav')} volume={0.4} />}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          filter: `blur(${blur}px)`,
        }}
      >
        <div style={{ display: 'flex', gap: '4px' }}>
          {letters.map((letter, i) => {
            const stagger = i * 3;
            const letterProgress = interpolate(
              frame,
              [stagger, stagger + 20],
              [0, 1],
              { easing: easeOutBack, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
            );

            const letterOpacity = interpolate(letterProgress, [0, 1], [0, 1]);
            const letterScale = interpolate(letterProgress, [0, 1], [0.8, 1.0]);
            const letterRotate = interpolate(letterProgress, [0, 1], [-15, 0]);

            return (
              <span
                key={i}
                style={{
                  fontFamily: spaceGroteskFont,
                  fontWeight: 700,
                  fontSize: '120px',
                  color: COLORS.purple,
                  letterSpacing: '-0.03em',
                  opacity: letterOpacity,
                  transform: `scale(${letterScale * scale}) rotate(${letterRotate}deg)`,
                  display: 'inline-block',
                }}
              >
                {letter}
              </span>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// SHOT 2: Value Prop — "Click less, earn more" (Serif + Sans contrast)
// ============================================================================
const Shot2ValueProp: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = interpolate(frame, [0, FADE_FRAMES, SHOTS[1].frames - FADE_FRAMES, SHOTS[1].frames], [0, 1, 1, 0], {
    easing: easeOutExpo,
  });

  const line1Progress = interpolate(frame, [0, WORD_DURATION], [0, 1], { easing: easeOutExpo, extrapolateRight: 'clamp' });
  const line2Progress = interpolate(frame, [WORD_STAGGER * 2, WORD_STAGGER * 2 + WORD_DURATION], [0, 1], {
    easing: easeOutExpo,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ opacity }}>
      {/* SFX: UI click on "earn more" */}
      {frame === WORD_STAGGER * 2 && <Audio src={staticFile('sfx/ui-click.wav')} volume={0.3} />}

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
        {/* Line 1: DM Sans (sans-serif) */}
        <h2
          style={{
            fontFamily: dmSansFont,
            fontWeight: 500,
            fontSize: '64px',
            color: COLORS.muted,
            letterSpacing: '0.02em',
            margin: 0,
            opacity: interpolate(line1Progress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(line1Progress, [0, 1], [30, 0])}px)`,
          }}
        >
          Click less,
        </h2>

        {/* Line 2: DM Serif Display (serif contrast) */}
        <h1
          style={{
            fontFamily: dmSerifFont,
            fontWeight: 400,
            fontSize: '96px',
            background: `linear-gradient(135deg, ${COLORS.purple} 0%, ${COLORS.cyan} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em',
            margin: 0,
            opacity: interpolate(line2Progress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(line2Progress, [0, 1], [30, 0])}px) scale(${interpolate(line2Progress, [0, 1], [0.95, 1.0])})`,
          }}
        >
          earn more.
        </h1>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// SHOT 3: Dashboard — Product screenshot with kinetic title
// ============================================================================
const Shot3Dashboard: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = interpolate(frame, [0, FADE_FRAMES, SHOTS[2].frames - FADE_FRAMES, SHOTS[2].frames], [0, 1, 1, 0], {
    easing: easeOutExpo,
  });

  const titleProgress = interpolate(frame, [0, WORD_DURATION], [0, 1], { easing: easeOutExpo, extrapolateRight: 'clamp' });
  const dashProgress = interpolate(frame, [WORD_DURATION, SHOTS[2].frames * 0.5], [0, 1], {
    easing: easeOutExpo,
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(dashProgress, [0, 1], [0.9, 1.0]);
  const rotateX = interpolate(dashProgress, [0, 1], [-20, -15]);
  const rotateY = interpolate(dashProgress, [0, 1], [5, 0]);

  return (
    <AbsoluteFill style={{ opacity }}>
      {/* SFX: Impact on dashboard reveal */}
      {frame === Math.round(WORD_DURATION * 1.5) && <Audio src={staticFile('sfx/impact-soft.wav')} volume={0.5} />}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          gap: '50px',
          padding: '80px',
        }}
      >
        {/* Title with mixed weights */}
        <div style={{ textAlign: 'center' }}>
          <h3
            style={{
              fontFamily: dmSansFont,
              fontWeight: 300,
              fontSize: '32px',
              color: COLORS.muted,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              margin: 0,
              opacity: interpolate(titleProgress, [0, 1], [0, 1]),
            }}
          >
            Optimize
          </h3>
          <h2
            style={{
              fontFamily: spaceGroteskFont,
              fontWeight: 700,
              fontSize: '72px',
              color: COLORS.white,
              letterSpacing: '-0.03em',
              margin: '10px 0 0 0',
              opacity: interpolate(titleProgress, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(titleProgress, [0, 1], [20, 0])}px)`,
            }}
          >
            your yields
          </h2>
        </div>

        {/* Dashboard Screenshot */}
        <div style={{ perspective: '1200px' }}>
          <div
            style={{
              transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
              transformStyle: 'preserve-3d',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: `
                0 0 50px rgba(87, 64, 206, 0.4),
                0 30px 80px rgba(0, 0, 0, 0.6)
              `,
              opacity: interpolate(dashProgress, [0, 1], [0, 1]),
            }}
          >
            <Img
              src={staticFile('curvance-assets/app-dashboard-screenshot.png')}
              style={{ width: '1200px', height: 'auto', display: 'block' }}
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// SHOT 4: Auto-Compound — Large number with small label (contrast)
// ============================================================================
const Shot4AutoCompound: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = interpolate(frame, [0, FADE_FRAMES, SHOTS[3].frames - FADE_FRAMES, SHOTS[3].frames], [0, 1, 1, 0], {
    easing: easeOutExpo,
  });

  const titleProgress = interpolate(frame, [0, WORD_DURATION], [0, 1], { easing: easeOutExpo, extrapolateRight: 'clamp' });
  const descProgress = interpolate(frame, [WORD_STAGGER * 2, WORD_STAGGER * 2 + WORD_DURATION], [0, 1], {
    easing: easeOutExpo,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const pulseProgress = (frame % (fps * 2)) / (fps * 2);
  const pulseIntensity = interpolate(Math.sin(pulseProgress * Math.PI * 2), [-1, 1], [0.6, 1.0]);

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
        {/* Big bold title */}
        <h1
          style={{
            fontFamily: spaceGroteskFont,
            fontWeight: 700,
            fontSize: '84px',
            color: COLORS.purple,
            letterSpacing: '-0.04em',
            margin: 0,
            opacity: interpolate(titleProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(titleProgress, [0, 1], [30, 0])}px)`,
          }}
        >
          Auto-compound
        </h1>

        {/* Small serif description */}
        <p
          style={{
            fontFamily: dmSerifFont,
            fontWeight: 400,
            fontSize: '36px',
            color: COLORS.muted,
            textAlign: 'center',
            maxWidth: '700px',
            lineHeight: 1.5,
            letterSpacing: '0.01em',
            margin: 0,
            opacity: interpolate(descProgress, [0, 1], [0, 1]),
          }}
        >
          Maximize returns with<br />
          automated reinvestment
        </p>

        {/* Pulsing icon */}
        <div
          style={{
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            background: `rgba(87, 64, 206, ${0.15 * pulseIntensity})`,
            border: `3px solid rgba(87, 64, 206, ${pulseIntensity})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 0 ${40 * pulseIntensity}px rgba(87, 64, 206, ${0.7 * pulseIntensity})`,
          }}
        >
          <Img
            src={staticFile('curvance-assets/icon-comp.svg')}
            style={{ width: '45px', height: '45px', opacity: pulseIntensity }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// SHOT 5: Stats — Giant number with small unit (data-focused)
// ============================================================================
const Shot5Stats: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = interpolate(frame, [0, FADE_FRAMES, SHOTS[4].frames - FADE_FRAMES, SHOTS[4].frames], [0, 1, 1, 0], {
    easing: easeOutExpo,
  });

  const countProgress = interpolate(frame, [FADE_FRAMES, SHOTS[4].frames * 0.7], [0, 1], {
    easing: easeOutExpo,
    extrapolateRight: 'clamp',
  });

  const apy = 8.7 + countProgress * 6.3;

  return (
    <AbsoluteFill style={{ opacity }}>
      {/* SFX: Impact on number reveal */}
      {frame === FADE_FRAMES && <Audio src={staticFile('sfx/impact-hard.wav')} volume={0.6} />}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          gap: '10px',
        }}
      >
        {/* Giant number (Space Grotesk for data) */}
        <div
          style={{
            fontFamily: spaceGroteskFont,
            fontWeight: 700,
            fontSize: '160px',
            background: `linear-gradient(90deg, ${COLORS.green} 0%, ${COLORS.greenBright} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.05em',
            lineHeight: 1,
          }}
        >
          {apy.toFixed(1)}%
        </div>

        {/* Small label (DM Sans light) */}
        <div
          style={{
            fontFamily: dmSansFont,
            fontWeight: 300,
            fontSize: '28px',
            color: COLORS.muted,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Average APY
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// SHOT 6: Liquidity — Title with italic emphasis
// ============================================================================
const Shot6Liquidity: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = interpolate(frame, [0, FADE_FRAMES, SHOTS[5].frames - FADE_FRAMES, SHOTS[5].frames], [0, 1, 1, 0], {
    easing: easeOutExpo,
  });

  const titleProgress = interpolate(frame, [0, WORD_DURATION], [0, 1], { easing: easeOutExpo, extrapolateRight: 'clamp' });
  const uiProgress = interpolate(frame, [WORD_STAGGER * 2, SHOTS[5].frames * 0.5], [0, 1], {
    easing: easeOutExpo,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
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
          gap: '60px',
          padding: '80px',
        }}
      >
        {/* Mixed weight + italic title */}
        <div style={{ textAlign: 'center' }}>
          <h2
            style={{
              fontFamily: dmSansFont,
              fontWeight: 300,
              fontSize: '48px',
              color: COLORS.muted,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              margin: 0,
              opacity: interpolate(titleProgress, [0, 1], [0, 1]),
            }}
          >
            Instant
          </h2>
          <h1
            style={{
              fontFamily: dmSerifFont,
              fontWeight: 400,
              fontStyle: 'italic',
              fontSize: '84px',
              color: COLORS.cyan,
              letterSpacing: '-0.02em',
              margin: '10px 0 0 0',
              opacity: interpolate(titleProgress, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(titleProgress, [0, 1], [20, 0])}px)`,
            }}
          >
            liquidity
          </h1>
        </div>

        {/* Borrow screenshot */}
        <div
          style={{
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: `0 0 50px rgba(6, 182, 212, 0.4), 0 30px 80px rgba(0, 0, 0, 0.6)`,
            opacity: interpolate(uiProgress, [0, 1], [0, 1]),
            transform: `scale(${interpolate(uiProgress, [0, 1], [0.95, 1.0])})`,
          }}
        >
          <Img
            src={staticFile('curvance-assets/app-borrow-screenshot.png')}
            style={{ width: '1000px', height: 'auto', display: 'block' }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// SHOT 7: Security — Condensed caps + logo grid
// ============================================================================
const Shot7Security: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = interpolate(frame, [0, FADE_FRAMES, SHOTS[6].frames - FADE_FRAMES, SHOTS[6].frames], [0, 1, 1, 0], {
    easing: easeOutExpo,
  });

  const partners = ['branding-trail-of-bits.svg', 'branding-spearbit.svg', 'branding-trust-sec.svg'];

  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          gap: '50px',
        }}
      >
        {/* Condensed caps title */}
        <h3
          style={{
            fontFamily: spaceGroteskFont,
            fontWeight: 600,
            fontSize: '56px',
            color: COLORS.white,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          Audited by the best
        </h3>

        <div style={{ display: 'flex', gap: '70px', alignItems: 'center' }}>
          {partners.map((partner, i) => {
            const stagger = i * 10;
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
                  width: '140px',
                  height: '140px',
                  opacity: interpolate(partnerProgress, [0, 1], [0, 1]),
                  transform: `scale(${interpolate(partnerProgress, [0, 1], [0.9, 1.0])})`,
                  filter: 'brightness(0) invert(1)',
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
// SHOT 8: Brand Close — Logo with serif tagline
// ============================================================================
const Shot8BrandClose: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = interpolate(frame, [0, FADE_FRAMES, SHOTS[7].frames - FADE_FRAMES, SHOTS[7].frames], [0, 1, 1, 0], {
    easing: easeOutExpo,
  });

  const logoProgress = interpolate(frame, [0, WORD_DURATION], [0, 1], { easing: easeOutExpo, extrapolateRight: 'clamp' });
  const taglineProgress = interpolate(frame, [WORD_STAGGER * 2, WORD_STAGGER * 2 + WORD_DURATION], [0, 1], {
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
        <Img
          src={staticFile('curvance-assets/curvance-logo-black.svg')}
          style={{
            width: '450px',
            height: 'auto',
            opacity: interpolate(logoProgress, [0, 1], [0, 1]),
            transform: `scale(${interpolate(logoProgress, [0, 1], [0.95, 1.0])})`,
            filter: 'brightness(0) invert(1)',
          }}
        />

        {/* Serif tagline */}
        <p
          style={{
            fontFamily: dmSerifFont,
            fontWeight: 400,
            fontSize: '42px',
            color: COLORS.muted,
            fontStyle: 'italic',
            opacity: interpolate(taglineProgress, [0, 1], [0, 1]),
          }}
        >
          Curvance Bytes
        </p>
      </div>
    </AbsoluteFill>
  );
};
