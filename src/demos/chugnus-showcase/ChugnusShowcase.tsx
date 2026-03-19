import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { getCameraAtFrame, DURATION_FRAMES } from './config';
import { Background } from './Background';
import { CameraRig } from './CameraRig';
import { IsometricCard } from './IsometricCard';
import { TextOverlays } from './TextOverlays';

/**
 * Chugnus Command Center — Single Isometric Orbit Showcase
 *
 * One card. One camera. One story.
 * Act 1 (0-10s): Slow orbit, problem statements
 * Act 2 (10-22s): Dynamic zoom punches into features
 * Act 3 (22-30s): Slow pullback, brand anchor
 */
export const ChugnusShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const cam = getCameraAtFrame(frame);

  // Card fade-in during first 60 frames (1s)
  const cardOpacity = interpolate(frame, [0, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0c0c0e' }}>
      {/* Layer 0: Background (orbs, grid, vignette) */}
      <Background energy={cam.energy} />

      {/* Layer 1: Camera Rig + Isometric Card */}
      <div style={{ opacity: cardOpacity }}>
        <CameraRig frame={frame}>
          <IsometricCard
            activeRegion={cam.targetRegion}
            energy={cam.energy}
            frame={frame}
          />
        </CameraRig>
      </div>

      {/* Layer 2: Screen-space text overlays */}
      <TextOverlays />

      {/* Layer 3: Progress bar */}
      <ProgressBar frame={frame} totalFrames={DURATION_FRAMES} />
    </AbsoluteFill>
  );
};

const ProgressBar: React.FC<{ frame: number; totalFrames: number }> = ({
  frame,
  totalFrames,
}) => {
  const progress = (frame / totalFrames) * 100;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 3,
        background: 'rgba(255,255,255,0.05)',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${progress}%`,
          background: '#6C8EEF',
          borderRadius: '0 2px 2px 0',
        }}
      />
    </div>
  );
};
