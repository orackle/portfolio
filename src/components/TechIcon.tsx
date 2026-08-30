// ---------- generic fallback shapes (for tags with no real-world logo) ----------
type IconKind = "code" | "package" | "chip" | "key" | "gear";

interface FallbackDef {
  kind: IconKind;
  color: string;
}

const FALLBACK_MAP: Record<string, FallbackDef> = {
  ebitengine: { kind: "package", color: "#e2543b" },
  ollama: { kind: "package", color: "#8a8a8a" },
  oauth: { kind: "key", color: "#f2c14e" },
  bert: { kind: "chip", color: "#a78bfa" },
  "machine learning": { kind: "chip", color: "#a78bfa" },
  concurrency: { kind: "gear", color: "#8a8a8a" },
  "algorithm design": { kind: "gear", color: "#8a8a8a" },
  research: { kind: "gear", color: "#8a8a8a" },
};

const DEFAULT_FALLBACK: FallbackDef = { kind: "gear", color: "#8a8a8a" };

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

const FALLBACK_BY_KIND: Record<IconKind, (props: { color: string }) => JSX.Element> = {
  code: CodeIcon,
  package: PackageIcon,
  chip: ChipIcon,
  key: KeyIcon,
  gear: GearIcon,
};

function FallbackIcon({ tech }: { tech: string }) {
  const def = FALLBACK_MAP[tech] || DEFAULT_FALLBACK;
  const Icon = FALLBACK_BY_KIND[def.kind];
  return <Icon color={def.color} />;
}

// ---------- real, hand-pixelled logo marks ----------

function PythonLogo() {
  return (
    <svg viewBox="0 0 12 12" width="12" height="12" shapeRendering="crispEdges" aria-hidden="true">
      <rect x={2} y={0} width={6} height={2} fill="#4b8bbe" />
      <rect x={1} y={2} width={7} height={2} fill="#4b8bbe" />
      <rect x={1} y={4} width={4} height={1} fill="#4b8bbe" />
      <rect x={0} y={5} width={2} height={1} fill="#4b8bbe" />
      <rect x={7} y={1} width={1} height={1} fill="#f5f6ff" />
      <rect x={4} y={10} width={6} height={2} fill="#ffd43b" />
      <rect x={4} y={8} width={7} height={2} fill="#ffd43b" />
      <rect x={7} y={7} width={4} height={1} fill="#ffd43b" />
      <rect x={10} y={6} width={2} height={1} fill="#ffd43b" />
      <rect x={4} y={10} width={1} height={1} fill="#2b2b2b" />
    </svg>
  );
}

function JavaScriptLogo() {
  return (
    <svg viewBox="0 0 10 10" width="10" height="10" shapeRendering="crispEdges" aria-hidden="true">
      <rect x={0} y={0} width={10} height={10} fill="#f0db4f" />
      <rect x={6} y={2} width={2} height={4} fill="#2b2b2b" />
      <rect x={5} y={6} width={3} height={1} fill="#2b2b2b" />
      <rect x={5} y={7} width={1} height={1} fill="#2b2b2b" />
      <rect x={2} y={5} width={2} height={1} fill="#2b2b2b" />
      <rect x={2} y={6} width={1} height={2} fill="#2b2b2b" />
      <rect x={3} y={8} width={2} height={1} fill="#2b2b2b" />
    </svg>
  );
}

function JavaLogo() {
  return (
    <svg viewBox="0 0 10 12" width="10" height="12" shapeRendering="crispEdges" aria-hidden="true">
      <rect x={3} y={0} width={1} height={1} fill="#e2703a" />
      <rect x={5} y={0} width={1} height={1} fill="#e2703a" />
      <rect x={4} y={1} width={1} height={1} fill="#e2703a" />
      <rect x={6} y={1} width={1} height={1} fill="#e2703a" />
      <rect x={2} y={4} width={6} height={5} fill="#5b8fbe" />
      <rect x={8} y={5} width={1} height={3} fill="#5b8fbe" />
      <rect x={1} y={10} width={8} height={1} fill="#e2703a" />
    </svg>
  );
}

function ShieldLogo({ color, mark }: { color: string; mark: "html" | "css" }) {
  return (
    <svg viewBox="0 0 10 12" width="10" height="12" shapeRendering="crispEdges" aria-hidden="true">
      <rect x={0} y={0} width={10} height={1} fill={color} />
      <rect x={0} y={1} width={10} height={8} fill={color} />
      <rect x={1} y={9} width={8} height={1} fill={color} />
      <rect x={2} y={10} width={6} height={1} fill={color} />
      <rect x={4} y={11} width={2} height={1} fill={color} />
      {mark === "html" ? (
        <>
          <rect x={2} y={3} width={2} height={1} fill="#fff" />
          <rect x={2} y={3} width={1} height={4} fill="#fff" />
          <rect x={2} y={5} width={2} height={1} fill="#fff" />
          <rect x={6} y={3} width={2} height={1} fill="#fff" />
          <rect x={7} y={3} width={1} height={4} fill="#fff" />
          <rect x={6} y={5} width={2} height={1} fill="#fff" />
        </>
      ) : (
        <>
          <rect x={3} y={2} width={1} height={7} fill="#fff" />
          <rect x={6} y={2} width={1} height={7} fill="#fff" />
        </>
      )}
    </svg>
  );
}

function TensorFlowLogo() {
  return (
    <svg viewBox="0 0 10 10" width="10" height="10" shapeRendering="crispEdges" aria-hidden="true">
      <rect x={4} y={0} width={2} height={2} fill="#f2a541" />
      <rect x={1} y={3} width={2} height={2} fill="#f2a541" />
      <rect x={7} y={3} width={2} height={2} fill="#f2a541" />
      <rect x={4} y={6} width={2} height={2} fill="#f2a541" />
      <rect x={4} y={2} width={2} height={1} fill="#f2a541" />
      <rect x={2} y={2} width={1} height={2} fill="#f2a541" />
      <rect x={7} y={2} width={1} height={2} fill="#f2a541" />
      <rect x={4} y={5} width={2} height={1} fill="#f2a541" />
    </svg>
  );
}

function PyTorchLogo() {
  return (
    <svg viewBox="0 0 8 12" width="8" height="12" shapeRendering="crispEdges" aria-hidden="true">
      <rect x={3} y={0} width={2} height={2} fill="#e2543b" />
      <rect x={2} y={2} width={1} height={2} fill="#e2543b" />
      <rect x={5} y={2} width={1} height={2} fill="#e2543b" />
      <rect x={1} y={4} width={6} height={4} fill="#e2543b" />
      <rect x={2} y={8} width={4} height={2} fill="#e2543b" />
      <rect x={3} y={10} width={2} height={2} fill="#e2543b" />
      <rect x={3} y={5} width={2} height={3} fill="rgba(255,255,255,0.55)" />
    </svg>
  );
}

function MongoLeaf({ color = "#4fa94e" }: { color?: string }) {
  return (
    <svg viewBox="0 0 8 12" width="8" height="12" shapeRendering="crispEdges" aria-hidden="true">
      <rect x={3} y={0} width={2} height={2} fill={color} />
      <rect x={2} y={2} width={4} height={2} fill={color} />
      <rect x={1} y={4} width={6} height={4} fill={color} />
      <rect x={2} y={8} width={4} height={2} fill={color} />
      <rect x={3} y={10} width={2} height={2} fill="#8fd19e" />
      <rect x={3} y={2} width={1} height={8} fill="rgba(255,255,255,0.4)" />
    </svg>
  );
}

function NextJsLogo() {
  return (
    <svg viewBox="0 0 10 10" width="10" height="10" shapeRendering="crispEdges" aria-hidden="true">
      <rect x={1} y={0} width={8} height={1} fill="#1c1c1c" />
      <rect x={0} y={1} width={10} height={8} fill="#1c1c1c" />
      <rect x={1} y={9} width={8} height={1} fill="#1c1c1c" />
      <rect x={3} y={2} width={1} height={6} fill="#f5f6ff" />
      <rect x={3} y={2} width={1} height={1} fill="#f5f6ff" />
      <rect x={4} y={3} width={1} height={1} fill="#f5f6ff" />
      <rect x={5} y={4} width={1} height={1} fill="#f5f6ff" />
      <rect x={6} y={5} width={1} height={1} fill="#f5f6ff" />
      <rect x={7} y={2} width={1} height={6} fill="#f5f6ff" />
    </svg>
  );
}

function GolangLogo() {
  return (
    <svg viewBox="0 0 12 8" width="12" height="8" shapeRendering="crispEdges" aria-hidden="true">
      <rect x={2} y={0} width={8} height={1} fill="#3fa7d6" />
      <rect x={1} y={1} width={10} height={4} fill="#3fa7d6" />
      <rect x={2} y={5} width={2} height={1} fill="#3fa7d6" />
      <rect x={8} y={5} width={2} height={1} fill="#3fa7d6" />
      <rect x={2} y={6} width={1} height={2} fill="#3fa7d6" />
      <rect x={9} y={6} width={1} height={2} fill="#3fa7d6" />
      <rect x={3} y={2} width={2} height={2} fill="#f5f6ff" />
      <rect x={7} y={2} width={2} height={2} fill="#f5f6ff" />
      <rect x={3} y={3} width={1} height={1} fill="#1c1c1c" />
      <rect x={7} y={3} width={1} height={1} fill="#1c1c1c" />
    </svg>
  );
}

function TailwindLogo() {
  return (
    <svg viewBox="0 0 12 8" width="12" height="8" shapeRendering="crispEdges" aria-hidden="true">
      <rect x={0} y={1} width={2} height={1} fill="#38bdf8" />
      <rect x={2} y={0} width={4} height={1} fill="#38bdf8" />
      <rect x={2} y={1} width={2} height={1} fill="#38bdf8" />
      <rect x={5} y={1} width={1} height={1} fill="#38bdf8" />
      <rect x={1} y={2} width={5} height={1} fill="#38bdf8" />
      <rect x={6} y={5} width={2} height={1} fill="#38bdf8" />
      <rect x={8} y={4} width={4} height={1} fill="#38bdf8" />
      <rect x={8} y={5} width={2} height={1} fill="#38bdf8" />
      <rect x={11} y={5} width={1} height={1} fill="#38bdf8" />
      <rect x={7} y={6} width={5} height={1} fill="#38bdf8" />
    </svg>
  );
}

function DolphinLogo() {
  return (
    <svg viewBox="0 0 12 8" width="12" height="8" shapeRendering="crispEdges" aria-hidden="true">
      <rect x={2} y={2} width={7} height={2} fill="#4479a1" />
      <rect x={1} y={3} width={2} height={1} fill="#4479a1" />
      <rect x={9} y={1} width={2} height={2} fill="#4479a1" />
      <rect x={5} y={0} width={1} height={2} fill="#4479a1" />
      <rect x={3} y={4} width={4} height={1} fill="#4479a1" />
      <rect x={2} y={5} width={2} height={1} fill="#4479a1" />
      <rect x={9} y={3} width={1} height={1} fill="#f5f6ff" />
    </svg>
  );
}

function JupyterLogo() {
  return (
    <svg viewBox="0 0 10 10" width="10" height="10" shapeRendering="crispEdges" aria-hidden="true">
      <rect x={4} y={0} width={2} height={2} fill="#f2994a" />
      <rect x={0} y={6} width={2} height={2} fill="#4b8bbe" />
      <rect x={8} y={6} width={2} height={2} fill="#e2543b" />
      <rect x={2} y={8} width={6} height={1} fill="rgba(138,138,138,0.5)" />
    </svg>
  );
}

function SoupBowlLogo() {
  return (
    <svg viewBox="0 0 10 8" width="10" height="8" shapeRendering="crispEdges" aria-hidden="true">
      <rect x={3} y={0} width={1} height={1} fill="#5fae52" />
      <rect x={6} y={0} width={1} height={1} fill="#5fae52" />
      <rect x={4} y={1} width={1} height={1} fill="#5fae52" />
      <rect x={1} y={3} width={8} height={2} fill="#5fae52" />
      <rect x={2} y={5} width={6} height={2} fill="#5fae52" />
      <rect x={2} y={4} width={6} height={1} fill="rgba(255,255,255,0.4)" />
    </svg>
  );
}

const LOGO_MAP: Record<string, () => JSX.Element> = {
  python: PythonLogo,
  javascript: JavaScriptLogo,
  java: JavaLogo,
  html: () => <ShieldLogo color="#e2703a" mark="html" />,
  css: () => <ShieldLogo color="#3d7fe0" mark="css" />,
  tensorflow: TensorFlowLogo,
  pytorch: PyTorchLogo,
  mongodb: () => <MongoLeaf />,
  "next.js": NextJsLogo,
  golang: GolangLogo,
  "tailwind css": TailwindLogo,
  mysql: DolphinLogo,
  "spring boot": () => <MongoLeaf color="#6cbf4a" />,
  jupyter: JupyterLogo,
  beautifulsoup: SoupBowlLogo,
};

export default function TechIcon({ tech, className }: { tech: string; className?: string }) {
  const key = tech.toLowerCase();
  const Logo = LOGO_MAP[key];
  return <span className={className}>{Logo ? <Logo /> : <FallbackIcon tech={key} />}</span>;
}
