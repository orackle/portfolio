import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import DecorField, { HERO_SPOTS } from "../components/DecorField";
import StarField, { HERO_STAR_SPOTS } from "../components/StarField";
import PixelFlower from "../components/PixelFlower";
import EditorialAnnotation from "../components/EditorialAnnotation";
import CatGame from "../components/CatGame";
import SparkleStar from "../components/SparkleStar";
import { profile } from "../data/profile";
import { useScrollChain } from "../hooks/useScrollChain";
import { useWeather } from "../hooks/useWeather";
import { prefersReducedMotion } from "../lib/motion";
import { pickRandomQuote, type Quote } from "../data/quotes";
import { buildConnectorPath } from "../lib/roughEllipse";
import pixelFlowerMint from "../assets/pixel_flower_mint.svg";
import pixelFlower from "../assets/pixel_flower.svg";
import pixelCat from "../assets/pixel_cat_blue_eyes.svg";
import pixelCatBlink from "../assets/pixel_cat_blue_eyes_blink.svg";
import pixelFortune from "../assets/pixel_fortune.svg";

const FIRST_NAME = profile.name.split(" ")[0].toLowerCase();
const FLOWER_LETTER_INDEX = 2; // "b" — the flower grows up through it, overlapping neighbors
const CAT_LETTER_INDEX = 5; // "g" — the cat sits in its hollow, blinking
const POSY_LETTER_INDEX = 8; // final "a" — a tiny stylized posy charm near its end
const QUOTE_DISPLAY_MS = 10000;
const BLINK_INTERVAL_MS = 3600;
const BLINK_DURATION_MS = 160;

function centerOf(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}

export default function Home() {
  const tempC = useWeather();
  const heroRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const locationRef = useRef<HTMLSpanElement>(null);
  const catWrapRef = useRef<HTMLButtonElement>(null);
  const catImgRef = useRef<HTMLImageElement>(null);
  const sunWrapRef = useRef<HTMLSpanElement>(null);
  const nameTextRef = useRef<HTMLSpanElement>(null);
  const availabilityRef = useRef<HTMLSpanElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const hintSvgRef = useRef<SVGSVGElement>(null);
  const hintPathRef = useRef<SVGPathElement>(null);
  const hintHeadRef = useRef<SVGPolygonElement>(null);
  const hintTextRef = useRef<HTMLSpanElement>(null);
  const metaBarRef = useRef<HTMLDivElement>(null);
  const quoteTl = useRef<gsap.core.Timeline>();

  const [revealed, setRevealed] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [quote, setQuote] = useState<Quote>(() => pickRandomQuote());
  const [catBlinking, setCatBlinking] = useState(false);
  const [typedText, setTypedText] = useState("");

  useScrollChain(heroRef, "/works");

  useEffect(() => {
    if (!revealed) {
      setTypedText("");
      return;
    }
    if (prefersReducedMotion()) {
      setTypedText(quote.text);
      return;
    }
    setTypedText("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTypedText(quote.text.slice(0, i));
      if (i >= quote.text.length) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [revealed, quote]);

  function alignCat() {
    const cat = catImgRef.current;
    if (!cat) return;
    gsap.set(cat, { x: 0, y: 0 });
    const rect = cat.getBoundingClientRect();
    const gridCell = window.innerWidth > 900 ? 44 : 30;
    const diffX = Math.round(rect.left / gridCell) * gridCell - rect.left;
    // pin the paws to the horizontal grid line just below the cat, not the nearest one
    const diffY = Math.ceil(rect.bottom / gridCell) * gridCell - rect.bottom;
    gsap.set(cat, { x: diffX, y: diffY });
  }

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let blinkTimer: ReturnType<typeof setTimeout>;
    let closeTimer: ReturnType<typeof setTimeout>;

    function triggerBlink() {
      setCatBlinking(true);
      closeTimer = setTimeout(() => {
        setCatBlinking(false);
        const nextDelay = 1000 + Math.random() * 2000;
        blinkTimer = setTimeout(triggerBlink, nextDelay);
      }, BLINK_DURATION_MS);
    }

    const initialDelay = 1000 + Math.random() * 2000;
    blinkTimer = setTimeout(triggerBlink, initialDelay);

    return () => {
      clearTimeout(blinkTimer);
      clearTimeout(closeTimer);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("resize", alignCat);
    return () => window.removeEventListener("resize", alignCat);
  }, []);


  useEffect(() => {
    if (gameActive) return;

    if (prefersReducedMotion()) {
      alignCat();
      gsap.set(catWrapRef.current, { opacity: 1 });
      return;
    }

    // Align cat first before timeline sets scale/opacity properties
    alignCat();

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.set(nameRef.current, { clipPath: "inset(0 100% 0 0)" });
    tl.set([eyebrowRef.current, locationRef.current], { opacity: 0, y: 14 });
    tl.set(catWrapRef.current, { opacity: 0, scale: 0.3, rotate: -8, transformOrigin: "50% 100%" });
    tl.set(sunWrapRef.current, { opacity: 0, scale: 0.3, rotate: 10, transformOrigin: "50% 100%" });

    tl.to(nameRef.current, {
      clipPath: "inset(0 0% 0 0)",
      duration: 0.9,
      ease: "power3.inOut",
      onComplete: () => {
        // the wipe only needs to clip during the reveal — left permanently on,
        // it would crop the flower's head where it rises above the name's own box
        gsap.set(nameRef.current, { clipPath: "none" });
      },
    })
      .to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0.2)
      .to(locationRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0.35)
      .to(
        catWrapRef.current,
        { opacity: 1, scale: 1, rotate: 0, duration: 0.5, ease: "back.out(1.7)" },
        "-=0.3"
      )
      .to(
        sunWrapRef.current,
        { opacity: 1, scale: 1, rotate: 0, duration: 0.5, ease: "back.out(1.7)" },
        "<"
      );

    return () => {
      tl.kill();
    };
  }, [gameActive]);

  function dismissHint() {
    if (!hintSvgRef.current || prefersReducedMotion()) return;
    gsap.to([hintSvgRef.current, hintTextRef.current], { opacity: 0, duration: 0.3, overwrite: true });
  }

  function showClickHint() {
    const svg = hintSvgRef.current;
    const path = hintPathRef.current;
    const head = hintHeadRef.current;
    const text = hintTextRef.current;
    const fromEl = availabilityRef.current;
    const toEl = catWrapRef.current;
    if (!svg || !path || !head || !text || !fromEl || !toEl || prefersReducedMotion()) return;

    svg.setAttribute("width", String(window.innerWidth));
    svg.setAttribute("height", String(window.innerHeight));
    svg.setAttribute("viewBox", `0 0 ${window.innerWidth} ${window.innerHeight}`);

    const from = centerOf(fromEl);
    const to = centerOf(toEl);
    const d = buildConnectorPath(from, to, 1, 0.35, 100);
    path.setAttribute("d", d);
    const len = path.getTotalLength();
    const tip = path.getPointAtLength(len);
    const justBefore = path.getPointAtLength(Math.max(0, len - 6));
    const angle = Math.atan2(tip.y - justBefore.y, tip.x - justBefore.x);
    const ah = 5;
    const p1 = tip;
    const p2 = {
      x: tip.x - ah * Math.cos(angle - Math.PI / 7),
      y: tip.y - ah * Math.sin(angle - Math.PI / 7),
    };
    const p3 = {
      x: tip.x - ah * Math.cos(angle + Math.PI / 7),
      y: tip.y - ah * Math.sin(angle + Math.PI / 7),
    };
    head.setAttribute("points", `${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`);

    text.style.left = `${from.x}px`;
    text.style.top = `${from.y - 22}px`;

    gsap.set(svg, { opacity: 1 });
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    gsap.set(head, { opacity: 1, scale: 0, transformOrigin: `${tip.x}px ${tip.y}px` });
    gsap.set(text, { opacity: 0, y: 6 });

    const tl = gsap.timeline();
    tl.to(text, { opacity: 1, y: 0, duration: 0.4 })
      .to(path, { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" }, "-=0.1")
      .to(head, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, "-=0.15")
      .to({}, { duration: 10 })
      .to([svg, text], { opacity: 0, duration: 0.6 });
  }

  function toggleQuote() {
    dismissHint();
    quoteTl.current?.kill();

    const showing = !revealed;

    if (prefersReducedMotion()) {
      setRevealed(showing);
      gsap.set([nameTextRef.current, decorRef.current, eyebrowRef.current, locationRef.current, metaBarRef.current], {
        opacity: showing ? 0 : 1,
      });
      return;
    }

    const tl = gsap.timeline();
    quoteTl.current = tl;

    // decorRef holds the background flower field, each with its own independent
    // sway loop already running — sliding the whole container on y as well risks
    // a stuck offset if this tween gets interrupted mid-flight by a rapid re-toggle,
    // which reads as "flowers shifted elsewhere" after reverting. Fade it, don't slide it.
    const slideGroup = [nameTextRef.current, eyebrowRef.current, locationRef.current, metaBarRef.current];

    if (showing) {
      tl.to(slideGroup, { opacity: 0, y: -8, duration: 0.45, ease: "power2.in" })
        .to(decorRef.current, { opacity: 0, duration: 0.45, ease: "power2.in" }, "<")
        .call(() => setRevealed(true))
        .fromTo(
          quoteRef.current,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.out",
          }
        );
    } else {
      tl.to(quoteRef.current, { opacity: 0, y: -8, duration: 0.4, ease: "power2.in" })
        .call(() => setRevealed(false))
        .fromTo(slideGroup, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" })
        .fromTo(decorRef.current, { opacity: 0 }, { opacity: 1, duration: 0.55, ease: "power2.out" }, "<");
    }
  }

  return (
    <section className={`hero${gameActive ? " hero--game-active" : ""}`} ref={heroRef}>
      <div ref={decorRef}>
        <DecorField variant="flower" spots={HERO_SPOTS} />
        <StarField spots={HERO_STAR_SPOTS} />
      </div>

      {gameActive ? (
        <CatGame onClose={() => setGameActive(false)} />
      ) : (
        <>
          <span className="hero__eyebrow" ref={eyebrowRef}>
            {profile.title} · {profile.tagline}
          </span>

          <h1 className="hero__name" ref={nameRef}>
            <span className="hero__name-text" ref={nameTextRef}>
              {FIRST_NAME.split("").map((letter, i) => {
                if (i === FLOWER_LETTER_INDEX) {
                  return (
                    <span className="hero__name-letter" key={i}>
                      <span className="hero__name-letter-text">{letter}</span>
                    </span>
                  );
                }
                if (i === CAT_LETTER_INDEX) {
                  return (
                    <span className="hero__name-letter" key={i}>
                      <button
                        type="button"
                        className="hero__name-cat-wrap"
                        ref={catWrapRef}
                        onClick={() => setGameActive(true)}
                        aria-label="Play Pac-Cat game"
                      >
                        <span className="hero__name-letter-text">{letter}</span>
                        <img
                          ref={catImgRef}
                          src={catBlinking ? pixelCatBlink : pixelCat}
                          alt=""
                          className="hero__name-cat"
                        />
                        <span className="hero__name-cat-star hero__name-cat-star--1">
                          <SparkleStar size={8} color="var(--decor-b)" />
                        </span>
                        <span className="hero__name-cat-star hero__name-cat-star--2">
                          <SparkleStar size={5} color="var(--decor-a)" />
                        </span>
                      </button>
                      <span className="cat-hover-label">click me</span>
                    </span>
                  );
                }
                if (i === POSY_LETTER_INDEX) {
                  return (
                    <span className="hero__name-letter" key={i}>
                      <span className="hero__name-letter-text">{letter}</span>
                      <span className="hero__name-posy-wrap">
                        <img src={pixelFlower} alt="" className="hero__name-posy" />
                      </span>
                    </span>
                  );
                }
                return (
                  <span className="hero__name-letter" key={i}>
                    <span className="hero__name-letter-text">{letter}</span>
                  </span>
                );
              })}
            </span>

            <div
              className="hero__quote"
              ref={quoteRef}
              aria-hidden={!revealed}
              onClick={toggleQuote}
              style={{ cursor: "pointer" }}
            >
              <img src={pixelFortune} alt="" className="hero__quote-fortune" />
              <p className="hero__quote-text">
                &ldquo;{typedText}
                {typedText.length >= quote.text.length ? "”" : ""}
                {typedText.length < quote.text.length && <span className="hero__quote-caret" />}
              </p>
            </div>
          </h1>

          <span className="hero__location" ref={locationRef}>Based in {profile.location}</span>

          <div className="meta-bar" ref={metaBarRef}>
            <div className="meta-bar__weather">
              <span className="meta-bar__sun-wrap" ref={sunWrapRef}>
                <PixelFlower variant="sun" className="meta-bar__sun" sway={false} />
              </span>
              {tempC !== null && <span>{tempC}°C · Mumbai</span>}
            </div>
            <div className="center">
              <Link to="/works">↓ Scroll to work</Link>
            </div>
            <div className="align-end">
              <span ref={availabilityRef}>{profile.availability}</span>
            </div>
          </div>

          <EditorialAnnotation targets={[nameTextRef, locationRef, availabilityRef]} onDone={showClickHint} />

          <svg ref={hintSvgRef} className="click-hint" aria-hidden="true" style={{ opacity: 0 }}>
            <path ref={hintPathRef} className="click-hint__path" />
            <polygon ref={hintHeadRef} className="click-hint__head" />
          </svg>
        </>
      )}
    </section>
  );
}
