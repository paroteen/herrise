import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Home } from '@/pages/Home';
import { About } from '@/pages/About';
import { Programmes } from '@/pages/Programmes';
import { Partnerships } from '@/pages/Partnerships';
import { Projects } from '@/pages/Projects';
import { MonitoringEvaluation } from '@/pages/ME';
import { GetInvolved } from '@/pages/GetInvolved';
import { Contact } from '@/pages/Contact';
import ImpactStories from '@/pages/impact-stories';
import StoryDetail from '@/components/StoryDetail';
import { AdminStories, AdminLogin, ToastProvider } from '@/admin';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppLayout: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        {!isAdminRoute && <Navbar />}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/programmes" element={<Programmes />} />
            <Route path="/partnerships" element={<Partnerships />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/monitoring-evaluation" element={<MonitoringEvaluation />} />
            <Route path="/get-involved" element={<GetInvolved />} />
            <Route path="/impact-stories" element={<ImpactStories />} />
            <Route path="/stories/:id" element={<StoryDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<ToastProvider><AdminStories /></ToastProvider>} />
            <Route path="/admin/login" element={<AdminLogin />} />
          </Routes>
        </main>
        {!isAdminRoute && <Footer />}
      </div>
    </>
  );
};

const App: React.FC = () => (
  <BrowserRouter>
    <AppLayout />
  </BrowserRouter>
);

export default App;
