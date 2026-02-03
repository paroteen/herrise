import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, MapPin } from 'lucide-react';
import DonationModal from '../components/DonationModal';

interface Story {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  location: string;
  category: string;
}

const ImpactStories: React.FC = () => {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  
  // Sample data - in a real app, this would come from an API
  const stories: Story[] = [
    {
      id: 1,
      title: "Empowering Women Through Tech Education",
      excerpt: "How our coding bootcamp changed the lives of 50 young women in Kigali",
      image: "/images/story1.jpg",
      date: "15 Jan 2024",
      readTime: "5 min read",
      location: "Kigali, Rwanda",
      category: "Education"
    },
    {
      id: 2,
      title: "Breaking Barriers in Rural Communities",
      excerpt: "Our initiative to bring digital literacy to remote areas of Rwanda",
      image: "/images/story2.jpg",
      date: "22 Feb 2024",
      readTime: "4 min read",
      location: "Northern Province, Rwanda",
      category: "Community"
    },
    {
      id: 3,
      title: "Mentorship Program Success Stories",
      excerpt: "How our mentorship program is creating the next generation of female leaders",
      image: "/images/story3.jpg",
      date: "10 Mar 2024",
      readTime: "6 min read",
      location: "Kigali, Rwanda",
      category: "Leadership"
    },
  ];

  const handleDonate = (amount: number, paymentMethod: string, email: string) => {
    console.log(`Donation: ${amount} RWF via ${paymentMethod}`);
    // Here you would typically integrate with your payment processor
    // For now, we'll just close the modal and log the details
    setIsDonationModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div key={story.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img 
                  src={story.image} 
                  alt={story.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback image if the main image fails to load
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=HerRise+Story';
                  }}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <div className="flex items-center mr-4">
                    <Calendar size={14} className="mr-1" />
                    <span>{story.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    <span>{story.readTime}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{story.title}</h3>
                <p className="text-gray-600 mb-4">{story.excerpt}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin size={14} className="mr-1" />
                    <span>{story.location}</span>
                  </div>
                  <Link 
                    to={`/stories/${story.id}`}
                    className="inline-flex items-center text-purple-700 hover:text-purple-900 font-medium"
                  >
                    Read more <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
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
