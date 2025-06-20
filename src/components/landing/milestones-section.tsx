import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon, IconName } from "@/components/icons";
import { CheckCircle2 } from "lucide-react";

interface MilestoneSet {
  title: string;
  items: string[];
  icon: IconName;
}

interface MilestonesSectionProps {
  content: {
    title: string;
    achieved: MilestoneSet;
    vision: MilestoneSet;
  };
}

export default function MilestonesSection({ content }: MilestonesSectionProps) {
  const renderMilestoneSet = (set: MilestoneSet, delay: number) => (
    <Card className="shadow-lg animate-fadeInUp bg-card" style={{ animationDelay: `${delay}s` }}>
      <CardHeader className="flex flex-row items-center gap-4 pb-4">
         <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shrink-0">
            <Icon name={set.icon} className="h-5 w-5" />
          </div>
        <CardTitle className="font-headline text-xl text-foreground">{set.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {set.items.map((item, idx) => (
            <li key={idx} className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-1 shrink-0" />
              <span className="text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-headline text-3xl font-bold text-foreground sm:text-4xl md:text-5xl animate-fadeInUp">
            {content.title}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {renderMilestoneSet(content.achieved, 0.2)}
          {renderMilestoneSet(content.vision, 0.4)}
        </div>
      </div>
    </section>
  );
}
