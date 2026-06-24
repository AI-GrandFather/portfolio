import Image from "next/image";

export type ProjectTileMotif = "pos" | "blocks" | "paw" | "chart" | "hand";

export interface ProjectTileProps {
  gradient: string;
  accentColor: string;
  motif: ProjectTileMotif;
  tags: string;
  iconSrc?: string;
}

function renderMotif(motif: ProjectTileMotif, accentColor: string) {
  switch (motif) {
    case "pos":
      return (
        <g fill="none" stroke={accentColor} strokeLinecap="round" strokeLinejoin="round">
          <path d="M33 88h62" opacity="0.5" strokeWidth="2" />
          <rect height="58" rx="8" strokeWidth="2.5" width="48" x="40" y="25" />
          <path d="M48 37h32v13H48zM48 60h7M61 60h7M74 60h6M48 70h7M61 70h7M74 70h6" strokeWidth="2" />
          <path d="M91 33l8 8-8 8M99 41h-18" opacity="0.72" strokeWidth="2" />
          <path d="M29 41l8-8M29 41l8 8" opacity="0.45" strokeWidth="2" />
        </g>
      );
    case "blocks":
      return (
        <g stroke={accentColor} strokeWidth="2">
          {[
            [38, 32],
            [57, 32],
            [76, 32],
            [38, 51],
            [57, 51],
            [76, 51],
            [38, 70],
            [57, 70],
            [76, 70],
          ].map(([x, y]) => (
            <rect
              fill={x === 57 && y === 32 ? accentColor : "none"}
              height="13"
              key={`${x}-${y}`}
              width="13"
              x={x}
              y={y}
            />
          ))}
        </g>
      );
    case "paw":
      return (
        <g fill={accentColor}>
          <ellipse cx="64" cy="76" rx="20" ry="15" />
          <ellipse cx="42" cy="51" rx="8" ry="11" transform="rotate(-18 42 51)" />
          <ellipse cx="57" cy="43" rx="8" ry="12" transform="rotate(-8 57 43)" />
          <ellipse cx="72" cy="43" rx="8" ry="12" transform="rotate(8 72 43)" />
          <ellipse cx="87" cy="51" rx="8" ry="11" transform="rotate(18 87 51)" />
        </g>
      );
    case "chart":
      return (
        <g fill="none" stroke={accentColor} strokeLinecap="round" strokeLinejoin="round">
          <rect height="68" opacity="0.8" rx="7" strokeWidth="2" width="80" x="24" y="27" />
          <path d="M36 43h26M36 51h14" opacity="0.55" strokeWidth="2" />
          <path d="M36 82v-12M48 82V61M60 82V66M72 82V53" strokeWidth="4" />
          <path d="M35 68l14-12 12 5 16-19 14 7" strokeWidth="2.5" />
          <circle cx="49" cy="56" fill={accentColor} r="2.5" />
          <circle cx="77" cy="42" fill={accentColor} r="2.5" />
          <path d="M84 82h8" opacity="0.52" strokeWidth="2" />
        </g>
      );
    case "hand":
      return (
        <g fill="none" stroke={accentColor} strokeLinecap="round" strokeLinejoin="round">
          <path d="M63 98C52 84 42 71 36 52l-2-18M63 98C57 75 52 54 52 28M63 98C64 74 66 49 67 23M63 98C73 75 79 53 85 30M63 98C84 79 94 60 103 43" strokeWidth="2.5" />
          <path d="M36 52l16 2 15-5 18 4 18-10M52 54l5 18 7 2 9-18 7 13 8-16" opacity="0.68" strokeWidth="1.5" />
          <circle cx="34" cy="34" fill={accentColor} r="3" />
          <circle cx="52" cy="28" fill={accentColor} r="3" />
          <circle cx="67" cy="23" fill={accentColor} r="3" />
          <circle cx="85" cy="30" fill={accentColor} r="3" />
          <circle cx="103" cy="43" fill={accentColor} r="3" />
          <circle cx="63" cy="98" fill={accentColor} r="3.5" />
        </g>
      );
  }
}

export function ProjectTile({
  gradient,
  accentColor,
  motif,
  tags,
  iconSrc,
}: ProjectTileProps) {
  return (
    <div className="project-visual" style={{ background: gradient }}>
      {iconSrc ? (
        <Image
          alt=""
          className="project-tile-icon"
          height={96}
          src={iconSrc}
          style={{
            borderRadius: "22%",
            boxShadow: "0 8px 32px rgba(0,0,0,0.45)",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          width={96}
        />
      ) : (
        <svg
          aria-hidden="true"
          className="project-tile-motif"
          fill="none"
          style={{
            left: "50%",
            position: "absolute",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
          viewBox="0 0 128 128"
        >
          {renderMotif(motif, accentColor)}
        </svg>
      )}
      <span>{tags}</span>
    </div>
  );
}
