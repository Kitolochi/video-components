import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

/**
 * Curvance Bytes Launch — Premium Product Announcement
 *
 * Combines:
 * - Fluid typography (word-level stagger, premium easing)
 * - Isometric UI showcases (dashboard tilts, zoom punch)
 * - MarkKnd fluidity (400ms cross-fades, 200ms overlap, color anchors)
 * - DeFi-specific visual language (yield curves, TVL stats, APY highlights)
 *
 * Structure:
 * 1. Cold open: "Introducing Bytes" (0-3s)
 * 2. Value prop: "Click less, earn more" (3-6s)
 * 3. Dashboard showcase: Yield optimization UI (6-9s)
 * 4. Feature highlight: Auto-compounding (9-12s)
 * 5. Stats impact: APY + TVL numbers (12-15s)
 * 6. Liquidity showcase: Instant access UI (15-18s)
 * 7. Security badge: Audited (18-21s)
 * 8. Brand close: "Curvance Bytes" logo (21-24s)
 *
 * Duration: 24s (1440 frames at 60fps)
 * Target Fluidity Score: 92+/100
 */

// Premium easing
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Curvance brand colors (DeFi aesthetic: deep blues, greens for yields, purples for premium)
const COLORS = {
  navy: '#0a0e27',
  deepBlue: '#0f1729',
  slate: '#1e293b',
  green: '#10b981',      // Yield/APY positive
  greenBright: '#34d399',
  cyan: '#06b6d4',       // Liquidity/accent
  purple: '#8b5cf6',     // Premium/brand
  purpleDark: '#6d28d9',
  white: '#ffffff',
  whiteAlpha: 'rgba(255, 255, 255, 0.6)',
  goldAccent: '#fbbf24', // High APY highlight
};

// Timing constants
const SCENE_DURATION = 180; // 3s per scene
const FADE_FRAMES = 24;     // 400ms
const OVERLAP_FRAMES = 12;  // 200ms
const WORD_DURATION = 36;   // 600ms
const WORD_STAGGER = 12;    // 200ms

export const CurvanceBytesLaunch: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {/* Scene 1: Cold open - "Introducing Bytes" (0-3s) */}
      <Sequence from={0} durationInFrames={SCENE_DURATION}>
        <Scene1Introducing frame={frame} fps={fps} />
      </Sequence>

      {/* Scene 2: Value prop - "Click less, earn more" (3-6s) */}
      <Sequence from={SCENE_DURATION - OVERLAP_FRAMES} durationInFrames={SCENE_DURATION}>
        <Scene2ValueProp frame={frame - (SCENE_DURATION - OVERLAP_FRAMES)} fps={fps} />
      </Sequence>

      {/* Scene 3: Dashboard showcase - Yield optimization UI (6-9s) */}
      <Sequence from={SCENE_DURATION * 2 - OVERLAP_FRAMES} durationInFrames={SCENE_DURATION}>
        <Scene3DashboardShowcase frame={frame - (SCENE_DURATION * 2 - OVERLAP_FRAMES)} fps={fps} />
      </Sequence>

      {/* Scene 4: Feature highlight - Auto-compounding (9-12s) */}
      <Sequence from={SCENE_DURATION * 3 - OVERLAP_FRAMES} durationInFrames={SCENE_DURATION}>
        <Scene4AutoCompound frame={frame - (SCENE_DURATION * 3 - OVERLAP_FRAMES)} fps={fps} />
      </Sequence>

      {/* Scene 5: Stats impact - APY + TVL (12-15s) */}
      <Sequence from={SCENE_DURATION * 4 - OVERLAP_FRAMES} durationInFrames={SCENE_DURATION}>
        <Scene5StatsImpact frame={frame - (SCENE_DURATION * 4 - OVERLAP_FRAMES)} fps={fps} />
      </Sequence>

      {/* Scene 6: Liquidity showcase - Instant access (15-18s) */}
      <Sequence from={SCENE_DURATION * 5 - OVERLAP_FRAMES} durationInFrames={SCENE_DURATION}>
        <Scene6LiquidityShowcase frame={frame - (SCENE_DURATION * 5 - OVERLAP_FRAMES)} fps={fps} />
      </Sequence>

      {/* Scene 7: Security badge - Audited (18-21s) */}
      <Sequence from={SCENE_DURATION * 6 - OVERLAP_FRAMES} durationInFrames={SCENE_DURATION}>
        <Scene7Security frame={frame - (SCENE_DURATION * 6 - OVERLAP_FRAMES)} fps={fps} />
      </Sequence>

      {/* Scene 8: Brand close - "Curvance Bytes" (21-24s) */}
      <Sequence from={SCENE_DURATION * 7 - OVERLAP_FRAMES} durationInFrames={SCENE_DURATION}>
        <Scene8BrandClose frame={frame - (SCENE_DURATION * 7 - OVERLAP_FRAMES)} fps={fps} />
      </Sequence>
    </AbsoluteFill>
  );
};

// Utility: Cross-fade opacity
const useCrossFadeOpacity = (frame: number) => {
  return interpolate(
    frame,
    [0, FADE_FRAMES, SCENE_DURATION - FADE_FRAMES, SCENE_DURATION],
    [0, 1, 1, 0],
    { easing: easeOutExpo, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
};

// Utility: Glow pulse (2s cycle)
const useGlowPulse = (frame: number, fps: number) => {
  const pulseProgress = (frame % (fps * 2)) / (fps * 2);
  const sineValue = Math.sin(pulseProgress * Math.PI * 2);
  const pulseIntensity = interpolate(sineValue, [-1, 1], [0.6, 1.0]);
  return pulseIntensity;
};

// Scene 1: Cold open - "Introducing Bytes"
const Scene1Introducing: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = useCrossFadeOpacity(frame);
  const words = ['Introducing', 'Bytes'];

  return (
    <AbsoluteFill style={{ opacity }}>
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.deepBlue} 100%)` }} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '30px' }}>
        {words.map((word, i) => {
          const startFrame = i * (WORD_DURATION + WORD_STAGGER);
          const wordProgress = interpolate(frame, [startFrame, startFrame + WORD_DURATION], [0, 1], { easing: easeOutExpo, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const textOpacity = interpolate(wordProgress, [0, 1], [0, 1]);
          const translateY = interpolate(wordProgress, [0, 1], [20, 0]);
          const scale = interpolate(wordProgress, [0, 1], [0.95, 1.0]);

          return (
            <span key={i} style={{
              fontFamily: 'Inter',
              fontSize: i === 1 ? '110px' : '90px',
              fontWeight: i === 1 ? 900 : 700,
              background: i === 1 ? `linear-gradient(90deg, ${COLORS.cyan} 0%, ${COLORS.purple} 100%)` : COLORS.white,
              WebkitBackgroundClip: i === 1 ? 'text' : undefined,
              WebkitTextFillColor: i === 1 ? 'transparent' : undefined,
              backgroundClip: i === 1 ? 'text' : undefined,
              color: i === 0 ? COLORS.white : undefined,
              opacity: textOpacity,
              transform: `translateY(${translateY}px) scale(${scale})`,
              display: 'inline-block',
            }}>
              {word}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: Value prop - "Click less, earn more"
const Scene2ValueProp: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = useCrossFadeOpacity(frame);
  const line1Progress = interpolate(frame, [0, WORD_DURATION], [0, 1], { easing: easeOutExpo, extrapolateRight: 'clamp' });
  const line2Progress = interpolate(frame, [WORD_STAGGER * 2, WORD_STAGGER * 2 + WORD_DURATION], [0, 1], { easing: easeOutExpo, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ opacity }}>
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${COLORS.deepBlue} 0%, ${COLORS.slate} 100%)` }} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '30px' }}>
        <h2 style={{
          fontFamily: 'Inter',
          fontSize: '70px',
          fontWeight: 700,
          color: COLORS.whiteAlpha,
          opacity: interpolate(line1Progress, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(line1Progress, [0, 1], [20, 0])}px)`,
          margin: 0,
        }}>
          Click less
        </h2>
        <h1 style={{
          fontFamily: 'Inter',
          fontSize: '90px',
          fontWeight: 900,
          color: COLORS.green,
          opacity: interpolate(line2Progress, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(line2Progress, [0, 1], [20, 0])}px)`,
          margin: 0,
          textShadow: `0 0 40px ${COLORS.green}60`,
        }}>
          earn more
        </h1>
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: Dashboard showcase - Tilted isometric UI with yields
const Scene3DashboardShowcase: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = useCrossFadeOpacity(frame);
  const scale = interpolate(frame, [0, SCENE_DURATION], [0.9, 1.0], { easing: easeOutExpo });
  const rotateX = interpolate(frame, [0, SCENE_DURATION], [-22, -18], { easing: easeInOutCubic });

  const vaults = [
    { name: 'USDC Vault', apy: '12.4%', tvl: '$2.4M', status: 'active' },
    { name: 'ETH Vault', apy: '8.7%', tvl: '$5.1M', status: 'active' },
    { name: 'BTC Vault', apy: '6.2%', tvl: '$3.8M', status: 'compounding' },
  ];

  return (
    <AbsoluteFill style={{ opacity }}>
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.deepBlue} 100%)` }} />
      <div style={{ width: '100%', height: '100%', perspective: '1600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          transform: `scale(${scale}) rotateX(${rotateX}deg) rotateY(-8deg)`,
          transformStyle: 'preserve-3d',
          width: '900px',
          height: '600px',
          background: `linear-gradient(135deg, ${COLORS.slate} 0%, ${COLORS.deepBlue} 100%)`,
          borderRadius: '24px',
          border: `2px solid ${COLORS.cyan}40`,
          boxShadow: `0 60px 120px rgba(0, 0, 0, 0.8), 0 0 60px ${COLORS.cyan}20`,
          padding: '50px',
        }}>
          <div style={{ fontFamily: 'Inter', color: COLORS.white, fontSize: '42px', fontWeight: 700, marginBottom: '40px' }}>
            Your Vaults
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {vaults.map((vault, i) => {
              const pulseIntensity = vault.status === 'compounding' ? useGlowPulse(frame, fps) : 1;
              return (
                <div key={i} style={{
                  background: 'rgba(6, 182, 212, 0.08)',
                  borderRadius: '16px',
                  padding: '30px',
                  border: vault.status === 'compounding' ? `2px solid rgba(16, 185, 129, ${0.3 * pulseIntensity})` : '1px solid rgba(6, 182, 212, 0.2)',
                  boxShadow: vault.status === 'compounding' ? `0 0 ${20 * pulseIntensity}px rgba(16, 185, 129, ${0.3 * pulseIntensity})` : 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <div>
                    <div style={{ fontFamily: 'Inter', color: COLORS.white, fontSize: '24px', fontWeight: 600 }}>{vault.name}</div>
                    <div style={{ fontFamily: 'Inter', color: COLORS.whiteAlpha, fontSize: '14px', marginTop: '8px' }}>TVL: {vault.tvl}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'Inter', color: COLORS.green, fontSize: '36px', fontWeight: 700 }}>{vault.apy}</div>
                    <div style={{ fontFamily: 'Inter', color: COLORS.greenBright, fontSize: '12px', textTransform: 'uppercase' }}>APY</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: Auto-compounding feature with typography overlay
const Scene4AutoCompound: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = useCrossFadeOpacity(frame);
  const textProgress = interpolate(frame, [0, WORD_DURATION], [0, 1], { easing: easeOutExpo, extrapolateRight: 'clamp' });
  const uiProgress = interpolate(frame, [WORD_STAGGER, WORD_STAGGER + WORD_DURATION], [0, 1], { easing: easeOutExpo, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const compoundProgress = interpolate(frame, [WORD_STAGGER * 3, SCENE_DURATION], [0, 1], { easing: 'linear', extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill style={{ opacity }}>
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${COLORS.slate} 0%, ${COLORS.navy} 100%)` }} />

      {/* Typography overlay (statement) */}
      <div style={{ position: 'absolute', top: '120px', left: '100px', opacity: interpolate(textProgress, [0, 1], [0, 1]) }}>
        <h2 style={{ fontFamily: 'Inter', fontSize: '52px', fontWeight: 700, color: COLORS.white, margin: 0 }}>Auto-compounding</h2>
        <p style={{ fontFamily: 'Inter', fontSize: '24px', color: COLORS.whiteAlpha, margin: '10px 0 0 0' }}>Set it and forget it</p>
      </div>

      {/* UI proof (center) */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', paddingTop: '100px' }}>
        <div style={{
          width: '700px',
          height: '400px',
          background: 'rgba(6, 182, 212, 0.05)',
          borderRadius: '24px',
          border: `2px solid ${COLORS.cyan}30`,
          padding: '50px',
          opacity: interpolate(uiProgress, [0, 1], [0, 1]),
          transform: `scale(${interpolate(uiProgress, [0, 1], [0.95, 1.0])})`,
        }}>
          <div style={{ fontFamily: 'Inter', color: COLORS.green, fontSize: '28px', fontWeight: 600, marginBottom: '30px' }}>
            Compounding Rewards
          </div>
          <div style={{ width: '100%', height: '200px', background: `linear-gradient(90deg, ${COLORS.green}00 0%, ${COLORS.green}40 ${compoundProgress * 100}%, ${COLORS.green}00 ${compoundProgress * 100}%)`, borderRadius: '12px', border: `1px solid ${COLORS.green}30`, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: `${compoundProgress * 85}%`, top: '50%', transform: 'translateY(-50%)', fontFamily: 'Inter', color: COLORS.greenBright, fontSize: '48px', fontWeight: 700 }}>
              {(12.4 + compoundProgress * 2.6).toFixed(1)}%
            </div>
          </div>
          <div style={{ fontFamily: 'Inter', color: COLORS.whiteAlpha, fontSize: '16px', marginTop: '20px', textAlign: 'center' }}>
            Automatically reinvests your yields
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 5: Stats impact - Big numbers (APY + TVL)
const Scene5StatsImpact: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = useCrossFadeOpacity(frame);
  const countProgress = interpolate(frame, [WORD_STAGGER, SCENE_DURATION], [0, 1], { easing: easeOutExpo, extrapolateLeft: 'clamp' });

  const apy = 8.7 + countProgress * 6.3; // Count from 8.7% to 15.0%
  const tvl = 12.5 + countProgress * 37.5; // Count from $12.5M to $50M

  return (
    <AbsoluteFill style={{ opacity }}>
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${COLORS.deepBlue} 0%, ${COLORS.navy} 100%)` }} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '80px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'Inter', color: COLORS.whiteAlpha, fontSize: '28px', marginBottom: '20px' }}>Average APY</div>
          <div style={{ fontFamily: 'Inter', color: COLORS.goldAccent, fontSize: '120px', fontWeight: 900, textShadow: `0 0 60px ${COLORS.goldAccent}60` }}>
            {apy.toFixed(1)}%
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'Inter', color: COLORS.whiteAlpha, fontSize: '28px', marginBottom: '20px' }}>Total Value Locked</div>
          <div style={{ fontFamily: 'Inter', color: COLORS.cyan, fontSize: '100px', fontWeight: 900 }}>
            ${tvl.toFixed(1)}M
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 6: Liquidity showcase - Zoom punch on instant access button
const Scene6LiquidityShowcase: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = useCrossFadeOpacity(frame);
  const scale = interpolate(frame, [0, SCENE_DURATION * 0.6], [2.5, 1.0], { easing: easeOutExpo, extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ opacity }}>
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.slate} 100%)` }} />
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ transform: `scale(${scale})`, transformStyle: 'preserve-3d' }}>
          <div style={{
            padding: '60px 80px',
            background: `linear-gradient(135deg, ${COLORS.cyan} 0%, ${COLORS.purple} 100%)`,
            borderRadius: '24px',
            boxShadow: `0 40px 100px rgba(0, 0, 0, 0.8), 0 0 80px ${COLORS.cyan}40`,
            textAlign: 'center',
          }}>
            <div style={{ fontFamily: 'Inter', color: COLORS.white, fontSize: '64px', fontWeight: 900, marginBottom: '20px' }}>
              Instant Liquidity
            </div>
            <div style={{ fontFamily: 'Inter', color: 'rgba(255, 255, 255, 0.8)', fontSize: '28px', fontWeight: 500 }}>
              Access your funds anytime
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 7: Security badge - Audited (trust signal)
const Scene7Security: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = useCrossFadeOpacity(frame);
  const badgeProgress = interpolate(frame, [0, WORD_DURATION * 1.5], [0, 1], { easing: easeOutExpo, extrapolateRight: 'clamp' });
  const scale = interpolate(badgeProgress, [0, 1], [0.8, 1.0]);
  const badgeOpacity = interpolate(badgeProgress, [0, 1], [0, 1]);

  const auditors = ['Trail of Bits', 'Spearbit', 'TrustSec'];

  return (
    <AbsoluteFill style={{ opacity }}>
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${COLORS.slate} 0%, ${COLORS.deepBlue} 100%)` }} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '50px' }}>
        <div style={{ opacity: badgeOpacity, transform: `scale(${scale})` }}>
          <div style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${COLORS.green} 0%, ${COLORS.greenBright} 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 0 80px ${COLORS.green}60`,
            border: '4px solid rgba(255, 255, 255, 0.2)',
          }}>
            <div style={{ fontFamily: 'Inter', color: COLORS.white, fontSize: '80px', fontWeight: 900 }}>✓</div>
          </div>
        </div>
        <h2 style={{ fontFamily: 'Inter', color: COLORS.white, fontSize: '48px', fontWeight: 700, margin: 0, opacity: badgeOpacity }}>
          Audited & Secure
        </h2>
        <div style={{ display: 'flex', gap: '30px', opacity: badgeOpacity }}>
          {auditors.map((auditor, i) => (
            <div key={i} style={{ fontFamily: 'Inter', color: COLORS.whiteAlpha, fontSize: '18px', fontWeight: 500 }}>
              {auditor}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 8: Brand close - "Curvance Bytes"
const Scene8BrandClose: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = useCrossFadeOpacity(frame);
  const line1Progress = interpolate(frame, [0, WORD_DURATION], [0, 1], { easing: easeOutExpo, extrapolateRight: 'clamp' });
  const line2Progress = interpolate(frame, [WORD_STAGGER * 2, WORD_STAGGER * 2 + WORD_DURATION], [0, 1], { easing: easeOutExpo, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ opacity }}>
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.deepBlue} 100%)` }} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '30px' }}>
        <h1 style={{
          fontFamily: 'Inter',
          fontSize: '110px',
          fontWeight: 900,
          background: `linear-gradient(90deg, ${COLORS.cyan} 0%, ${COLORS.purple} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          opacity: interpolate(line1Progress, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(line1Progress, [0, 1], [20, 0])}px)`,
          margin: 0,
        }}>
          Curvance Bytes
        </h1>
        <h2 style={{
          fontFamily: 'Inter',
          fontSize: '32px',
          fontWeight: 500,
          color: COLORS.whiteAlpha,
          opacity: interpolate(line2Progress, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(line2Progress, [0, 1], [20, 0])}px)`,
          margin: 0,
        }}>
          Smarter DeFi, simplified
        </h2>
      </div>
    </AbsoluteFill>
  );
};
