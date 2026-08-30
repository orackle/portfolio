import PixelFlower from "./PixelFlower";

interface DecorSpot {
  top: string;
  left?: string;
  right?: string;
  size?: number;
  /** shared bounce timing — give symmetric/paired flowers matching values so they move in sync */
  bounceDelay?: number;
  bounceDuration?: number;
}

interface DecorFieldProps {
  variant?: "flower" | "cross";
  spots: DecorSpot[];
}

export default function DecorField({ variant = "flower", spots }: DecorFieldProps) {
  return (
    <>
      {spots.map((spot, i) => (
        <PixelFlower
          key={i}
          variant={variant}
          size={spot.size ?? 20}
          bounceDelay={spot.bounceDelay}
          bounceDuration={spot.bounceDuration}
          style={{ top: spot.top, left: spot.left, right: spot.right }}
        />
      ))}
    </>
  );
}

// pairs that mirror each other on screen share delay/duration so they bounce in sync;
// the rest get their own timing so the field doesn't read as mechanical.
// two of the original spots became stars instead (see HERO_STAR_SPOTS below).
export const HERO_SPOTS: DecorSpot[] = [
  { top: "6%", left: "4%", size: 30, bounceDelay: 0.2, bounceDuration: 2.8 }, // pairs with #2
  { top: "18%", right: "7%", size: 32, bounceDelay: 0.2, bounceDuration: 2.8 }, // pairs with #0
  { top: "68%", left: "8%", size: 26, bounceDelay: 0.6, bounceDuration: 3.0 }, // pairs with #3
  { top: "70%", right: "15%", size: 30, bounceDelay: 0.6, bounceDuration: 3.0 }, // pairs with #2
];

export const OVERLAY_SPOTS: DecorSpot[] = [
  { top: "20%", left: "34%", size: 40, bounceDelay: 0.3, bounceDuration: 2.7 }, // pairs with #1
  { top: "65%", left: "36%", size: 38, bounceDelay: 0.3, bounceDuration: 2.7 }, // pairs with #0
];
