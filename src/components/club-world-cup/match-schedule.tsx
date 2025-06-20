
"use client";

import { useState, useEffect } from 'react';
import type { ClubWorldCupPageContent, DaySchedule } from '@/content/club-world-cup-content';
import { MatchCard } from './match-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from '@/components/ui/card';

interface MatchScheduleProps {
  content: ClubWorldCupPageContent;
}

export function MatchSchedule({ content }: MatchScheduleProps) {
  const [activeDayISO, setActiveDayISO] = useState<string | undefined>(undefined);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (content.schedule.length > 0) {
      setActiveDayISO(content.schedule[0].dateISO);
    }
  }, [content.schedule]);

  if (!isMounted || content.schedule.length === 0) {
    return (
      <div className="text-center py-10 animate-fadeInUp">
        <p className="text-muted-foreground">{content.noMatchesMessage}</p>
      </div>
    );
  }
  
  const handleTabChange = (value: string) => {
    setActiveDayISO(value);
  };

  return (
    <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
      <Tabs defaultValue={activeDayISO} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-6 bg-muted p-1 rounded-lg">
          {content.schedule.map((day) => (
            <TabsTrigger
              key={day.dateISO}
              value={day.dateISO}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
            >
              {content.dayLabels[day.dayLabelKey] || day.dateISO}
            </TabsTrigger>
          ))}
        </TabsList>

        {content.schedule.map((day) => (
          <TabsContent key={day.dateISO} value={day.dateISO}>
            {day.matches.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {day.matches.map((match, matchIndex) => (
                  <div key={match.id} style={{ animationDelay: `${0.1 + matchIndex * 0.05}s` }}>
                    <MatchCard match={match} labels={content.matchCard} />
                  </div>
                ))}
              </div>
            ) : (
              <Card className="animate-fadeInUp">
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">{content.noMatchesMessage}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
