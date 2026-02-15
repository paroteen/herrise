import React from 'react';
import type { SheStory } from '@/types';

/** Custom checkmark for impact items */
const CheckIcon = () => (
  <svg className="h-5 w-5 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

interface SheStoryCardProps {
  story: SheStory;
}

export const SheStoryCard: React.FC<SheStoryCardProps> = ({ story }) => {
  const quotes = Array.isArray(story.quotes) ? story.quotes : story.quotes ? [story.quotes] : [];
  const changeAchieved = story.changeAchieved?.length ? story.changeAchieved : [];

  const quoteBlock = (quote: string, index: number) => (
    <blockquote
      key={index}
      className="relative my-6 rounded-r-xl bg-white/40 backdrop-blur-sm py-5 pl-5 pr-5 shadow-md overflow-hidden"
      style={{ boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)' }}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l"
        style={{ background: 'linear-gradient(to bottom, rgb(244 63 94), rgb(251 146 60))' }}
        aria-hidden
      />
      <span
        className="pointer-events-none absolute left-5 top-1 font-serif text-8xl text-rose-400/25 select-none"
        aria-hidden
      >
        &ldquo;
      </span>
      <p className="relative font-serif text-lg italic text-slate-700 leading-relaxed pl-8">
        &ldquo;{quote}&rdquo;
      </p>
      <p className="relative mt-2 pl-8 text-sm font-semibold text-slate-600 not-italic">
        
      </p>
    </blockquote>
  );

  const changeAchievedBlock = () => (
    <div className="clear-both mt-6">
      <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide mb-3">
        Change achieved
      </h3>
      <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2">
        {changeAchieved.map((item, i) => (
          <div
            key={i}
            className="flex gap-3 rounded-lg border border-slate-100 bg-slate-50/80 px-4 py-3 shadow-sm"
          >
            <CheckIcon />
            <span className="text-slate-700">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-100">
      {/* Mobile: single-column stack */}
      <div className="lg:hidden">
        <div className="aspect-[4/3] bg-slate-100">
          <img
            src={story.photo}
            alt={story.photoCaption || story.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=She+Story';
            }}
          />
        </div>
        {story.photoCaption && (
          <p className="text-sm text-slate-500 italic px-4 py-2 bg-slate-50/90 border-b border-slate-100">
            {story.photoCaption}
          </p>
        )}
        <div className="p-6">
          <header className="mb-4">
            <h2 className="font-serif text-2xl font-bold text-gray-900">{story.title}</h2>
            <p className="text-slate-600 font-medium mt-1">{story.name}</p>
          </header>
          {story.content && (
            <div className="mb-6 text-slate-700 leading-relaxed whitespace-pre-line">
              {story.content}
            </div>
          )}
          {quotes.map(quoteBlock)}
          {changeAchieved.length > 0 && (
            <div className="rounded-lg border border-slate-100 bg-slate-50/50 px-4 py-3">
              <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide mb-2">
                Change achieved
              </h3>
              <div className="grid gap-2 sm:grid-cols-1">
                {changeAchieved.map((item, i) => (
                  <div key={i} className="flex gap-2 rounded-lg border border-slate-100 bg-white/60 px-3 py-2">
                    <CheckIcon />
                    <span className="text-slate-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop (lg+): float image, text wrap, quote blocks, impact cards */}
      <div className="hidden lg:block overflow-hidden p-8">
        <div
          className="float-right w-80 max-w-md ml-6 mb-6 rounded-xl shadow-lg overflow-hidden border border-slate-100"
          style={{ boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.05)' }}
        >
          <div className="aspect-[4/3] bg-slate-100">
            <img
              src={story.photo}
              alt={story.photoCaption || story.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=She+Story';
              }}
            />
          </div>
          {story.photoCaption && (
            <p className="text-sm text-slate-500 italic px-3 py-2 bg-slate-50 border-t border-slate-100">
              {story.photoCaption}
            </p>
          )}
        </div>

        <header className="mb-4">
          <h2 className="font-serif text-3xl font-bold text-gray-900">{story.title}</h2>
          <p className="text-slate-600 font-medium mt-1">{story.name}</p>
        </header>

        {story.content && (
          <div className="text-slate-700 leading-relaxed whitespace-pre-line mb-6">
            {story.content}
          </div>
        )}

        {quotes.length > 0 && (
          <div className="clear-right space-y-2">
            {quotes.map(quoteBlock)}
          </div>
        )}

        {changeAchieved.length > 0 && changeAchievedBlock()}
      </div>
    </article>
  );
};
