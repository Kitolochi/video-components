import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

/**
 * Fluid Typography Demo — MarkKnd Text Animation Techniques
 *
 * Showcases premium text animations:
 * 1. Word-level staggered reveals (200ms gaps, 600ms per word)
 * 2. Cross-fade transitions between text scenes (400ms + 200ms overlap)
 * 3. Premium easing curves (easeOutExpo, NOT linear)
 * 4. Gradient text fills (brand identity colors)
 * 5. Subtle upward drift + scale (dimensionality without 3D)
 * 6. Typography overlays on UI (statement + proof pattern)
 *
 * 8 scenes, 3s each, 24s total (1440 frames at 60fps)
 * Focus: Typography as hero element
 */

// Premium easing functions
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Color palette (MarkKnd-inspired)
const COLORS = {
  navy: '#0a0e27',
  purpleBlack: '#1a0a2e',
  deepPurple: '#2d1047',
  magenta: '#5a2d7a',
  cyan: '#00d9ff',
  magentaBright: '#d946ef',
  white: '#ffffff',
  whiteAlpha: 'rgba(255, 255, 255, 0.6)',
};

// Timing constants
const SCENE_DURATION = 180; // 3s at 60fps
const FADE_FRAMES = 24; // 400ms
const OVERLAP_FRAMES = 12; // 200ms
const WORD_DURATION = 36; // 600ms per word
const WORD_STAGGER = 12; // 200ms between words

export const FluidTypography: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {/* Scene 1: "Meet" - Single word reveal (0-3s) */}
      <Sequence from={0} durationInFrames={SCENE_DURATION}>
        <Scene1Meet frame={frame} fps={fps} />
      </Sequence>

      {/* Scene 2: "The humanly possible" - Word-by-word reveal (3-6s) */}
      <Sequence from={SCENE_DURATION - OVERLAP_FRAMES} durationInFrames={SCENE_DURATION}>
        <Scene2HumanlyPossible frame={frame - (SCENE_DURATION - OVERLAP_FRAMES)} fps={fps} />
      </Sequence>

      {/* Scene 3: "Create without limits" - Staggered with scale (6-9s) */}
      <Sequence from={SCENE_DURATION * 2 - OVERLAP_FRAMES} durationInFrames={SCENE_DURATION}>
        <Scene3CreateLimits frame={frame - (SCENE_DURATION * 2 - OVERLAP_FRAMES)} fps={fps} />
      </Sequence>

      {/* Scene 4: "Build. Ship. Iterate." - Punctuated rhythm (9-12s) */}
      <Sequence from={SCENE_DURATION * 3 - OVERLAP_FRAMES} durationInFrames={SCENE_DURATION}>
        <Scene4BuildShip frame={frame - (SCENE_DURATION * 3 - OVERLAP_FRAMES)} fps={fps} />
      </Sequence>

      {/* Scene 5: Gradient text reveal (12-15s) */}
      <Sequence from={SCENE_DURATION * 4 - OVERLAP_FRAMES} durationInFrames={SCENE_DURATION}>
        <Scene5GradientText frame={frame - (SCENE_DURATION * 4 - OVERLAP_FRAMES)} fps={fps} />
      </Sequence>

      {/* Scene 6: Typography + UI overlay (statement + proof) (15-18s) */}
      <Sequence from={SCENE_DURATION * 5 - OVERLAP_FRAMES} durationInFrames={SCENE_DURATION}>
        <Scene6TypographyUI frame={frame - (SCENE_DURATION * 5 - OVERLAP_FRAMES)} fps={fps} />
      </Sequence>

      {/* Scene 7: Character-level reveal (for emphasis) (18-21s) */}
      <Sequence from={SCENE_DURATION * 6 - OVERLAP_FRAMES} durationInFrames={SCENE_DURATION}>
        <Scene7CharacterReveal frame={frame - (SCENE_DURATION * 6 - OVERLAP_FRAMES)} fps={fps} />
      </Sequence>

      {/* Scene 8: Final brand statement (21-24s) */}
      <Sequence from={SCENE_DURATION * 7 - OVERLAP_FRAMES} durationInFrames={SCENE_DURATION}>
        <Scene8BrandClose frame={frame - (SCENE_DURATION * 7 - OVERLAP_FRAMES)} fps={fps} />
      </Sequence>
    </AbsoluteFill>
  );
};

// Utility: Cross-fade opacity
const useCrossFadeOpacity = (frame: number) => {
  return interpolate(
    frame,
    [0, FADE_FRAMES, SCENE_DURATION - FADE_FRAMES, SCENE_DURATION],
    [0, 1, 1, 0],
    {
      easing: easeOutExpo,
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
};

// Scene 1: Single word "Meet" - Clean, confident opener
const Scene1Meet: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = useCrossFadeOpacity(frame);
  const wordProgress = interpolate(frame, [0, WORD_DURATION], [0, 1], { easing: easeOutExpo, extrapolateRight: 'clamp' });

  const textOpacity = interpolate(wordProgress, [0, 1], [0, 1]);
  const translateY = interpolate(wordProgress, [0, 1], [20, 0]);
  const scale = interpolate(wordProgress, [0, 1], [0.95, 1.0]);

  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.purpleBlack} 100%)`,
        }}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <h1
          style={{
            fontFamily: 'Inter',
            fontSize: '120px',
            fontWeight: 900,
            color: COLORS.white,
            opacity: textOpacity,
            transform: `translateY(${translateY}px) scale(${scale})`,
          }}
        >
          Meet
        </h1>
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: Word-by-word reveal "The humanly possible"
const Scene2HumanlyPossible: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = useCrossFadeOpacity(frame);
  const words = ['The', 'humanly', 'possible'];

  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, ${COLORS.purpleBlack} 0%, ${COLORS.deepPurple} 100%)`,
        }}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          gap: '24px',
          flexWrap: 'wrap',
          padding: '0 100px',
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

          const textOpacity = interpolate(wordProgress, [0, 1], [0, 1]);
          const translateY = interpolate(wordProgress, [0, 1], [20, 0]);
          const scale = interpolate(wordProgress, [0, 1], [0.95, 1.0]);

          return (
            <span
              key={i}
              style={{
                fontFamily: 'Inter',
                fontSize: word === 'possible' ? '100px' : '80px',
                fontWeight: word === 'possible' ? 900 : 700,
                color: word === 'possible' ? COLORS.cyan : COLORS.white,
                opacity: textOpacity,
                transform: `translateY(${translateY}px) scale(${scale})`,
                display: 'inline-block',
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: "Create without limits" - Two-line stagger
const Scene3CreateLimits: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = useCrossFadeOpacity(frame);

  const line1Progress = interpolate(frame, [0, WORD_DURATION], [0, 1], { easing: easeOutExpo, extrapolateRight: 'clamp' });
  const line2Progress = interpolate(frame, [WORD_STAGGER * 2, WORD_STAGGER * 2 + WORD_DURATION], [0, 1], { easing: easeOutExpo, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const line1Opacity = interpolate(line1Progress, [0, 1], [0, 1]);
  const line1Y = interpolate(line1Progress, [0, 1], [20, 0]);
  const line1Scale = interpolate(line1Progress, [0, 1], [0.95, 1.0]);

  const line2Opacity = interpolate(line2Progress, [0, 1], [0, 1]);
  const line2Y = interpolate(line2Progress, [0, 1], [20, 0]);
  const line2Scale = interpolate(line2Progress, [0, 1], [0.95, 1.0]);

  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, ${COLORS.deepPurple} 0%, ${COLORS.magenta} 100%)`,
        }}
      />
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
        <h2
          style={{
            fontFamily: 'Inter',
            fontSize: '90px',
            fontWeight: 700,
            color: COLORS.white,
            opacity: line1Opacity,
            transform: `translateY(${line1Y}px) scale(${line1Scale})`,
            margin: 0,
          }}
        >
          Create
        </h2>
        <h2
          style={{
            fontFamily: 'Inter',
            fontSize: '80px',
            fontWeight: 500,
            color: COLORS.whiteAlpha,
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px) scale(${line2Scale})`,
            margin: 0,
          }}
        >
          without limits
        </h2>
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: "Build. Ship. Iterate." - Punctuated rhythm
const Scene4BuildShip: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = useCrossFadeOpacity(frame);
  const words = ['Build.', 'Ship.', 'Iterate.'];

  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.purpleBlack} 100%)`,
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          height: '100%',
          paddingLeft: '150px',
          gap: '30px',
        }}
      >
        {words.map((word, i) => {
          const startFrame = i * (WORD_DURATION + WORD_STAGGER * 2);
          const wordProgress = interpolate(
            frame,
            [startFrame, startFrame + WORD_DURATION],
            [0, 1],
            { easing: easeOutExpo, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );

          const textOpacity = interpolate(wordProgress, [0, 1], [0, 1]);
          const translateX = interpolate(wordProgress, [0, 1], [-30, 0]);
          const scale = interpolate(wordProgress, [0, 1], [0.9, 1.0]);

          return (
            <h2
              key={i}
              style={{
                fontFamily: 'Inter',
                fontSize: '80px',
                fontWeight: 800,
                color: i === words.length - 1 ? COLORS.cyan : COLORS.white,
                opacity: textOpacity,
                transform: `translateX(${translateX}px) scale(${scale})`,
                margin: 0,
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

// Scene 5: Gradient text reveal
const Scene5GradientText: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = useCrossFadeOpacity(frame);
  const textProgress = interpolate(frame, [0, WORD_DURATION * 1.5], [0, 1], { easing: easeOutExpo, extrapolateRight: 'clamp' });

  const textOpacity = interpolate(textProgress, [0, 1], [0, 1]);
  const translateY = interpolate(textProgress, [0, 1], [30, 0]);
  const scale = interpolate(textProgress, [0, 1], [0.9, 1.0]);

  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, ${COLORS.purpleBlack} 0%, ${COLORS.navy} 100%)`,
        }}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <h1
          style={{
            fontFamily: 'Inter',
            fontSize: '100px',
            fontWeight: 900,
            background: `linear-gradient(90deg, ${COLORS.cyan} 0%, ${COLORS.magentaBright} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            opacity: textOpacity,
            transform: `translateY(${translateY}px) scale(${scale})`,
          }}
        >
          Powered by AI
        </h1>
      </div>
    </AbsoluteFill>
  );
};

// Scene 6: Typography + UI overlay (statement + proof pattern)
const Scene6TypographyUI: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = useCrossFadeOpacity(frame);

  const textProgress = interpolate(frame, [0, WORD_DURATION], [0, 1], { easing: easeOutExpo, extrapolateRight: 'clamp' });
  const uiProgress = interpolate(frame, [WORD_STAGGER, WORD_STAGGER + WORD_DURATION], [0, 1], { easing: easeOutExpo, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const textOpacity = interpolate(textProgress, [0, 1], [0, 1]);
  const uiOpacity = interpolate(uiProgress, [0, 1], [0, 1]);
  const uiScale = interpolate(uiProgress, [0, 1], [0.95, 1.0]);

  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, ${COLORS.deepPurple} 0%, ${COLORS.magenta} 100%)`,
        }}
      />

      {/* Typography overlay (top) */}
      <div
        style={{
          position: 'absolute',
          top: '150px',
          left: '100px',
          right: '100px',
          opacity: textOpacity,
        }}
      >
        <h2
          style={{
            fontFamily: 'Inter',
            fontSize: '48px',
            fontWeight: 700,
            color: COLORS.white,
            margin: 0,
          }}
        >
          Real-time collaboration
        </h2>
      </div>

      {/* UI proof (center) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          paddingTop: '150px',
        }}
      >
        <div
          style={{
            width: '700px',
            height: '400px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '20px',
            border: '2px solid rgba(0, 217, 255, 0.3)',
            boxShadow: '0 40px 80px rgba(0, 0, 0, 0.6)',
            padding: '40px',
            opacity: uiOpacity,
            transform: `scale(${uiScale})`,
          }}
        >
          <div style={{ fontFamily: 'Inter', color: COLORS.white, fontSize: '24px', fontWeight: 600, marginBottom: '20px' }}>
            Active Users: 127
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${COLORS.cyan} 0%, ${COLORS.magentaBright} 100%)`,
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 7: Character-level reveal (for dramatic emphasis)
const Scene7CharacterReveal: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = useCrossFadeOpacity(frame);
  const text = 'LAUNCH';
  const chars = text.split('');

  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.purpleBlack} 100%)`,
        }}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          gap: '10px',
        }}
      >
        {chars.map((char, i) => {
          const startFrame = i * 6; // 100ms per character
          const charProgress = interpolate(
            frame,
            [startFrame, startFrame + 18], // 300ms per char
            [0, 1],
            { easing: easeOutExpo, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );

          const charOpacity = interpolate(charProgress, [0, 1], [0, 1]);
          const translateY = interpolate(charProgress, [0, 1], [40, 0]);
          const scale = interpolate(charProgress, [0, 1], [0.8, 1.0]);

          return (
            <span
              key={i}
              style={{
                fontFamily: 'Inter',
                fontSize: '110px',
                fontWeight: 900,
                color: COLORS.magentaBright,
                opacity: charOpacity,
                transform: `translateY(${translateY}px) scale(${scale})`,
                display: 'inline-block',
                textShadow: `0 0 30px ${COLORS.magentaBright}80`,
              }}
            >
              {char}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Scene 8: Final brand statement
const Scene8BrandClose: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = useCrossFadeOpacity(frame);

  const line1Progress = interpolate(frame, [0, WORD_DURATION], [0, 1], { easing: easeOutExpo, extrapolateRight: 'clamp' });
  const line2Progress = interpolate(frame, [WORD_STAGGER * 2, WORD_STAGGER * 2 + WORD_DURATION], [0, 1], { easing: easeOutExpo, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const line1Opacity = interpolate(line1Progress, [0, 1], [0, 1]);
  const line1Y = interpolate(line1Progress, [0, 1], [20, 0]);

  const line2Opacity = interpolate(line2Progress, [0, 1], [0, 1]);
  const line2Y = interpolate(line2Progress, [0, 1], [20, 0]);

  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, ${COLORS.purpleBlack} 0%, ${COLORS.deepPurple} 100%)`,
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          gap: '30px',
        }}
      >
        <h1
          style={{
            fontFamily: 'Inter',
            fontSize: '100px',
            fontWeight: 900,
            background: `linear-gradient(90deg, ${COLORS.cyan} 0%, ${COLORS.magentaBright} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            opacity: line1Opacity,
            transform: `translateY(${line1Y}px)`,
            margin: 0,
          }}
        >
          Your Product
        </h1>
        <h2
          style={{
            fontFamily: 'Inter',
            fontSize: '32px',
            fontWeight: 500,
            color: COLORS.whiteAlpha,
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px)`,
            margin: 0,
          }}
        >
          Built for the future
        </h2>
      </div>
    </AbsoluteFill>
  );
};
