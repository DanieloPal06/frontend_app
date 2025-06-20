
"use client";

import { useState, useEffect } from 'react';
import { Navbar, Footer, DonationsSection } from '@/components/landing';
import { content } from '@/content/landing-page-content';
import type { Language } from '@/content/landing-page-content';

export default function DonationsPage() {
  const [language, setLanguage] = useState<Language>('en');
  const [currentContent, setCurrentContent] = useState(content.en);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setCurrentContent(content[language]);
    if (isMounted) {
      document.documentElement.lang = language;
      document.title = currentContent.donationsPage?.metaTitle || "Donations - PredictPal";
    }
  }, [language, isMounted, currentContent.donationsPage?.metaTitle]);

  // Scroll animations observer for elements within this page (if not handled by DonationsSection itself)
  useEffect(() => {
    if (!isMounted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-5');
          }
        });
      },
      { threshold: 0.1 } 
    );
    
    // Target the main section wrapper or specific elements if needed
    // DonationsSection already has internal animations, so this might be minimal
    const pageElements = document.querySelectorAll('#donations-page-container > section');
    pageElements.forEach((el) => {
      el.classList.add('opacity-0', 'translate-y-5', 'transition-all', 'duration-700', 'ease-out');
      observer.observe(el);
    });

    return () => {
      pageElements.forEach((el) => observer.unobserve(el));
    };
  }, [currentContent, isMounted]);

  if (!isMounted) {
    return (
      <div className="flex flex-col min-h-screen bg-background text-foreground items-center justify-center">
        <p>Loading Donations...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar
        language={language}
        setLanguage={setLanguage}
        navContent={currentContent.nav}
        commonContent={currentContent.common}
      />
      <main id="donations-page-container" className="flex-grow">
        <DonationsSection content={currentContent.donations} />
      </main>
      <Footer content={currentContent.footer} />
    </div>
  );
}

    