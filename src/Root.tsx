import { Composition } from "remotion";
import { MarkKndActual } from "./demos/MarkKndActual";
import { UIShowcaseRange } from "./demos/UIShowcaseRange";
import { UIShowcasePolished } from "./demos/UIShowcasePolished";
import { IsometricShowcase } from "./demos/IsometricShowcase";
import { IsometricVariations } from "./demos/IsometricVariations";
import { IsometricVariationsFluid } from "./demos/IsometricVariationsFluid";
import { FluidTypography } from "./demos/FluidTypography";
import { CurvanceBytesLaunch } from "./demos/CurvanceBytesLaunch";
import { CurvanceBytesLaunchV2 } from "./demos/CurvanceBytesLaunchV2";
import { CurvanceBytesLaunchV3 } from "./demos/CurvanceBytesLaunchV3";
import { ChugnusShowcase } from "./demos/chugnus-showcase/ChugnusShowcase";

// STANDARD: 60fps for all compositions (smoother animations, professional output)
const FPS = 60;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* MarkKnd ACTUAL Techniques — Frame-accurate reconstruction */}
      <Composition
        id="MarkKndActual"
        component={MarkKndActual}
        durationInFrames={720}
        fps={FPS}
        width={1920}
        height={1080}
      />

      {/* UI Showcase Range — 8 technique variations (24s total) */}
      <Composition
        id="UIShowcaseRange"
        component={UIShowcaseRange}
        durationInFrames={1440}
        fps={FPS}
        width={1920}
        height={1080}
      />

      {/* UI Showcase POLISHED — 3D, angled, visual effects (24s) */}
      <Composition
        id="UIShowcasePolished"
        component={UIShowcasePolished}
        durationInFrames={1440}
        fps={FPS}
        width={1920}
        height={1080}
      />

      {/* Isometric Showcase — Multiple card sizes & angles with real UI */}
      <Composition
        id="IsometricShowcase"
        component={IsometricShowcase}
        durationInFrames={720}
        fps={FPS}
        width={1920}
        height={1080}
      />

      {/* Isometric Variations — 12 diverse camera angles & zoom techniques (24s) */}
      <Composition
        id="IsometricVariations"
        component={IsometricVariations}
        durationInFrames={1440}
        fps={FPS}
        width={1920}
        height={1080}
      />

      {/* Isometric Variations FLUID — MarkKnd fluidity techniques applied (24s) */}
      <Composition
        id="IsometricVariationsFluid"
        component={IsometricVariationsFluid}
        durationInFrames={1440}
        fps={FPS}
        width={1920}
        height={1080}
      />

      {/* Fluid Typography — Premium text animation techniques (24s) */}
      <Composition
        id="FluidTypography"
        component={FluidTypography}
        durationInFrames={1440}
        fps={FPS}
        width={1920}
        height={1080}
      />

      {/* Curvance Bytes Launch — Production-ready DeFi product announcement (24s) */}
      <Composition
        id="CurvanceBytesLaunch"
        component={CurvanceBytesLaunch}
        durationInFrames={1440}
        fps={FPS}
        width={1920}
        height={1080}
      />

      {/* Curvance Bytes Launch V2 — Real assets + dynamic timing (22s) */}
      <Composition
        id="CurvanceBytesLaunchV2"
        component={CurvanceBytesLaunchV2}
        durationInFrames={1326}
        fps={FPS}
        width={1920}
        height={1080}
      />

      {/* Curvance Bytes Launch V3 — Premium typography + SFX (22s) */}
      <Composition
        id="CurvanceBytesLaunchV3"
        component={CurvanceBytesLaunchV3}
        durationInFrames={1326}
        fps={FPS}
        width={1920}
        height={1080}
      />
      {/* Chugnus Command Center — Single isometric orbit showcase (30s) */}
      <Composition
        id="ChugnusShowcase"
        component={ChugnusShowcase}
        durationInFrames={1800}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
