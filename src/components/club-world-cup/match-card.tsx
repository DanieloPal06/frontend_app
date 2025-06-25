
import Image from 'next/image';
import type { Match } from '@/content/club-world-cup-content';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
  dialogLabels: {
    title: string;
    statsTitle: string;
    predictionTitle: string;
    closeButton: string;
    noDetails: string;
    predictionColumn: string;
    outcomeColumn: string;
    oddsColumn: string;
    bookmakerColumn: string;
  };
}

function TeamDisplay({ team, vsLabel }: { team: NonNullable<Match['team1']>; vsLabel?: string }) {
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

export function MatchCard({ match, labels, dialogLabels }: MatchCardProps) {
  const getStatusBadgeVariant = (status: Match['status']): React.ComponentProps<typeof Badge>['variant'] => {
    switch (status) {
      case 'SCHEDULED':
        return 'secondary';
      case 'LIVE':
        return 'default';
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

  const renderDialogContent = () => {
    if (!match.details) {
      return (
        <>
          <DialogHeader>
            <DialogTitle>{dialogLabels.title}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-muted-foreground">{dialogLabels.noDetails}</p>
          </div>
        </>
      );
    }

    const { stats, prediction } = match.details;

    return (
      <>
        <DialogHeader>
          <DialogTitle>{dialogLabels.title}</DialogTitle>
          <DialogDescription className="text-center sm:text-left pt-1">
            {match.team1.name} vs {match.team2.name}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">{stats.title}</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              {stats.content.map((stat, index) => (
                <li key={index}>{stat}</li>
              ))}
            </ul>
          </div>
          <Separator />
          <div>
            <h3 className="text-lg font-semibold mb-2">{prediction.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{prediction.analysis}</p>
            {prediction.keyPredictions && prediction.keyPredictions.length > 0 && (
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="pl-0">{dialogLabels.predictionColumn}</TableHead>
                            <TableHead>{dialogLabels.outcomeColumn}</TableHead>
                            <TableHead className="text-center">{dialogLabels.oddsColumn}</TableHead>
                            <TableHead className="text-right pr-0">{dialogLabels.bookmakerColumn}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {prediction.keyPredictions.map((pred, index) => (
                            <TableRow key={index} className="hover:bg-muted/50">
                                <TableCell className="font-medium text-secondary-foreground pl-0">{pred.label}</TableCell>
                                <TableCell>{pred.value}</TableCell>
                                <TableCell className="text-center font-semibold text-primary">{pred.odds}</TableCell>
                                <TableCell className="flex justify-end pr-0">
                                    {pred.bookmakerLogoUrl && (
                                        <Image
                                            src={pred.bookmakerLogoUrl}
                                            alt={`${pred.bookmakerName} logo`}
                                            width={80}
                                            height={20}
                                            className="object-contain"
                                            data-ai-hint="bookmaker logo"
                                        />
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
          </div>
        </div>
      </>
    );
  };


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="w-full shadow-md hover:shadow-lg transition-shadow duration-300 group animate-fadeInUp cursor-pointer">
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
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        {renderDialogContent()}
        <DialogFooter>
            <Button type="button" variant="secondary" asChild>
               <DialogTrigger>{dialogLabels.closeButton}</DialogTrigger>
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
