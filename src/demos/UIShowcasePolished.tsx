import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from 'remotion';

/**
 * UI Showcase POLISHED — 3D, Angled, Visual Effects
 *
 * Every variation now has:
 * - 3D perspective transforms
 * - Dynamic camera angles
 * - Light reflections and glows
 * - Depth shadows
 * - Ambient particles
 * - Film grain texture
 */

export const UIShowcasePolished: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0a0e27 0%, #1a0a2e 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Film grain overlay (always on) */}
      <FilmGrain />

      {/* Ambient particles (always on) */}
      <AmbientParticles frame={frame} fps={fps} />

      {/* Scene 1: 3D Tilted UI Panel with Magenta Glow (0-3s) */}
      <Sequence from={0} durationInFrames={fps * 3}>
        <TiltedUIPanel frame={frame} fps={fps} />
      </Sequence>

      {/* Scene 2: Floating Dropdown with Cyan Edge + Depth (3-6s) */}
      <Sequence from={fps * 3} durationInFrames={fps * 3}>
        <FloatingDropdown frame={frame - fps * 3} fps={fps} />
      </Sequence>

      {/* Scene 3: Heroic Button with Light Rays (6-9s) */}
      <Sequence from={fps * 6} durationInFrames={fps * 3}>
        <HeroicButton frame={frame - fps * 6} fps={fps} />
      </Sequence>

      {/* Scene 4: Search Field with Shimmer Effect (9-12s) */}
      <Sequence from={fps * 9} durationInFrames={fps * 3}>
        <ShimmerSearch frame={frame - fps * 9} fps={fps} />
      </Sequence>

      {/* Scene 5: Split-Screen 3D Comparison (12-15s) */}
      <Sequence from={fps * 12} durationInFrames={fps * 3}>
        <SplitScreen3D frame={frame - fps * 12} fps={fps} />
      </Sequence>

      {/* Scene 6: Rotating Isometric Card (15-18s) */}
      <Sequence from={fps * 15} durationInFrames={fps * 3}>
        <RotatingIsometric frame={frame - fps * 15} fps={fps} />
      </Sequence>

      {/* Scene 7: Massive Tilted Card with Parallax (18-21s) */}
      <Sequence from={fps * 18} durationInFrames={fps * 3}>
        <MassiveTiltedCard frame={frame - fps * 18} fps={fps} />
      </Sequence>

      {/* Scene 8: Layered Cards with Light Leak (21-24s) */}
      <Sequence from={fps * 21} durationInFrames={fps * 3}>
        <LayeredWithLightLeak frame={frame - fps * 21} fps={fps} />
      </Sequence>
    </AbsoluteFill>
  );
};

// POLISHED 1: 3D Tilted UI Panel
const TiltedUIPanel: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const entryProgress = spring({ frame, fps, config: { damping: 200 } });
  const opacity = interpolate(entryProgress, [0, 1], [0, 1]);
  const rotateY = interpolate(entryProgress, [0, 1], [-15, -8]);
  const floatY = Math.sin((frame / fps) * Math.PI) * 8;

  return (
    <AbsoluteFill style={{ opacity }}>
      {/* Virtual camera wrapper */}
      <div
        style={{
          width: '100%',
          height: '100%',
          perspective: '1200px',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '8%',
        }}
      >
        <div
          style={{
            transform: `
              rotateY(${rotateY}deg)
              rotateX(-4deg)
              translateY(${floatY}px)
            `,
            transformStyle: 'preserve-3d',
            width: '650px',
            background: 'linear-gradient(135deg, rgba(13, 13, 13, 0.98) 0%, rgba(20, 20, 30, 0.98) 100%)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            padding: '40px',
            position: 'relative',
            backdropFilter: 'blur(20px)',
            boxShadow: `
              0 40px 100px rgba(0, 0, 0, 0.8),
              0 0 60px rgba(217, 70, 239, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `,
          }}
        >
          {/* Magenta VERTICAL edge glow (left side) */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: '15%',
              bottom: '15%',
              width: '4px',
              background: 'linear-gradient(to bottom, transparent, #d946ef, transparent)',
              boxShadow: `
                -8px 0 40px rgba(217, 70, 239, 0.8),
                -4px 0 20px rgba(217, 70, 239, 0.6)
              `,
              filter: 'blur(1px)',
            }}
          />

          {/* Glass reflection (top-left corner) */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: '50%',
              height: '40%',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)',
              borderRadius: '20px 0 0 0',
              pointerEvents: 'none',
            }}
          />

          {/* Task List Content */}
          <h3
            style={{
              fontFamily: 'Inter, sans-serif',
              color: 'white',
              fontSize: '24px',
              fontWeight: 600,
              marginBottom: '24px',
              letterSpacing: '-0.01em',
            }}
          >
            Today's Tasks
          </h3>

          {['Design review meeting', 'Update project docs', 'Code review'].map((task, i) => {
            const stagger = spring({
              frame: frame - i * 8,
              fps,
              config: { damping: 200 },
            });
            const taskOpacity = interpolate(stagger, [0, 1], [0, 1]);

            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px 0',
                  borderBottom: i < 2 ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                  opacity: taskOpacity,
                }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    border: '2px solid rgba(217, 70, 239, 0.6)',
                    boxShadow: '0 0 12px rgba(217, 70, 239, 0.3)',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '16px',
                  }}
                >
                  {task}
                </span>
              </div>
            );
          })}
        </div>

        {/* Typography with depth */}
        <div
          style={{
            position: 'absolute',
            right: '12%',
            fontFamily: 'Inter, sans-serif',
            fontSize: '72px',
            fontWeight: 300,
            color: 'rgba(255, 255, 255, 0.15)',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
            transform: 'translateZ(50px)',
            lineHeight: 1.1,
          }}
        >
          Stay
          <br />
          <span style={{ fontWeight: 700, color: 'rgba(255, 255, 255, 0.25)' }}>Organized</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// POLISHED 2: Floating Dropdown with Depth
const FloatingDropdown: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const entryProgress = spring({ frame, fps, config: { damping: 200 } });
  const scale = interpolate(entryProgress, [0, 1], [0.85, 1]);
  const rotateX = interpolate(entryProgress, [0, 1], [-12, -6]);
  const floatY = Math.sin((frame / fps) * Math.PI * 1.5) * 10;

  const options = [
    { emoji: '🎨', label: 'Design Mode', sublabel: 'Create beautiful interfaces', color: '#f59e0b' },
    { emoji: '⚡', label: 'Dev Mode', sublabel: 'Build with code', color: '#00d9ff' },
    { emoji: '🧪', label: 'Test Mode', sublabel: 'Verify everything works', color: '#a78bfa' },
  ];

  return (
    <AbsoluteFill>
      <div
        style={{
          width: '100%',
          height: '100%',
          perspective: '1400px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            transform: `
              rotateX(${rotateX}deg)
              rotateY(3deg)
              scale(${scale})
              translateY(${floatY}px)
            `,
            transformStyle: 'preserve-3d',
            width: '550px',
            background: 'linear-gradient(135deg, rgba(10, 10, 15, 0.98) 0%, rgba(20, 15, 25, 0.98) 100%)',
            borderRadius: '20px',
            border: '1px solid rgba(0, 217, 255, 0.3)',
            padding: '40px',
            position: 'relative',
            backdropFilter: 'blur(30px)',
            boxShadow: `
              0 50px 120px rgba(0, 0, 0, 0.9),
              0 0 80px rgba(0, 217, 255, 0.25),
              inset 0 1px 0 rgba(255, 255, 255, 0.15)
            `,
          }}
        >
          {/* CYAN edge glow (right side) */}
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: '10%',
              bottom: '10%',
              width: '5px',
              background: 'linear-gradient(to bottom, transparent, #00d9ff 30%, #00d9ff 70%, transparent)',
              boxShadow: `
                10px 0 50px rgba(0, 217, 255, 0.9),
                5px 0 25px rgba(0, 217, 255, 0.7)
              `,
              filter: 'blur(2px)',
            }}
          />

          {/* Top glass reflection */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '30%',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, transparent 100%)',
              borderRadius: '20px 20px 0 0',
            }}
          />

          {/* Header */}
          <div
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              color: '#666',
              marginBottom: '28px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            Select Mode
            <span style={{ color: '#00d9ff' }}>▼</span>
          </div>

          {/* Options with stagger */}
          {options.map((opt, i) => {
            const stagger = spring({
              frame: frame - i * 6,
              fps,
              config: { damping: 200 },
            });
            const optOpacity = interpolate(stagger, [0, 1], [0, 1]);
            const optTranslateX = interpolate(stagger, [0, 1], [-30, 0]);

            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: '18px',
                  padding: '18px',
                  marginBottom: i < options.length - 1 ? '12px' : '0',
                  background: `linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)`,
                  borderRadius: '12px',
                  border: `1px solid ${opt.color}33`,
                  boxShadow: `0 0 20px ${opt.color}15, inset 0 1px 0 rgba(255,255,255,0.08)`,
                  opacity: optOpacity,
                  transform: `translateX(${optTranslateX}px) translateZ(${i * 5}px)`,
                }}
              >
                <div style={{ fontSize: '28px', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))' }}>
                  {opt.emoji}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: 'white',
                      fontSize: '18px',
                      fontWeight: 600,
                      marginBottom: '6px',
                      textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                    }}
                  >
                    {opt.label}
                  </div>
                  <div
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: 'rgba(255, 255, 255, 0.5)',
                      fontSize: '14px',
                    }}
                  >
                    {opt.sublabel}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// POLISHED 3: Heroic Button with Light Rays
const HeroicButton: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const entryProgress = spring({ frame, fps, config: { damping: 200 } });
  const scale = interpolate(entryProgress, [0, 1], [0.6, 1]);
  const opacity = interpolate(entryProgress, [0, 1], [0, 1]);
  const glowIntensity = interpolate(Math.sin((frame / fps) * Math.PI * 2), [-1, 1], [0.6, 1]);

  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          perspective: '1500px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '80px',
        }}
      >
        {/* Typography */}
        <h2
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '64px',
            fontWeight: 400,
            color: 'white',
            margin: 0,
            textAlign: 'center',
            textShadow: '0 4px 30px rgba(0, 0, 0, 0.8)',
            letterSpacing: '-0.02em',
          }}
        >
          One-click deployment
        </h2>

        {/* Button with light rays */}
        <div
          style={{
            transform: `scale(${scale * 3}) rotateX(-8deg) translateZ(100px)`,
            transformStyle: 'preserve-3d',
            position: 'relative',
          }}
        >
          {/* Light rays behind button */}
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '200px',
                height: '2px',
                background: `linear-gradient(to right, transparent, rgba(139, 92, 246, ${glowIntensity * 0.4}), transparent)`,
                transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
                filter: 'blur(2px)',
                opacity: glowIntensity,
              }}
            />
          ))}

          {/* Button */}
          <button
            style={{
              padding: '20px 60px',
              background: `linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)`,
              border: `2px solid rgba(255, 255, 255, ${glowIntensity * 0.3})`,
              borderRadius: '16px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '18px',
              fontWeight: 700,
              color: 'white',
              cursor: 'pointer',
              position: 'relative',
              boxShadow: `
                0 20px 60px rgba(217, 70, 239, ${glowIntensity * 0.6}),
                0 0 40px rgba(139, 92, 246, ${glowIntensity * 0.4}),
                inset 0 1px 0 rgba(255, 255, 255, 0.3),
                inset 0 -1px 0 rgba(0, 0, 0, 0.2)
              `,
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
            }}
          >
            Deploy Now
          </button>

          {/* Top glass reflection */}
          <div
            style={{
              position: 'absolute',
              top: '10px',
              left: '20px',
              right: '20px',
              height: '40%',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.25) 0%, transparent 100%)',
              borderRadius: '12px 12px 0 0',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// POLISHED 4: Search with Shimmer
const ShimmerSearch: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const entryProgress = spring({ frame, fps, config: { damping: 200 } });
  const scale = interpolate(entryProgress, [0, 1], [0.7, 1]);
  const shimmerPosition = interpolate(frame % (fps * 2), [0, fps * 2], [-200, 400]);

  return (
    <AbsoluteFill>
      <div
        style={{
          width: '100%',
          height: '100%',
          perspective: '1600px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '80px',
        }}
      >
        <h2
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '56px',
            fontWeight: 400,
            color: 'white',
            margin: 0,
            textShadow: '0 4px 30px rgba(0, 0, 0, 0.8)',
          }}
        >
          Search everything, instantly
        </h2>

        <div
          style={{
            transform: `scale(${scale * 2.8}) rotateX(-6deg) rotateY(-2deg)`,
            transformStyle: 'preserve-3d',
            position: 'relative',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '18px 28px',
              background: 'rgba(10, 10, 15, 0.95)',
              border: '2px solid rgba(0, 217, 255, 0.6)',
              borderRadius: '32px',
              boxShadow: `
                0 0 40px rgba(0, 217, 255, 0.5),
                0 20px 60px rgba(0, 0, 0, 0.8),
                inset 0 1px 0 rgba(255, 255, 255, 0.2)
              `,
              backdropFilter: 'blur(20px)',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Shimmer effect */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: shimmerPosition,
                width: '100px',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(0, 217, 255, 0.3), transparent)',
                pointerEvents: 'none',
              }}
            />

            <span style={{ fontSize: '22px', filter: 'drop-shadow(0 2px 8px rgba(0,217,255,0.5))' }}>🔍</span>
            <input
              type="text"
              placeholder="Find anything..."
              style={{
                background: 'transparent',
                border: 'none',
                fontFamily: 'Inter, sans-serif',
                fontSize: '17px',
                color: 'white',
                outline: 'none',
                width: '240px',
              }}
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// POLISHED 5: Split-Screen 3D
const SplitScreen3D: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const entryProgress = spring({ frame, fps, config: { damping: 200 } });
  const leftRotateY = interpolate(entryProgress, [0, 1], [15, 8]);
  const rightRotateY = interpolate(entryProgress, [0, 1], [-15, -8]);

  return (
    <AbsoluteFill style={{ perspective: '1200px', display: 'flex' }}>
      {/* Left: BEFORE */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '80px',
          transform: `rotateY(${leftRotateY}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        <div style={{ fontSize: '16px', color: '#666', marginBottom: '30px', letterSpacing: '0.15em' }}>
          BEFORE
        </div>
        <div
          style={{
            width: '450px',
            background: 'rgba(60, 60, 60, 0.3)',
            borderRadius: '16px',
            padding: '40px',
            border: '1px solid rgba(100, 100, 100, 0.3)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div style={{ fontFamily: 'Inter', color: '#888', fontSize: '17px', lineHeight: 2 }}>
            Manual processes
            <br />
            Scattered tools
            <br />
            Wasted time
          </div>
        </div>
      </div>

      {/* Right: AFTER */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '80px',
          position: 'relative',
          transform: `rotateY(${rightRotateY}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Cyan vertical edge glow on LEFT divider */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: '15%',
            bottom: '15%',
            width: '5px',
            background: 'linear-gradient(to bottom, transparent, #00d9ff, transparent)',
            boxShadow: '-10px 0 50px rgba(0, 217, 255, 0.9), -5px 0 25px rgba(0, 217, 255, 0.7)',
            filter: 'blur(2px)',
          }}
        />

        <div style={{ fontSize: '16px', color: '#00d9ff', marginBottom: '30px', letterSpacing: '0.15em' }}>
          AFTER
        </div>
        <div
          style={{
            width: '450px',
            background: 'rgba(10, 10, 15, 0.98)',
            borderRadius: '16px',
            padding: '40px',
            border: '1px solid rgba(0, 217, 255, 0.3)',
            boxShadow: `
              0 20px 50px rgba(0, 0, 0, 0.8),
              0 0 40px rgba(0, 217, 255, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `,
          }}
        >
          <div style={{ fontFamily: 'Inter', color: 'white', fontSize: '17px', lineHeight: 2 }}>
            ✓ Automated workflows
            <br />
            ✓ Unified platform
            <br />
            ✓ 10x faster
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// POLISHED 6: Rotating Isometric Card
const RotatingIsometric: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const entryProgress = spring({ frame, fps, config: { damping: 200 } });
  const scale = interpolate(entryProgress, [0, 1], [0.8, 1]);
  const rotateY = interpolate(frame, [0, fps * 3], [0, 360]);
  const floatY = Math.sin((frame / fps) * Math.PI * 1.2) * 12;

  return (
    <AbsoluteFill>
      <div
        style={{
          width: '100%',
          height: '100%',
          perspective: '1600px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            transform: `
              rotateX(-8deg)
              rotateY(${rotateY}deg)
              scale(${scale})
              translateY(${floatY}px)
            `,
            transformStyle: 'preserve-3d',
            width: '480px',
            height: '320px',
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: `
              0 40px 100px rgba(0, 0, 0, 0.9),
              0 0 60px rgba(51, 65, 85, 0.4),
              inset 0 1px 0 rgba(255, 255, 255, 0.15)
            `,
            padding: '40px',
            position: 'relative',
          }}
        >
          {/* Glass reflection */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: '40%',
              height: '50%',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 80%)',
              borderRadius: '20px 0 0 0',
            }}
          />

          <div style={{ fontSize: '40px', marginBottom: '20px', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' }}>
            📊
          </div>
          <h3
            style={{
              fontFamily: 'Inter',
              fontSize: '28px',
              color: 'white',
              margin: '0 0 16px 0',
              fontWeight: 700,
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            }}
          >
            Analytics
          </h3>
          <p
            style={{
              fontFamily: 'Inter',
              fontSize: '15px',
              color: 'rgba(255, 255, 255, 0.65)',
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            Real-time insights into your business metrics
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// POLISHED 7: Massive Tilted Card with Parallax
const MassiveTiltedCard: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const entryProgress = spring({ frame, fps, config: { damping: 200 } });
  const scale = interpolate(entryProgress, [0, 1], [0.85, 1]);
  const floatY = Math.sin((frame / fps) * Math.PI) * 10;
  const parallaxY = interpolate(frame, [0, fps * 3], [0, -30]);

  return (
    <AbsoluteFill>
      <div
        style={{
          width: '100%',
          height: '100%',
          perspective: '1400px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            transform: `
              rotateX(-6deg)
              rotateY(4deg)
              scale(${scale})
              translateY(${floatY}px)
            `,
            transformStyle: 'preserve-3d',
            width: '900px',
            height: '550px',
            background: 'linear-gradient(135deg, #713f12 0%, #92400e 100%)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: `
              0 50px 120px rgba(0, 0, 0, 0.95),
              0 0 80px rgba(113, 63, 18, 0.5),
              inset 0 2px 0 rgba(255, 255, 255, 0.15)
            `,
            padding: '50px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Parallax screenshot background */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.15,
              transform: `translateY(${parallaxY}px) scale(1.1)`,
            }}
          >
            <Img
              src={staticFile('ai-services-hero.png')}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'blur(4px)',
              }}
            />
          </div>

          {/* Diagonal light leak */}
          <div
            style={{
              position: 'absolute',
              top: '-50%',
              right: '-20%',
              width: '80%',
              height: '200%',
              background: 'linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.08) 50%, transparent 60%)',
              transform: 'rotate(25deg)',
              pointerEvents: 'none',
            }}
          />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 10 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 28px',
                background: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '32px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                marginBottom: '32px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
              }}
            >
              <span style={{ fontSize: '16px' }}>✨</span>
              <span style={{ fontFamily: 'Inter', fontSize: '15px', color: 'white', fontWeight: 500 }}>
                AI-Powered
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'Inter',
                fontSize: '68px',
                fontWeight: 800,
                color: 'white',
                margin: '0 0 24px 0',
                letterSpacing: '-0.03em',
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
                lineHeight: 1.1,
              }}
            >
              Smart
              <br />
              Automation
            </h2>

            <p
              style={{
                fontFamily: 'Inter',
                fontSize: '19px',
                color: 'rgba(255, 255, 255, 0.8)',
                margin: 0,
                maxWidth: '500px',
                lineHeight: 1.6,
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
              }}
            >
              Saves 10+ hours per week with intelligent workflow automation
            </p>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// POLISHED 8: Layered Cards with Light Leak
const LayeredWithLightLeak: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const layers = [
    { z: 0, rotate: -4, offset: -40, opacity: 0.4 },
    { z: 10, rotate: 0, offset: 0, opacity: 1 },
    { z: 20, rotate: 4, offset: 40, opacity: 0.4 },
  ];

  const lightLeakOpacity = interpolate(Math.sin((frame / fps) * Math.PI), [-1, 1], [0.3, 0.7]);

  return (
    <AbsoluteFill>
      {/* Diagonal light leak across entire scene */}
      <div
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-20%',
          width: '140%',
          height: '200%',
          background: 'linear-gradient(135deg, transparent 40%, rgba(217, 70, 239, 0.15) 50%, transparent 60%)',
          transform: 'rotate(-25deg)',
          opacity: lightLeakOpacity,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          width: '100%',
          height: '100%',
          perspective: '1500px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {layers.map((layer, i) => {
          const stagger = spring({
            frame: frame - i * 12,
            fps,
            config: { damping: 200 },
          });
          const scale = interpolate(stagger, [0, 1], [0.7, 1]);
          const cardOpacity = interpolate(stagger, [0, 1], [0, layer.opacity]);

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                transform: `
                  rotateX(-7deg)
                  rotateY(${layer.rotate}deg)
                  translateX(${layer.offset}px)
                  scale(${scale})
                `,
                transformStyle: 'preserve-3d',
                zIndex: layer.z,
                opacity: cardOpacity,
                width: '550px',
                height: '350px',
                background:
                  i === 1
                    ? 'linear-gradient(135deg, rgba(10, 10, 15, 0.98) 0%, rgba(20, 15, 25, 0.98) 100%)'
                    : 'rgba(20, 20, 30, 0.6)',
                border:
                  i === 1 ? '1px solid rgba(217, 70, 239, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '20px',
                padding: '40px',
                backdropFilter: 'blur(20px)',
                boxShadow:
                  i === 1
                    ? `
                  0 40px 90px rgba(0, 0, 0, 0.9),
                  0 0 60px rgba(217, 70, 239, 0.3),
                  inset 0 1px 0 rgba(255, 255, 255, 0.12)
                `
                    : '0 20px 50px rgba(0, 0, 0, 0.6)',
              }}
            >
              {/* Magenta edge glow (middle card only) */}
              {i === 1 && (
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '12%',
                    bottom: '12%',
                    width: '5px',
                    background: 'linear-gradient(to bottom, transparent, #d946ef, transparent)',
                    boxShadow: '-10px 0 40px rgba(217, 70, 239, 0.8)',
                    filter: 'blur(2px)',
                  }}
                />
              )}

              {i === 1 && (
                <div>
                  <h3
                    style={{
                      fontFamily: 'Inter',
                      color: 'white',
                      fontSize: '32px',
                      margin: '0 0 20px 0',
                      fontWeight: 700,
                      textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
                    }}
                  >
                    Active Project
                  </h3>
                  <p
                    style={{
                      fontFamily: 'Inter',
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '16px',
                      margin: 0,
                      lineHeight: 1.6,
                    }}
                  >
                    Building the future, one commit at a time
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Shared: Film Grain Overlay
const FilmGrain: React.FC = () => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      opacity: 0.08,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' /%3E%3C/svg%3E")`,
      pointerEvents: 'none',
      zIndex: 900,
      mixBlendMode: 'overlay',
    }}
  />
);

// Shared: Ambient Particles
const AmbientParticles: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const particles = Array.from({ length: 25 }, (_, i) => ({
    x: (i * 73) % 100,
    y: (i * 47) % 100,
    size: 2 + (i % 3),
    speed: 0.3 + (i % 5) * 0.1,
  }));

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 5, pointerEvents: 'none' }}>
      {particles.map((p, i) => {
        const yOffset = ((frame * p.speed) % 120) - 10;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${((p.y + yOffset) % 110) - 10}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: '50%',
              background: 'rgba(217, 70, 239, 0.3)',
              boxShadow: '0 0 8px rgba(217, 70, 239, 0.5)',
              filter: 'blur(1px)',
            }}
          />
        );
      })}
    </div>
  );
};
