import {
  ArrowUpRight,
  ArrowDown,
  Play,
  MoveUpRight,
  AudioLines,
} from "lucide-react";
import ProductCanvas from "./ProductView";
import { finishes } from "./finishes";
export default function Hero({ onCinematic }) {
  function magnet(e) {
    if (window.matchMedia("(pointer:fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const r = e.currentTarget.getBoundingClientRect();
      e.currentTarget.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.09}px,${(e.clientY - r.top - r.height / 2) * 0.12}px)`;
    }
  }
  return (
    <section className="hero" id="experience">
      <div className="hero-grain" />
      <div className="hero-copy">
        <div className="eyebrow">
          <span className="status-dot" /> INTRODUCING VELA ONE{" "}
          <span className="tiny-rule" />
        </div>
        <h1>
          Redefining
          <br />
          elegance.
          <br />
          <span>Beyond sound.</span>
        </h1>
        <p>
          Extraordinary sound. Instinctive connection.
          <br />
          Next-generation craftsmanship, made to move you.
        </p>
        <div className="hero-actions">
          <a
            href="#collection"
            className="button-primary"
            onPointerMove={magnet}
            onPointerLeave={(e) => (e.currentTarget.style.transform = "")}
          >
            Explore Collection <ArrowUpRight size={17} />
          </a>
          <button className="cinematic-button" onClick={onCinematic}>
            <span className="play-icon">
              <Play size={11} fill="currentColor" />
            </span>
            Watch Cinematic <span className="duration">01:24</span>
          </button>
        </div>
        <div className="hero-note">
          <span className="note-stars">✧</span> Designed to be heard. Made to be kept.
        </div>
      </div>
      <div className="hero-art">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <span className="art-caption">
          ENGINEERED TO DISAPPEAR.
          <br />
          DESIGNED TO BE SEEN.
        </span>
        <ProductCanvas finish={finishes[0]} />
        <div className="product-callout">
          <span className="callout-line" />
          <div>
            <span className="callout-dot" /> PRECISION, IN EVERY DETAIL
            <br />
            <small>Aerospace-grade aluminum</small>
          </div>
        </div>
        <div className="product-label">
          <span>VELA ONE</span>
          <small>THE SIGNATURE EDITION</small>
        </div>
        <div className="drag-indicator">
          <MoveUpRight size={12} /> DRAG TO EXPLORE
        </div>
      </div>
      <div className="hero-bottom">
        <a href="#craftsmanship">
          <ArrowDown size={13} /> SCROLL TO DISCOVER
        </a>
        <span>DESIGNED WITH INTENTION. BUILT WITHOUT COMPROMISE.</span>
        <span>
          01 <i>/ 04</i>
        </span>
      </div>
    </section>
  );
}
