import React from 'react';
import { Quote } from 'lucide-react';
import type { SheStory } from '@/types';

interface SheStoryCardProps {
  story: SheStory;
}

export const SheStoryCard: React.FC<SheStoryCardProps> = ({ story }) => {
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
          {story.quotes && (
            <blockquote className="relative pl-5 py-3 my-6 border-l-4 border-purple-400 bg-purple-50/30 rounded-r-lg">
              <Quote className="absolute -left-0.5 top-3 h-6 w-6 text-purple-300" aria-hidden />
              <p className="font-serif text-base italic font-medium text-slate-700 pl-6">
                &ldquo;{story.quotes}&rdquo;
              </p>
            </blockquote>
          )}
          {story.changeAchieved && story.changeAchieved.length > 0 && (
            <div className="rounded-lg border border-purple-100 bg-purple-50/50 px-4 py-3">
              <h3 className="text-sm font-semibold text-purple-900 uppercase tracking-wide mb-2">
                Change achieved
              </h3>
              <ul className="space-y-2">
                {story.changeAchieved.map((item, i) => (
                  <li key={i} className="flex gap-2 text-slate-700">
                    <span className="text-purple-500 mt-0.5 flex-shrink-0" aria-hidden>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Desktop (lg+): float image, text wrap, pull-quote, change achieved clears */}
      <div className="hidden lg:block overflow-hidden p-8">
        {/* Floated image: right, fixed max width, shadow, radius */}
        <div className="float-right w-80 max-w-md ml-6 mb-6 rounded-xl shadow-lg overflow-hidden border border-slate-100">
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

        {/* Header group: title + name */}
        <header className="mb-4">
          <h2 className="font-serif text-3xl font-bold text-gray-900">{story.title}</h2>
          <p className="text-slate-600 font-medium mt-1">{story.name}</p>
        </header>

        {/* Content: flows around the floated image */}
        {story.content && (
          <div className="text-slate-700 leading-relaxed whitespace-pre-line mb-6">
            {story.content}
          </div>
        )}

        {/* Pull-quote: centered, breaks up the text */}
        {story.quotes && (
          <blockquote className="clear-right my-8 mx-auto max-w-2xl text-center">
            <Quote className="mx-auto h-10 w-10 text-purple-300 mb-2" aria-hidden />
            <p className="font-serif text-xl lg:text-2xl italic font-medium text-slate-700">
              &ldquo;{story.quotes}&rdquo;
            </p>
          </blockquote>
        )}

        {/* Change achieved: clears float, distinct box, full width below */}
        {story.changeAchieved && story.changeAchieved.length > 0 && (
          <div className="clear-both rounded-lg border border-purple-100 bg-purple-50/50 px-5 py-4 mt-6">
            <h3 className="text-sm font-semibold text-purple-900 uppercase tracking-wide mb-2">
              Change achieved
            </h3>
            <ul className="space-y-2">
              {story.changeAchieved.map((item, i) => (
                <li key={i} className="flex gap-2 text-slate-700">
                  <span className="text-purple-500 mt-0.5 flex-shrink-0" aria-hidden>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
};
