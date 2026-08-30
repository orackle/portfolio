import { useEffect, useRef, useState, type TouchEvent } from "react";
import pixelCat from "../assets/pixel_cat_blue_eyes.svg";
import pixelCatBlink from "../assets/pixel_cat_blue_eyes_blink.svg";

interface CatGameProps {
  onClose: () => void;
}

type GameState = "START" | "PLAYING" | "GAME_OVER" | "WIN";

// ---------- maze ----------
// a "waffle" lattice: single-cell pillars spaced two apart, always
// surrounded by open corridor on all four sides — trivially fully
// connected without hand-verifying a real labyrinth
const COLS = 17;
const ROWS = 17;
const CELL = 24;

const WALL = 0;
const TREAT = 1;
const EMPTY = 2;
const HOUSE = 3;
const YARN = 4;

const SPARKLE_COLORS = ["#ff6b6b", "#ffd166", "#4fd1c5", "#a78bfa", "#f472b6", "#60a5fa", "#ffa552"];
const YARN_SPOTS: Array<[number, number]> = [
  [1, 1],
  [1, 15],
  [15, 1],
  [15, 15],
];
const FREEZE_FRAMES = 360; // ~6s at 60fps

function buildSparkleColors(): string[][] {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)])
  );
}

function buildMaze(): number[][] {
  const grid: number[][] = Array.from({ length: ROWS }, () => Array(COLS).fill(TREAT));

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (r === 0 || r === ROWS - 1 || c === 0 || c === COLS - 1) {
        grid[r][c] = WALL;
      }
    }
  }

  for (let r = 2; r < ROWS - 1; r += 2) {
    for (let c = 2; c < COLS - 1; c += 2) {
      grid[r][c] = WALL;
    }
  }

  // ghost house — carve a small open room in the center, no treats
  for (let r = 7; r <= 9; r++) {
    for (let c = 7; c <= 9; c++) {
      grid[r][c] = HOUSE;
    }
  }

  // player spawn, bottom-center — no treat on the starting tile
  grid[15][8] = EMPTY;

  // glowy yarn balls tucked in the four corridors, near each corner
  YARN_SPOTS.forEach(([r, c]) => {
    grid[r][c] = YARN;
  });

  return grid;
}

function isWalkable(grid: number[][], row: number, col: number) {
  if (row < 0 || row >= ROWS || col < 0 || col >= COLS) return false;
  return grid[row][col] !== WALL;
}

// ---------- pixel-art ghost (8x8 grid scaled to a cell) ----------
function drawGhost(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) {
  const u = size / 8;
  ctx.fillStyle = color;
  ctx.fillRect(x + u * 2, y, u * 4, u);
  ctx.fillRect(x + u, y + u, u * 6, u);
  ctx.fillRect(x, y + u * 2, u * 8, u * 5);
  // zigzag skirt
  ctx.fillRect(x, y + u * 7, u, u);
  ctx.fillRect(x + u * 2, y + u * 7, u, u);
  ctx.fillRect(x + u * 4, y + u * 7, u, u);
  ctx.fillRect(x + u * 6, y + u * 7, u, u);
  // eyes
  ctx.fillStyle = "#f5f6ff";
  ctx.fillRect(x + u * 1.5, y + u * 2.5, u * 1.6, u * 2);
  ctx.fillRect(x + u * 4.9, y + u * 2.5, u * 1.6, u * 2);
  ctx.fillStyle = "#1c1c1c";
  ctx.fillRect(x + u * 2, y + u * 3, u * 0.8, u);
  ctx.fillRect(x + u * 5.4, y + u * 3, u * 0.8, u);
}

// a small four-point sparkle — the "diamond star" treat, glowing in its own color
function drawSparkle(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, color: string) {
  ctx.save();
  ctx.shadowColor = color;
  ctx.shadowBlur = size * 1.4;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(cx, cy - size);
  ctx.lineTo(cx + size * 0.28, cy - size * 0.28);
  ctx.lineTo(cx + size, cy);
  ctx.lineTo(cx + size * 0.28, cy + size * 0.28);
  ctx.lineTo(cx, cy + size);
  ctx.lineTo(cx - size * 0.28, cy + size * 0.28);
  ctx.lineTo(cx - size, cy);
  ctx.lineTo(cx - size * 0.28, cy - size * 0.28);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

// a glowy yarn ball power-up — collecting it freezes the ghosts a while
function drawYarnBall(ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number, pulse: number) {
  const color = "#c964e0";
  ctx.save();
  ctx.shadowColor = color;
  ctx.shadowBlur = radius * (1.6 + pulse * 0.6);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = "rgba(255,255,255,0.75)";
  ctx.lineWidth = Math.max(1, radius * 0.14);
  ctx.beginPath();
  ctx.ellipse(cx, cy, radius * 0.85, radius * 0.35, Math.PI / 4, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(cx, cy, radius * 0.85, radius * 0.35, -Math.PI / 4, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

interface Vec {
  dx: number;
  dy: number;
}

const DIRS: Record<string, Vec> = {
  up: { dx: 0, dy: -1 },
  down: { dx: 0, dy: 1 },
  left: { dx: -1, dy: 0 },
  right: { dx: 1, dy: 0 },
};

const GHOST_COLORS = ["#e2543b", "#ff9fd6", "#3fa7d6", "#f2a541"];
const GHOST_START: Array<[number, number]> = [
  [7, 8],
  [8, 7],
  [8, 9],
];

const PLAYER_SPEED = 0.09;
const GHOST_SPEED = 0.075;
const CENTER_EPS = 0.06;

export default function CatGame({ onClose }: CatGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>("START");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState<number>(() => {
    const stored = localStorage.getItem("portfolio-pac-cat-highscore");
    return stored ? parseInt(stored, 10) : 0;
  });

  const stateRef = useRef<GameState>("START");
  const scoreRef = useRef(0);
  const mazeRef = useRef<number[][]>(buildMaze());
  const sparkleColorsRef = useRef<string[][]>(buildSparkleColors());
  const treatsLeftRef = useRef(0);
  const freezeFramesRef = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  const player = useRef({ col: 8, row: 15, dir: { dx: 0, dy: 0 }, next: { dx: 0, dy: 0 }, cellRow: 15, cellCol: 8 });
  const ghosts = useRef(
    GHOST_START.map(([row, col], i) => ({
      col,
      row,
      homeRow: row,
      homeCol: col,
      dir: { dx: 0, dy: 0 } as Vec,
      color: GHOST_COLORS[i % GHOST_COLORS.length],
    }))
  );
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const catImg = useRef<HTMLImageElement | null>(null);
  const catBlinkImg = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    stateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    const img1 = new Image();
    img1.src = pixelCat;
    catImg.current = img1;

    const img2 = new Image();
    img2.src = pixelCatBlink;
    catBlinkImg.current = img2;
  }, []);

  const startGame = () => {
    mazeRef.current = buildMaze();
    sparkleColorsRef.current = buildSparkleColors();
    treatsLeftRef.current = mazeRef.current.flat().filter((t) => t === TREAT).length;
    freezeFramesRef.current = 0;
    scoreRef.current = 0;
    setScore(0);
    player.current = { col: 8, row: 15, dir: { dx: 0, dy: 0 }, next: { dx: 0, dy: 0 }, cellRow: 15, cellCol: 8 };
    ghosts.current = GHOST_START.map(([row, col], i) => ({
      col,
      row,
      homeRow: row,
      homeCol: col,
      dir: { dx: 0, dy: 0 } as Vec,
      color: GHOST_COLORS[i % GHOST_COLORS.length],
    }));
    setGameState("PLAYING");
  };

  const queueDir = (dir: Vec) => {
    player.current.next = dir;
    if (stateRef.current === "START" || stateRef.current === "GAME_OVER" || stateRef.current === "WIN") {
      startGame();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const map: Record<string, Vec> = {
        ArrowUp: DIRS.up,
        KeyW: DIRS.up,
        ArrowDown: DIRS.down,
        KeyS: DIRS.down,
        ArrowLeft: DIRS.left,
        KeyA: DIRS.left,
        ArrowRight: DIRS.right,
        KeyD: DIRS.right,
      };
      if (map[e.code]) {
        e.preventDefault();
        queueDir(map[e.code]);
      } else if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        if (stateRef.current !== "PLAYING") startGame();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let blinkToggle = false;
    let blinkTimer = 0;
    let frameCount = 0;
    const css = getComputedStyle(canvas);
    const wallColor = css.getPropertyValue("--border").trim() || "#8a8a8a";
    const treatColor = css.getPropertyValue("--accent").trim() || "#e0a458";
    const bgColor = css.getPropertyValue("--bg").trim() || "#ffffff";

    function tryMove(entity: { col: number; row: number; dir: Vec }, wanted: Vec, speed: number) {
      const nearCenterCol = Math.abs(entity.col - Math.round(entity.col)) < CENTER_EPS;
      const nearCenterRow = Math.abs(entity.row - Math.round(entity.row)) < CENTER_EPS;

      if (nearCenterCol && nearCenterRow) {
        const rCol = Math.round(entity.col);
        const rRow = Math.round(entity.row);
        entity.col = rCol;
        entity.row = rRow;

        if ((wanted.dx !== 0 || wanted.dy !== 0) && isWalkable(mazeRef.current, rRow + wanted.dy, rCol + wanted.dx)) {
          entity.dir = wanted;
        } else if (!isWalkable(mazeRef.current, rRow + entity.dir.dy, rCol + entity.dir.dx)) {
          entity.dir = { dx: 0, dy: 0 };
        }
      }

      entity.col += entity.dir.dx * speed;
      entity.row += entity.dir.dy * speed;
    }

    function ghostChase(g: { col: number; row: number; dir: Vec }) {
      const nearCenterCol = Math.abs(g.col - Math.round(g.col)) < CENTER_EPS;
      const nearCenterRow = Math.abs(g.row - Math.round(g.row)) < CENTER_EPS;

      if (nearCenterCol && nearCenterRow) {
        const rCol = Math.round(g.col);
        const rRow = Math.round(g.row);
        g.col = rCol;
        g.row = rRow;

        const options = Object.values(DIRS).filter((d) => {
          const reverse = d.dx === -g.dir.dx && d.dy === -g.dir.dy;
          if (reverse && (g.dir.dx !== 0 || g.dir.dy !== 0)) return false;
          return isWalkable(mazeRef.current, rRow + d.dy, rCol + d.dx);
        });

        if (options.length > 0) {
          let choice: Vec;
          if (Math.random() < 0.2) {
            choice = options[Math.floor(Math.random() * options.length)];
          } else {
            choice = options.reduce((best, d) => {
              const bestDist = (rCol + best.dx - player.current.col) ** 2 + (rRow + best.dy - player.current.row) ** 2;
              const dDist = (rCol + d.dx - player.current.col) ** 2 + (rRow + d.dy - player.current.row) ** 2;
              return dDist < bestDist ? d : best;
            }, options[0]);
          }
          g.dir = choice;
        } else {
          g.dir = { dx: -g.dir.dx, dy: -g.dir.dy };
        }
      }

      g.col += g.dir.dx * GHOST_SPEED;
      g.row += g.dir.dy * GHOST_SPEED;
    }

    const updateGame = () => {
      if (stateRef.current !== "PLAYING") return;

      frameCount++;
      if (freezeFramesRef.current > 0) freezeFramesRef.current--;

      tryMove(player.current, player.current.next, PLAYER_SPEED);

      // fire pickup exactly once per cell entered — proximity-window checks can
      // skip a cell entirely depending on how the float step lands relative to
      // the window, since the step size and window were close enough to alias
      const pRow = Math.round(player.current.row);
      const pCol = Math.round(player.current.col);
      if (pRow !== player.current.cellRow || pCol !== player.current.cellCol) {
        player.current.cellRow = pRow;
        player.current.cellCol = pCol;

        if (mazeRef.current[pRow][pCol] === TREAT) {
          mazeRef.current[pRow][pCol] = EMPTY;
          scoreRef.current += 1;
          treatsLeftRef.current -= 1;
          setScore(scoreRef.current);
          if (treatsLeftRef.current <= 0) {
            setGameState("WIN");
            if (scoreRef.current > highScore) {
              setHighScore(scoreRef.current);
              localStorage.setItem("portfolio-pac-cat-highscore", scoreRef.current.toString());
            }
            return;
          }
        } else if (mazeRef.current[pRow][pCol] === YARN) {
          mazeRef.current[pRow][pCol] = EMPTY;
          freezeFramesRef.current = FREEZE_FRAMES;
        }
      }

      blinkTimer++;
      if (blinkTimer > 90 && Math.random() < 0.06) {
        blinkToggle = !blinkToggle;
        blinkTimer = 0;
      }

      const frozen = freezeFramesRef.current > 0;
      for (const g of ghosts.current) {
        if (!frozen) ghostChase(g);
        const dist = (g.col - player.current.col) ** 2 + (g.row - player.current.row) ** 2;
        if (dist < 0.35) {
          if (frozen) {
            // eaten — send it home and pocket a bonus, immunity holds
            g.col = g.homeCol;
            g.row = g.homeRow;
            g.dir = { dx: 0, dy: 0 };
            scoreRef.current += 5;
            setScore(scoreRef.current);
          } else {
            setGameState("GAME_OVER");
            if (scoreRef.current > highScore) {
              setHighScore(scoreRef.current);
              localStorage.setItem("portfolio-pac-cat-highscore", scoreRef.current.toString());
            }
            break;
          }
        }
      }
    };

    const drawGame = () => {
      const W = COLS * CELL;
      const H = ROWS * CELL;
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, W, H);

      const grid = mazeRef.current;
      const pulse = Math.sin(frameCount * 0.12) * 0.5 + 0.5;
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const cell = grid[r][c];
          if (cell === WALL) {
            ctx.fillStyle = wallColor;
            ctx.fillRect(c * CELL + 1, r * CELL + 1, CELL - 2, CELL - 2);
          } else if (cell === TREAT) {
            const color = sparkleColorsRef.current[r]?.[c] || treatColor;
            drawSparkle(ctx, c * CELL + CELL / 2, r * CELL + CELL / 2, CELL * 0.16, color);
          } else if (cell === YARN) {
            drawYarnBall(ctx, c * CELL + CELL / 2, r * CELL + CELL / 2, CELL * 0.22, pulse);
          }
        }
      }

      const catImageToDraw = blinkToggle ? catBlinkImg.current : catImg.current;
      const px = player.current.col * CELL;
      const py = player.current.row * CELL;
      if (catImageToDraw && catImageToDraw.complete) {
        ctx.drawImage(catImageToDraw, px + 1, py + 1, CELL - 2, CELL - 2);
      } else {
        ctx.fillStyle = treatColor;
        ctx.fillRect(px + 2, py + 2, CELL - 4, CELL - 4);
      }

      const frozen = freezeFramesRef.current > 0;
      ghosts.current.forEach((g) => {
        const color = frozen ? (pulse > 0.5 ? "#8fd3ff" : "#e0f2ff") : g.color;
        drawGhost(ctx, g.col * CELL + 2, g.row * CELL + 2, CELL - 4, color);
      });
    };

    const gameLoop = () => {
      updateGame();
      drawGame();
      animationFrameId.current = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [gameState, highScore]);

  const handleTouchStart = (e: TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const handleTouchEnd = (e: TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) < 24 && Math.abs(dy) < 24) return;
    if (Math.abs(dx) > Math.abs(dy)) {
      queueDir(dx > 0 ? DIRS.right : DIRS.left);
    } else {
      queueDir(dy > 0 ? DIRS.down : DIRS.up);
    }
  };

  const overlayText =
    gameState === "WIN"
      ? { title: "ALL TREATS FOUND!", body: `Final Score: ${score}` }
      : { title: "CAUGHT!", body: `Final Score: ${score}` };

  return (
    <div className="cat-game" onContextMenu={(e) => e.preventDefault()}>
      <div className="cat-game__header">
        <button
          type="button"
          className="cat-game__back"
          onClick={() => onClose()}
        >
          ← Go Back
        </button>
        <div className="cat-game__scores">
          <span>HI-SCORE: {highScore.toString().padStart(3, "0")}</span>
          <span>TREATS: {score.toString().padStart(3, "0")}</span>
        </div>
      </div>

      <div className="cat-game__screen" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <canvas
          ref={canvasRef}
          width={COLS * CELL}
          height={ROWS * CELL}
          className="cat-game__canvas"
        />

        {gameState === "START" && (
          <div className="cat-game__overlay">
            <h2 className="cat-game__title">PAC-CAT</h2>
            <p className="cat-game__instruction">
              Arrows, WASD, or swipe to move — collect every star, grab the yarn ball to freeze (and eat!) the
              ghosts
            </p>
            <button type="button" className="cat-game__btn" onClick={startGame}>
              Start Game
            </button>
          </div>
        )}

        {(gameState === "GAME_OVER" || gameState === "WIN") && (
          <div className="cat-game__overlay">
            <h2 className="cat-game__title">{overlayText.title}</h2>
            <p className="cat-game__instruction">{overlayText.body}</p>
            <button type="button" className="cat-game__btn" onClick={startGame}>
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
