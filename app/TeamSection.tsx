import Link from 'next/link';
import Image from 'next/image';
import SocialIcon from './SocialIcon';
import { team } from './team-data';

export default function TeamSection() {
  return (
    <section className="team" id="team" aria-labelledby="team-title">
      <div className="team-inner">
        <div className="team-heading">
          <div><span className="team-kicker">The people who make it happen.</span><h2 id="team-title">Meet our team</h2></div>
          <Link className="team-story" href="/contact"><span className="team-story-arrow" aria-hidden="true">↗</span><strong>Discuss your project</strong></Link>
        </div>
        <div className="team-grid">
          {team.map(member => (
            <article className="team-card" key={member.name}>
              <div className="team-card-inner">
                <div className="team-face team-front">
                  <div className="team-photo"><Image src={member.image} alt={`${member.name}, ${member.role}`} fill sizes="(max-width: 767px) 50vw, (max-width: 1100px) 33vw, 25vw" unoptimized /></div>
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
