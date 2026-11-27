'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ExpandableIntroProps {
  text: string;
  threshold?: number;
  className?: string;
}

function splitIntro(text: string, threshold: number): { preview: string; rest: string } | null {
  if (text.length <= threshold) return null;

  const firstSentenceEnd = text.indexOf('. ');
  if (firstSentenceEnd !== -1 && firstSentenceEnd >= 60 && firstSentenceEnd < text.length - 20) {
    return {
      preview: text.slice(0, firstSentenceEnd + 1),
      rest: text.slice(firstSentenceEnd + 2),
    };
  }

  const cutoff = text.lastIndexOf(' ', threshold);
  if (cutoff === -1) return null;
  return {
    preview: `${text.slice(0, cutoff)}…`,
    rest: text.slice(cutoff + 1),
  };
}

export function ExpandableIntro({
  text,
  threshold = 200,
  className = 'mt-3 text-base leading-relaxed text-slate-600 sm:text-lg',
}: ExpandableIntroProps) {
  const [expanded, setExpanded] = useState(false);
  const split = splitIntro(text, threshold);

  if (!split) {
    return <p className={className}>{text}</p>;
  }

  return (
    <div className="mt-3">
      <p className={className.replace(/\bmt-\S+/g, '').trim()}>
        {split.preview}
        <span className={expanded ? 'inline' : 'hidden'}> {split.rest}</span>{' '}
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded((prev) => !prev)}
          className="inline-flex items-center gap-1 align-baseline text-sm font-semibold text-[#0074BA] transition-colors hover:text-[#149777] hover:underline focus-visible:rounded"
        >
          <span>{expanded ? 'Read less' : 'Read more'}</span>
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-150 ${expanded ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
      </p>
    </div>
  );
}
