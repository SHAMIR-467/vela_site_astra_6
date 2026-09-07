import { ArrowUpRight, Rotate3D, Check } from "lucide-react";
import ProductCanvas from "./ProductView";
import { finishes } from "./finishes";
export default function Specs({ finish, setFinish, onOrder }) {
  return (
    <section id="collection" className="section collection reveal">
      <div className="collection-visual">
        <div className="collection-halo" />
        <ProductCanvas finish={finish} callouts />
        <span className="collection-drag">
          <Rotate3D size={15} /> YOUR PERSPECTIVE. EVERY ANGLE.
        </span>
      </div>
      <div className="collection-copy">
        <div className="eyebrow">ONE VELA. UNIQUELY YOURS.</div>
        <h2>
          A finish. <br />A feeling.
        </h2>
        <p>
          Three distinct expressions. One uncompromising standard. Find the Vela
          that speaks to you.
        </p>
        <div
          className="finish-options"
          role="group"
          aria-label="Choose a finish"
        >
          {finishes.map((f) => (
            <button
              key={f.name}
              className={finish.name === f.name ? "finish active" : "finish"}
              style={{ "--swatch": f.swatch }}
              onClick={() => setFinish(f)}
              aria-label={f.name}
              aria-pressed={finish.name === f.name}
            >
              <span className="finish-swatch">{finish.name === f.name && <Check size={15} />}</span>
              <span className="finish-option-label">{f.name.replace("Midnight ", "").replace("Liquid ", "").replace("Frost ", "")}</span>
            </button>
          ))}
        </div>
        <div className="finish-name" aria-live="polite">
          {finish.name}
          <span>SIGNATURE FINISH</span>
        </div>
        <div className="mini-specs"><span><strong>360?</strong>Immersive sound</span><span><strong>24h</strong>Listening time</span><span><strong>USB-C</strong>Simply recharge</span></div>
        <div className="collection-price">
          <span>
            Vela One <small>$499</small>
          </span>
          <button className="button-primary" onClick={onOrder}>
            Make it yours <ArrowUpRight size={16} />
          </button>
        </div>
        <div className="delivery-note">
          Complimentary shipping · 2-year care included
        </div>
      </div>
    </section>
  );
}
