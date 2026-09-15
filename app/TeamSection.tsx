'use client';

import { useState } from 'react';
import SocialIcon from './SocialIcon';
import { team } from './team-data';

export default function TeamSection() {
  const [flippedTeam, setFlippedTeam] = useState<number | null>(null);

  return (
    <section className="team" id="team" aria-labelledby="team-title">
      <div className="team-inner">
        <div className="team-heading">
          <div><span className="team-kicker">The people behind the work</span><h2 id="team-title">Meet our team</h2></div>
          <a className="team-story" href="/contact"><span aria-hidden="true">↗</span> Discuss your project</a>
        </div>
        <div className="team-grid">
          {team.map((member, index) => (
            <article className={`team-card ${flippedTeam === index ? 'is-flipped' : ''}`} key={member.name}>
              <div className="team-card-inner">
                <div className="team-face team-front">
                  <button type="button" className="team-front-button" onClick={() => setFlippedTeam(index)} aria-label={`Read more about ${member.name}`}>
                    <div className="team-photo"><img src={member.image} alt={`${member.name}, ${member.role}`} loading="lazy"/></div>
                    <div className="team-meta"><span>{member.name}</span><p>{member.role}</p><span className="team-toggle" aria-hidden="true">+</span></div>
                  </button>
                </div>
                <div className="team-face team-back">
                  <div className="team-socials" aria-label={`Social profiles for ${member.name}`}>
                    <a href={member.linkedin} target="_blank" rel="noreferrer" aria-label={`${member.name} on LinkedIn`}><SocialIcon name="linkedin"/></a>
                    <a href={member.instagram} target="_blank" rel="noreferrer" aria-label={`${member.name} on Instagram`}><SocialIcon name="instagram"/></a>
                    {member.github && <a href={member.github} target="_blank" rel="noreferrer" aria-label={`${member.name} on GitHub`}><SocialIcon name="github"/></a>}
                  </div>
                  <button type="button" className="team-close" onClick={() => setFlippedTeam(null)} aria-label={`Close ${member.name} profile`}><span aria-hidden="true"/></button>
                  <div className="team-bio"><p>{member.bio}</p><p>{member.note}</p></div>
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
