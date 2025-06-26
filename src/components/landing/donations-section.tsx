
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/icons";
import Link from 'next/link';
import { CheckCircle2 } from "lucide-react";

interface Donor {
  name: string;
  amount: string;
  message: string;
}

interface ListItem {
  title: string;
  description: string;
}

interface Callout {
  title: string;
  description: string;
}

interface DonationsSectionProps {
  content: {
    title: string;
    sectionId: string;
    introduction: string;
    listTitle: string;
    listItems: ListItem[];
    callout: Callout;
    conclusion: string;
    paypalButtonText: string;
    paypalButtonAriaLabel: string;
    thanksTitle: string;
    donors: Donor[];
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
          
          <div className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground md:text-xl animate-fadeInUp text-left space-y-6" style={{ animationDelay: '0.2s' }}>
            <p>{content.introduction}</p>
            
            <div>
              <p className="font-medium text-foreground">{content.listTitle}</p>
              <ul className="mt-4 space-y-4">
                {content.listItems.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" />
                    <div>
                      <strong className="font-semibold text-foreground">{item.title}:</strong>
                      <span className="text-muted-foreground"> {item.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-primary/10 border-l-4 border-primary rounded-r-lg">
              <strong className="font-semibold text-primary">{content.callout.title}</strong>
              <p className="mt-1 text-muted-foreground">{content.callout.description}</p>
            </div>
            
            <p>{content.conclusion}</p>
          </div>
        </div>

        <div className="flex justify-center mb-12 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          <Button size="lg" className="font-semibold" aria-label={content.paypalButtonAriaLabel} asChild>
            <Link href="https://www.paypal.me/danielsant" target="_blank" rel="noopener noreferrer">
              <Icon name="Heart" className="mr-2 h-5 w-5" />
              {content.paypalButtonText}
            </Link>
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
