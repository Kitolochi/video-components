import { Composition } from "remotion";
import { MarkKndActual } from "./demos/MarkKndActual";
import { UIShowcaseRange } from "./demos/UIShowcaseRange";
import { UIShowcasePolished } from "./demos/UIShowcasePolished";
import { IsometricShowcase } from "./demos/IsometricShowcase";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* MarkKnd ACTUAL Techniques — Frame-accurate reconstruction */}
      <Composition
        id="MarkKndActual"
        component={MarkKndActual}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* UI Showcase Range — 8 technique variations (24s total) */}
      <Composition
        id="UIShowcaseRange"
        component={UIShowcaseRange}
        durationInFrames={720}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* UI Showcase POLISHED — 3D, angled, visual effects (24s) */}
      <Composition
        id="UIShowcasePolished"
        component={UIShowcasePolished}
        durationInFrames={720}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Isometric Showcase — Multiple card sizes & angles with real UI */}
      <Composition
        id="IsometricShowcase"
        component={IsometricShowcase}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
