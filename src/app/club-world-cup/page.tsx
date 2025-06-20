
"use client";

import { useState, useEffect } from 'react';
import { Navbar, Footer } from '@/components/landing';
import { MatchSchedule } from '@/components/club-world-cup/match-schedule';
import { clubWorldCupContent } from '@/content/club-world-cup-content';
import { content as landingContent } from '@/content/landing-page-content';
import type { Language } from '@/content/landing-page-content';

export default function ClubWorldCupPage() {
  const [language, setLanguage] = useState<Language>('en');
  const [currentClubWorldCupContent, setCurrentClubWorldCupContent] = useState(clubWorldCupContent.en);
  const [currentLandingContent, setCurrentLandingContent] = useState(landingContent.en);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setCurrentClubWorldCupContent(clubWorldCupContent[language]);
    setCurrentLandingContent(landingContent[language]);
    if (isMounted) {
      document.documentElement.lang = language;
      document.title = currentClubWorldCupContent.metaTitle;
    }
  }, [language, isMounted, currentClubWorldCupContent.metaTitle]);

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

    const pageElements = document.querySelectorAll('#club-world-cup-container .animate-fadeInUp');
    pageElements.forEach((el) => {
      el.classList.add('opacity-0', 'translate-y-5', 'transition-all', 'duration-700', 'ease-out');
      observer.observe(el);
    });

    return () => {
      pageElements.forEach((el) => observer.unobserve(el));
    };
  }, [currentClubWorldCupContent, isMounted]);

  if (!isMounted) {
    return (
      <div className="flex flex-col min-h-screen bg-background text-foreground items-center justify-center">
        <p>Loading Club World Cup Schedule...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar
        language={language}
        setLanguage={setLanguage}
        navContent={currentLandingContent.nav}
        commonContent={currentLandingContent.common}
      />
      <main id="club-world-cup-container" className="flex-grow container mx-auto px-4 py-8 md:px-6 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 animate-fadeInUp text-primary">
          {currentClubWorldCupContent.pageTitle}
        </h1>
        <MatchSchedule content={currentClubWorldCupContent} />
      </main>
      <Footer content={currentLandingContent.footer} />
    </div>
  );
}
