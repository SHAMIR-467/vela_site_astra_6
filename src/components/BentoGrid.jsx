import {
  AudioLines,
  Layers3,
  Fingerprint,
  ArrowUpRight,
  Radio,
} from "lucide-react";
export default function BentoGrid() {
  return (
    <section id="craftsmanship" className="section features reveal">
      <div className="section-heading">
        <div>
          <div className="eyebrow">THE ART OF LESS. THE POWER OF MORE.</div>
          <h2>Exceptional by nature.</h2>
        </div>
        <p>
          Every detail has a purpose.
          <br />
          Every experience, a little extraordinary.
        </p>
      </div>
      <div className="bento-grid">
        <article className="feature-card sound-card">
          <div className="card-top">
            <AudioLines size={23} />
            <span>01 / SOUND</span>
            <ArrowUpRight size={16} />
          </div>
          <div className="sound-waves">
            {Array.from({ length: 53 }, (_, i) => (
              <i
                key={i}
                style={{
                  height: `${8 + Math.pow(Math.sin(i * 0.42), 2) * (65 - Math.abs(i - 26) * 1.8)}px`,
                  "--i": i,
                }}
              />
            ))}
          </div>
          <div className="card-copy">
            <h3>Sound, without boundaries.</h3>
            <p>
              Immersive 360° acoustic fidelity.
              <br />
              Hear the detail. Feel the difference.
            </p>
          </div>
          <span className="card-pill">HI-RES AUDIO</span>
        </article>
        <article className="feature-card alloy-card">
          <div className="card-top">
            <Layers3 size={22} />
            <span>02 / MATERIAL</span>
            <ArrowUpRight size={16} />
          </div>
          <div className="alloy-visual">
            <i />
            <i />
            <i />
          </div>
          <div className="card-copy">
            <h3>Strength meets sculpture.</h3>
            <p>
              Aerospace-grade alloy.
              <br />
              Remarkably light. Endlessly enduring.
            </p>
          </div>
        </article>
        <article className="feature-card sync-card">
          <div className="card-top">
            <Fingerprint size={22} />
            <span>03 / INTELLIGENCE</span>
            <ArrowUpRight size={16} />
          </div>
          <div className="sync-visual">
            <div />
            <Fingerprint size={68} strokeWidth={0.7} />
          </div>
          <div className="card-copy">
            <h3>In sync. With you.</h3>
            <p>
              Neural Sync learns your rhythm.
              <br />A connection that feels second nature.
            </p>
          </div>
        </article>
        <article className="feature-card connect-card">
          <div className="card-top">
            <Radio size={22} />
            <span>04 / CONNECTION</span>
            <ArrowUpRight size={16} />
          </div>
          <div className="latency">
            0<span>ms</span>
            <small>NOTHING BETWEEN YOU AND THE MOMENT.</small>
          </div>
          <div className="card-copy">
            <h3>Instant. Effortless. Seamless.</h3>
            <p>
              Zero-latency connectivity.
              <br />
              Always a step ahead.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
