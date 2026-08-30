import SparkleStar from "./SparkleStar";

interface StarSpot {
  top: string;
  left?: string;
  right?: string;
  size?: number;
  color?: string;
  bounceDelay?: number;
  bounceDuration?: number;
}

export default function StarField({ spots }: { spots: StarSpot[] }) {
  return (
    <>
      {spots.map((spot, i) => (
        <SparkleStar
          key={i}
          size={spot.size ?? 8}
          color={spot.color}
          bounceDelay={spot.bounceDelay}
          bounceDuration={spot.bounceDuration}
          style={{ top: spot.top, left: spot.left, right: spot.right }}
        />
      ))}
    </>
  );
}

export type { StarSpot };

// colors pulled from the same --decor-* tokens the pixel flowers use, so
// stars read as part of the same scattered field rather than a new element
export const HERO_STAR_SPOTS: StarSpot[] = [
  { top: "15%", left: "23%", size: 13, color: "var(--decor-a)", bounceDelay: 0.9, bounceDuration: 3.2 },
  // small cluster
  { top: "53%", right: "5%", size: 11, color: "var(--decor-b)", bounceDelay: 1.3, bounceDuration: 3.4 },
  { top: "58%", right: "2%", size: 9, color: "var(--decor-c)", bounceDelay: 1.6, bounceDuration: 3.0 },
];

export const OVERLAY_STAR_SPOTS: StarSpot[] = [
  { top: "48%", left: "63%", size: 14, color: "var(--decor-b)", bounceDelay: 0.8, bounceDuration: 3.1 },
  // small cluster
  { top: "79%", left: "65%", size: 12, color: "var(--decor-a)", bounceDelay: 1.1, bounceDuration: 2.9 },
  { top: "83%", left: "70%", size: 9, color: "var(--decor-c)", bounceDelay: 1.4, bounceDuration: 3.3 },
];
