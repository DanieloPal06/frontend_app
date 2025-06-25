"use client";

import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { Language } from '@/content/landing-page-content';
import { Icon } from '@/components/icons'; 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    appName: string;
    changeLanguage: string;
    languageMenu: {
        english: string;
        spanish: string;
    }
  };
}

export default function Navbar({ language, setLanguage, navContent, commonContent }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  const navItems = [
    { label: navContent.home, href: "/#home" },
    { label: navContent.mundialDeClubes, href: "/club-world-cup" },
    { label: navContent.academy, href: "/#academy" },
    { label: navContent.donations, href: "/donations" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 w-full items-center justify-between px-4 md:px-8">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          {/* Logo SVG */}
                    <img src="PredictPal.png" alt={commonContent.appName} className="h-8 w-auto" />
          
          <h1 className="font-headline text-2xl font-bold">
            <span className="text-accent">Predict</span><span className="text-primary">Pal</span>
          </h1>
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label={commonContent.changeLanguage}
                className="hidden md:inline-flex"
              >
                <Icon name="Languages" className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => handleLanguageChange('en')}>
                {commonContent.languageMenu.english}
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleLanguageChange('es')}>
                {commonContent.languageMenu.spanish}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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
            
            <button
              onClick={() => {
                handleLanguageChange('en');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-center py-3 px-4 transition-colors hover:text-primary hover:bg-muted ${language === 'en' ? 'font-semibold text-primary' : ''}`}
            >
              {commonContent.languageMenu.english}
            </button>
            <button
              onClick={() => {
                handleLanguageChange('es');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-center py-3 px-4 transition-colors hover:text-primary hover:bg-muted ${language === 'es' ? 'font-semibold text-primary' : ''}`}
            >
              {commonContent.languageMenu.spanish}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
