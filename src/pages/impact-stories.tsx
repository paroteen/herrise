import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import DonationModal from '@/components/DonationModal';
import { PageMeta } from '@/components/PageMeta';
import { useStories } from '@/hooks/useStories';
import { openIremboPay } from '@/services/iremboPay';

const SITE_URL = 'https://herrise.org';

const ImpactStories: React.FC = () => {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const { stories, loading, error, refetch } = useStories();

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'HerRise Impact Stories',
    description: 'Stories of change, resilience, and empowerment from the women and communities HerRise works with in Uganda.',
    itemListElement: stories.map((story, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE_URL}/stories/${story.id}`,
      name: story.title,
    })),
  };

  const handleDonate = (amount: number, _paymentMethod: string, email: string, name: string, phone?: string) => {
    setIsDonationModalOpen(false);
    openIremboPay({
      amount,
      customerEmail: email,
      customerPhone: phone,
      description: `Donation to HerRise from ${name}`,
    });
    // User is redirected to IremboPay in a new tab; optional brief in-app message
    alert(`Thank you! You will complete your RWF ${amount.toLocaleString()} donation in the payment window.`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <PageMeta title="Impact Stories" description="Stories of change, resilience, and empowerment from the women and communities HerRise works with in Uganda." />
      {/* Hero Section */}
      <div className="bg-purple-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Our Impact</h1>
          <p className="text-xl text-purple-100 max-w-3xl">
            Stories of change, resilience, and empowerment from the women we work with.
          </p>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-16 text-gray-500">Loading stories…</div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-red-600 mb-4">{error}</p>
            <button onClick={refetch} className="text-purple-600 underline">Try again</button>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <Link 
              to={`/stories/${story.id}`}
              key={story.id}
              className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 block"
            >
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img 
                  src={story.image} 
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x450?text=HerRise+Story';
                  }}
                />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap items-center text-sm text-gray-500 mb-3 gap-x-4">
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1.5 flex-shrink-0" />
                    <span>{story.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1.5 flex-shrink-0" />
                    <span>{story.readTime}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
                  {story.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{story.excerpt}</p>
                <div className="flex flex-wrap justify-between items-center mt-4">
                  <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mb-4 ${
            story.category === 'Economic Empowerment' ? 'bg-yellow-100 text-yellow-800' :
            story.category === 'Health Support' ? 'bg-blue-100 text-blue-800' :
            story.category === 'GBV Prevention' ? 'bg-red-100 text-red-800' :
            story.category === 'Education' ? 'bg-green-100 text-green-800' :
            'bg-purple-100 text-purple-800'
          }`}>
            {story.category}
          </span>
                  <span className="inline-flex items-center text-purple-600 font-medium group-hover:text-purple-800 transition-colors">
                    Read more
                    <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-purple-50 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Be Part of the Change</h2>
          <p className="text-xl text-gray-600 mb-8">
            Your support helps us create more success stories. Join us in empowering women and girls.
          </p>
          <button
            onClick={() => setIsDonationModalOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-full transition-colors"
          >
            Donate Now
          </button>
        </div>
      </div>

      {/* Donation Modal */}
      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        onDonate={handleDonate}
      />
    </div>
  );
};

export default ImpactStories;
