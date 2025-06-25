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

type MatchStatus = 'SCHEDULED' | 'FINISHED' | 'LIVE' | 'POSTPONED';

interface KeyPrediction {
  label: string;
  value: string;
  odds: string;
  bookmakerLogoUrl: string;
  bookmakerName: string;
}

interface RawPrediction {
  title: string;
  analysis: string;
  keyPredictions: KeyPrediction[];
}

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
  status: MatchStatus;
  details?: {
    en: {
      stats: { title: string; content: string[] };
      prediction: RawPrediction;
    };
    es: {
      stats: { title: string; content: string[] };
      prediction: RawPrediction;
    };
  };
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
      { 
        id: "CWC-2025-01", 
        time: "19:00 COT", 
        team1Id: "ALA", 
        score1: 0, 
        team2Id: "MIA", 
        score2: 0, 
        venue: { en: "HARD ROCK STADIUM, Miami", es: "Hard Rock Stadium, Miami" }, 
        status: "FINISHED",
        details: {
          en: {
            stats: {
              title: "Key Statistics",
              content: ["Possession: Al Ahly 45% - Inter Miami 55%", "Shots on Target: Al Ahly 2 - Inter Miami 5", "Corners: Al Ahly 3 - Inter Miami 6"]
            },
            prediction: {
              title: "Match Analysis",
              analysis: "Inter Miami was predicted to have a slight edge due to home advantage and recent form, but Al Ahly's defense proved resilient, leading to a hard-fought draw.",
              keyPredictions: []
            }
          },
          es: {
            stats: {
              title: "Estadísticas Clave",
              content: ["Posesión: Al Ahly 45% - Inter Miami 55%", "Tiros a Puerta: Al Ahly 2 - Inter Miami 5", "Córners: Al Ahly 3 - Inter Miami 6"]
            },
            prediction: {
              title: "Análisis del Partido",
              analysis: "Se predijo que Inter Miami tenía una ligera ventaja por jugar en casa y su forma reciente, pero la defensa de Al Ahly demostró ser resiliente, lo que llevó a un reñido empate.",
              keyPredictions: []
            }
          }
        }
      },
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
      { 
        id: "CWC-2025-15", 
        time: "14:00 COT", 
        team1Id: "BVB", 
        score1: null, 
        team2Id: "ULS", 
        score2: null, 
        venue: { en: "TQL Stadium, Cincinnati OH", es: "TQL Stadium, Cincinnati OH" }, 
        status: "SCHEDULED",
        details: {
          en: {
            stats: {
              title: "Team Head-to-Head",
              content: [
                "This is the first official meeting between Borussia Dortmund and Ulsan Hyundai.",
                "Dortmund's recent Champions League performance shows strong offensive capabilities.",
                "Ulsan Hyundai dominated the K League 1 with a solid defensive record."
              ]
            },
            prediction: {
              title: "PredictPal's AI Analysis",
              analysis: "Borussia Dortmund is the clear favorite, but Ulsan's disciplined defense could pose a challenge. We predict a narrow victory for the German side, with chances for both teams to score.",
              keyPredictions: [
                { label: "Match Winner", value: "B. Dortmund (70%)", odds: "1.50", bookmakerLogoUrl: "https://placehold.co/100x25.png", bookmakerName: "Bet365" },
                { label: "Total Goals", value: "Over 2.5 (60%)", odds: "1.85", bookmakerLogoUrl: "https://placehold.co/100x25.png", bookmakerName: "Betway" },
                { label: "Total Corners", value: "Over 9.5 (70%)", odds: "1.72", bookmakerLogoUrl: "https://placehold.co/100x25.png", bookmakerName: "1xBet" },
                { label: "Total Cards", value: "Under 4.5 (85%)", odds: "1.40", bookmakerLogoUrl: "https://placehold.co/100x25.png", bookmakerName: "Bet365" },
                { label: "Both Teams to Score", value: "Yes (55%)", odds: "1.90", bookmakerLogoUrl: "https://placehold.co/100x25.png", bookmakerName: "Betway" }
              ]
            }
          },
          es: {
            stats: {
              title: "Análisis Cara a Cara",
              content: [
                "Este es el primer encuentro oficial entre Borussia Dortmund y Ulsan Hyundai.",
                "El reciente desempeño del Dortmund en la Champions League muestra una gran capacidad ofensiva.",
                "Ulsan Hyundai dominó la K League 1 con un sólido récord defensivo."
              ]
            },
            prediction: {
              title: "Análisis de IA de PredictPal",
              analysis: "El Borussia Dortmund es el claro favorito, pero la defensa disciplinada de Ulsan podría presentar un desafío. Predecimos una victoria ajustada para el equipo alemán, con oportunidades de gol para ambos equipos.",
              keyPredictions: [
                { label: "Ganador del Partido", value: "B. Dortmund (75%)", odds: "1.50", bookmakerLogoUrl: "https://placehold.co/100x25.png", bookmakerName: "Bet365" },
                { label: "Goles Totales", value: "Más de 2.5 (60%)", odds: "1.85", bookmakerLogoUrl: "https://placehold.co/100x25.png", bookmakerName: "Betway" },
                { label: "Córners Totales", value: "Más de 9.5 (70%)", odds: "1.72", bookmakerLogoUrl: "https://placehold.co/100x25.png", bookmakerName: "1xBet" },
                { label: "Tarjetas Totales", value: "Menos de 4.5 (85%)", odds: "1.40", bookmakerLogoUrl: "https://placehold.co/100x25.png", bookmakerName: "Bet365" },
                { label: "Ambos Equipos Anotan", value: "Sí (55%)", odds: "1.90", bookmakerLogoUrl: "https://placehold.co/100x25.png", bookmakerName: "Betway" }
              ]
            }
          }
        }
      },
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
  status: MatchStatus;
  details?: {
    stats: { title: string; content: string[] };
    prediction: {
      title: string;
      analysis: string;
      keyPredictions: KeyPrediction[];
    };
  };
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
    live: string;
    finished: string;
    postponed: string;
    venue: string;
    time: string;
    vs: string;
  };
  dialog: {
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
        details: rawMatch.details ? rawMatch.details[lang] : undefined,
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
      live: "Live",
      finished: "Finished",
      postponed: "Postponed",
      venue: "Venue",
      time: "Time",
      vs: "VS",
    },
    dialog: {
      title: "Match Details",
      statsTitle: "Statistics",
      predictionTitle: "Prediction & Analysis",
      closeButton: "Close",
      noDetails: "Match details are not yet available.",
      predictionColumn: "Prediction",
      outcomeColumn: "Outcome",
      oddsColumn: "Odds",
      bookmakerColumn: "Bookmaker",
    },
    dayLabels: {
      day1: "June 14, 2025",
      day2: "June 15, 2025",
      day12: "June 25, 2025",
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
      live: "En Vivo",
      finished: "Finalizado",
      postponed: "Pospuesto",
      venue: "Estadio",
      time: "Hora",
      vs: "VS",
    },
    dialog: {
      title: "Detalles del Partido",
      statsTitle: "Estadísticas",
      predictionTitle: "Predicción y Análisis",
      closeButton: "Cerrar",
      noDetails: "Los detalles del partido aún no están disponibles.",
      predictionColumn: "Predicción",
      outcomeColumn: "Resultado",
      oddsColumn: "Cuotas",
      bookmakerColumn: "Casa de Apuestas",
    },
    dayLabels: {
      day1: "14 de Junio, 2025",
      day2: "15 de Junio, 2025",
      day12: "25 de Junio, 2025",
    },
    schedule: generateScheduleForLanguage('es'),
  },
};
