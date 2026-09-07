import { ArrowUpRight } from 'lucide-react';
export default function MobileBar({ finish, onOrder, hidden }) {
  if (hidden) return null;
  return <aside className="mobile-bar" aria-label="Quick reservation">
    <div><span>Vela One <strong>$499</strong></span><small>{finish.name}</small></div>
    <button className="button-primary" onClick={onOrder}>Make it yours <ArrowUpRight size={16}/></button>
  </aside>;
}
