'use client';

import { useEffect, useState } from 'react';

export function ReadingProgressBar({ targetId }: { targetId?: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId: number | null = null;

    const updateProgress = () => {
      rafId = null;
      const scrollY = window.scrollY;
      const target = targetId ? document.getElementById(targetId) : null;

      if (target) {
        const rect = target.getBoundingClientRect();
        const top = rect.top + scrollY;
        const scrollableHeight = Math.max(1, target.offsetHeight - window.innerHeight * 0.65);
        const ratio = (scrollY - top) / scrollableHeight;
        setProgress(Math.round(Math.min(100, Math.max(0, ratio * 100))));
        return;
      }

      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setProgress(Math.round(Math.min(100, Math.max(0, (scrollY / maxScroll) * 100))));
    };

    const handleScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [targetId]);

  return (
    <progress
      value={progress}
      max={100}
      aria-label="Article reading progress"
      className="pointer-events-none fixed left-0 right-0 top-0 z-50 block h-[3px] w-full appearance-none bg-black/15 [&::-moz-progress-bar]:bg-[#FFC800] [&::-webkit-progress-bar]:bg-black/15 [&::-webkit-progress-value]:bg-[#FFC800] [&::-webkit-progress-value]:transition-[width] [&::-webkit-progress-value]:duration-75"
    />
  );
}
