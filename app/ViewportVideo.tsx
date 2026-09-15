'use client';

import { useEffect, useRef, type VideoHTMLAttributes } from 'react';

export default function ViewportVideo(props: VideoHTMLAttributes<HTMLVideoElement>) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    const syncPlayback = () => {
      if (visible && !reducedMotion.matches) void video.play().catch(() => undefined);
      else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    }, { threshold: 0.12 });

    observer.observe(video);
    reducedMotion.addEventListener('change', syncPlayback);
    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener('change', syncPlayback);
      video.pause();
    };
  }, []);

  return <video ref={videoRef} muted playsInline preload="metadata" {...props} />;
}
