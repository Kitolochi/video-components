import { AbsoluteFill, Img, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring, staticFile } from 'remotion';

/**
 * Isometric Showcase — Multi-size card gallery
 *
 * Demonstrates size and angle variations:
 * - Large card (800px, rotateX -5°, rotateY 3°)
 * - Medium card (600px, rotateX -8°, rotateY 5°)
 * - Small card (400px, rotateX -10°, rotateY 8°)
 * - Grid layout with staggered animations
 *
 * 60fps-ready: All timing uses fps parameter.
 * Duration: 12s (720 frames at 60fps)
 */
export const IsometricShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0a0e27 0%, #1a0a2e 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Scene 1: Large hero isometric card (0-3s) */}
      <Sequence from={0} durationInFrames={fps * 3}>
        <LargeIsometricCard
          frame={frame}
          fps={fps}
          imageUrl={staticFile('ai-services-hero.png')}
          title="AI-Powered Solutions"
          subtitle="Custom automation that saves money"
          size="large"
          rotateX={-5}
          rotateY={3}
        />
      </Sequence>

      {/* Scene 2: Medium card with different angle (3-6s) */}
      <Sequence from={fps * 3} durationInFrames={fps * 3}>
        <LargeIsometricCard
          frame={frame - fps * 3}
          fps={fps}
          imageUrl={staticFile('ai-services-hero.png')}
          title="Website Design"
          subtitle="Sites that convert visitors into clients"
          size="medium"
          rotateX={-8}
          rotateY={5}
          gradient="linear-gradient(135deg, #1e293b 0%, #334155 100%)"
        />
      </Sequence>

      {/* Scene 3: Small card tilted more (6-9s) */}
      <Sequence from={fps * 6} durationInFrames={fps * 3}>
        <LargeIsometricCard
          frame={frame - fps * 6}
          fps={fps}
          imageUrl={staticFile('ai-services-hero.png')}
          title="AI Chatbot"
          subtitle="Captures leads 24/7 while you sleep"
          size="small"
          rotateX={-10}
          rotateY={8}
          gradient="linear-gradient(135deg, #422006 0%, #713f12 100%)"
        />
      </Sequence>

      {/* Scene 4: Grid of 3 cards (9-12s) */}
      <Sequence from={fps * 9} durationInFrames={fps * 3}>
        <IsometricGrid frame={frame - fps * 9} fps={fps} />
      </Sequence>
    </AbsoluteFill>
  );
};

interface CardProps {
  frame: number;
  fps: number;
  imageUrl: string;
  title: string;
  subtitle: string;
  size: 'small' | 'medium' | 'large';
  rotateX: number;
  rotateY: number;
  gradient?: string;
}

const LargeIsometricCard: React.FC<CardProps> = ({
  frame,
  fps,
  imageUrl,
  title,
  subtitle,
  size,
  rotateX,
  rotateY,
  gradient = 'linear-gradient(135deg, #2d1b4e 0%, #5a2d7a 100%)',
}) => {
  // Size mappings
  const sizeMap = {
    small: { width: 400, padding: 24, titleSize: 24, subtitleSize: 14 },
    medium: { width: 600, padding: 32, titleSize: 32, subtitleSize: 16 },
    large: { width: 800, padding: 40, titleSize: 42, subtitleSize: 18 },
  };

  const config = sizeMap[size];

  // Entry animation
  const entryProgress = spring({
    frame,
    fps,
    config: {
      damping: 200,
    },
  });

  const scale = interpolate(entryProgress, [0, 1], [0.9, 1]);
  const opacity = interpolate(entryProgress, [0, 1], [0, 1]);

  // Cursor movement
  const cursorX = interpolate(frame, [fps * 0.5, fps * 2], [20, config.width - 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const cursorY = interpolate(frame, [fps * 0.5, fps * 2], [20, 80], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Idle float
  const floatY = Math.sin((frame / fps) * Math.PI) * 6;

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity,
      }}
    >
      <div
        style={{
          transform: `
            perspective(1200px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(${scale})
            translateY(${floatY}px)
          `,
          transformStyle: 'preserve-3d',
          width: `${config.width}px`,
          background: gradient,
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: `
            0 20px 60px rgba(0, 0, 0, 0.5),
            0 0 40px rgba(90, 45, 122, 0.3)
          `,
          padding: `${config.padding}px`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Screenshot background */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.15,
            overflow: 'hidden',
            borderRadius: '16px',
          }}
        >
          <Img
            src={imageUrl}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'blur(2px)',
            }}
          />
        </div>

        {/* Content overlay */}
        <div style={{ position: 'relative', zIndex: 10 }}>
          {/* Title */}
          <h2
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: `${config.titleSize}px`,
              color: 'white',
              margin: '0 0 12px 0',
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: `${config.subtitleSize}px`,
              color: 'rgba(255, 255, 255, 0.7)',
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Animated cursor */}
        <div
          style={{
            position: 'absolute',
            left: `${cursorX}px`,
            top: `${cursorY}px`,
            width: 24,
            height: 24,
            pointerEvents: 'none',
            zIndex: 20,
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
            style={{
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
            }}
          >
            <path d="M5 3l14 9-6 1-3 6-5-16z" />
          </svg>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Grid layout with 3 cards (like MarkKnd's model selection UI)
const IsometricGrid: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const cardData = [
    {
      title: 'Websites',
      subtitle: 'Starting at $300',
      gradient: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
      delay: 0,
    },
    {
      title: 'AI Chatbots',
      subtitle: 'Starting at $1,500',
      gradient: 'linear-gradient(135deg, #2d1b4e 0%, #5a2d7a 100%)',
      delay: 0.15,
    },
    {
      title: 'Automation',
      subtitle: 'Starting at $1,000',
      gradient: 'linear-gradient(135deg, #422006 0%, #713f12 100%)',
      delay: 0.3,
    },
  ];

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '30px',
        padding: '0 60px',
      }}
    >
      {cardData.map((card, i) => {
        const entryProgress = spring({
          frame: frame - fps * card.delay,
          fps,
          config: {
            damping: 200,
          },
        });

        const scale = interpolate(entryProgress, [0, 1], [0.85, 1]);
        const opacity = interpolate(entryProgress, [0, 1], [0, 1]);
        const floatY = Math.sin((frame / fps + i) * Math.PI) * 4;

        return (
          <div
            key={i}
            style={{
              transform: `
                perspective(1200px)
                rotateX(-6deg)
                rotateY(${i === 0 ? -2 : i === 2 ? 2 : 0}deg)
                scale(${scale})
                translateY(${floatY}px)
              `,
              transformStyle: 'preserve-3d',
              width: '320px',
              background: card.gradient,
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: `
                0 15px 40px rgba(0, 0, 0, 0.4),
                0 0 30px rgba(90, 45, 122, 0.2)
              `,
              padding: '32px 24px',
              opacity,
            }}
          >
            <h3
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: '24px',
                color: 'white',
                margin: '0 0 8px 0',
              }}
            >
              {card.title}
            </h3>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.7)',
                margin: 0,
              }}
            >
              {card.subtitle}
            </p>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
