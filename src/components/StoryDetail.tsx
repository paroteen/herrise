import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin } from 'lucide-react';
import { PageMeta } from './PageMeta';
import { useStory } from '@/hooks/useStories';

const StoryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const numericId = id ? Number(id) : null;
  const { story, loading, error } = useStory(numericId);

  if (!id) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Story Not Found</h2>
          <button onClick={() => navigate('/impact-stories')} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Stories
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center text-gray-500">Loading story…</div>
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Story Not Found</h2>
            <p className="text-gray-600 mb-6">The story you're looking for doesn't exist or has been removed.</p>
            <button onClick={() => navigate('/impact-stories')} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Stories
            </button>
          </div>
        </div>
      </div>
    );
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: story.title,
    description: story.excerpt,
    image: story.image,
    datePublished: story.date,
    author: { '@type': 'Person', name: story.author, jobTitle: story.authorRole },
    publisher: { '@type': 'Organization', name: 'HerRise Development Organisation', url: 'https://herrise.org' },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <PageMeta fullTitle={`${story.title} | HerRise`} description={story.excerpt} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button onClick={() => navigate('/impact-stories')} className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Stories
        </button>
      </div>
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <span className="inline-block px-3 py-1 text-sm font-semibold text-purple-800 bg-purple-100 rounded-full mb-4">{story.category}</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{story.title}</h1>
          <div className="flex items-center text-sm text-gray-500 space-x-4 mb-6">
            <div className="flex items-center"><Calendar className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" /><span>{story.date}</span></div>
            <div className="flex items-center"><Clock className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" /><span>{story.readTime}</span></div>
            <div className="flex items-center"><MapPin className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" /><span>{story.location}</span></div>
          </div>
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden mb-8">
            <img src={story.image} alt={story.title} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x450?text=HerRise+Story'; }} />
          </div>
        </header>
        <div className="prose prose-purple prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">{story.excerpt}</p>
          {story.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-700">{paragraph}</p>
          ))}
        </div>
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xl mr-4">
              {story.author.split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <p className="font-medium text-gray-900">{story.author}</p>
              <p className="text-sm text-gray-500">{story.authorRole}</p>
            </div>
          </div>
        </footer>
      </article>
      <div className="bg-purple-50 py-16 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Inspired by our work?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">Your support helps us create more success stories. Join us in empowering women and girls across Uganda.</p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">Make a Donation</button>
        </div>
      </div>
    </div>
  );
};

export default StoryDetail;
