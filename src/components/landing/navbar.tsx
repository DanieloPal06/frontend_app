"use client";

import type { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { Language } from '@/content/landing-page-content';
import { Icon } from '@/components/icons'; // Import the Icon component

interface NavbarProps {
  language: Language;
  setLanguage: Dispatch<SetStateAction<Language>>;
  navContent: {
    home: string;
    mundialDeClubes: string;
    academy: string;
    donations: string;
  };
  commonContent: {
    switchToSpanish: string;
    switchToEnglish: string;
    appName: string;
  };
}

export default function Navbar({ language, setLanguage, navContent, commonContent }: NavbarProps) {
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  const navItems = [
    { label: navContent.home, href: "#home" },
    { label: navContent.mundialDeClubes, href: "#" }, // Informational
    { label: navContent.academy, href: "#" }, // Informational
    { label: navContent.donations, href: "#" }, // Informational
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-headline text-2xl font-bold text-primary">
            {commonContent.appName}
          </span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="transition-colors hover:text-primary"
              onClick={(e) => { if (item.href === "#") e.preventDefault(); }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            aria-label={language === 'en' ? commonContent.switchToSpanish : commonContent.switchToEnglish}
            className="text-sm"
          >
            <Icon name="Languages" className="mr-2 h-4 w-4" />
            {language === 'en' ? commonContent.switchToSpanish.substring(0,2).toUpperCase() : commonContent.switchToEnglish.substring(0,2).toUpperCase()}
          </Button>
          {/* Add mobile menu toggle here if needed in future */}
        </div>
      </div>
    </header>
  );
}
