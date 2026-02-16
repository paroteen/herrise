import React, { useState, useMemo } from 'react';
import { X, Share2, Facebook, Twitter, Link as LinkIcon, Search } from 'lucide-react';
import { PageMeta } from '@/components/PageMeta';
import { useSheStories } from '@/hooks/useSheStories';
import type { SheStory } from '@/types';

/** Custom checkmark for change achieved items */
const CheckIcon = () => (
  <svg className="h-5 w-5 shrink-0 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

/** Color palette for cards */
const cardColors = [
  { bg: 'bg-[#F5F1E8]', hover: 'hover:bg-teal-700' }, // Cream
  { bg: 'bg-[#E8EDE7]', hover: 'hover:bg-emerald-700' }, // Sage
  { bg: 'bg-[#E5E7EB]', hover: 'hover:bg-slate-700' }, // Soft Slate
  { bg: 'bg-[#F9F5E8]', hover: 'hover:bg-amber-700' }, // Pale Gold
];

/** Refined Story Card with Vertical Layout */
const StoryCard: React.FC<{ 
  story: SheStory; 
  colorIndex: number;
  onClick: () => void 
}> = ({ story, colorIndex, onClick }) => {
  const quotes = Array.isArray(story.quotes) ? story.quotes : story.quotes ? [story.quotes] : [];
  const pullQuote = quotes[0] || story.content?.slice(0, 100) + '...' || story.title;
  const tag = story.title || 'Her Story';
  const color = cardColors[colorIndex % cardColors.length];

  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-xl border border-slate-200 cursor-pointer transition-all duration-500 hover:shadow-xl ${color.bg} ${color.hover}`}
    >
      {/* Image at Top */}
      <div className="relative h-56 overflow-hidden bg-slate-200">
        {story.photo && (
          <img
            src={story.photo}
            alt={story.name}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
            style={{ filter: 'sepia(0.2) contrast(1.05)' }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Portrait';
            }}
          />
        )}
        {/* Gradient overlay for better text contrast if needed */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col gap-4">
        {/* Pull Quote */}
        <blockquote className="relative">
          <span className="absolute -left-2 -top-1 text-4xl text-slate-900/10 font-serif leading-none group-hover:text-white/20 transition-colors">"</span>
          <p
            className="text-lg font-semibold text-slate-900 leading-snug pl-4 line-clamp-3 group-hover:text-white transition-colors duration-500"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {pullQuote}
          </p>
        </blockquote>

        {/* Divider */}
        <div className="h-px bg-slate-300/50 group-hover:bg-white/30 transition-colors" />

        {/* Name and Title */}
        <div>
          <p className="text-lg font-bold text-slate-900 group-hover:text-white transition-colors mb-1">
            {story.name}
          </p>
          <p className="text-sm text-slate-600 group-hover:text-white/80 transition-colors">
            {tag}
          </p>
        </div>

        {/* Read Button - Appears on Hover */}
        <div className="mt-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 border border-white/40 rounded-lg text-white text-sm font-semibold">
            Read Full Story →
          </div>
        </div>
      </div>
    </div>
  );
};

/** Slide-Over Panel for Full Story with Multi-Column Layout */
const StoryPanel: React.FC<{ story: SheStory; onClose: () => void }> = ({ story, onClose }) => {
  const quotes = Array.isArray(story.quotes) ? story.quotes : story.quotes ? [story.quotes] : [];
  const changeAchieved = story.changeAchieved?.length ? story.changeAchieved : [];
  const [copied, setCopied] = useState(false);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `${story.name}'s Story - ${story.title}`;
    
    if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Slide-Over Panel */}
      <div className="fixed inset-y-0 right-0 w-full sm:w-[650px] lg:w-[800px] bg-white shadow-2xl z-50 overflow-y-auto animate-slide-in-right">
        {/* Close Button - Easy to Find */}
        <button
          type="button"
          onClick={onClose}
          className="fixed top-6 right-6 z-10 p-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-lg hover:shadow-xl"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {/* Header - Large Square Portrait */}
        <div className="relative h-80 bg-slate-200">
          {story.photo && (
            <img
              src={story.photo}
              alt={story.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=Portrait';
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
          
          {/* Name & Title Overlay */}
          <div className="absolute bottom-8 left-8 right-8">
            <h1
              className="text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {story.name}
            </h1>
            <p className="text-xl text-slate-200 font-medium">{story.title}</p>
          </div>
        </div>

        {/* Content - Multi-Column Layout */}
        <div className="p-8 lg:p-12">
          {/* Story Content - Two Column on Large Screens */}
          {story.content && (
            <div className="mb-10">
              <div className="lg:columns-2 lg:gap-10 text-lg text-slate-700 leading-relaxed whitespace-pre-line">
                {story.content}
              </div>
            </div>
          )}

          {/* Quotes Section */}
          {quotes.length > 0 && (
            <div className="mb-10 border-t border-slate-200 pt-10">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">In Her Words</h2>
              <div className="space-y-6">
                {quotes.map((quote, index) => (
                  <blockquote
                    key={index}
                    className="relative py-6 px-8 bg-slate-50 border-l-4 border-emerald-600 rounded-r-lg"
                  >
                    <p
                      className="text-2xl font-semibold text-slate-800 leading-relaxed italic"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      "{quote}"
                    </p>
                  </blockquote>
                ))}
              </div>
            </div>
          )}

          {/* Change Achieved - Two Column Layout */}
          {changeAchieved.length > 0 && (
            <div className="mb-10 border-t border-slate-200 pt-10">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">
                Change Achieved
              </h2>
              <div className="grid lg:grid-cols-2 gap-4">
                {changeAchieved.map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <CheckIcon />
                    <span className="text-slate-700 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Share Section */}
          <div className="border-t border-slate-200 pt-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-slate-900">Share this story</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleShare('facebook')}
                  className="p-3 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 transition-all"
                  aria-label="Share on Facebook"
                >
                  <Facebook size={20} />
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="p-3 rounded-xl bg-slate-100 hover:bg-sky-500 hover:text-white text-slate-700 transition-all"
                  aria-label="Share on Twitter"
                >
                  <Twitter size={20} />
                </button>
                <button
                  onClick={() => handleShare('copy')}
                  className="p-3 rounded-xl bg-slate-100 hover:bg-slate-700 hover:text-white text-slate-700 transition-all relative"
                  aria-label="Copy link"
                >
                  <LinkIcon size={20} />
                  {copied && (
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap">
                      Link copied!
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const SheStories: React.FC = () => {
  const { stories, loading, error, refetch } = useSheStories();
  const [selectedStory, setSelectedStory] = useState<SheStory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Real-time search filtering
  const filteredStories = useMemo(() => {
    if (!searchQuery.trim()) return stories;
    
    const query = searchQuery.toLowerCase();
    return stories.filter((story) => {
      const quotes = Array.isArray(story.quotes) ? story.quotes.join(' ') : '';
      return (
        story.name.toLowerCase().includes(query) ||
        story.title.toLowerCase().includes(query) ||
        quotes.toLowerCase().includes(query) ||
        (story.content && story.content.toLowerCase().includes(query))
      );
    });
  }, [stories, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <PageMeta
        title="She Stories"
        description="Personal stories of change and empowerment from the women and girls HerRise works with."
      />

      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className="text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            She Stories
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
            Powerful narratives of change, resilience, and empowerment—each told in her own words.
          </p>
        </div>
      </div>

      {/* Sticky Search Bar */}
      <div className="sticky top-0 z-30 bg-[#FAFAF8]/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="relative max-w-2xl">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, keyword, or quote..."
              className="w-full pl-10 pr-4 py-3 bg-transparent border-b-2 border-slate-300 focus:border-teal-600 outline-none text-slate-900 placeholder-slate-400 transition-colors text-lg"
            />
          </div>
          {searchQuery && (
            <p className="mt-3 text-sm text-slate-600">
              {filteredStories.length} {filteredStories.length === 1 ? 'story' : 'stories'} found
            </p>
          )}
        </div>
      </div>

      {/* Editorial Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="text-center py-16 text-slate-500">Loading stories…</div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-red-600 mb-4">{error}</p>
            <button onClick={refetch} className="text-teal-600 underline font-semibold">
              Try again
            </button>
          </div>
        ) : filteredStories.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-500 text-lg mb-2">
              {searchQuery ? 'No stories match your search.' : 'No She Stories yet.'}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-teal-600 underline font-semibold"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((story, index) => (
              <StoryCard
                key={story.id}
                story={story}
                colorIndex={index}
                onClick={() => setSelectedStory(story)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Story Panel */}
      {selectedStory && <StoryPanel story={selectedStory} onClose={() => setSelectedStory(null)} />}
    </div>
  );
};

export default SheStories;
