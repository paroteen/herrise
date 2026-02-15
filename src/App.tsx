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
import SheStories from '@/pages/SheStories';
import StoryDetail from '@/components/StoryDetail';
import { AdminStories, AdminSheStories, AdminLogin, ToastProvider } from '@/admin';

// #region agent log
const DEBUG_LOG = (location: string, message: string, data: Record<string, unknown>, hypothesisId: string) => {
  fetch('http://127.0.0.1:7243/ingest/15d72b18-4db9-409d-a404-3915799ed5f7', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location, message, data, timestamp: Date.now(), hypothesisId }) }).catch(() => {});
};
// #endregion

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
  // #region agent log
  DEBUG_LOG('App.tsx:AppLayout', 'AppLayout render', { pathname: location.pathname }, 'H2');
  // #endregion

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
            <Route path="/she-stories" element={<SheStories />} />
            <Route path="/stories/:id" element={<StoryDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<ToastProvider><AdminStories /></ToastProvider>} />
            <Route path="/admin/she-stories" element={<ToastProvider><AdminSheStories /></ToastProvider>} />
            <Route path="/admin/login" element={<AdminLogin />} />
          </Routes>
        </main>
        {!isAdminRoute && <Footer />}
      </div>
    </>
  );
};

const App: React.FC = () => {
  // #region agent log
  DEBUG_LOG('App.tsx:App', 'App component rendering', {}, 'H2');
  // #endregion
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
};

export default App;
