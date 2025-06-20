import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  content: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
}

export default function HeroSection({ content }: HeroSectionProps) {
  return (
    <section id="home" className="w-full py-20 md:py-32 lg:py-40 bg-gradient-to-br from-background to-secondary">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-foreground animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            {content.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl md:text-2xl animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            {content.subtitle}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-y-4 sm:flex-row sm:gap-x-6 sm:gap-y-0 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <Button size="lg" className="font-semibold w-full sm:w-auto">
              {content.ctaPrimary}
            </Button>
            <Button variant="outline" size="lg" className="font-semibold w-full sm:w-auto">
              {content.ctaSecondary}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
