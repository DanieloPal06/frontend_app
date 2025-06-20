
import Image from 'next/image';
import type { Match, MatchTeam } from '@/content/club-world-cup-content';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from '@/components/ui/separator';

interface MatchCardProps {
  match: Match;
  labels: {
    scheduled: string;
    live: string;
    finished: string;
    postponed: string;
    venue: string;
    time: string;
    vs: string;
  };
}

function TeamDisplay({ team, vsLabel }: { team: MatchTeam; vsLabel?: string }) {
  return (
    <div className="flex flex-col items-center text-center md:flex-row md:text-left gap-2">
      {team.logoUrl && (
        <Image
          src={team.logoUrl}
          alt={`${team.name} logo`}
          width={40}
          height={40}
          className="rounded-full object-contain"
          data-ai-hint="club logo"
        />
      )}
      <span className="font-semibold text-base md:text-lg group-hover:text-primary transition-colors">{team.name}</span>
      {typeof team.score === 'number' && (
        <span className="font-bold text-xl text-primary ml-auto md:ml-2">{team.score}</span>
      )}
    </div>
  );
}


export function MatchCard({ match, labels }: MatchCardProps) {
  const getStatusBadgeVariant = (status: Match['status']): React.ComponentProps<typeof Badge>['variant'] => {
    switch (status) {
      case 'SCHEDULED':
        return 'secondary';
      case 'LIVE':
        return 'default'; // Consider a specific 'live' variant if primary isn't green-ish
      case 'FINISHED':
        return 'outline';
      case 'POSTPONED':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getStatusLabel = (status: Match['status']): string => {
    switch (status) {
      case 'SCHEDULED': return labels.scheduled;
      case 'LIVE': return labels.live;
      case 'FINISHED': return labels.finished;
      case 'POSTPONED': return labels.postponed;
      default: return status;
    }
  }

  return (
    <Card className="w-full shadow-md hover:shadow-lg transition-shadow duration-300 group animate-fadeInUp">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {labels.time}: {match.time}
          </CardTitle>
          <Badge variant={getStatusBadgeVariant(match.status)} className="text-xs">
            {getStatusLabel(match.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 py-4">
          <div className="w-full md:w-2/5">
            <TeamDisplay team={match.team1} />
          </div>
          <div className="text-muted-foreground font-bold text-lg hidden md:block">
            {labels.vs}
          </div>
           <div className="w-full md:w-2/5 flex md:justify-end">
            <TeamDisplay team={match.team2} />
          </div>
        </div>
        <Separator className="my-3" />
        <CardDescription className="text-xs text-muted-foreground text-center md:text-right">
          {labels.venue}: {match.venue}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
