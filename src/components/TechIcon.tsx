type IconKind = "code" | "package" | "database" | "chip" | "key" | "flask" | "gear";

interface TechIconDef {
  kind: IconKind;
  color: string;
}

const TECH_ICON_MAP: Record<string, TechIconDef> = {
  python: { kind: "code", color: "#4b8bbe" },
  javascript: { kind: "code", color: "#e8c547" },
  java: { kind: "code", color: "#e2703a" },
  golang: { kind: "code", color: "#3fa7d6" },
  html: { kind: "code", color: "#e2703a" },
  css: { kind: "code", color: "#3d7fe0" },
  "tailwind css": { kind: "code", color: "#38bdf8" },

  tensorflow: { kind: "chip", color: "#f2a541" },
  pytorch: { kind: "chip", color: "#e2543b" },
  bert: { kind: "chip", color: "#a78bfa" },
  "machine learning": { kind: "chip", color: "#a78bfa" },
  jupyter: { kind: "chip", color: "#f2994a" },

  flask: { kind: "flask", color: "#7a7a7a" },
  beautifulsoup: { kind: "flask", color: "#5fae52" },

  "next.js": { kind: "package", color: "#6b8afd" },
  "spring boot": { kind: "package", color: "#6cbf4a" },
  ebitengine: { kind: "package", color: "#e2543b" },
  ollama: { kind: "package", color: "#8a8a8a" },

  mongodb: { kind: "database", color: "#4fa94e" },
  mysql: { kind: "database", color: "#4479a1" },

  oauth: { kind: "key", color: "#f2c14e" },

  concurrency: { kind: "gear", color: "#8a8a8a" },
  "algorithm design": { kind: "gear", color: "#8a8a8a" },
  research: { kind: "gear", color: "#8a8a8a" },
};

const DEFAULT_ICON: TechIconDef = { kind: "gear", color: "#8a8a8a" };

function CodeIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 12 10" width="12" height="10" shapeRendering="crispEdges" aria-hidden="true">
      <rect x={0} y={4} width={1} height={1} fill={color} />
      <rect x={1} y={3} width={1} height={1} fill={color} />
      <rect x={1} y={5} width={1} height={1} fill={color} />
      <rect x={2} y={2} width={1} height={1} fill={color} />
      <rect x={2} y={6} width={1} height={1} fill={color} />
      <rect x={7} y={0} width={1} height={1} fill={color} />
      <rect x={6} y={1} width={1} height={1} fill={color} />
      <rect x={5} y={2} width={1} height={1} fill={color} />
      <rect x={4} y={3} width={1} height={1} fill={color} />
      <rect x={3} y={4} width={1} height={1} fill={color} />
      <rect x={4} y={5} width={1} height={1} fill={color} />
      <rect x={5} y={6} width={1} height={1} fill={color} />
      <rect x={6} y={7} width={1} height={1} fill={color} />
      <rect x={9} y={2} width={1} height={1} fill={color} />
      <rect x={9} y={6} width={1} height={1} fill={color} />
      <rect x={10} y={3} width={1} height={1} fill={color} />
      <rect x={10} y={5} width={1} height={1} fill={color} />
      <rect x={11} y={4} width={1} height={1} fill={color} />
    </svg>
  );
}

function PackageIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 10 10" width="10" height="10" shapeRendering="crispEdges" aria-hidden="true">
      <rect x={1} y={2} width={8} height={1} fill={color} />
      <rect x={0} y={3} width={10} height={6} fill={color} />
      <rect x={1} y={0} width={8} height={1} fill="rgba(255,255,255,0.35)" />
      <rect x={4} y={3} width={2} height={6} fill="rgba(0,0,0,0.2)" />
    </svg>
  );
}

function DatabaseIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 10 10" width="10" height="10" shapeRendering="crispEdges" aria-hidden="true">
      <rect x={1} y={0} width={8} height={2} fill={color} />
      <rect x={0} y={1} width={1} height={7} fill={color} />
      <rect x={9} y={1} width={1} height={7} fill={color} />
      <rect x={1} y={3} width={8} height={1} fill="rgba(0,0,0,0.2)" />
      <rect x={1} y={6} width={8} height={1} fill="rgba(0,0,0,0.2)" />
      <rect x={1} y={8} width={8} height={2} fill={color} />
    </svg>
  );
}

function ChipIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 10 10" width="10" height="10" shapeRendering="crispEdges" aria-hidden="true">
      <rect x={2} y={2} width={6} height={6} fill={color} />
      <rect x={3} y={3} width={4} height={4} fill="rgba(0,0,0,0.25)" />
      <rect x={0} y={3} width={2} height={1} fill={color} />
      <rect x={0} y={6} width={2} height={1} fill={color} />
      <rect x={8} y={3} width={2} height={1} fill={color} />
      <rect x={8} y={6} width={2} height={1} fill={color} />
      <rect x={3} y={0} width={1} height={2} fill={color} />
      <rect x={6} y={0} width={1} height={2} fill={color} />
      <rect x={3} y={8} width={1} height={2} fill={color} />
      <rect x={6} y={8} width={1} height={2} fill={color} />
    </svg>
  );
}

function KeyIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 12 8" width="12" height="8" shapeRendering="crispEdges" aria-hidden="true">
      <rect x={0} y={2} width={4} height={4} fill={color} />
      <rect x={1} y={3} width={2} height={2} fill="rgba(0,0,0,0.3)" />
      <rect x={4} y={3} width={7} height={2} fill={color} />
      <rect x={8} y={5} width={1} height={2} fill={color} />
      <rect x={10} y={5} width={1} height={2} fill={color} />
    </svg>
  );
}

function FlaskIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 10 10" width="10" height="10" shapeRendering="crispEdges" aria-hidden="true">
      <rect x={4} y={0} width={2} height={3} fill={color} />
      <rect x={3} y={3} width={1} height={1} fill={color} />
      <rect x={6} y={3} width={1} height={1} fill={color} />
      <rect x={2} y={4} width={6} height={2} fill={color} />
      <rect x={1} y={6} width={8} height={3} fill={color} />
      <rect x={3} y={5} width={1} height={1} fill="rgba(255,255,255,0.5)" />
      <rect x={5} y={7} width={1} height={1} fill="rgba(255,255,255,0.5)" />
    </svg>
  );
}

function GearIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 10 10" width="10" height="10" shapeRendering="crispEdges" aria-hidden="true">
      <rect x={3} y={3} width={4} height={4} fill={color} />
      <rect x={4} y={0} width={2} height={2} fill={color} />
      <rect x={4} y={8} width={2} height={2} fill={color} />
      <rect x={0} y={4} width={2} height={2} fill={color} />
      <rect x={8} y={4} width={2} height={2} fill={color} />
      <rect x={1} y={1} width={2} height={2} fill={color} />
      <rect x={7} y={1} width={2} height={2} fill={color} />
      <rect x={1} y={7} width={2} height={2} fill={color} />
      <rect x={7} y={7} width={2} height={2} fill={color} />
      <rect x={4} y={4} width={2} height={2} fill="rgba(0,0,0,0.3)" />
    </svg>
  );
}

const ICON_BY_KIND: Record<IconKind, (props: { color: string }) => JSX.Element> = {
  code: CodeIcon,
  package: PackageIcon,
  database: DatabaseIcon,
  chip: ChipIcon,
  key: KeyIcon,
  flask: FlaskIcon,
  gear: GearIcon,
};

export default function TechIcon({ tech, className }: { tech: string; className?: string }) {
  const def = TECH_ICON_MAP[tech.toLowerCase()] || DEFAULT_ICON;
  const Icon = ICON_BY_KIND[def.kind];
  return (
    <span className={className}>
      <Icon color={def.color} />
    </span>
  );
}
