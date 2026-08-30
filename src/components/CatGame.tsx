import { useEffect, useRef, useState } from "react";
import pixelCat from "../assets/pixel_cat_blue_eyes.svg";
import pixelCatBlink from "../assets/pixel_cat_blue_eyes_blink.svg";
import pixelFlower from "../assets/pixel_flower.svg";

interface CatGameProps {
  onClose: () => void;
}

type GameState = "START" | "PLAYING" | "GAME_OVER";

export default function CatGame({ onClose }: CatGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [gameState, setGameState] = useState<GameState>("START");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState<number>(() => {
    const stored = localStorage.getItem("portfolio-cat-game-highscore");
    return stored ? parseInt(stored, 10) : 0;
  });

  // Game variable refs to keep loop values synchronized without re-renders
  const stateRef = useRef<GameState>("START");
  const scoreRef = useRef(0);
  const catY = useRef(130);
  const catVy = useRef(0);
  const isJumping = useRef(false);
  const obstacles = useRef<{ x: number; width: number; height: number }[]>([]);
  const spawnTimer = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  // Preload game assets
  const catImg = useRef<HTMLImageElement | null>(null);
  const catBlinkImg = useRef<HTMLImageElement | null>(null);
  const flowerImg = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    stateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    // Preload images
    const img1 = new Image();
    img1.src = pixelCat;
    catImg.current = img1;

    const img2 = new Image();
    img2.src = pixelCatBlink;
    catBlinkImg.current = img2;

    const img3 = new Image();
    img3.src = pixelFlower;
    flowerImg.current = img3;
  }, []);

  const jump = () => {
    if (!isJumping.current && stateRef.current === "PLAYING") {
      catVy.current = -10.5;
      isJumping.current = true;
    }
  };

  const startGame = () => {
    obstacles.current = [];
    scoreRef.current = 0;
    setScore(0);
    catY.current = 130;
    catVy.current = 0;
    isJumping.current = false;
    spawnTimer.current = 0;
    setGameState("PLAYING");
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        if (stateRef.current === "PLAYING") {
          jump();
        } else if (stateRef.current === "START" || stateRef.current === "GAME_OVER") {
          startGame();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let obstacleSpeed = 4.5;
    let blinkToggle = false;
    let blinkTimer = 0;

    const updateGame = () => {
      if (stateRef.current !== "PLAYING") return;

      // Increment score
      scoreRef.current += 1;
      if (scoreRef.current % 10 === 0) {
        setScore(Math.floor(scoreRef.current / 10));
      }

      // Physics
      catY.current += catVy.current;
      catVy.current += 0.55; // Gravity

      // Ground limit (internal height is 200, cat height is 40)
      if (catY.current >= 130) {
        catY.current = 130;
        catVy.current = 0;
        isJumping.current = false;
      }

      // Cat blinking state
      blinkTimer++;
      if (blinkTimer > 120) {
        if (Math.random() < 0.05) {
          blinkToggle = !blinkToggle;
          blinkTimer = 0;
        }
      }

      // Obstacle speed dynamic scaling
      obstacleSpeed = 5.8 + Math.floor(scoreRef.current / 200) * 0.7;

      // Obstacle spawning
      spawnTimer.current--;
      if (spawnTimer.current <= 0) {
        // Spawn interval randomized (closer gaps for more challenge)
        const minGap = 65;
        const maxGap = 135;
        spawnTimer.current = minGap + Math.random() * (maxGap - minGap);
        obstacles.current.push({
          x: 600,
          width: 24,
          height: 24,
        });
      }

      // Move obstacles and collision detection
      for (let i = obstacles.current.length - 1; i >= 0; i--) {
        const obs = obstacles.current[i];
        obs.x -= obstacleSpeed;

        // Collision Check: Cat is at x: 60, width: 40, height: 40
        // Obstacle is at obs.x, y: 146 (200 - 24 ground line - 30 margin etc.), width: 24, height: 24
        const catX = 60;
        const catWidth = 32; // slightly smaller bounding box for better gameplay feel
        const catHeight = 36;
        const obsY = 146;

        const collides =
          catX < obs.x + obs.width &&
          catX + catWidth > obs.x &&
          catY.current < obsY + obs.height &&
          catY.current + catHeight > obsY;

        if (collides) {
          // Game Over
          setGameState("GAME_OVER");
          const finalScore = Math.floor(scoreRef.current / 10);
          if (finalScore > highScore) {
            setHighScore(finalScore);
            localStorage.setItem("portfolio-cat-game-highscore", finalScore.toString());
          }
          break;
        }

        // Remove offscreen obstacles
        if (obs.x + obs.width < 0) {
          obstacles.current.splice(i, 1);
        }
      }
    };

    const drawGame = () => {
      ctx.clearRect(0, 0, 600, 200);

      // Draw Ground Line
      ctx.strokeStyle = "var(--border)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 170);
      ctx.lineTo(600, 170);
      ctx.stroke();

      // Draw Cat
      const catImageToDraw = blinkToggle ? catBlinkImg.current : catImg.current;
      if (catImageToDraw && catImageToDraw.complete) {
        ctx.drawImage(catImageToDraw, 60, catY.current, 40, 40);
      } else {
        // Fallback placeholder rectangle if image not loaded
        ctx.fillStyle = "var(--accent)";
        ctx.fillRect(60, catY.current, 40, 40);
      }

      // Draw Obstacles
      obstacles.current.forEach((obs) => {
        if (flowerImg.current && flowerImg.current.complete) {
          ctx.drawImage(flowerImg.current, obs.x, 146, obs.width, obs.height);
        } else {
          ctx.fillStyle = "var(--fg)";
          ctx.fillRect(obs.x, 146, obs.width, obs.height);
        }
      });
    };

    const gameLoop = () => {
      updateGame();
      drawGame();
      animationFrameId.current = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [gameState, highScore]);

  return (
    <div className="cat-game" ref={containerRef} onClick={jump}>
      <div className="cat-game__header">
        <button type="button" className="cat-game__back" onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}>
          ← Go Back
        </button>
        <div className="cat-game__scores">
          <span>HI-SCORE: {highScore.toString().padStart(5, "0")}</span>
          <span>SCORE: {score.toString().padStart(5, "0")}</span>
        </div>
      </div>

      <div className="cat-game__screen">
        <canvas
          ref={canvasRef}
          width={600}
          height={200}
          className="cat-game__canvas"
        />

        {gameState === "START" && (
          <div className="cat-game__overlay">
            <h2 className="cat-game__title">CAT RUNNER</h2>
            <p className="cat-game__instruction">Press Space, Up Arrow, or Click to Jump</p>
            <button
              type="button"
              className="cat-game__btn"
              onClick={(e) => {
                e.stopPropagation();
                startGame();
              }}
            >
              Start Game
            </button>
          </div>
        )}

        {gameState === "GAME_OVER" && (
          <div className="cat-game__overlay">
            <h2 className="cat-game__title">GAME OVER</h2>
            <p className="cat-game__instruction">Final Score: {score}</p>
            <button
              type="button"
              className="cat-game__btn"
              onClick={(e) => {
                e.stopPropagation();
                startGame();
              }}
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
