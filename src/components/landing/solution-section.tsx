import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon, IconName } from "@/components/icons";

interface Feature {
  title: string;
  description: string;
  icon: IconName;
}

interface SolutionSectionProps {
  content: {
    title: string;
    description: string;
    features: Feature[];
  };
}

export default function SolutionSection({ content }: SolutionSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-headline text-3xl font-bold text-foreground sm:text-4xl md:text-5xl animate-fadeInUp">
            {content.title}
          </h2>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground md:text-xl animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            {content.description}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {content.features.map((feature, index) => (
            <Card key={feature.title} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fadeInUp bg-background" style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                  <Icon name={feature.icon} className="h-6 w-6" />
                </div>
                <CardTitle className="font-headline text-xl text-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
