'use client';
import type { FormEvent } from 'react';

export default function ContactSection({onSubmit,saved}:{onSubmit:(event:FormEvent<HTMLFormElement>)=>void;saved:boolean}){
 return <section className="contact-section" id="contact" aria-labelledby="contact-title">
  <div className="contact-shell wrap">
   <div className="contact-form-panel">
    <a className="contact-brand" href="#" aria-label="WEBSTELL home"><span aria-hidden="true">✳</span> WEBSTELL</a>
    <div className="contact-intro"><span>START A PROJECT</span><h2 id="contact-title">Let’s build something<br/>worth remembering.</h2><p>Tell us what you’re creating. We’ll reply with clear next steps within one working day.</p></div>
    <form className="contact-form" onSubmit={onSubmit}>
     <div className="contact-form-row"><label>First name<input name="firstName" required autoComplete="given-name" placeholder="First name"/></label><label>Last name<input name="lastName" required autoComplete="family-name" placeholder="Last name"/></label></div>
     <label>Email<input name="email" required type="email" autoComplete="email" placeholder="you@company.com"/></label>
     <div className="contact-form-row"><label>Phone <span>(optional)</span><input name="phone" type="tel" autoComplete="tel" placeholder="+91 00000 00000"/></label><label>Project type<select name="service" defaultValue=""><option value="" disabled>Select a service</option><option>Website design & development</option><option>Ecommerce experience</option><option>UI/UX & brand identity</option><option>Software & AI automation</option></select></label></div>
     <label>Project details<textarea name="details" required rows={5} placeholder="Your goals, timeline, audience and anything else we should know…"/></label>
     <label className="contact-consent"><input type="checkbox" required/> <span>I’m happy for WEBSTELL to use these details to respond to my inquiry.</span></label>
     <button className="contact-submit" type="submit"><span>Send project brief</span><i aria-hidden="true">↗</i></button>
     <p className="contact-status" aria-live="polite">{saved?'Your project brief is ready and has been downloaded.':''}</p>
    </form>
   </div>
   <aside className="contact-visual" aria-label="WEBSTELL digital studio">
    <img src="/assets/contact/webstell-contact.avif" alt="Abstract prismatic digital artwork" loading="lazy"/>
    <span className="contact-visual-label">WEBSTELL / PROJECT DESK</span>
    <div className="contact-visual-copy"><span aria-hidden="true">★★★★★</span><h3>Bring us the brief.<br/>We’ll bring the momentum.</h3><p>Strategy, design and dependable development—all moving in one direction.</p></div>
   </aside>
  </div>
 </section>;
}
