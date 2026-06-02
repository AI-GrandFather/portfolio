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
        <g fill="none" stroke={accentColor} strokeWidth="2">
          <rect height="64" rx="7" width="46" x="41" y="28" />
          <path d="M50 43h28M50 55h22M50 67h26M50 80h28" />
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
        <g fill={accentColor}>
          <rect height="18" rx="2" width="12" x="38" y="72" />
          <rect height="33" rx="2" width="12" x="56" y="57" />
          <rect height="45" rx="2" width="12" x="74" y="45" />
          <rect height="60" rx="2" width="12" x="92" y="30" />
          <path d="M31 91h82" fill="none" stroke={accentColor} strokeWidth="2" />
        </g>
      );
    case "hand":
      return (
        <g fill="none" stroke={accentColor} strokeLinecap="round" strokeWidth="2">
          <path d="M64 88C48 69 40 55 33 35" />
          <path d="M64 88C55 66 52 49 51 26" />
          <path d="M64 88C64 64 65 47 66 23" />
          <path d="M64 88C74 66 79 50 85 29" />
          <path d="M64 88C84 72 95 59 104 43" />
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
