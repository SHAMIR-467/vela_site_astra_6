import { useEffect, useRef, useState } from "react";
function Counter({ value, suffix, decimals = 0 }) {
  const ref = useRef();
  const [n, setN] = useState(0);
  useEffect(() => {
    let frame;
    const o = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start;
          const tick = (t) => {
            start ??= t;
            const p = Math.min((t - start) / 1500, 1);
            setN(value * (1 - Math.pow(1 - p, 3)));
            if (p < 1) frame = requestAnimationFrame(tick);
          };
          frame = requestAnimationFrame(tick);
          o.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    o.observe(ref.current);
    return () => {
      o.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);
  return (
    <span ref={ref}>
      {n.toFixed(decimals)}
      <em>{suffix}</em>
    </span>
  );
}
export default function Story() {
  return (
    <section className="story reveal" id="story">
      <div className="story-landscape" />
      <div className="story-shade" />
      <div className="story-content">
        <div className="eyebrow">
          CRAFTED AT THE INTERSECTION OF ART & ENGINEERING
        </div>
        <h2>
          Nothing added.
          <br />
          Nothing left to chance.
        </h2>
        <p>
          From the first sketch to the final polish, we question everything.
          <br />
          Because the things you live with should make you feel more.
        </p>
        <a href="#details" className="story-link">
          Explore the finer details <span>↓</span>
        </a>
      </div>
      <div className="story-metrics" id="details">
        <div>
          <Counter value={99.9} suffix="%" decimals={1} />
          <small>PURE MATERIALS</small>
        </div>
        <div>
          <Counter value={120} suffix="Hz" />
          <small>REFRESH PRECISION</small>
        </div>
        <div>
          <span>IP68</span>
          <small>ELEMENTS, CONSIDERED</small>
        </div>
        <div>
          <Counter value={24} suffix="h" />
          <small>UNINTERRUPTED PLAY</small>
        </div>
      </div>
    </section>
  );
}
