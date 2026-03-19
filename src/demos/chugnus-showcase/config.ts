// Chugnus Command Center — Single Isometric Orbit Showcase
// Config: timing, camera path, design tokens, messaging

export const FPS = 60;
export const DURATION_S = 30;
export const DURATION_FRAMES = FPS * DURATION_S; // 1800

// ─── DESIGN TOKENS ─────────────────────────────────────
export const COLORS = {
  bg: '#0c0c0e',
  surface1: '#131316',
  surface2: '#1a1a1f',
  surface3: '#222228',
  surface4: '#2a2a32',
  blue: '#6C8EEF',
  purple: '#A78BFA',
  emerald: '#34D399',
  amber: '#FBBF24',
  rose: '#F472B6',
  red: '#F87171',
  teal: '#2DD4BF',
  orange: '#FB923C',
  muted: '#6b6b7b',
  subtle: '#3a3a46',
  white95: 'rgba(255,255,255,0.95)',
  white70: 'rgba(255,255,255,0.70)',
  lightBg: '#F5F0EB',
} as const;

export const FONTS = {
  hero: 'JetBrains Mono',
  accent: 'Space Grotesk',
  body: 'DM Sans',
  display: 'Instrument Sans',
} as const;

// ─── EASING ────────────────────────────────────────────
export const easeOutExpo = (t: number) =>
  t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export const easeOutBack = (t: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

// ─── CAMERA WAYPOINTS ──────────────────────────────────
export interface Waypoint {
  id: string;
  startFrame: number;
  endFrame: number;
  act: 'problem' | 'solution' | 'brand';
  camera: {
    distance: number;
    orbitDeg: number;
    tiltDeg: number;
  };
  targetRegion: string | null;
  energy: number;
}

export const WAYPOINTS: Waypoint[] = [
  // ACT 1: THE PROBLEM (0-10s)
  {
    id: 'W1', startFrame: 0, endFrame: 120,
    act: 'problem',
    camera: { distance: 2400, orbitDeg: 0, tiltDeg: -25 },
    targetRegion: null, energy: 0.40,
  },
  {
    id: 'W2', startFrame: 120, endFrame: 240,
    act: 'problem',
    camera: { distance: 2100, orbitDeg: 8, tiltDeg: -25 },
    targetRegion: null, energy: 0.45,
  },
  {
    id: 'W3', startFrame: 240, endFrame: 360,
    act: 'problem',
    camera: { distance: 1900, orbitDeg: 16, tiltDeg: -20 },
    targetRegion: null, energy: 0.50,
  },
  {
    id: 'W4', startFrame: 360, endFrame: 480,
    act: 'problem',
    camera: { distance: 1600, orbitDeg: 22, tiltDeg: -18 },
    targetRegion: 'sidebar', energy: 0.60,
  },
  {
    id: 'W5', startFrame: 480, endFrame: 600,
    act: 'problem',
    camera: { distance: 1400, orbitDeg: 25, tiltDeg: -15 },
    targetRegion: null, energy: 0.65,
  },
  // ACT 2: THE SOLUTION (10-22s)
  {
    id: 'W6', startFrame: 600, endFrame: 690,
    act: 'solution',
    camera: { distance: 600, orbitDeg: 27, tiltDeg: -5 },
    targetRegion: 'command_center', energy: 0.85,
  },
  {
    id: 'W7', startFrame: 690, endFrame: 780,
    act: 'solution',
    camera: { distance: 650, orbitDeg: 72, tiltDeg: -8 },
    targetRegion: 'agents', energy: 0.90,
  },
  {
    id: 'W8', startFrame: 780, endFrame: 870,
    act: 'solution',
    camera: { distance: 600, orbitDeg: 107, tiltDeg: -3 },
    targetRegion: 'sessions', energy: 0.95,
  },
  {
    id: 'W9', startFrame: 870, endFrame: 960,
    act: 'solution',
    camera: { distance: 650, orbitDeg: 180, tiltDeg: -10 },
    targetRegion: 'memories', energy: 0.90,
  },
  {
    id: 'W10', startFrame: 960, endFrame: 1050,
    act: 'solution',
    camera: { distance: 580, orbitDeg: 220, tiltDeg: -5 },
    targetRegion: 'context_query', energy: 0.95,
  },
  {
    id: 'W11', startFrame: 1050, endFrame: 1140,
    act: 'solution',
    camera: { distance: 620, orbitDeg: 270, tiltDeg: -8 },
    targetRegion: 'kanban', energy: 1.00,
  },
  {
    id: 'W12', startFrame: 1140, endFrame: 1320,
    act: 'solution',
    camera: { distance: 900, orbitDeg: 630, tiltDeg: -20 },
    targetRegion: null, energy: 1.00,
  },
  // ACT 3: THE BRAND (22-30s)
  {
    id: 'W13', startFrame: 1320, endFrame: 1500,
    act: 'brand',
    camera: { distance: 2000, orbitDeg: 640, tiltDeg: -25 },
    targetRegion: null, energy: 0.60,
  },
  {
    id: 'W14', startFrame: 1500, endFrame: 1680,
    act: 'brand',
    camera: { distance: 2200, orbitDeg: 643, tiltDeg: -25 },
    targetRegion: null, energy: 0.45,
  },
  {
    id: 'W15', startFrame: 1680, endFrame: 1800,
    act: 'brand',
    camera: { distance: 2200, orbitDeg: 644, tiltDeg: -25 },
    targetRegion: null, energy: 0.35,
  },
];

// ─── TEXT OVERLAYS ──────────────────────────────────────
export interface TextOverlay {
  text: string;
  type: 'problem' | 'solution' | 'brand';
  startFrame: number;
  endFrame: number;
  fadeInFrames: number;
  fadeOutFrames: number;
}

export const TEXT_OVERLAYS: TextOverlay[] = [
  // Problem statements
  {
    text: 'You run 12 Claude sessions a day.',
    type: 'problem', startFrame: 120, endFrame: 240,
    fadeInFrames: 24, fadeOutFrames: 18,
  },
  {
    text: 'None of them talk to each other.',
    type: 'problem', startFrame: 240, endFrame: 360,
    fadeInFrames: 24, fadeOutFrames: 18,
  },
  {
    text: 'Your agents forget. Your sessions vanish.',
    type: 'problem', startFrame: 360, endFrame: 480,
    fadeInFrames: 24, fadeOutFrames: 18,
  },
  {
    text: 'Your knowledge scatters across 47 files.',
    type: 'problem', startFrame: 480, endFrame: 600,
    fadeInFrames: 24, fadeOutFrames: 18,
  },
  // Solution statements
  {
    text: 'Command Center.',
    type: 'solution', startFrame: 610, endFrame: 690,
    fadeInFrames: 15, fadeOutFrames: 12,
  },
  {
    text: 'Deploy agents. Track runs. Watch them work.',
    type: 'solution', startFrame: 700, endFrame: 780,
    fadeInFrames: 15, fadeOutFrames: 12,
  },
  {
    text: 'See where your time goes.',
    type: 'solution', startFrame: 790, endFrame: 870,
    fadeInFrames: 15, fadeOutFrames: 12,
  },
  {
    text: 'Extract knowledge. Keep it.',
    type: 'solution', startFrame: 880, endFrame: 960,
    fadeInFrames: 15, fadeOutFrames: 12,
  },
  {
    text: 'Ask your own data anything.',
    type: 'solution', startFrame: 970, endFrame: 1050,
    fadeInFrames: 15, fadeOutFrames: 12,
  },
  {
    text: 'Ship faster.',
    type: 'solution', startFrame: 1060, endFrame: 1140,
    fadeInFrames: 12, fadeOutFrames: 10,
  },
  // Brand statements
  {
    text: 'Chugnus Command Center',
    type: 'brand', startFrame: 1350, endFrame: 1500,
    fadeInFrames: 30, fadeOutFrames: 24,
  },
  {
    text: 'Your AI Command Center.',
    type: 'brand', startFrame: 1520, endFrame: 1800,
    fadeInFrames: 30, fadeOutFrames: 0,
  },
];

// ─── CARD DIMENSIONS ───────────────────────────────────
export const CARD = {
  width: 1000,
  height: 650,
  thickness: 20,
  cornerRadius: 16,
  edgeGlowColor: COLORS.blue,
  edgeGlowOpacity: 0.15,
} as const;

// ─── HELPERS ───────────────────────────────────────────
/** Get interpolated camera state for any frame */
export function getCameraAtFrame(frame: number) {
  // Find the two waypoints we're between
  let prev = WAYPOINTS[0];
  let next = WAYPOINTS[0];

  for (let i = 0; i < WAYPOINTS.length - 1; i++) {
    if (frame >= WAYPOINTS[i].startFrame && frame < WAYPOINTS[i + 1].startFrame) {
      prev = WAYPOINTS[i];
      next = WAYPOINTS[i + 1];
      break;
    }
  }

  // Last waypoint
  if (frame >= WAYPOINTS[WAYPOINTS.length - 1].startFrame) {
    prev = WAYPOINTS[WAYPOINTS.length - 1];
    next = prev;
  }

  const duration = next.startFrame - prev.startFrame;
  const progress = duration > 0 ? (frame - prev.startFrame) / duration : 1;

  // Use exponential easing for solution act (snappy zooms), smooth for others
  const eased = prev.act === 'solution' ? easeOutExpo(progress) : easeInOutCubic(progress);

  return {
    distance: prev.camera.distance + (next.camera.distance - prev.camera.distance) * eased,
    orbitDeg: prev.camera.orbitDeg + (next.camera.orbitDeg - prev.camera.orbitDeg) * eased,
    tiltDeg: prev.camera.tiltDeg + (next.camera.tiltDeg - prev.camera.tiltDeg) * eased,
    energy: prev.energy + (next.energy - prev.energy) * eased,
    act: prev.act,
    targetRegion: prev.targetRegion,
  };
}
