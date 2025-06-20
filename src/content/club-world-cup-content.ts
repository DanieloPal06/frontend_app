
import type { Language } from './landing-page-content';

export interface MatchTeam {
  name: string;
  logoUrl?: string;
  score?: number | null;
}

export interface Match {
  id: string;
  time: string;
  team1: MatchTeam;
  team2: MatchTeam;
  venue: string;
  status: 'SCHEDULED' | 'LIVE' | 'FINISHED' | 'POSTPONED';
}

export interface DaySchedule {
  dateISO: string;
  dayLabelKey: string;
  matches: Match[];
}

export interface ClubWorldCupPageContent {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  selectDayPrompt: string; // Potentially for a label above tabs if needed
  noMatchesMessage: string;
  matchCard: {
    scheduled: string;
    live: string;
    finished: string;
    postponed: string;
    venue: string;
    time: string;
    vs: string;
  };
  dayLabels: Record<string, string>;
  schedule: DaySchedule[];
}

export const clubWorldCupContent: Record<Language, ClubWorldCupPageContent> = {
  en: {
    metaTitle: "Club World Cup Matches | PredictPal",
    metaDescription: "Follow the Club World Cup matches, schedules, and results on PredictPal.",
    pageTitle: "Club World Cup 2025 Schedule",
    selectDayPrompt: "Select a day to view matches:",
    noMatchesMessage: "No matches scheduled for this day.",
    matchCard: {
      scheduled: "Scheduled",
      live: "Live",
      finished: "Finished",
      postponed: "Postponed",
      venue: "Venue",
      time: "Time",
      vs: "VS",
    },
    dayLabels: {
      day1: "June 15, 2025",
      day2: "June 16, 2025",
      day3: "June 17, 2025",
    },
    schedule: [
      {
        dateISO: "2025-06-15",
        dayLabelKey: "day1",
        matches: [
          { id: "m1", time: "17:00 UTC", team1: { name: "FC Zenith", logoUrl: "https://placehold.co/40x40.png", score: null }, team2: { name: "River Plate", logoUrl: "https://placehold.co/40x40.png", score: null }, venue: "Gazprom Arena, St. Petersburg", status: "SCHEDULED" },
          { id: "m2", time: "20:00 UTC", team1: { name: "Manchester City", logoUrl: "https://placehold.co/40x40.png", score: null }, team2: { name: "Al Ahly SC", logoUrl: "https://placehold.co/40x40.png", score: null }, venue: "City of Manchester Stadium, Manchester", status: "SCHEDULED" },
        ],
      },
      {
        dateISO: "2025-06-16",
        dayLabelKey: "day2",
        matches: [
          { id: "m3", time: "17:00 UTC", team1: { name: "Real Madrid", logoUrl: "https://placehold.co/40x40.png", score: 1 }, team2: { name: "Palmeiras", logoUrl: "https://placehold.co/40x40.png", score: 1 }, venue: "Santiago Bernabéu, Madrid", status: "LIVE" },
          { id: "m4", time: "20:00 UTC", team1: { name: "Bayern Munich", logoUrl: "https://placehold.co/40x40.png", score: 2 }, team2: { name: "Urawa Red Diamonds", logoUrl: "https://placehold.co/40x40.png", score: 0 }, venue: "Allianz Arena, Munich", status: "FINISHED" },
        ],
      },
      {
        dateISO: "2025-06-17",
        dayLabelKey: "day3",
        matches: [], 
      }
    ],
  },
  es: {
    metaTitle: "Partidos Mundial de Clubes | PredictPal",
    metaDescription: "Sigue los partidos, horarios y resultados del Mundial de Clubes en PredictPal.",
    pageTitle: "Calendario Mundial de Clubes 2025",
    selectDayPrompt: "Selecciona un día para ver los partidos:",
    noMatchesMessage: "No hay partidos programados para este día.",
    matchCard: {
      scheduled: "Programado",
      live: "En Vivo",
      finished: "Finalizado",
      postponed: "Pospuesto",
      venue: "Estadio",
      time: "Hora",
      vs: "VS",
    },
    dayLabels: {
      day1: "15 de Junio, 2025",
      day2: "16 de Junio, 2025",
      day3: "17 de Junio, 2025",
    },
    schedule: [
      {
        dateISO: "2025-06-15",
        dayLabelKey: "day1",
        matches: [
          { id: "m1", time: "17:00 UTC", team1: { name: "FC Zenith", logoUrl: "https://placehold.co/40x40.png", score: null }, team2: { name: "River Plate", logoUrl: "https://placehold.co/40x40.png", score: null }, venue: "Gazprom Arena, San Petersburgo", status: "SCHEDULED" },
          { id: "m2", time: "20:00 UTC", team1: { name: "Manchester City", logoUrl: "https://placehold.co/40x40.png", score: null }, team2: { name: "Al Ahly SC", logoUrl: "https://placehold.co/40x40.png", score: null }, venue: "City of Manchester Stadium, Manchester", status: "SCHEDULED" },
        ],
      },
      {
        dateISO: "2025-06-16",
        dayLabelKey: "day2",
        matches: [
          { id: "m3", time: "17:00 UTC", team1: { name: "Real Madrid", logoUrl: "https://placehold.co/40x40.png", score: 1 }, team2: { name: "Palmeiras", logoUrl: "https://placehold.co/40x40.png", score: 1 }, venue: "Santiago Bernabéu, Madrid", status: "LIVE" },
          { id: "m4", time: "20:00 UTC", team1: { name: "Bayern Munich", logoUrl: "https://placehold.co/40x40.png", score: 2 }, team2: { name: "Urawa Red Diamonds", logoUrl: "https://placehold.co/40x40.png", score: 0 }, venue: "Allianz Arena, Múnich", status: "FINISHED" },
        ],
      },
       {
        dateISO: "2025-06-17",
        dayLabelKey: "day3",
        matches: [],
      }
    ],
  },
};
