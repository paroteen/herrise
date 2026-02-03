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
  author: string;
  authorRole: string;
  content: string;
}

const ImpactStories: React.FC = () => {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  
  // Sample data - in a real app, this would come from an API
  const stories: Story[] = [
    {
      id: 1,
      title: "Empowering Women Through Tech Education",
      excerpt: "How our coding bootcamp changed the lives of 50 young women in Kampala",
      content: `In the heart of Kampala, 50 young women are breaking barriers through technology. Our 12-week intensive coding bootcamp provided them with essential digital skills, from web development to mobile app creation. Many of these women had never used a computer before, but through dedication and hard work, they've built their first websites and mobile applications.\n\nOne of our success stories is Sarah, a 22-year-old from the outskirts of Kampala, who developed a mobile app connecting local farmers to markets. "This program changed my life," Sarah says. "I can now support my family and inspire other girls in my community."\n\nThe bootcamp not only taught technical skills but also included modules on entrepreneurship, financial literacy, and leadership. Graduates have gone on to secure jobs in tech companies or start their own businesses, contributing to Uganda's growing digital economy.`,
      image: "/images/story1.jpg",
      date: "15 Jan 2024",
      readTime: "5 min read",
      location: "Kampala, Uganda",
      category: "Education",
      author: "Jane Nalwoga",
      authorRole: "Program Director"
    },
    {
      id: 2,
      title: "Breaking Barriers in Rural Communities",
      excerpt: "Our initiative to bring digital literacy to remote areas of Uganda",
      content: `In the rural regions of Northern Uganda, access to technology and digital education remains a significant challenge. Our mobile digital literacy program is changing that, one village at a time. We've equipped over 200 women with tablets and trained them in basic digital skills, internet usage, and online safety.\n\nOne participant, Grace, a mother of four from Gulu, shared how the program transformed her life: "I can now video call my children who are studying in the city, and I've even started a small online business selling handmade crafts."\n\nOur program focuses on practical, income-generating skills that empower women to improve their livelihoods while bridging the digital divide in Uganda's most underserved communities.`,
      image: "/images/story2.jpg",
      date: "22 Feb 2024",
      readTime: "4 min read",
      location: "Gulu, Uganda",
      category: "Community",
      author: "David Ocen",
      authorRole: "Field Coordinator"
    },
    {
      id: 3,
      title: "Mentorship Program Success Stories",
      excerpt: "How our mentorship program is creating the next generation of female leaders",
      content: `Our mentorship program pairs young women with established professionals in their fields of interest, creating powerful connections that inspire and guide the next generation of Ugandan women leaders. Over the past year, we've matched 75 mentor-mentee pairs across various industries.\n\nOne remarkable success story is that of Amina, a 19-year-old aspiring engineer from Jinja. Through our program, she was paired with a senior engineer at a leading tech company in Kampala. "My mentor has not only guided me technically but also helped me build confidence in a male-dominated field," Amina shares.\n\nThese mentorship relationships are breaking down barriers and creating a strong network of professional women supporting each other's growth and success in Uganda's workforce.`,
      image: "/images/story3.jpg",
      date: "10 Mar 2024",
      readTime: "6 min read",
      location: "Jinja, Uganda",
      category: "Leadership",
      author: "Sarah Kintu",
      authorRole: "Mentorship Coordinator"
    },
  ];

  const handleDonate = (amount: number, paymentMethod: string, email: string, name: string) => {
    console.log(`Donation of RWF ${amount} from ${name} (${email}) via ${paymentMethod}`);
    // Here you would typically integrate with your payment processor
    // For now, we'll just log the donation and close the modal
    setIsDonationModalOpen(false);
    
    // Show a success message or redirect to a thank you page
    alert(`Thank you for your donation of RWF ${amount.toLocaleString()}!`);
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
            <Link 
              to={`#/stories/${story.id}`}
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
                  <div className="flex items-center text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                    <MapPin size={14} className="mr-1.5 flex-shrink-0" />
                    <span>{story.location}</span>
                  </div>
                  <span className="inline-flex items-center text-purple-600 font-medium group-hover:text-purple-800 transition-colors">
                    Read more
                    <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
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
