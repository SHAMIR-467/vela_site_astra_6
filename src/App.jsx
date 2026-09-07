import { useEffect, useRef, useState } from "react";
import { X, ArrowUpRight, Check } from "lucide-react";
import { savePreview } from "./lib/storage";
import Details from "./components/Details";
import MobileBar from "./components/MobileBar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BentoGrid from "./components/BentoGrid";
import Specs from "./components/Specs";
import Story from "./components/Story";
import Footer from "./components/Footer";
import ProductCanvas from "./components/ProductView";
import { finishes } from "./components/finishes";
function Modal({ children, onClose, label }) {
  const ref = useRef();
  useEffect(() => {
    const old = document.activeElement;
    ref.current.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      old?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="modal"
      aria-label={label}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-content">
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={22} />
        </button>
        {children}
      </div>
    </dialog>
  );
}
function Cinematic() {
  const [time, setTime] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTime((t) => (t + 1) % 85), 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="cinematic">
      <div className="eyebrow">VELA — A FILM IN THREE MOVEMENTS</div>
      <ProductCanvas cinematic finish={finishes[1]} />
      <h2>
        {time < 28
          ? "Form follows feeling."
          : time < 56
            ? "Precision becomes instinct."
            : "Beyond sound. Vela."}
      </h2>
      <p>A study in light, material, and motion.</p>
      <div className="film-progress">
        <i style={{ width: `${(time / 84) * 100}%` }} />
      </div>
      <span className="film-time">
        {String(Math.floor(time / 60)).padStart(2, "0")}:
        {String(time % 60).padStart(2, "0")} / 01:24{" "}
        <span>SILENT VISUAL EXPERIENCE</span>
      </span>
    </div>
  );
}
export default function App() {
  const [finish, setFinish] = useState(finishes[0]);
  const [modal, setModal] = useState(null);
  const [ordered, setOrdered] = useState(false);
  const [saveError, setSaveError] = useState("");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  function order() {
    setOrdered(false);
    setSaveError("");
    setModal("order");
  }
  return (
    <>
      <Navbar onOrder={order} />
      <a href="#experience" className="skip-link">Skip to content</a>
      <main>
        <Hero onCinematic={() => setModal("cinematic")} />
        <div className="trust-strip">
          <span>EXCEPTIONAL. BY EVERY MEASURE.</span>
          <div>
            <span className="trust-icon">◈</span> Precision engineered
          </div>
          <div>
            <span className="trust-icon">◎</span> Immersive by design
          </div>
          <div>
            <span className="trust-icon">✳</span> Effortlessly connected
          </div>
          <div>
            <span className="trust-icon">♧</span> Consciously crafted
          </div>
        </div>
        <BentoGrid />
        <Specs finish={finish} setFinish={setFinish} onOrder={order} />
        <Story />
        <Details />
      </main>
      <Footer onOrder={order} onInfo={setModal} />
      <MobileBar finish={finish} onOrder={order} hidden={!!modal}/>
      {modal && (
        <Modal
          label={modal === "order" ? "Reserve your Vela One" : modal}
          onClose={() => setModal(null)}
        >
          {modal === "cinematic" ? (
            <Cinematic />
          ) : modal === "order" ? (
            <div className="order-content">
              <div className="eyebrow">THE SIGNATURE EDITION</div>
              <h2>{ordered ? "An excellent choice." : "Make it yours."}</h2>
              {ordered ? (
                <div className="order-success">
                  <Check size={36} />
                  <p>
                    Your interest in Vela One, {finish.name}, has been saved on
                    this device.
                  </p>
                  <p>
                    This is a preview store. No payment was taken and no order
                    was placed.
                  </p>
                  <button
                    className="button-primary"
                    onClick={() => setModal(null)}
                  >
                    Continue exploring <ArrowUpRight size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <div className="order-product">
                    <span>
                      Vela One<small>{finish.name}</small>
                    </span>
                    <strong>$499</strong>
                  </div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const saved = savePreview("vela-reservation", {
                        email: new FormData(e.currentTarget).get("email").trim(),
                        finish: finish.name,
                      });
                      if (!saved) { setSaveError("Your browser couldn't save this reservation. Please allow site storage and try again."); return; }
                      setSaveError("");
                      setOrdered(true);
                    }}
                  >
                    <label htmlFor="order-email">Email address</label>
                    <input
                      name="email"
                      id="order-email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      inputMode="email"
                      aria-describedby={saveError ? "reservation-error" : undefined}
                      required
                    />
                    <div className="order-detail">
                      <span>Complimentary delivery</span>
                      <span>Included</span>
                    </div>
                    <div className="order-detail">
                      <span>2-year Vela care</span>
                      <span>Included</span>
                    </div>
                    <button className="button-primary">
                      Reserve your Vela <ArrowUpRight size={16} />
                    </button>
                    {saveError && <p id="reservation-error" className="form-error" role="alert">{saveError}</p>}
                    <p className="preview-note">
                      Preview experience · Reservation saved locally.
                      <br />
                      No payment required.
                    </p>
                  </form>
                </>
              )}
            </div>
          ) : (
            <div className="info-content">
              <div className="eyebrow">THE WORLD OF VELA</div>
              <h2>{modal}</h2>
              <p>
                {modal === "Privacy"
                  ? "Your privacy matters. This preview stores newsletter and reservation details only in your browser. No details are sent to a server. You can remove them by clearing this site’s browser data."
                  : modal === "Instagram"
                    ? "The Vela journal is coming soon. Join our newsletter for considered design, behind-the-scenes stories, and first access."
                    : "We are creating something extraordinary. Join the newsletter below to register your interest in Vela One."}
              </p>
              <button
                className="button-primary"
                onClick={() => {
                  setModal(null);
                  document
                    .querySelector(".newsletter")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {" "}
                {modal === "Privacy" ? "Back to Vela" : "Stay in the know"}{" "}
                <ArrowUpRight size={16} />
              </button>
            </div>
          )}
        </Modal>
      )}
    </>
  );
}
