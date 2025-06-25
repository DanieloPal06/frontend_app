/**
 * @fileoverview This file contains the normalized data structure for the Club World Cup 2025.
 * It separates team information from match schedules for better data management and scalability.
 * A utility function then composes the final data structure needed by the application.
 */

// A simple type for language selection.
export type Language = 'en' | 'es';

// =================================================================
// 1. NORMALIZED TEAM DATA (Source of Truth)
// =================================================================

/**
 * Defines the structure for a single team's data.
 */
export interface Team {
  id: string; // The unique identifier, e.g., 'RMA'
  group: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
  name: {
    en: string; // English name
    es: string; // Spanish name
  };
  logoUrl: string; // Path to the team logo
}

/**
 * A dictionary of all participating teams, indexed by their ID.
 * This is the single source of truth for all team data.
 */
export const teams: Record<string, Team> = {
  // Group A
  PAL: { id: 'PAL', group: 'A', name: { en: 'Palmeiras', es: 'Palmeiras' }, logoUrl: ''},
  MIA: { id: 'MIA', group: 'A', name: { en: 'Inter Miami', es: 'Inter Miami' }, logoUrl: '' },
  POR: { id: 'POR', group: 'A', name: { en: 'FC Porto', es: 'FC Porto' }, logoUrl: '' },
  ALA: { id: 'ALA', group: 'A', name: { en: 'Al Ahly', es: 'Al Ahly' }, logoUrl: '' },
  
  // Group B
  PSG: { id: 'PSG', group: 'B', name: { en: 'Paris Saint-Germain', es: 'Paris Saint-Germain' }, logoUrl: '' },
  BOT: { id: 'BOT', group: 'B', name: { en: 'Botafogo', es: 'Botafogo' }, logoUrl: '' },
  SEA: { id: 'SEA', group: 'B', name: { en: 'Seattle Sounders', es: 'Seattle Sounders' }, logoUrl: '' },
  ATM: { id: 'ATM', group: 'B', name: { en: 'Atlético de Madrid', es: 'Atlético de Madrid' }, logoUrl: '' },
  
  // Group C
  BAY: { id: 'BAY', group: 'C', name: { en: 'Bayern Munich', es: 'Bayern Múnich' }, logoUrl: '' },
  BEN: { id: 'BEN', group: 'C', name: { en: 'Benfica', es: 'Benfica' }, logoUrl: '' },
  AUC: { id: 'AUC', group: 'C', name: { en: 'Auckland City', es: 'Auckland City' }, logoUrl: '' },
  BOC: { id: 'BOC', group: 'C', name: { en: 'Boca Juniors', es: 'Boca Juniors' }, logoUrl: '' },

  // Group D
  FLA: { id: 'FLA', group: 'D', name: { en: 'Flamengo', es: 'Flamengo' }, logoUrl: '' },
  CHE: { id: 'CHE', group: 'D', name: { en: 'Chelsea', es: 'Chelsea' }, logoUrl: '' },
  EST: { id: 'EST', group: 'D', name: { en: 'Espérance de Tunis', es: 'Espérance de Tunis' }, logoUrl: '' },
  LAF: { id: 'LAF', group: 'D', name: { en: 'Los Angeles FC', es: 'Los Angeles FC' }, logoUrl: '' },

  // Group E
  INT: { id: 'INT', group: 'E', name: { en: 'Inter Milan', es: 'Inter de Milán' }, logoUrl: '' },
  RIV: { id: 'RIV', group: 'E', name: { en: 'River Plate', es: 'River Plate' }, logoUrl: '' },
  MON: { id: 'MON', group: 'E', name: { en: 'Monterrey', es: 'Monterrey' }, logoUrl: '' },
  URA: { id: 'URA', group: 'E', name: { en: 'Urawa Red Diamonds', es: 'Urawa Red Diamonds' }, logoUrl: '' },
  // Group F
  ULS: { id: 'ULS', group: 'F', name: { en: 'Ulsan Hyundai', es: 'Ulsan Hyundai' }, logoUrl: '' },
  BVB: { id: 'BVB', group: 'F', name: { en: 'Borussia Dortmund', es: 'Borussia Dortmund' }, logoUrl: '' },
  FLU: { id: 'FLU', group: 'F', name: { en: 'Fluminense', es: 'Fluminense' }, logoUrl: '' },
  MAM: { id: 'MAM', group: 'F', name: { en: 'Mamelodi Sundowns', es: 'Mamelodi Sundowns' }, logoUrl: '' },
  // Group G
  MCI: { id: 'MCI', group: 'G', name: { en: 'Manchester City', es: 'Manchester City' }, logoUrl: '' },
  JUV: { id: 'JUV', group: 'G', name: { en: 'Juventus', es: 'Juventus' }, logoUrl: '' },
  WYD: { id: 'WYD', group: 'G', name: { en: 'Wydad Casablanca', es: 'Wydad Casablanca' }, logoUrl: '' },
  AIN: { id: 'AIN', group: 'G', name: { en: 'Al Ain', es: 'Al Ain' }, logoUrl: '' },

  // Group H
  RMA: { id: 'RMA', group: 'H', name: { en: 'Real Madrid', es: 'Real Madrid' }, logoUrl: '' },
  RBS: { id: 'RBS', group: 'H', name: { en: 'RB Salzburg', es: 'RB Salzburgo' }, logoUrl: '' },
  PAC: { id: 'PAC', group: 'H', name: { en: 'Pachuca', es: 'Pachuca' }, logoUrl: '' },
  HIL: { id: 'HIL', group: 'H', name: { en: 'Al-Hilal', es: 'Al-Hilal' }, logoUrl: '' },

  
  
};

// =================================================================
// 2. RAW SCHEDULE DATA (Using Team IDs)
// =================================================================

/**
 * Raw structure for a match, using IDs to reference teams.
 */
interface RawMatch {
  id: string;
  time: string;
  team1Id: string;
  team2Id: string;
  score1: number | null;
  score2: number | null;
  venue: {
    en: string;
    es: string;
  };
  status: 'SCHEDULED' | 'FINISHED';
}

interface RawDaySchedule {
  dateISO: string;
  dayLabelKey: string;
  matches: RawMatch[];
}

/**
 * The schedule data in its raw, normalized format.
 */
const rawSchedule: RawDaySchedule[] = [
  // Day 1
  {
    dateISO: "2025-06-14",
    dayLabelKey: "day1",
    matches: [
      { id: "CWC-2025-01", time: "19:00 COT", team1Id: "ALA", score1: 0, team2Id: "MIA", score2: 0, venue: { en: "HARD ROCK STADIUM, Miami", es: "Hard Rock Stadium, Miami" }, status: "FINISHED" },
    ]
  },
  // Day 2
  {
    dateISO: "2025-06-15",
    dayLabelKey: "day2",
    matches: [
      { id: "CWC-2025-05", time: "11:00 COT", team1Id: "BAY", score1: 10, team2Id: "AUC", score2: 0, venue: { en: "TQL Stadium, Cincinnati OH", es: "TQL Stadium, Cincinnati OH" }, status: "FINISHED" },
      { id: "CWC-2025-06", time: "17:00 COT", team1Id: "PSG", score1: 4, team2Id: "ATM", score2: 0, venue: { en: "Rose Bowl Stadium, Pasadena", es: "Rose Bowl, Pasadena" }, status: "FINISHED" },
      { id: "CWC-2025-07", time: "20:00 COT", team1Id: "PAL", score1: 0, team2Id: "POR", score2: 0, venue: { en: "MetLife Stadium, East Rutherford", es: "MetLife Stadium, East Rutherford" }, status: "FINISHED" },
      { id: "CWC-2025-08", time: "20:00 COT", team1Id: "BOT", score1: 2, team2Id: "SEA", score2: 1, venue: { en: "Lumen Field, Seattle, USA", es: "Lumen Field, Seattle, USA" }, status: "FINISHED" },
    ]
  },
  // Day 3
  {
    dateISO: "2025-06-25",
    dayLabelKey: "day12",
    matches: [
      { id: "CWC-2025-15", time: "14:00 COT", team1Id: "BVB", score1: null, team2Id: "ULS", score2: null, venue: { en: "TQL Stadium, Cincinnati OH", es: "TQL Stadium, Cincinnati OH" }, status: "SCHEDULED" },
      { id: "CWC-2025-16", time: "14:00 COT", team1Id: "MAM", score1: null, team2Id: "FLU", score2: null, venue: { en: "HARD ROCK STADIUM, Miami", es: "HARD ROCK STADIUM, Miami" }, status: "SCHEDULED" },
      { id: "CWC-2025-17", time: "20:00 COT", team1Id: "INT", score1: null, team2Id: "RIV", score2: null, venue: { en: "Lumen Field, Seattle, USA", es: "Lumen Field, Seattle, USA" }, status: "SCHEDULED" },
      { id: "CWC-2025-18", time: "20:00 COT", team1Id: "URA", score1: null, team2Id: "MON", score2: null, venue: { en: "Rose Bowl Stadium, Pasadena", es: "Rose Bowl, Pasadena" }, status: "SCHEDULED" },
    ]
  }
];

// =================================================================
// 3. DATA COMPOSITION LOGIC (To build the final object)
// =================================================================

// Interfaces from your original file structure that the frontend expects.
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
  status: 'SCHEDULED' | 'FINISHED';
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
  selectDayPrompt: string;
  noMatchesMessage: string;
  matchCard: {
    scheduled: string;
    finished: string;
    venue: string;
    time: string;
    vs: string;
  };
  dayLabels: Record<string, string>;
  schedule: DaySchedule[];
}

/**
 * Composes the final schedule for a given language by hydrating raw data with team details.
 * @param lang The language ('en' or 'es') for which to generate the content.
 * @returns The composed schedule ready for the UI.
 */
const generateScheduleForLanguage = (lang: Language): DaySchedule[] => {
  return rawSchedule.map(rawDay => ({
    ...rawDay,
    matches: rawDay.matches.map(rawMatch => {
      const team1 = teams[rawMatch.team1Id];
      const team2 = teams[rawMatch.team2Id];

      return {
        id: rawMatch.id,
        time: rawMatch.time,
        status: rawMatch.status,
        venue: rawMatch.venue[lang],
        team1: {
          name: team1.name[lang],
          logoUrl: team1.logoUrl,
          score: rawMatch.score1,
        },
        team2: {
          name: team2.name[lang],
          logoUrl: team2.logoUrl,
          score: rawMatch.score2,
        },
      };
    }),
  }));
};

/**
 * The final exported object, dynamically built for both languages.
 */
export const clubWorldCupContent: Record<Language, ClubWorldCupPageContent> = {
  en: {
    metaTitle: "Club World Cup 2025 Matches | PredictPal",
    metaDescription: "Follow the Club World Cup 2025 matches, schedules, and results.",
    pageTitle: "Club World Cup 2025 Schedule",
    selectDayPrompt: "Select a day to view matches:",
    noMatchesMessage: "No matches scheduled for this day.",
    matchCard: {
      scheduled: "Scheduled",
      finished: "Finished",
      venue: "Venue",
      time: "Time",
      vs: "VS",
    },
    dayLabels: {
      day1: "June 15, 2025",
      day2: "June 16, 2025",
    },
    schedule: generateScheduleForLanguage('en'),
  },
  es: {
    metaTitle: "Partidos Mundial de Clubes 2025 | PredictPal",
    metaDescription: "Sigue los partidos, horarios y resultados del Mundial de Clubes 2025.",
    pageTitle: "Calendario Mundial de Clubes 2025",
    selectDayPrompt: "Selecciona un día para ver los partidos:",
    noMatchesMessage: "No hay partidos programados para este día.",
    matchCard: {
      scheduled: "Programado",
      finished: "Finalizado",
      venue: "Estadio",
      time: "Hora",
      vs: "VS",
    },
    dayLabels: {
      day1: "15 de Junio, 2025",
      day2: "16 de Junio, 2025",
    },
    schedule: generateScheduleForLanguage('es'),
  },
};
