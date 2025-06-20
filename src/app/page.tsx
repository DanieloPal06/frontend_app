"use client";

import { useState, useEffect } from 'react';
import {
  Navbar,
  HeroSection,
  ProblemSection,
  SolutionSection,
  TargetAudienceSection,
  MilestonesSection,
  PricingSection,
  DonationsSection, // Imported DonationsSection
  Footer
} from '@/components/landing';
import { content } from '@/content/landing-page-content';
import type { Language } from '@/content/landing-page-content';

export default function LandingPage() {
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
    }
  }, [language, isMounted]);

  // Add scroll animations observer
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
      { threshold: 0.1 } // Adjust threshold as needed
    );

    const sections = document.querySelectorAll('section > div > div.animate-fadeInUp, section > div > h2.animate-fadeInUp, section > div > h3.animate-fadeInUp, section div.grid > div.animate-fadeInUp, section > div > p.animate-fadeInUp');
    sections.forEach((section) => {
      section.classList.add('opacity-0', 'translate-y-5', 'transition-all', 'duration-700', 'ease-out');
      observer.observe(section);
    });
    
    // Special handling for hero elements if needed
    const heroElements = document.querySelectorAll('#home h1, #home p, #home div.flex');
     heroElements.forEach((el) => {
      el.classList.add('opacity-0', 'translate-y-5', 'transition-all', 'duration-700', 'ease-out');
      observer.observe(el);
    });


    return () => {
      sections.forEach((section) => observer.unobserve(section));
      heroElements.forEach((el) => observer.unobserve(el));
    };
  }, [currentContent, isMounted]); // Rerun when content changes to apply to new elements

  if (!isMounted) {
    // Render a placeholder or null during server rendering and initial client mount to avoid hydration mismatch
    // This could be a simple loading spinner or a skeleton layout
    return (
      <div className="flex flex-col min-h-screen bg-background text-foreground items-center justify-center">
        <p>Loading PredictPal...</p>
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
      <main className="flex-grow">
        <HeroSection content={currentContent.hero} />
        <ProblemSection content={currentContent.problem} />
        <SolutionSection content={currentContent.solution} />
        <TargetAudienceSection content={currentContent.targetAudience} />
        <MilestonesSection content={currentContent.milestones} />
        <PricingSection content={currentContent.pricing} commonContent={currentContent.common} />
        <DonationsSection content={currentContent.donations} /> {/* Added DonationsSection */}
      </main>
      <Footer content={currentContent.footer} />
    </div>
  );
}
