// A shaped edge between two sections, so they don't meet in a straight line.
// Place it between sections and set `from` to the colour of the section above and `to` to the
// colour of the section below. The sections themselves should not have a top/bottom border.

type Tone = "white" | "blue";
type Variant = "wave" | "layers" | "slant" | "slantReverse" | "curve";

// white = #ffffff, blue = Tailwind blue-50 (#eff6ff)
const fills: Record<Tone, string> = { white: "#ffffff", blue: "#eff6ff" };

// Every path is drawn on a 1440 x 80 canvas and fills the area below the edge with the "to" colour
const paths: Record<Variant, string> = {
  wave: "M0,44 C240,84 480,4 720,34 C960,64 1200,74 1440,24 L1440,80 L0,80 Z",
  layers: "M0,30 C300,76 600,0 900,36 C1140,64 1320,50 1440,34 L1440,80 L0,80 Z",
  slant: "M0,72 L1440,8 L1440,80 L0,80 Z",
  slantReverse: "M0,8 L1440,72 L1440,80 L0,80 Z",
  curve: "M0,64 Q720,-8 1440,64 L1440,80 L0,80 Z",
};

export default function SectionDivider({
  from,
  to,
  variant = "wave",
}: {
  from: Tone;
  to: Tone;
  variant?: Variant;
}) {
  return (
    <div aria-hidden="true" className="relative w-full leading-none" style={{ background: fills[from] }}>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="block h-10 w-full md:h-16 lg:h-20"
      >
        {/* A softer copy sits behind the main edge for a little depth */}
        {(variant === "wave" || variant === "layers") && (
          <path d={paths[variant]} fill={fills[to]} opacity="0.45" transform="translate(0,-9)" />
        )}
        <path d={paths[variant]} fill={fills[to]} />
      </svg>
    </div>
  );
}
