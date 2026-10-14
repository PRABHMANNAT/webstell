'use client';

import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import Link from './SiteLink';
import Image from 'next/image';
import SocialIcon from './SocialIcon';
import { team, type TeamMember } from './team-data';

function TeamCard({ member }: { member: TeamMember }) {
  const [flipped, setFlipped] = useState(false);
  const detailsId = useId();
  const frontButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const moveFocus = useRef(false);

  useEffect(() => {
    if (!moveFocus.current) return;
    (flipped ? closeButton : frontButton).current?.focus({ preventScroll: true });
    moveFocus.current = false;
  }, [flipped]);

  function flip(showDetails: boolean) {
    moveFocus.current = true;
    setFlipped(showDetails);
  }

  function closeOnEscape(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Escape') {
      event.preventDefault();
      flip(false);
    }
  }

  return (
    // oxlint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- Pointer hover supplements the native flip and close buttons.
    <article
      className={`team-card${flipped ? ' is-flipped' : ''}`}
      onPointerEnter={event => {
        if (event.pointerType === 'mouse' && window.matchMedia('(hover: hover) and (pointer: fine)').matches) setFlipped(true);
      }}
      onPointerLeave={event => {
        if (event.pointerType === 'mouse' && !event.currentTarget.contains(document.activeElement)) setFlipped(false);
      }}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFlipped(false);
      }}
    >
      <div className="team-card-inner">
        <div className="team-face team-front" inert={flipped} aria-hidden={flipped}>
          <button
            className="team-front-button"
            type="button"
            ref={frontButton}
            aria-label={`Show details for ${member.name}`}
            aria-expanded={flipped}
            aria-controls={detailsId}
            onClick={() => flip(true)}
          >
            <div className="team-photo">
              <Image
                src={member.image}
                alt={member.imageAlt ?? `${member.name}, ${member.role}`}
                fill
                sizes="(max-width: 700px) 100vw, (max-width: 1050px) 50vw, (min-width: 1800px) 20vw, 33vw"
                style={{ objectPosition: member.imagePosition ?? 'center' }}
                unoptimized
              />
            </div>
            <div className="team-meta"><span>{member.name}</span><p>{member.role}</p></div>
            <span className="team-flip-hint" aria-hidden="true">↗</span>
          </button>
        </div>
        <div className="team-face team-back" id={detailsId} inert={!flipped} aria-hidden={!flipped}>
          <div className="team-socials" aria-label={`Social profiles for ${member.name}`}>
            <a href={member.linkedin} target="_blank" rel="noreferrer" aria-label={`${member.name} on LinkedIn`} onKeyDown={closeOnEscape}><SocialIcon name="linkedin"/></a>
            {member.instagram && <a href={member.instagram} target="_blank" rel="noreferrer" aria-label={`${member.name} on Instagram`} onKeyDown={closeOnEscape}><SocialIcon name="instagram"/></a>}
            {member.github && <a href={member.github} target="_blank" rel="noreferrer" aria-label={`${member.name} on GitHub`} onKeyDown={closeOnEscape}><SocialIcon name="github"/></a>}
          </div>
          <button className="team-close" type="button" ref={closeButton} aria-label={`Show portrait of ${member.name}`} onClick={() => flip(false)} onKeyDown={closeOnEscape}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6"/></svg>
          </button>
          <div className="team-bio"><p>{member.bio}</p><p className="team-value">{member.value}</p></div>
          <div className="team-meta"><span>{member.name}</span><p>{member.role}</p></div>
        </div>
      </div>
    </article>
  );
}

export default function TeamSection() {
  return (
    <section className="team" id="team" aria-labelledby="team-title">
      <div className="team-inner">
        <div className="team-heading">
          <div><span className="team-kicker">The people who make it happen.</span><h2 id="team-title">Meet our team</h2></div>
          <Link className="team-story" href="/contact"><span className="team-story-arrow" aria-hidden="true">↗</span><strong>Discuss your project</strong></Link>
        </div>
        <div className="team-grid">
          {team.map(member => <TeamCard member={member} key={member.name} />)}
        </div>
      </div>
    </section>
  );
}
