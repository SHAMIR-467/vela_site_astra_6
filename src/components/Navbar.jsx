import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
export function Brand() {
  return (
    <a href="#" className="brand" aria-label="Vela home">
      <span className="brand-symbol">∨</span>VELA
      <span className="brand-dot">®</span>
    </a>
  );
}
export default function Navbar({ onOrder }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="navbar">
      <Brand />
      <nav
        className={open ? "nav-links open" : "nav-links"}
        aria-label="Main navigation"
      >
        {[
          ["The Experience", "#experience"],
          ["Craftsmanship", "#craftsmanship"],
          ["Our Story", "#story"],
        ].map(([text, url]) => (
          <a key={url} href={url} onClick={() => setOpen(false)}>
            {text}
          </a>
        ))}
        <span className="nav-edition">FORM. FEELING. FUTURE.</span>
      </nav>
      <button className="nav-order" onClick={onOrder}>
        Discover Vela One <ArrowUpRight size={14} />
      </button>
      <button
        className="menu-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
        aria-expanded={open}
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}
