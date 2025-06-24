
"use client";

import { useState, useEffect, useRef } from 'react';
import type { ClubWorldCupPageContent } from '@/content/club-world-cup-content';
import { MatchCard } from './match-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface MatchScheduleProps {
  content: ClubWorldCupPageContent;
}

export function MatchSchedule({ content }: MatchScheduleProps) {
  const [activeDayISO, setActiveDayISO] = useState<string | undefined>(undefined);
  const [isMounted, setIsMounted] = useState(false);
  const tabsListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    if (content.schedule.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayISO = today.toISOString().split('T')[0];

      const scheduleDates = content.schedule.map(d => d.dateISO);
      const firstDateISO = scheduleDates[0];
      const lastDateISO = scheduleDates[scheduleDates.length - 1];

      // Check if today is a match day
      const isTodayMatchDay = scheduleDates.includes(todayISO);
      if (isTodayMatchDay) {
        setActiveDayISO(todayISO);
        return;
      }
      
      // Check if tournament is over
      if (todayISO > lastDateISO) {
        setActiveDayISO(lastDateISO);
        return;
      }

      // Default to the first upcoming match day or the first day of the tournament
      const nextAvailableDay = scheduleDates.find(date => date >= todayISO);
      setActiveDayISO(nextAvailableDay || firstDateISO);
    }
  }, [content.schedule]);

  useEffect(() => {
    // This effect scrolls the active tab into view when it changes.
    if (tabsListRef.current && activeDayISO) {
      const activeTabNode = tabsListRef.current.querySelector<HTMLButtonElement>(`[data-value="${activeDayISO}"]`);
      if (activeTabNode) {
          activeTabNode.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest',
              inline: 'center',
          });
      }
    }
  }, [activeDayISO]);


  if (!isMounted || !activeDayISO) {
    return (
      <div className="text-center py-10 animate-fadeInUp">
        <p className="text-muted-foreground">{content.noMatchesMessage || "Loading schedule..."}</p>
      </div>
    );
  }
  
  const handleTabChange = (value: string) => {
    setActiveDayISO(value);
  };

  return (
    <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
      <Tabs value={activeDayISO} onValueChange={handleTabChange} className="w-full">
        <ScrollArea className="w-full whitespace-nowrap rounded-lg mb-6">
          <TabsList ref={tabsListRef} className="inline-flex h-auto items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
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
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

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
