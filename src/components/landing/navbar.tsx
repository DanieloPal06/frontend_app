
"use client";

import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { Language } from '@/content/landing-page-content';
import { Icon } from '@/components/icons'; 

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  const navItems = [
    { label: navContent.home, href: "/#home" },
    { label: navContent.mundialDeClubes, href: "/club-world-cup" }, // Updated href
    { label: navContent.academy, href: "/#academy" },
    { label: navContent.donations, href: "/donations" },
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
              onClick={(e) => { 
                if (item.href.startsWith("/#") && item.href !== "/#") {
                  if (window.location.pathname === '/') {
                    const elementId = item.href.substring(2); 
                    const element = document.getElementById(elementId);
                    if (element) {
                      e.preventDefault();
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                } else if (item.href === "#" || item.href === "/#") {
                    e.preventDefault(); 
                }
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            aria-label={language === 'en' ? commonContent.switchToSpanish : commonContent.switchToEnglish}
            className="hidden md:inline-flex text-sm" 
          >
            <Icon name="Languages" className="mr-2 h-4 w-4" />
            {language === 'en' ? commonContent.switchToSpanish.substring(0,2).toUpperCase() : commonContent.switchToEnglish.substring(0,2).toUpperCase()}
          </Button>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <Icon name="X" className="h-5 w-5" /> : <Icon name="Menu" className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 z-40 md:hidden bg-background border-b border-border/40 shadow-lg">
          <nav className="flex flex-col items-stretch divide-y divide-border/40">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block w-full text-center py-3 px-4 transition-colors hover:text-primary hover:bg-muted"
                onClick={(e) => {
                  if (item.href.startsWith("/#") && item.href !== "/#") {
                     if (window.location.pathname === '/') {
                        const elementId = item.href.substring(2);
                        const element = document.getElementById(elementId);
                        if (element) {
                          e.preventDefault();
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                     }
                  } else if (item.href === "#" || item.href === "/#") {
                      e.preventDefault();
                  }
                  setMobileMenuOpen(false); 
                }}
              >
                {item.label}
              </Link>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                toggleLanguage();
                setMobileMenuOpen(false);
              }}
              aria-label={language === 'en' ? commonContent.switchToSpanish : commonContent.switchToEnglish}
              className="flex items-center justify-center w-full py-3 px-4 text-sm hover:text-primary hover:bg-muted rounded-none"
            >
              <Icon name="Languages" className="mr-2 h-4 w-4" />
              {language === 'en' ? commonContent.switchToSpanish : commonContent.switchToEnglish}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
