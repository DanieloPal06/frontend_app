import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon, IconName } from "@/components/icons";

interface Profile {
  name: string;
  description: string;
  icon: IconName; 
}

interface TargetAudienceSectionProps {
  content: {
    title: string;
    profiles: Profile[];
  };
}

export default function TargetAudienceSection({ content }: TargetAudienceSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-headline text-3xl font-bold text-foreground sm:text-4xl md:text-5xl animate-fadeInUp">
            {content.title}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {content.profiles.map((profile, index) => (
            <Card key={profile.name} className="text-left shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fadeInUp" style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground shrink-0">
                  <Icon name={profile.icon} className="h-5 w-5" />
                </div>
                <CardTitle className="font-headline text-xl text-foreground">{profile.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{profile.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
