'use client';

import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { BackgroundCubesGrid } from '@/components/ui/background-cubes-grid';
import SiteLink from '../SiteLink';

const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

export default function AboutHero() {
  const reduceMotion = useReducedMotion();
  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? false as const : { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: EASE_OUT, delay },
  });

  return (
    <section
      className="relative isolate flex min-h-[min(50rem,calc(100svh-81px))] w-full items-center justify-center overflow-hidden px-5 py-20 sm:px-8"
      aria-labelledby="about-page-title"
    >
      <BackgroundCubesGrid className="-z-10" />
      <div className="pointer-events-none mx-auto flex max-w-[1080px] flex-col items-center text-center antialiased">
        <motion.h1
          {...fadeUp(0.24)}
          id="about-page-title"
          className="m-0 text-[clamp(46px,8.5vw,112px)] leading-[0.98] font-medium tracking-[-0.065em] text-balance text-[#0b0d0b]"
        >
          Your vision.
          <br />
          <em className="font-[Georgia,serif] font-normal tracking-[-0.055em] text-[#2d4827]">
            Built together.
          </em>
        </motion.h1>
        <motion.p
          {...fadeUp(0.7)}
          className="mt-8 max-w-[540px] text-[clamp(17px,1.5vw,19px)] leading-[1.6] text-pretty text-neutral-600"
        >
          Work directly with the designers and developers bringing your ideas to
          life. Websites, software and AI tools, built for your business.
        </motion.p>
        <motion.div
          {...fadeUp(0.8)}
          className="pointer-events-auto mt-9 flex flex-col items-center gap-2 sm:flex-row sm:gap-3"
        >
          <SiteLink
            href="/contact?source=about&detail=Start+a+project"
            className="about-hero-primary inline-flex h-12 items-center gap-4 rounded-full bg-[#111] px-6 text-[15px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-colors hover:bg-neutral-800 motion-reduce:transition-none"
          >
            Let’s build something
            <ArrowUpRight size={18} aria-hidden="true" />
          </SiteLink>
          <SiteLink
            href="#team"
            className="inline-flex h-12 items-center gap-3 rounded-full border border-[#2d4827] bg-white/70 px-6 text-[15px] font-medium text-[#111] transition-colors hover:bg-white motion-reduce:transition-none"
          >
            Meet the team
            <ArrowDown size={16} aria-hidden="true" />
          </SiteLink>
        </motion.div>
        <motion.p {...fadeUp(0.9)} className="mt-5 text-[13px] text-neutral-500">
          Direct collaboration. From the first idea to what’s next.
        </motion.p>
      </div>
    </section>
  );
}
