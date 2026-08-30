const KAPPA = 0.5522847;

/**
 * An open, hand-drawn oval: the same 4-quadrant Bezier construction as a
 * true ellipse, but each radius and curvature handle is nudged by a small
 * deterministic (seeded) amount so it never reads as mathematically
 * perfect — then, instead of closing with Z, the stroke continues a short
 * arc past its own starting point, pulled slightly inward, the way a hand
 * finishes a circle by overshooting where it began.
 */
export function buildHandDrawnOvalPath(cx: number, cy: number, rx: number, ry: number, seed = 0): string {
  const jitter = (i: number, amp: number) => Math.sin(seed * 3.17 + i * 2.63) * amp;

  const rxR = rx * (1 + jitter(0, 0.05));
  const ryR = ry * (1 + jitter(1, 0.04));
  const rxB = rx * (1 + jitter(2, 0.04));
  const ryB = ry * (1 + jitter(3, 0.06));
  const rxL = rx * (1 + jitter(4, 0.05));
  const ryL = ry * (1 + jitter(5, 0.03));
  const rxT = rx * (1 + jitter(6, 0.03));
  const ryT = ry * (1 + jitter(7, 0.05));

  const kx = KAPPA * (1 + jitter(8, 0.14));
  const ky = KAPPA * (1 + jitter(9, 0.12));

  const right = { x: cx + rxR, y: cy };
  const bottom = { x: cx, y: cy + ryB };
  const left = { x: cx - rxL, y: cy };
  const top = { x: cx, y: cy - ryT };

  const tailAngle = ((38 + jitter(10, 7)) * Math.PI) / 180;
  const tailScale = 0.85 + jitter(11, 0.04);
  const tailX = cx + rxR * tailScale * Math.cos(tailAngle);
  const tailY = cy + ryR * tailScale * Math.sin(tailAngle);
  const tailC1 = { x: right.x, y: right.y + ryR * ky * 0.7 };
  const tailC2 = { x: tailX + rxR * 0.16, y: tailY - ryR * 0.1 };

  return [
    `M ${right.x} ${right.y}`,
    `C ${right.x} ${right.y + ryR * ky}, ${bottom.x + rxB * kx} ${bottom.y}, ${bottom.x} ${bottom.y}`,
    `C ${bottom.x - rxB * kx} ${bottom.y}, ${left.x} ${left.y + ryL * ky}, ${left.x} ${left.y}`,
    `C ${left.x} ${left.y - ryL * ky}, ${top.x - rxT * kx} ${top.y}, ${top.x} ${top.y}`,
    `C ${top.x + rxT * kx} ${top.y}, ${right.x} ${right.y - ryR * ky}, ${right.x} ${right.y}`,
    `C ${tailC1.x} ${tailC1.y}, ${tailC2.x} ${tailC2.y}, ${tailX} ${tailY}`,
  ].join(" ");
}

/** A tiny curved connector between two points — a gentle single-bow arc, not a straight line. */
export function buildConnectorPath(
  from: { x: number; y: number },
  to: { x: number; y: number },
  seed = 0,
  bowFactor = 0.16,
  maxBow = 46
): string {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const bow = Math.min(maxBow, len * bowFactor) * (seed % 2 === 0 ? 1 : -1);
  const cx = mx + nx * bow;
  const cy = my + ny * bow;
  return `M ${from.x} ${from.y} Q ${cx} ${cy}, ${to.x} ${to.y}`;
}

/** A crisp, geometrically precise 4-point star/sparkle — deliberately not perturbed. */
export function buildStarPath(cx: number, cy: number, r: number): string {
  const pinch = r * 0.28;
  return [
    `M ${cx} ${cy - r}`,
    `Q ${cx + pinch} ${cy - pinch}, ${cx + r} ${cy}`,
    `Q ${cx + pinch} ${cy + pinch}, ${cx} ${cy + r}`,
    `Q ${cx - pinch} ${cy + pinch}, ${cx - r} ${cy}`,
    `Q ${cx - pinch} ${cy - pinch}, ${cx} ${cy - r}`,
    "Z",
  ].join(" ");
}
