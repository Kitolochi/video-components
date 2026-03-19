import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS } from './config';

/** Persistent background: gradient, orbs, dot grid. World-space (not camera-attached). */
export const Background: React.FC<{ energy: number }> = ({ energy }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      {/* Base gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 120% 100% at 50% 40%, rgba(108,142,239,0.04) 0%, transparent 60%),
            radial-gradient(ellipse 80% 60% at 70% 30%, rgba(255,255,255,0.02) 0%, transparent 50%),
            ${COLORS.bg}
          `,
        }}
      />

      {/* Orb 1 — Blue, top-left */}
      <Orb
        frame={frame}
        x={-80} y={-60}
        size={500}
        color={COLORS.blue}
        opacity={0.12 + energy * 0.06}
        speed={0.0008}
        phase={0}
      />

      {/* Orb 2 — Purple, right */}
      <Orb
        frame={frame}
        x={1500} y={300}
        size={420}
        color={COLORS.purple}
        opacity={0.10 + energy * 0.05}
        speed={0.0006}
        phase={2.1}
      />

      {/* Orb 3 — White, bottom-center */}
      <Orb
        frame={frame}
        x={800} y={800}
        size={350}
        color="#ffffff"
        opacity={0.06 + energy * 0.03}
        speed={0.0005}
        phase={4.2}
      />

      {/* Dot grid */}
      <DotGrid opacity={0.06} />

      {/* Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 0%, rgba(0,0,0,0.5) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Scanlines */}
      <Scanlines opacity={0.03} />
    </AbsoluteFill>
  );
};

const Orb: React.FC<{
  frame: number;
  x: number; y: number;
  size: number;
  color: string;
  opacity: number;
  speed: number;
  phase: number;
}> = ({ frame, x, y, size, color, opacity, speed, phase }) => {
  const driftX = Math.sin(frame * speed + phase) * 40;
  const driftY = Math.cos(frame * speed * 0.7 + phase) * 30;

  return (
    <div
      style={{
        position: 'absolute',
        left: x + driftX,
        top: y + driftY,
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}, transparent 70%)`,
        filter: `blur(${size * 0.18}px)`,
        opacity,
      }}
    />
  );
};

const DotGrid: React.FC<{ opacity: number }> = ({ opacity }) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      opacity,
      backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)`,
      backgroundSize: '32px 32px',
    }}
  />
);

const Scanlines: React.FC<{ opacity: number }> = ({ opacity }) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      opacity,
      backgroundImage: `repeating-linear-gradient(
        0deg,
        transparent,
        transparent 1px,
        rgba(255,255,255,0.1) 1px,
        rgba(255,255,255,0.1) 2px
      )`,
      backgroundSize: '100% 2px',
      pointerEvents: 'none',
    }}
  />
);
