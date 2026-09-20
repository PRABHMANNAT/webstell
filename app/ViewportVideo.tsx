'use client';

import { useEffect, useRef, type VideoHTMLAttributes } from 'react';

type ViewportVideoProps = VideoHTMLAttributes<HTMLVideoElement> & {
  playOnHover?: boolean;
};

export default function ViewportVideo({ src, playOnHover = false, ...props }: ViewportVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    let hovered = !playOnHover;
    const syncPlayback = () => {
      if (visible && hovered && !reducedMotion.matches) void video.play().catch(() => undefined);
      else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    }, { threshold: 0.12 });

    observer.observe(video);
    reducedMotion.addEventListener('change', syncPlayback);
    const startOnHover = () => {
      hovered = true;
      syncPlayback();
    };
    const pauseOnLeave = () => {
      hovered = false;
      syncPlayback();
    };
    if (playOnHover) {
      video.addEventListener('pointerenter', startOnHover);
      video.addEventListener('pointerleave', pauseOnLeave);
    }
    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener('change', syncPlayback);
      video.removeEventListener('pointerenter', startOnHover);
      video.removeEventListener('pointerleave', pauseOnLeave);
      video.pause();
    };
  }, [playOnHover, src]);

  return <video ref={videoRef} muted playsInline preload="metadata" src={src} {...props} />;
}
