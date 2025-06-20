interface ProblemSectionProps {
  content: {
    title: string;
    description: string;
  };
}

export default function ProblemSection({ content }: ProblemSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-headline text-3xl font-bold text-foreground sm:text-4xl md:text-5xl animate-fadeInUp">
            {content.title}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            {content.description}
          </p>
        </div>
      </div>
    </section>
  );
}
