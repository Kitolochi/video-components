import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { TEXT_OVERLAYS, COLORS, FONTS, type TextOverlay } from './config';

/** Screen-space text overlays. Problem = muted white, Solution = blue, Brand = bright white. */
export const TextOverlays: React.FC = () => {
  const frame = useCurrentFrame();

  // Check if any overlay is active to show backdrop
  const hasActive = TEXT_OVERLAYS.some(
    (o) => frame >= o.startFrame && frame <= o.endFrame,
  );

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {/* Bottom gradient backdrop for text readability */}
      {hasActive && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 280,
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
          }}
        />
      )}
      {TEXT_OVERLAYS.map((overlay) => (
        <SingleOverlay key={overlay.text} overlay={overlay} frame={frame} />
      ))}
    </AbsoluteFill>
  );
};

const SingleOverlay: React.FC<{ overlay: TextOverlay; frame: number }> = ({
  overlay,
  frame,
}) => {
  if (frame < overlay.startFrame || frame > overlay.endFrame) return null;

  const localFrame = frame - overlay.startFrame;
  const duration = overlay.endFrame - overlay.startFrame;

  // Fade in
  const fadeIn = interpolate(localFrame, [0, overlay.fadeInFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Fade out
  const fadeOut =
    overlay.fadeOutFrames > 0
      ? interpolate(
          localFrame,
          [duration - overlay.fadeOutFrames, duration],
          [1, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
        )
      : 1;

  const opacity = Math.min(fadeIn, fadeOut);

  // Subtle slide-up on entrance
  const translateY = interpolate(localFrame, [0, overlay.fadeInFrames], [12, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const style = getTextStyle(overlay.type);

  return (
    <div
      style={{
        position: 'absolute',
        ...style.position,
        opacity,
        transform: `translateY(${translateY}px)`,
        fontFamily: style.fontFamily,
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        color: style.color,
        letterSpacing: style.letterSpacing,
        textAlign: 'center' as const,
        width: '100%',
        padding: '0 120px',
        textShadow: '0 2px 20px rgba(0,0,0,0.5)',
      }}
    >
      {overlay.text}
    </div>
  );
};

function getTextStyle(type: TextOverlay['type']) {
  switch (type) {
    case 'problem':
      return {
        position: { bottom: 140 } as const,
        fontFamily: FONTS.hero,
        fontSize: 36,
        fontWeight: 400,
        color: COLORS.white70,
        letterSpacing: '0.02em',
      };
    case 'solution':
      return {
        position: { bottom: 120 } as const,
        fontFamily: FONTS.hero,
        fontSize: 44,
        fontWeight: 700,
        color: COLORS.blue,
        letterSpacing: '0.04em',
      };
    case 'brand':
      return {
        position: { bottom: 160 } as const,
        fontFamily: FONTS.hero,
        fontSize: 72,
        fontWeight: 700,
        color: COLORS.white95,
        letterSpacing: '0.05em',
      };
  }
}
