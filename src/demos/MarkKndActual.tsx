import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

/**
 * MarkKnd ACTUAL Techniques - Deep Analysis
 *
 * After frame-by-frame review, discovered:
 * - Most UI is FLAT fullscreen mockups (NOT isometric cards)
 * - Glow is EDGE ACCENT (left/right border), not full outline
 * - Only 1-2 shots use true isometric tilt (frame 40s)
 * - Primary technique: Isolated UI fragments scaled 2-3x
 */

export const MarkKndActual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0a0e27 0%, #1a0a2e 100%)',
      }}
    >
      {/* Scene 1: Fullscreen Chat Interface (0-3s) - Frame 10s style */}
      <Sequence from={0} durationInFrames={fps * 3}>
        <FullscreenUIMockup frame={frame} fps={fps} />
      </Sequence>

      {/* Scene 2: Isolated Recording Button (3-6s) - Frame 15s style */}
      <Sequence from={fps * 3} durationInFrames={fps * 3}>
        <IsolatedUIElement frame={frame - fps * 3} fps={fps} />
      </Sequence>

      {/* Scene 3: Dropdown with Edge Glow (6-9s) - Frame 25s style */}
      <Sequence from={fps * 6} durationInFrames={fps * 3}>
        <DropdownWithEdgeGlow frame={frame - fps * 6} fps={fps} />
      </Sequence>

      {/* Scene 4: True Isometric Card (9-12s) - Frame 40s style */}
      <Sequence from={fps * 9} durationInFrames={fps * 3}>
        <TrueIsometricCard frame={frame - fps * 9} fps={fps} />
      </Sequence>
    </AbsoluteFill>
  );
};

// Technique 1: Fullscreen UI Mockup (Frame 10s)
// FLAT interface positioned left, dark bg, subtle edge glow
const FullscreenUIMockup: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const entryProgress = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const opacity = interpolate(entryProgress, [0, 1], [0, 1]);
  const translateX = interpolate(entryProgress, [0, 1], [-30, 0]);

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '10%',
        opacity,
      }}
    >
      {/* Chat interface mockup */}
      <div
        style={{
          width: '700px',
          background: 'rgba(13, 13, 13, 0.95)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '24px',
          transform: `translateX(${translateX}px)`,
          position: 'relative',
        }}
      >
        {/* Magenta edge glow on LEFT only */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: '20%',
            bottom: '20%',
            width: '2px',
            background: 'linear-gradient(to bottom, transparent, #d946ef, transparent)',
            boxShadow: '-4px 0 20px rgba(217, 70, 239, 0.6)',
          }}
        />

        {/* Chat header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px',
            paddingBottom: '12px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%)',
            }}
          />
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              color: '#999',
              fontSize: '14px',
            }}
          >
            To:
          </span>
        </div>

        {/* Chat message */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '16px',
          }}
        >
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '15px',
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            Pushed the latest changes to the shared Doc. Let me know if you spot anything.
          </p>
        </div>

        {/* Models dropdown header */}
        <div
          style={{
            fontFamily: 'Inter, sans-serif',
            color: '#666',
            fontSize: '12px',
            marginBottom: '8px',
          }}
        >
          Models ▼
        </div>

        {/* Model options */}
        {['Brain', 'Gemini', 'OpenAI'].map((model, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 0',
              borderBottom: i < 2 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
            }}
          >
            <div
              style={{
                fontSize: '16px',
              }}
            >
              {i === 0 ? '⚙️' : i === 1 ? '★' : '◉'}
            </div>
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '14px',
              }}
            >
              {model}
            </span>
          </div>
        ))}

        {/* Recording button in top-right */}
        <div
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
          }}
        >
          <RecordingButton frame={frame} fps={fps} />
        </div>
      </div>

      {/* App name on right */}
      <div
        style={{
          position: 'absolute',
          right: '15%',
          top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: 'Inter, sans-serif',
          fontSize: '48px',
          fontWeight: 300,
          color: 'rgba(255, 255, 255, 0.3)',
          fontStyle: 'italic',
        }}
      >
        BrainWave
      </div>
    </AbsoluteFill>
  );
};

// Technique 2: Isolated UI Element (Frame 15s)
// Extract ONE component, scale 2-3x, pair with typography
const IsolatedUIElement: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const entryProgress = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const scale = interpolate(entryProgress, [0, 1], [0.8, 1]);
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
      {/* Typography overlay */}
      <h2
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '48px',
          fontWeight: 400,
          color: 'rgba(255, 255, 255, 0.9)',
          margin: 0,
          textAlign: 'center',
        }}
      >
        that lets you talk to all your apps
      </h2>

      {/* MASSIVE recording button */}
      <div style={{ transform: `scale(${scale * 2.5})` }}>
        <RecordingButton frame={frame} fps={fps} large />
      </div>
    </AbsoluteFill>
  );
};

// Technique 3: Dropdown with Edge Glow (Frame 25s, 30s)
// Vertical list, cyan glow on LEFT EDGE only
const DropdownWithEdgeGlow: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const models = [
    { icon: '🌸', name: 'Brain', version: 'm1', color: '#f472b6' },
    { icon: '✦', name: 'Claude', version: 'Sonnet 4', color: '#f59e0b' },
    { icon: '◉', name: 'OpenAI', version: 'GPT 4.1', color: '#06b6d4' },
    { icon: '△', name: 'Gemini', version: '2.5 Pro', color: '#a78bfa' },
  ];

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '500px',
          background: 'rgba(13, 13, 13, 0.95)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '32px 40px',
          position: 'relative',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* CYAN EDGE GLOW - LEFT SIDE ONLY */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: '15%',
            bottom: '15%',
            width: '3px',
            background: 'linear-gradient(to bottom, transparent, #00d9ff, transparent)',
            boxShadow: '-6px 0 30px rgba(0, 217, 255, 0.8), -2px 0 10px rgba(0, 217, 255, 0.5)',
          }}
        />

        {/* Dropdown header */}
        <div
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            color: '#999',
            marginBottom: '24px',
          }}
        >
          Models ▼
        </div>

        {/* Model list */}
        {models.map((model, i) => {
          const entryProgress = spring({
            frame: frame - i * 5,
            fps,
            config: { damping: 200 },
          });

          const opacity = interpolate(entryProgress, [0, 1], [0, 1]);
          const translateX = interpolate(entryProgress, [0, 1], [-20, 0]);

          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px 0',
                borderBottom: i < models.length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                opacity,
                transform: `translateX(${translateX}px)`,
              }}
            >
              {/* Icon */}
              <div style={{ fontSize: '24px' }}>{model.icon}</div>

              {/* Name + Version */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '18px',
                    fontWeight: 500,
                    color: 'white',
                    marginBottom: '4px',
                  }}
                >
                  {model.name}{' '}
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: 400,
                      color: model.color,
                    }}
                  >
                    {model.version}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    color: 'rgba(255, 255, 255, 0.5)',
                  }}
                >
                  {i === 0 ? 'GPT-4o deeply integrated' : i === 1 ? 'Excels at writing and coding' : i === 2 ? 'Chat with 4o without leaving' : 'Quick & efficient reasoning'}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Typography overlay on right */}
      <div
        style={{
          position: 'absolute',
          right: '12%',
          fontFamily: 'Inter, sans-serif',
          fontSize: '64px',
          fontWeight: 700,
          color: 'white',
        }}
      >
        between
        <br />
        multiple
        <br />
        AI apps
      </div>
    </AbsoluteFill>
  );
};

// Technique 4: True Isometric Card (Frame 40s)
// THE ONLY ACTUAL 3D TILT - large centered element
const TrueIsometricCard: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const entryProgress = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const scale = interpolate(entryProgress, [0, 1], [0.9, 1]);
  const opacity = interpolate(entryProgress, [0, 1], [0, 1]);
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
          // ACTUAL isometric transform
          transform: `
            perspective(1200px)
            rotateX(-5deg)
            rotateY(3deg)
            scale(${scale})
            translateY(${floatY}px)
          `,
          transformStyle: 'preserve-3d',

          width: '900px',
          height: '500px',
          background: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: `
            0 30px 80px rgba(0, 0, 0, 0.6),
            0 0 60px rgba(217, 70, 239, 0.4)
          `,
          padding: '48px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* "Ask anything" button top-left */}
        <div
          style={{
            position: 'absolute',
            top: '32px',
            left: '32px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            background: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div style={{ fontSize: '16px' }}>✦</div>
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              color: 'white',
            }}
          >
            Ask anything
          </span>
        </div>

        {/* Giant "Br" text with cloud backdrop */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
          }}
        >
          {/* Cloud shape backdrop */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '400px',
              height: '200px',
              background: 'radial-gradient(ellipse, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(40px)',
            }}
          />

          {/* "Br" text */}
          <div
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '180px',
              fontWeight: 900,
              color: 'white',
              letterSpacing: '-0.02em',
              position: 'relative',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            }}
          >
            Br
          </div>
        </div>

        {/* Small chat preview on right edge */}
        <div
          style={{
            position: 'absolute',
            right: '-100px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '200px',
            opacity: 0.3,
          }}
        >
          <div
            style={{
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '8px',
              padding: '12px',
              fontSize: '11px',
              color: 'white',
            }}
          >
            Chat preview...
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Reusable: Recording Button Component
const RecordingButton: React.FC<{ frame: number; fps: number; large?: boolean }> = ({
  frame,
  fps,
  large = false,
}) => {
  // Pulse animation
  const pulseIntensity = interpolate(Math.sin((frame / fps) * Math.PI * 2), [-1, 1], [0.5, 1]);

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: large ? '16px' : '12px',
        padding: large ? '20px 40px' : '12px 24px',
        background: 'rgba(13, 13, 13, 0.85)',
        borderRadius: large ? '48px' : '32px',
        border: `1px solid rgba(255, 51, 102, ${pulseIntensity})`,
        boxShadow: `
          0 0 ${large ? 30 : 20}px rgba(255, 51, 102, ${pulseIntensity * 0.6}),
          0 0 ${large ? 60 : 40}px rgba(255, 51, 102, ${pulseIntensity * 0.3})
        `,
      }}
    >
      {/* Red pulsing dot */}
      <div
        style={{
          width: large ? '16px' : '12px',
          height: large ? '16px' : '12px',
          borderRadius: '50%',
          background: '#ff3366',
          boxShadow: `0 0 ${large ? 12 : 8}px rgba(255, 51, 102, ${pulseIntensity})`,
        }}
      />

      {/* Waveform bars */}
      <div
        style={{
          display: 'flex',
          gap: large ? '4px' : '3px',
          alignItems: 'center',
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
          const height = 4 + Math.sin((frame / fps) * Math.PI * 3 + i * 0.5) * (large ? 12 : 8);
          return (
            <div
              key={i}
              style={{
                width: large ? '3px' : '2px',
                height: `${height}px`,
                background: '#999',
                borderRadius: '2px',
              }}
            />
          );
        })}
      </div>

      {/* "Stop" text */}
      <span
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: large ? '18px' : '14px',
          color: '#999',
        }}
      >
        Stop
      </span>
    </div>
  );
};
