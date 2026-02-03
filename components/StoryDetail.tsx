import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, User } from 'lucide-react';

interface Story {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  location: string;
  category: string;
  content: string;
  author: string;
  authorRole: string;
}

// This would typically come from an API
const storyData: Story[] = [
  {
    id: 1,
    title: "Empowering Women Through Tech Education",
    excerpt: "How our coding bootcamp changed the lives of 50 young women in Kabare",
    content: `In the heart of Kabare, 50 young women are breaking barriers through technology. Our 12-week intensive coding bootcamp provided them with essential digital skills, from web development to mobile app creation. Many of these women had never used a computer before, but through dedication and hard work, they've built their first websites and mobile applications.\n\nOne of our success stories is Sarah, a 22-year-old from the outskirts of Kabare, who developed a mobile app connecting local farmers to markets. "This program changed my life," Sarah says. "I can now support my family and inspire other girls in my community."\n\nThe bootcamp not only taught technical skills but also included modules on entrepreneurship, financial literacy, and leadership. Graduates have gone on to secure jobs in tech companies or start their own businesses, contributing to Uganda's growing digital economy.`,
    image: "/images/story1.jpg",
    date: "15 Jan 2024",
    readTime: "5 min read",
    location: "Kabare, Uganda",
    category: "Education",
    author: "Jane Nalwoga",
    authorRole: "Program Director"
  },
  {
    id: 2,
    title: "Breaking Barriers in Rural Communities",
    excerpt: "Our initiative to bring digital literacy to remote areas of Uganda",
    content: `In the rural regions of Kabare, access to technology and digital education remains a significant challenge. Our mobile digital literacy program is changing that, one village at a time. We've equipped over 200 women with tablets and trained them in basic digital skills, internet usage, and online safety.\n\nOne participant, Grace, a mother of four from Kabare, shared how the program transformed her life: "I can now video call my family members in the city, and I've even started a small online business selling handmade crafts."\n\nOur program focuses on practical, income-generating skills that empower women to improve their livelihoods while bridging the digital divide in Uganda's most underserved communities.`,
    image: "/images/story2.jpg",
    date: "22 Feb 2024",
    readTime: "4 min read",
    location: "Kabare, Uganda",
    category: "Community",
    author: "David Ocen",
    authorRole: "Field Coordinator"
  },
  {
    id: 3,
    title: "Mentorship Program Success Stories",
    excerpt: "How our mentorship program is creating the next generation of female leaders",
    content: `Our mentorship program pairs young women with established professionals in their fields of interest, creating powerful connections that inspire and guide the next generation of Ugandan women leaders. Based in Kampala, we've matched 75 mentor-mentee pairs across various industries.\n\nOne remarkable success story is that of Amina, a 19-year-old aspiring engineer from Kampala. Through our program, she was paired with a senior engineer at a leading tech company. "My mentor has not only guided me technically but also helped me build confidence in a male-dominated field," Amina shares.\n\nThese mentorship relationships are breaking down barriers and creating a strong network of professional women supporting each other's growth and success in Uganda's workforce.`,
    image: "/images/story3.jpg",
    date: "10 Mar 2024",
    readTime: "6 min read",
    location: "Kampala, Uganda",
    category: "Leadership",
    author: "Sarah Kintu",
    authorRole: "Mentorship Coordinator"
  }
];

const StoryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const story = storyData.find(story => story.id === Number(id));
  
  // If no ID or story found, redirect to stories list
  React.useEffect(() => {
    if (!id || !story) {
      navigate('/impact-stories');
    }
  }, [id, story, navigate]);
  
  if (!story) {
    return null; // Or a loading/error component
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Story Not Found</h2>
            <p className="text-gray-600 mb-6">The story you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => navigate('/impact-stories')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Stories
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <button
            onClick={() => navigate('/impact-stories')}
            className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Stories
          </button>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <span className="inline-block px-3 py-1 text-sm font-semibold text-purple-800 bg-purple-100 rounded-full mb-4">
            {story.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {story.title}
          </h1>
          
          <div className="flex items-center text-sm text-gray-500 space-x-4 mb-6">
            <div className="flex items-center">
              <Calendar className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
              <span>{story.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
              <span>{story.readTime}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
              <span>{story.location}</span>
            </div>
          </div>

          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden mb-8">
            <img 
              src={story.image} 
              alt={story.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x450?text=HerRise+Story';
              }}
            />
          </div>
        </header>

        <div className="prose prose-purple prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">{story.excerpt}</p>
          
          {story.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-700">
              {paragraph}
            </p>
          ))}
        </div>

        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xl mr-4">
              {story.author.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <p className="font-medium text-gray-900">{story.author}</p>
              <p className="text-sm text-gray-500">{story.authorRole}</p>
            </div>
          </div>
        </footer>
      </article>

      {/* CTA Section */}
      <div className="bg-purple-50 py-16 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Inspired by our work?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Your support helps us create more success stories. Join us in empowering women and girls across Uganda.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Make a Donation
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryDetail;
