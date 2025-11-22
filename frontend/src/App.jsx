// src/App.jsx (نسخه شخصی و اصلاح شده)

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // 👈 روتر باید باشد
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import './i18n';
import ResumeTemplate from './components/ResumeTemplate';
import { personalData } from './data/personalData';
// کامپوننت‌های ثابت
import Header from './components/Header';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';
import SeoHead from './components/SeoHead';

// لود تنبل
const Hero = lazy(() => import('./components/Hero'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const About = lazy(() => import('./components/About'));
const ContactForm = lazy(() => import('./components/ContactForm'));
const CodeShowcase = lazy(() => import('./components/CodeShowcase'));

// لودینگ ساده
const LoadingSpinner = () => (
  <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#0077B6', fontWeight: 'bold' }}>
    Loading...
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        {/* 👇 روتر را اینجا نگه می‌داریم تا هدر ارور ندهد */}
        <Router>
          <div className="portfolio-app">
            <ResumeTemplate memberData={personalData} />
            <SeoHead
              title="حامد مرادی | توسعه‌دهنده فول‌استک"
              description="پورتفولیوی شخصی حامد مرادی - توسعه دهنده Django و React"
            />

            <AnimatedBackground />
            <Header />

            <main className="main-content">
              <Suspense fallback={<LoadingSpinner />}>
                <Hero />
                <Skills />
                <CodeShowcase /> {/* 👈 اضافه کردن بخش جدید */}
                <Projects />
                <About />
                <ContactForm />
              </Suspense>
            </main>

            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;