import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from 'remotion';

/**
 * UI Showcase Range — Exploring All Technique Variations
 *
 * Based on MarkKnd deep analysis:
 * - 80% of shots are FLAT UI mockups with edge accents
 * - 10% are isolated/scaled UI elements
 * - 10% are true isometric 3D cards
 *
 * This composition explores variations of each technique
 */

export const UIShowcaseRange: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0a0e27 0%, #1a0a2e 100%)',
      }}
    >
      {/* Variation 1: Left-aligned UI with Magenta Left Edge (0-3s) */}
      <Sequence from={0} durationInFrames={fps * 3}>
        <LeftAlignedUIWithEdgeGlow
          frame={frame}
          fps={fps}
          edgeColor="#d946ef"
          edgeSide="left"
        />
      </Sequence>

      {/* Variation 2: Centered UI with Cyan Right Edge (3-6s) */}
      <Sequence from={fps * 3} durationInFrames={fps * 3}>
        <CenteredDropdownWithEdge
          frame={frame - fps * 3}
          fps={fps}
          edgeColor="#00d9ff"
          edgeSide="right"
        />
      </Sequence>

      {/* Variation 3: Isolated Button Scaled 3x (6-9s) */}
      <Sequence from={fps * 6} durationInFrames={fps * 3}>
        <IsolatedScaledElement
          frame={frame - fps * 6}
          fps={fps}
          type="button"
        />
      </Sequence>

      {/* Variation 4: Isolated Input Field with Search (9-12s) */}
      <Sequence from={fps * 9} durationInFrames={fps * 3}>
        <IsolatedScaledElement
          frame={frame - fps * 9}
          fps={fps}
          type="search"
        />
      </Sequence>

      {/* Variation 5: Split-screen UI Comparison (12-15s) */}
      <Sequence from={fps * 12} durationInFrames={fps * 3}>
        <SplitScreenComparison
          frame={frame - fps * 12}
          fps={fps}
        />
      </Sequence>

      {/* Variation 6: Small Isometric Card (15-18s) */}
      <Sequence from={fps * 15} durationInFrames={fps * 3}>
        <SmallIsometricCard
          frame={frame - fps * 15}
          fps={fps}
          size="small"
        />
      </Sequence>

      {/* Variation 7: Large Isometric Card with Screenshot BG (18-21s) */}
      <Sequence from={fps * 18} durationInFrames={fps * 3}>
        <LargeIsometricWithScreenshot
          frame={frame - fps * 18}
          fps={fps}
        />
      </Sequence>

      {/* Variation 8: Layered UI Elements (21-24s) */}
      <Sequence from={fps * 21} durationInFrames={fps * 3}>
        <LayeredUIStack
          frame={frame - fps * 21}
          fps={fps}
        />
      </Sequence>
    </AbsoluteFill>
  );
};

// VARIATION 1: Left-Aligned UI with Edge Glow
const LeftAlignedUIWithEdgeGlow: React.FC<{
  frame: number;
  fps: number;
  edgeColor: string;
  edgeSide: 'left' | 'right';
}> = ({ frame, fps, edgeColor, edgeSide }) => {
  const entryProgress = spring({ frame, fps, config: { damping: 200 } });
  const opacity = interpolate(entryProgress, [0, 1], [0, 1]);
  const translateX = interpolate(entryProgress, [0, 1], [-40, 0]);

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', paddingLeft: '8%', opacity }}>
      <div
        style={{
          width: '600px',
          background: 'rgba(13, 13, 13, 0.95)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '32px',
          transform: `translateX(${translateX}px)`,
          position: 'relative',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Edge Glow */}
        <div
          style={{
            position: 'absolute',
            [edgeSide]: 0,
            top: '20%',
            bottom: '20%',
            width: '3px',
            background: `linear-gradient(to bottom, transparent, ${edgeColor}, transparent)`,
            boxShadow: `${edgeSide === 'left' ? '-' : ''}6px 0 30px ${edgeColor}cc, ${edgeSide === 'left' ? '-' : ''}2px 0 10px ${edgeColor}80`,
          }}
        />

        {/* Content: Task List */}
        <h3 style={{ fontFamily: 'Inter', color: 'white', fontSize: '20px', marginBottom: '20px' }}>
          Today's Tasks
        </h3>
        {['Design review meeting', 'Update project docs', 'Code review'].map((task, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 0',
              borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none',
            }}
          >
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                border: '2px solid rgba(255,255,255,0.3)',
              }}
            />
            <span style={{ fontFamily: 'Inter', color: 'rgba(255,255,255,0.8)', fontSize: '15px' }}>
              {task}
            </span>
          </div>
        ))}
      </div>

      {/* Typography on right */}
      <div
        style={{
          position: 'absolute',
          right: '12%',
          fontFamily: 'Inter',
          fontSize: '56px',
          fontWeight: 300,
          color: 'rgba(255,255,255,0.4)',
        }}
      >
        Stay
        <br />
        <span style={{ fontWeight: 700 }}>Organized</span>
      </div>
    </AbsoluteFill>
  );
};

// VARIATION 2: Centered Dropdown with Edge Glow
const CenteredDropdownWithEdge: React.FC<{
  frame: number;
  fps: number;
  edgeColor: string;
  edgeSide: 'left' | 'right';
}> = ({ frame, fps, edgeColor, edgeSide }) => {
  const options = [
    { emoji: '🎨', label: 'Design Mode', sublabel: 'Create beautiful interfaces' },
    { emoji: '⚡', label: 'Dev Mode', sublabel: 'Build with code' },
    { emoji: '🧪', label: 'Test Mode', sublabel: 'Verify everything works' },
  ];

  return (
    <AbsoluteFill style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div
        style={{
          width: '500px',
          background: 'rgba(13, 13, 13, 0.95)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '32px',
          position: 'relative',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Edge Glow */}
        <div
          style={{
            position: 'absolute',
            [edgeSide]: 0,
            top: '15%',
            bottom: '15%',
            width: '3px',
            background: `linear-gradient(to bottom, transparent, ${edgeColor}, transparent)`,
            boxShadow: `${edgeSide === 'left' ? '-' : ''}6px 0 30px ${edgeColor}cc`,
          }}
        />

        {/* Header */}
        <div style={{ fontFamily: 'Inter', fontSize: '14px', color: '#999', marginBottom: '20px' }}>
          Select Mode ▼
        </div>

        {/* Options */}
        {options.map((opt, i) => {
          const stagger = spring({
            frame: frame - i * 5,
            fps,
            config: { damping: 200 },
          });
          const opacity = interpolate(stagger, [0, 1], [0, 1]);

          return (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: '16px',
                padding: '16px',
                marginBottom: i < options.length - 1 ? '8px' : '0',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '8px',
                opacity,
              }}
            >
              <div style={{ fontSize: '24px' }}>{opt.emoji}</div>
              <div>
                <div style={{ fontFamily: 'Inter', color: 'white', fontSize: '16px', marginBottom: '4px' }}>
                  {opt.label}
                </div>
                <div style={{ fontFamily: 'Inter', color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
                  {opt.sublabel}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// VARIATION 3 & 4: Isolated Scaled Elements
const IsolatedScaledElement: React.FC<{
  frame: number;
  fps: number;
  type: 'button' | 'search';
}> = ({ frame, fps, type }) => {
  const entryProgress = spring({ frame, fps, config: { damping: 200 } });
  const scale = interpolate(entryProgress, [0, 1], [0.7, 1]);
  const opacity = interpolate(entryProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '60px',
        opacity,
      }}
    >
      {/* Typography */}
      <h2
        style={{
          fontFamily: 'Inter',
          fontSize: type === 'button' ? '52px' : '48px',
          fontWeight: 400,
          color: 'rgba(255,255,255,0.9)',
          margin: 0,
        }}
      >
        {type === 'button' ? 'One-click deployment' : 'Search everything, instantly'}
      </h2>

      {/* Scaled Element */}
      <div style={{ transform: `scale(${scale * 2.5})` }}>
        {type === 'button' ? (
          <button
            style={{
              padding: '16px 48px',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
              border: 'none',
              borderRadius: '12px',
              fontFamily: 'Inter',
              fontSize: '16px',
              fontWeight: 600,
              color: 'white',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(217, 70, 239, 0.4)',
            }}
          >
            Deploy Now
          </button>
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px 20px',
              background: 'rgba(13,13,13,0.9)',
              border: '1px solid rgba(0,217,255,0.5)',
              borderRadius: '24px',
              boxShadow: '0 0 20px rgba(0,217,255,0.3)',
            }}
          >
            <span style={{ fontSize: '18px' }}>🔍</span>
            <input
              type="text"
              placeholder="Find anything..."
              style={{
                background: 'transparent',
                border: 'none',
                fontFamily: 'Inter',
                fontSize: '15px',
                color: 'white',
                outline: 'none',
                width: '200px',
              }}
            />
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// VARIATION 5: Split-Screen Comparison
const SplitScreenComparison: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  return (
    <AbsoluteFill style={{ display: 'flex' }}>
      {/* Left: Before */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderRight: '1px solid rgba(255,255,255,0.1)',
          padding: '60px',
        }}
      >
        <div style={{ fontSize: '14px', color: '#999', marginBottom: '20px' }}>BEFORE</div>
        <div
          style={{
            width: '400px',
            background: 'rgba(100,100,100,0.2)',
            borderRadius: '12px',
            padding: '32px',
          }}
        >
          <div style={{ fontFamily: 'Inter', color: '#666', fontSize: '15px', lineHeight: 1.8 }}>
            Manual processes
            <br />
            Scattered tools
            <br />
            Wasted time
          </div>
        </div>
      </div>

      {/* Right: After */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '60px',
          position: 'relative',
        }}
      >
        {/* Cyan edge glow */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: '20%',
            bottom: '20%',
            width: '3px',
            background: 'linear-gradient(to bottom, transparent, #00d9ff, transparent)',
            boxShadow: '-6px 0 30px #00d9ffcc',
          }}
        />

        <div style={{ fontSize: '14px', color: '#00d9ff', marginBottom: '20px' }}>AFTER</div>
        <div
          style={{
            width: '400px',
            background: 'rgba(13,13,13,0.95)',
            borderRadius: '12px',
            padding: '32px',
            border: '1px solid rgba(0,217,255,0.2)',
          }}
        >
          <div style={{ fontFamily: 'Inter', color: 'white', fontSize: '15px', lineHeight: 1.8 }}>
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

// VARIATION 6: Small Isometric Card
const SmallIsometricCard: React.FC<{ frame: number; fps: number; size: 'small' | 'medium' }> = ({
  frame,
  fps,
  size,
}) => {
  const entryProgress = spring({ frame, fps, config: { damping: 200 } });
  const scale = interpolate(entryProgress, [0, 1], [0.85, 1]);
  const floatY = Math.sin((frame / fps) * Math.PI) * 6;

  const dimensions = size === 'small' ? { width: 400, padding: 32 } : { width: 600, padding: 40 };

  return (
    <AbsoluteFill style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div
        style={{
          transform: `
            perspective(1200px)
            rotateX(-6deg)
            rotateY(4deg)
            scale(${scale})
            translateY(${floatY}px)
          `,
          transformStyle: 'preserve-3d',
          width: `${dimensions.width}px`,
          background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(51, 65, 85, 0.3)',
          padding: `${dimensions.padding}px`,
        }}
      >
        <div style={{ fontSize: '32px', marginBottom: '16px' }}>📊</div>
        <h3 style={{ fontFamily: 'Inter', fontSize: '24px', color: 'white', margin: '0 0 12px 0' }}>
          Analytics Dashboard
        </h3>
        <p style={{ fontFamily: 'Inter', fontSize: '14px', color: 'rgba(255,255,255,0.6)', margin: 0 }}>
          Real-time insights into your business metrics
        </p>
      </div>
    </AbsoluteFill>
  );
};

// VARIATION 7: Large Isometric with Screenshot Background
const LargeIsometricWithScreenshot: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const entryProgress = spring({ frame, fps, config: { damping: 200 } });
  const scale = interpolate(entryProgress, [0, 1], [0.9, 1]);
  const floatY = Math.sin((frame / fps) * Math.PI) * 8;

  return (
    <AbsoluteFill style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div
        style={{
          transform: `
            perspective(1200px)
            rotateX(-5deg)
            rotateY(3deg)
            scale(${scale})
            translateY(${floatY}px)
          `,
          transformStyle: 'preserve-3d',
          width: '800px',
          height: '500px',
          background: 'linear-gradient(135deg, #422006 0%, #713f12 100%)',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.15)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(113, 63, 18, 0.4)',
          padding: '40px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Screenshot background (subtle) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.12,
            borderRadius: '20px',
            overflow: 'hidden',
          }}
        >
          <Img
            src={staticFile('ai-services-hero.png')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'blur(3px)',
            }}
          />
        </div>

        {/* Content overlay */}
        <div style={{ position: 'relative', zIndex: 10 }}>
          <div
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.1)',
              marginBottom: '24px',
            }}
          >
            <span style={{ fontFamily: 'Inter', fontSize: '14px', color: 'rgba(255,255,255,0.9)' }}>
              ✨ AI-Powered
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'Inter',
              fontSize: '48px',
              fontWeight: 700,
              color: 'white',
              margin: '0 0 16px 0',
              letterSpacing: '-0.02em',
            }}
          >
            Smart
            <br />
            Automation
          </h2>

          <p
            style={{
              fontFamily: 'Inter',
              fontSize: '16px',
              color: 'rgba(255,255,255,0.7)',
              margin: 0,
              maxWidth: '400px',
            }}
          >
            Saves 10+ hours per week with intelligent workflow automation
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// VARIATION 8: Layered UI Stack
const LayeredUIStack: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const layers = [
    { z: 0, rotate: -2, offset: -20 },
    { z: 10, rotate: 0, offset: 0 },
    { z: 20, rotate: 2, offset: 20 },
  ];

  return (
    <AbsoluteFill style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {layers.map((layer, i) => {
        const stagger = spring({
          frame: frame - i * 10,
          fps,
          config: { damping: 200 },
        });
        const opacity = interpolate(stagger, [0, 1], [0, 1]);

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              transform: `rotate(${layer.rotate}deg) translateX(${layer.offset}px)`,
              zIndex: layer.z,
              opacity: opacity * (1 - i * 0.2),
              width: '500px',
              background: i === 1 ? 'rgba(13,13,13,0.95)' : 'rgba(30,30,30,0.5)',
              border: i === 1 ? '1px solid rgba(217,70,239,0.3)' : '1px solid rgba(255,255,255,0.05)',
              borderRadius: '16px',
              padding: '32px',
              backdropFilter: 'blur(10px)',
            }}
          >
            {i === 1 && (
              <div>
                <h3 style={{ fontFamily: 'Inter', color: 'white', fontSize: '20px', margin: '0 0 16px 0' }}>
                  Active Project
                </h3>
                <p style={{ fontFamily: 'Inter', color: 'rgba(255,255,255,0.6)', fontSize: '14px', margin: 0 }}>
                  Building the future, one commit at a time
                </p>
              </div>
            )}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
