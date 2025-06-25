import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon, IconName } from "@/components/icons";

interface Plan {
  name: string;
  description: string;
  icon: IconName;
}

interface PricingSectionProps {
  content: {
    title: string;
    plans: Plan[];
  };
  commonContent: {
    learnMore: string;
  }
}

export default function PricingSection({ content, commonContent }: PricingSectionProps) {
  return (
    <section id="academy" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-headline text-3xl font-bold text-foreground sm:text-4xl md:text-5xl animate-fadeInUp">
            {content.title}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {content.plans.map((plan, index) => (
            <Card key={plan.name} className="flex flex-col text-center shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fadeInUp" style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
              <CardHeader className="pb-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground mb-4">
                  <Icon name={plan.icon} className="h-6 w-6" />
                </div>
                <CardTitle className="font-headline text-xl text-foreground">{plan.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-muted-foreground">{plan.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
