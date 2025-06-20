
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/icons";

interface Donor {
  name: string;
  amount: string;
  message: string;
}

interface DonationsSectionProps {
  content: {
    title: string;
    description: string;
    paypalButtonText: string;
    paypalButtonAriaLabel: string;
    thanksTitle: string;
    donors: Donor[];
    sectionId: string; // Kept for potential use as element ID
  };
}

export default function DonationsSection({ content }: DonationsSectionProps) {
  return (
    <section id={content.sectionId || "donations"} className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-headline text-3xl font-bold text-foreground sm:text-4xl md:text-5xl animate-fadeInUp">
            {content.title}
          </h2>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground md:text-xl animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            {content.description}
          </p>
        </div>

        <div className="flex justify-center mb-12 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          {/* Placeholder for PayPal Button - User will add actual button here */}
          <Button size="lg" className="font-semibold" aria-label={content.paypalButtonAriaLabel}>
            <Icon name="Heart" className="mr-2 h-5 w-5" />
            {content.paypalButtonText}
          </Button>
        </div>
        
        <div className="text-center mb-8 md:mb-12 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
            <h3 className="font-headline text-2xl font-bold text-foreground sm:text-3xl">
                {content.thanksTitle}
            </h3>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.donors.map((donor, index) => (
            <Card key={index} className="flex flex-col text-left shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fadeInUp bg-card" style={{ animationDelay: `${0.6 + index * 0.1}s` }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold text-foreground">{donor.name}</CardTitle>
                <p className="text-sm font-medium text-primary">{donor.amount}</p>
              </CardHeader>
              <CardContent className="flex-grow pt-0">
                <p className="text-base text-muted-foreground italic">"{donor.message}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

    