import StudioNav, { StudioFooter } from '../StudioNav';
import TeamSection from '../TeamSection';
import './about.css';

const principles = [
  ['01', 'Clarity before decoration', 'We get close to the business problem before deciding what the work should look like.'],
  ['02', 'One connected team', 'Strategy, design and engineering stay in the same conversation from first sketch to launch.'],
  ['03', 'Useful over fashionable', 'Every interaction earns its place, works on real devices and leaves room for the business to grow.'],
];

export default function AboutPage() {
  return (
    <>
      <StudioNav current="about" />
      <main className="about-page">
        <section className="about-hero studio-width" aria-labelledby="about-page-title">
          <div className="about-hero-label"><span>ABOUT WEBSTELL</span><span>INDIA / WORLDWIDE</span></div>
          <h1 id="about-page-title">A small studio for<br/><em>ambitious digital work.</em></h1>
          <div className="about-hero-copy">
            <p>WEBSTELL brings strategy, design and engineering together for businesses that want to be understood, remembered and easier to choose.</p>
            <p>You work directly with the people making the work. That keeps decisions clear, collaboration human and every detail connected to the original goal.</p>
          </div>
        </section>

        <section className="about-principle-section studio-width" aria-labelledby="principles-title">
          <div className="about-principle-heading"><span>HOW WE WORK</span><h2 id="principles-title">Thoughtful by default.</h2></div>
          <div className="about-principle-grid">
            {principles.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </section>

        <TeamSection />

        <section className="about-next studio-width" aria-labelledby="about-next-title">
          <span>HAVE SOMETHING IN MIND?</span>
          <h2 id="about-next-title">Let’s make the next move count.</h2>
          <div><a className="about-primary" href="/contact">Discuss your project <span aria-hidden="true">↗</span></a><a className="about-secondary" href="/projects">See our work <span aria-hidden="true">↗</span></a></div>
        </section>
      </main>
      <StudioFooter />
    </>
  );
}
