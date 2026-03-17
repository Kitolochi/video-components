import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

/**
 * Isometric Variations — Diverse Camera Angles & Zoom Levels
 *
 * 12 different shots (2s each, 24s total):
 * - Extreme close-up tilted
 * - Wide shot overhead
 * - Dutch angle (diagonal tilt)
 * - Zoom punch entrance
 * - Corner focus with depth
 * - Rotating slow spin
 * - Split-screen dual angle
 * - Microscopic detail zoom
 * - Bird's eye top-down
 * - Cinema letterbox tilted
 * - Isometric grid array
 * - Hero slam with scale burst
 *
 * 60fps-ready: All timing uses fps parameter.
 * Duration: 24s (1440 frames at 60fps)
 */

export const IsometricVariations: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0a0e27 0%, #1a0a2e 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Shot 1: Extreme Close-Up Corner (0-2s) */}
      <Sequence from={0} durationInFrames={fps * 2}>
        <ExtremeCloseUp frame={frame} fps={fps} />
      </Sequence>

      {/* Shot 2: Wide Overhead (2-4s) */}
      <Sequence from={fps * 2} durationInFrames={fps * 2}>
        <WideOverhead frame={frame - fps * 2} fps={fps} />
      </Sequence>

      {/* Shot 3: Dutch Angle Diagonal (4-6s) */}
      <Sequence from={fps * 4} durationInFrames={fps * 2}>
        <DutchAngle frame={frame - fps * 4} fps={fps} />
      </Sequence>

      {/* Shot 4: Zoom Punch Entrance (6-8s) */}
      <Sequence from={fps * 6} durationInFrames={fps * 2}>
        <ZoomPunch frame={frame - fps * 6} fps={fps} />
      </Sequence>

      {/* Shot 5: Corner Focus with Depth (8-10s) */}
      <Sequence from={fps * 8} durationInFrames={fps * 2}>
        <CornerFocus frame={frame - fps * 8} fps={fps} />
      </Sequence>

      {/* Shot 6: Slow Rotation Spin (10-12s) */}
      <Sequence from={fps * 10} durationInFrames={fps * 2}>
        <SlowRotation frame={frame - fps * 10} fps={fps} />
      </Sequence>

      {/* Shot 7: Split-Screen Dual Angle (12-14s) */}
      <Sequence from={fps * 12} durationInFrames={fps * 2}>
        <SplitScreenDual frame={frame - fps * 12} fps={fps} />
      </Sequence>

      {/* Shot 8: Microscopic Detail Zoom (14-16s) */}
      <Sequence from={fps * 14} durationInFrames={fps * 2}>
        <MicroscopicZoom frame={frame - fps * 14} fps={fps} />
      </Sequence>

      {/* Shot 9: Bird's Eye Top-Down (16-18s) */}
      <Sequence from={fps * 16} durationInFrames={fps * 2}>
        <BirdsEye frame={frame - fps * 16} fps={fps} />
      </Sequence>

      {/* Shot 10: Cinema Letterbox Tilted (18-20s) */}
      <Sequence from={fps * 18} durationInFrames={fps * 2}>
        <CinemaLetterbox frame={frame - fps * 18} fps={fps} />
      </Sequence>

      {/* Shot 11: Isometric Grid Array (20-22s) */}
      <Sequence from={fps * 20} durationInFrames={fps * 2}>
        <GridArray frame={frame - fps * 20} fps={fps} />
      </Sequence>

      {/* Shot 12: Hero Slam Scale Burst (22-24s) */}
      <Sequence from={fps * 22} durationInFrames={fps * 2}>
        <HeroSlam frame={frame - fps * 22} fps={fps} />
      </Sequence>
    </AbsoluteFill>
  );
};

// Shot 1: Extreme Close-Up Corner (zoomed 3.5x on top-right corner)
const ExtremeCloseUp: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const progress = spring({ frame, fps, config: { damping: 200 } });
  const scale = interpolate(progress, [0, 1], [3.2, 3.5]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          perspective: '1400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            transform: `scale(${scale}) rotateX(-12deg) rotateY(-25deg) translate(-30%, -20%)`,
            transformStyle: 'preserve-3d',
            width: '600px',
            height: '400px',
            background: 'linear-gradient(135deg, #2d1b4e 0%, #5a2d7a 100%)',
            borderRadius: '20px',
            border: '2px solid rgba(217, 70, 239, 0.4)',
            boxShadow: '0 40px 80px rgba(0, 0, 0, 0.7), 0 0 60px rgba(217, 70, 239, 0.3)',
            padding: '40px',
            position: 'relative',
          }}
        >
          <div style={{ fontFamily: 'Inter', color: 'white', fontSize: '48px', fontWeight: 700 }}>
            Dashboard
          </div>
          <div style={{ fontFamily: 'Inter', color: 'rgba(255,255,255,0.6)', fontSize: '18px', marginTop: '12px' }}>
            Real-time analytics
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Shot 2: Wide Overhead (minimal tilt, see full card)
const WideOverhead: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const progress = spring({ frame, fps, config: { damping: 200 } });
  const rotateX = interpolate(progress, [0, 1], [-25, -18]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          perspective: '2000px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(0deg)`,
            transformStyle: 'preserve-3d',
            width: '900px',
            height: '600px',
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
            borderRadius: '24px',
            border: '2px solid rgba(0, 217, 255, 0.3)',
            boxShadow: '0 60px 120px rgba(0, 0, 0, 0.8)',
            padding: '50px',
          }}
        >
          <div style={{ fontFamily: 'Inter', color: 'white', fontSize: '64px', fontWeight: 700 }}>
            Overview
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '24px',
              marginTop: '40px',
            }}
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(0, 217, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '30px',
                  border: '1px solid rgba(0, 217, 255, 0.3)',
                }}
              >
                <div style={{ fontFamily: 'Inter', color: 'white', fontSize: '32px', fontWeight: 600 }}>
                  {i * 42}K
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Shot 3: Dutch Angle (rotated on Z-axis for diagonal feel)
const DutchAngle: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const progress = spring({ frame, fps, config: { damping: 200 } });
  const rotateZ = interpolate(progress, [0, 1], [-18, -12]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          perspective: '1200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            transform: `rotateX(-8deg) rotateY(4deg) rotateZ(${rotateZ}deg)`,
            transformStyle: 'preserve-3d',
            width: '700px',
            height: '500px',
            background: 'linear-gradient(135deg, #422006 0%, #713f12 100%)',
            borderRadius: '20px',
            border: '2px solid rgba(201, 169, 110, 0.4)',
            boxShadow: '0 50px 100px rgba(0, 0, 0, 0.7)',
            padding: '50px',
          }}
        >
          <div style={{ fontFamily: 'Inter', color: 'white', fontSize: '56px', fontWeight: 700 }}>
            Tilted View
          </div>
          <div style={{ fontFamily: 'Inter', color: 'rgba(255,255,255,0.7)', fontSize: '20px', marginTop: '16px' }}>
            Dynamic diagonal perspective
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Shot 4: Zoom Punch (scales from 2.5x → 1.0x dramatically)
const ZoomPunch: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const progress = spring({ frame, fps, config: { damping: 180 } });
  const scale = interpolate(progress, [0, 1], [2.5, 1.0]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          perspective: '1200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            transform: `scale(${scale}) rotateX(-6deg) rotateY(5deg)`,
            transformStyle: 'preserve-3d',
            width: '650px',
            height: '450px',
            background: 'linear-gradient(135deg, #5a2d7a 0%, #8b3da6 100%)',
            borderRadius: '20px',
            border: '3px solid rgba(217, 70, 239, 0.5)',
            boxShadow: '0 40px 80px rgba(0, 0, 0, 0.7), 0 0 60px rgba(217, 70, 239, 0.4)',
            padding: '45px',
          }}
        >
          <div style={{ fontFamily: 'Inter', color: 'white', fontSize: '52px', fontWeight: 700 }}>
            ZOOM PUNCH
          </div>
          <div style={{ fontFamily: 'Inter', color: 'rgba(255,255,255,0.8)', fontSize: '18px', marginTop: '12px' }}>
            Dramatic scale entrance
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Shot 5: Corner Focus (positioned off-center, heavy rotateY)
const CornerFocus: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const progress = spring({ frame, fps, config: { damping: 200 } });
  const rotateY = interpolate(progress, [0, 1], [35, 28]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          perspective: '1400px',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '10%',
        }}
      >
        <div
          style={{
            transform: `rotateX(-10deg) rotateY(${rotateY}deg)`,
            transformStyle: 'preserve-3d',
            width: '750px',
            height: '500px',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            borderRadius: '20px',
            border: '2px solid rgba(0, 217, 255, 0.3)',
            boxShadow: '0 50px 100px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 217, 255, 0.2)',
            padding: '50px',
          }}
        >
          <div style={{ fontFamily: 'Inter', color: 'white', fontSize: '56px', fontWeight: 700 }}>
            Side View
          </div>
          <div style={{ fontFamily: 'Inter', color: 'rgba(255,255,255,0.7)', fontSize: '20px', marginTop: '16px' }}>
            Heavy Y-axis rotation reveals depth
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Shot 6: Slow Rotation (continuous rotateY animation)
const SlowRotation: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const progress = spring({ frame, fps, config: { damping: 200 } });
  const rotateY = interpolate(frame, [0, fps * 2], [-8, 8]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          perspective: '1200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            transform: `rotateX(-6deg) rotateY(${rotateY}deg)`,
            transformStyle: 'preserve-3d',
            width: '700px',
            height: '480px',
            background: 'linear-gradient(135deg, #2d1b4e 0%, #4a2570 100%)',
            borderRadius: '20px',
            border: '2px solid rgba(217, 70, 239, 0.4)',
            boxShadow: '0 45px 90px rgba(0, 0, 0, 0.7)',
            padding: '50px',
          }}
        >
          <div style={{ fontFamily: 'Inter', color: 'white', fontSize: '56px', fontWeight: 700 }}>
            Rotating
          </div>
          <div style={{ fontFamily: 'Inter', color: 'rgba(255,255,255,0.7)', fontSize: '20px', marginTop: '16px' }}>
            Smooth continuous spin
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Shot 7: Split-Screen Dual Angle (left and right with different angles)
const SplitScreenDual: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const progress = spring({ frame, fps, config: { damping: 200 } });
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ opacity, display: 'flex', gap: '40px', alignItems: 'center', justifyContent: 'center', padding: '0 60px' }}>
      {/* Left: rotateY negative */}
      <div
        style={{
          perspective: '1200px',
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            transform: 'rotateX(-8deg) rotateY(-15deg)',
            transformStyle: 'preserve-3d',
            width: '500px',
            height: '360px',
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
            borderRadius: '16px',
            border: '2px solid rgba(0, 217, 255, 0.3)',
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.6)',
            padding: '30px',
          }}
        >
          <div style={{ fontFamily: 'Inter', color: 'white', fontSize: '32px', fontWeight: 700 }}>
            Left Angle
          </div>
        </div>
      </div>

      {/* Right: rotateY positive */}
      <div
        style={{
          perspective: '1200px',
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            transform: 'rotateX(-8deg) rotateY(15deg)',
            transformStyle: 'preserve-3d',
            width: '500px',
            height: '360px',
            background: 'linear-gradient(135deg, #422006 0%, #713f12 100%)',
            borderRadius: '16px',
            border: '2px solid rgba(201, 169, 110, 0.4)',
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.6)',
            padding: '30px',
          }}
        >
          <div style={{ fontFamily: 'Inter', color: 'white', fontSize: '32px', fontWeight: 700 }}>
            Right Angle
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Shot 8: Microscopic Zoom (extreme scale 4.5x, small area focus)
const MicroscopicZoom: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const progress = spring({ frame, fps, config: { damping: 200 } });
  const scale = interpolate(progress, [0, 1], [4.0, 4.5]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          perspective: '1200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            transform: `scale(${scale}) rotateX(-5deg) rotateY(-8deg) translate(15%, 10%)`,
            transformStyle: 'preserve-3d',
            width: '600px',
            height: '400px',
            background: 'linear-gradient(135deg, #5a2d7a 0%, #7a3d9a 100%)',
            borderRadius: '20px',
            border: '2px solid rgba(217, 70, 239, 0.5)',
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.7)',
            padding: '40px',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              background: 'rgba(217, 70, 239, 0.3)',
              borderRadius: '12px',
              border: '2px solid rgba(217, 70, 239, 0.6)',
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Shot 9: Bird's Eye (extreme rotateX for top-down view)
const BirdsEye: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const progress = spring({ frame, fps, config: { damping: 200 } });
  const rotateX = interpolate(progress, [0, 1], [-75, -68]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          perspective: '1600px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(0deg)`,
            transformStyle: 'preserve-3d',
            width: '800px',
            height: '500px',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            borderRadius: '20px',
            border: '2px solid rgba(0, 217, 255, 0.3)',
            boxShadow: '0 80px 160px rgba(0, 0, 0, 0.9)',
            padding: '50px',
          }}
        >
          <div style={{ fontFamily: 'Inter', color: 'white', fontSize: '48px', fontWeight: 700, textAlign: 'center' }}>
            Top-Down
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Shot 10: Cinema Letterbox (with black bars top/bottom)
const CinemaLetterbox: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const progress = spring({ frame, fps, config: { damping: 200 } });
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ opacity }}>
      {/* Letterbox bars */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '15%', background: 'black', zIndex: 10 }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '15%', background: 'black', zIndex: 10 }} />

      <div
        style={{
          width: '100%',
          height: '100%',
          perspective: '1200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            transform: 'rotateX(-10deg) rotateY(12deg)',
            transformStyle: 'preserve-3d',
            width: '900px',
            height: '500px',
            background: 'linear-gradient(135deg, #422006 0%, #713f12 100%)',
            borderRadius: '20px',
            border: '2px solid rgba(201, 169, 110, 0.5)',
            boxShadow: '0 50px 100px rgba(0, 0, 0, 0.8)',
            padding: '50px',
          }}
        >
          <div style={{ fontFamily: 'Inter', color: 'white', fontSize: '64px', fontWeight: 700 }}>
            Cinematic
          </div>
          <div style={{ fontFamily: 'Inter', color: 'rgba(255,255,255,0.7)', fontSize: '22px', marginTop: '16px' }}>
            Letterbox aspect ratio
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Shot 11: Grid Array (4 small cards in grid)
const GridArray: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const progress = spring({ frame, fps, config: { damping: 200 } });
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  const cards = [
    { delay: 0, rotateY: -8 },
    { delay: 0.1, rotateY: 8 },
    { delay: 0.2, rotateY: -8 },
    { delay: 0.3, rotateY: 8 },
  ];

  return (
    <AbsoluteFill style={{ opacity, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', padding: '80px', alignItems: 'center' }}>
      {cards.map((card, i) => {
        const cardProgress = spring({ frame: frame - fps * card.delay, fps, config: { damping: 200 } });
        const cardOpacity = interpolate(cardProgress, [0, 1], [0, 1]);

        return (
          <div key={i} style={{ perspective: '1200px', display: 'flex', justifyContent: 'center', opacity: cardOpacity }}>
            <div
              style={{
                transform: `rotateX(-6deg) rotateY(${card.rotateY}deg)`,
                transformStyle: 'preserve-3d',
                width: '380px',
                height: '280px',
                background: i % 2 === 0 ? 'linear-gradient(135deg, #2d1b4e 0%, #5a2d7a 100%)' : 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                borderRadius: '16px',
                border: `2px solid ${i % 2 === 0 ? 'rgba(217, 70, 239, 0.4)' : 'rgba(0, 217, 255, 0.3)'}`,
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.7)',
                padding: '30px',
              }}
            >
              <div style={{ fontFamily: 'Inter', color: 'white', fontSize: '28px', fontWeight: 700 }}>
                Card {i + 1}
              </div>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// Shot 12: Hero Slam (overshoot scale 1.8 → 1.0)
const HeroSlam: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const progress = spring({ frame, fps, config: { damping: 180 } });
  const scale = interpolate(progress, [0, 1], [1.8, 1.0]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          perspective: '1200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            transform: `scale(${scale}) rotateX(-8deg) rotateY(6deg)`,
            transformStyle: 'preserve-3d',
            width: '750px',
            height: '520px',
            background: 'linear-gradient(135deg, #5a2d7a 0%, #8b3da6 100%)',
            borderRadius: '24px',
            border: '3px solid rgba(217, 70, 239, 0.6)',
            boxShadow: '0 60px 120px rgba(0, 0, 0, 0.9), 0 0 80px rgba(217, 70, 239, 0.5)',
            padding: '60px',
          }}
        >
          <div style={{ fontFamily: 'Inter', color: 'white', fontSize: '72px', fontWeight: 700, textAlign: 'center' }}>
            HERO SLAM
          </div>
          <div style={{ fontFamily: 'Inter', color: 'rgba(255,255,255,0.8)', fontSize: '24px', marginTop: '20px', textAlign: 'center' }}>
            Overshoot scale entrance
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
