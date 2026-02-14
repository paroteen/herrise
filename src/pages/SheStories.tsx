import React from 'react';
import { PageMeta } from '@/components/PageMeta';
import { SheStoryCard } from '@/components/SheStoryCard';
import { useSheStories } from '@/hooks/useSheStories';

const SheStories: React.FC = () => {
  const { stories, loading, error, refetch } = useSheStories();

  return (
    <div className="min-h-screen bg-gray-50">
      <PageMeta
        title="She Stories"
        description="Personal stories of change and empowerment from the women and girls HerRise works with."
      />
      <div className="bg-purple-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold mb-3">She Stories</h1>
          <p className="text-xl text-purple-100 max-w-2xl">
            Short, powerful stories of change—in their words.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-16 text-gray-500">Loading…</div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-red-600 mb-4">{error}</p>
            <button onClick={refetch} className="text-purple-600 underline">
              Try again
            </button>
          </div>
        ) : stories.length === 0 ? (
          <p className="text-center text-slate-500 py-12">No She Stories yet.</p>
        ) : (
          <div className="space-y-10">
            {stories.map((story) => (
              <SheStoryCard key={story.id} story={story} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SheStories;
