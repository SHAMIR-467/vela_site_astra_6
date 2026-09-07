import { Plus, Truck, ShieldCheck, PackageCheck } from 'lucide-react';
const questions = [
  ['What comes with Vela One?', 'The concept collection includes Vela One in your selected finish, a braided USB-C charging cable, a soft travel sleeve, and a quick-start guide.'],
  ['How do I choose a finish?', 'Each finish shares the same sculptural design. Choose warm Liquid Gold, understated Midnight Obsidian, or cool Frost Silver. Use the interactive model above to see each material from every angle.'],
  ['Can I place an order today?', 'This is a preview of the Vela collection. You can save your interest on this device, but checkout is not live. No payment is collected and no order is submitted.'],
  ['How is my information used?', 'Preview newsletter and reservation details stay in your browser. They are not sent to a server. Clear this site’s browser data to remove them.'],
];
export default function Details() {
  return <section className="section details-section reveal" id="questions"><div className="details-intro"><div className="eyebrow">THE DETAILS THAT MATTER</div><h2>A little more<br/>peace of mind.</h2><p>Considered from the first impression<br/>to the everyday ritual.</p><div className="care-row"><Truck/><span>Complimentary delivery</span></div><div className="care-row"><ShieldCheck/><span>2-year Vela care</span></div><div className="care-row"><PackageCheck/><span>Thoughtfully packaged</span></div><small>Collection concept. Final terms at launch.</small></div><div className="faq-list">{questions.map(([q,a],i)=><details key={q} name="vela-questions"><summary><span className="faq-number">0{i+1}</span>{q}<Plus size={18}/></summary><p>{a}</p></details>)}</div></section>;
}
