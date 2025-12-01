import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Programmes } from './pages/Programmes';
import { Partnerships } from './pages/Partnerships';
import { Projects } from './pages/Projects';
import { MonitoringEvaluation } from './pages/ME';
import { GetInvolved } from './pages/GetInvolved';
import { Contact } from './pages/Contact';

// Scroll to top wrapper
const ScrollToTop = () => {
    const { pathname } = useLocation();
    
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    
    return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/programmes" element={<Programmes />} />
            <Route path="/partnerships" element={<Partnerships />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/monitoring-evaluation" element={<MonitoringEvaluation />} />
            <Route path="/get-involved" element={<GetInvolved />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;