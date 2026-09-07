import { useState } from "react";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { savePreview } from "../lib/storage";
import { Brand } from "./Navbar";
export default function Footer({ onOrder, onInfo }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  return (
    <footer className="section footer">
      <div className="footer-top">
        <div>
          <div className="eyebrow">MAKE ROOM FOR EXTRAORDINARY.</div>
          <h2>Your next obsession.</h2>
          <button onClick={onOrder} className="button-primary">
            Discover Vela One <ArrowUpRight size={17} />
          </button>
        </div>
        <div className="newsletter">
          <h3>A little closer to Vela.</h3>
          <p>New perspectives. First access. Only the exceptional.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const saved = savePreview("vela-newsletter", email.trim());
              setDone(saved);
              setError(saved ? "" : "Unable to save. Please allow site storage and try again.");
            }}
          >
            <label className="sr-only" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              aria-describedby="newsletter-feedback"
              required
              placeholder="Your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setDone(false);
              }}
            />
            <button aria-label="Subscribe to Vela newsletter">
              {done ? <Check size={19} /> : <ArrowRight size={19} />}
            </button>
          </form>
          <span className="newsletter-status" id="newsletter-feedback" role="status">
            {error || (done
              ? "You’re on the list — saved on this device."
              : "Considered updates. Never the noise.")}
          </span>
        </div>
      </div>
      <div className="footer-bottom">
        <Brand />
        <span>© {new Date().getFullYear()} Vela. All rights reserved.</span>
        <div>
          <button onClick={() => onInfo("Instagram")}>
            Instagram <ArrowUpRight size={12} />
          </button>
          <button onClick={() => onInfo("Contact")}>Contact</button>
          <button onClick={() => onInfo("Privacy")}>Privacy</button>
        </div>
        <span className="footer-signature">DESIGNED TO FEEL DIFFERENT.</span>
      </div>
    </footer>
  );
}
