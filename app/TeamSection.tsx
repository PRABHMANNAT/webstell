import Link from 'next/link';
import SocialIcon from './SocialIcon';
import { team } from './team-data';

export default function TeamSection() {
  return (
    <section className="team" id="team" aria-labelledby="team-title">
      <div className="team-inner">
        <div className="team-heading">
          <div><span className="team-kicker">The people who make it happen.</span><h2 id="team-title">Meet our team</h2></div>
          <Link className="team-story" href="/contact"><span aria-hidden="true">↗</span> Discuss your project</Link>
        </div>
        <div className="team-grid">
          {team.map(member => (
            <article className="team-card" key={member.name}>
              <div className="team-card-inner">
                <div className="team-face team-front">
                  <div className="team-photo"><img src={member.image} alt={`${member.name}, ${member.role}`} loading="lazy"/></div>
                  <div className="team-meta"><span>{member.name}</span><p>{member.role}</p><p className="team-value">{member.value}</p></div>
                </div>
                <div className="team-face team-back">
                  <div className="team-socials" aria-label={`Social profiles for ${member.name}`}>
                    <a href={member.linkedin} target="_blank" rel="noreferrer" aria-label={`${member.name} on LinkedIn`}><SocialIcon name="linkedin"/></a>
                    <a href={member.instagram} target="_blank" rel="noreferrer" aria-label={`${member.name} on Instagram`}><SocialIcon name="instagram"/></a>
                    {member.github && <a href={member.github} target="_blank" rel="noreferrer" aria-label={`${member.name} on GitHub`}><SocialIcon name="github"/></a>}
                  </div>
                  <div className="team-bio"><p>{member.bio}</p></div>
                  <div className="team-meta"><span>{member.name}</span><p>{member.role}</p></div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
