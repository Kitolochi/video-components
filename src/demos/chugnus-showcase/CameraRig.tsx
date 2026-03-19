import { AbsoluteFill } from 'remotion';
import { getCameraAtFrame, CARD } from './config';

/**
 * CameraRig — 3D perspective transforms simulating an orbiting camera.
 *
 * The orbit angle from waypoints drives:
 * - rotateY: sinusoidal oscillation (max ±35°) so text stays readable
 * - rotateX: tilt from waypoints (typically -5° to -25°)
 * - scale: distance-based zoom (closer = larger)
 * - translateX: slight horizontal pan synced to rotateY for parallax depth
 */
export const CameraRig: React.FC<{
  frame: number;
  children: React.ReactNode;
}> = ({ frame, children }) => {
  const cam = getCameraAtFrame(frame);

  // Convert orbit degrees to a sinusoidal Y-rotation (±35° max)
  // This creates the illusion of orbiting without flipping the card
  const orbitRad = (cam.orbitDeg * Math.PI) / 180;
  const yRotation = Math.sin(orbitRad) * 35;

  // Secondary wobble from cosine for more complex motion
  const yRotation2 = Math.cos(orbitRad * 0.7) * 8;

  // Combined Y rotation
  const totalYRotation = yRotation + yRotation2;

  // Parallax horizontal shift synced to Y rotation
  const panX = totalYRotation * 2.5;

  // Distance → scale (closer = larger)
  // At distance 2400 (far), scale ~0.5. At distance 580 (close), scale ~2.07.
  const scale = 1200 / cam.distance;

  // Subtle vertical drift based on orbit for organic feel
  const panY = Math.sin(orbitRad * 0.5) * 15;

  return (
    <AbsoluteFill
      style={{
        perspective: '1200px',
        perspectiveOrigin: '50% 42%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: CARD.width,
          height: CARD.height,
          transformStyle: 'preserve-3d',
          transform: `
            translateX(${panX}px)
            translateY(${panY}px)
            scale(${scale})
            rotateX(${cam.tiltDeg}deg)
            rotateY(${totalYRotation}deg)
          `,
          transformOrigin: '50% 50%',
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};
