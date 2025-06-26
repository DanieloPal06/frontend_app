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
        score1: 1, 
        team2Id: "ULS", 
        score2: 0, 
        venue: { en: "TQL Stadium, Cincinnati OH", es: "TQL Stadium, Cincinnati OH" }, 
        status: "FINISHED"
      },
      { id: "CWC-2025-16", time: "14:00 COT", team1Id: "MAM", score1: 0, team2Id: "FLU", score2: 0, venue: { en: "HARD ROCK STADIUM, Miami", es: "HARD ROCK STADIUM, Miami" }, status: "FINISHED" },
      { id: "CWC-2025-17", time: "20:00 COT", team1Id: "INT", score1: 2, team2Id: "RIV", score2: 0, venue: { en: "Lumen Field, Seattle, USA", es: "Lumen Field, Seattle, USA" }, status: "FINISHED" },
      { id: "CWC-2025-18", time: "20:00 COT", team1Id: "URA", score1: 0, team2Id: "MON", score2: 4, venue: { en: "Rose Bowl Stadium, Pasadena", es: "Rose Bowl, Pasadena" }, status: "FINISHED" },
    ]
  },
  // Day 4
  {
    dateISO: "2025-06-26",
    dayLabelKey: "day13",
    matches: [
      {
        id: "CWC-2025-19",
        time: "14:00 COT",
        team1Id: "JUV",
        team2Id: "MCI",
        score1: 2,
        score2: 5,
        venue: { en: "Camping World Stadium, Orlando", es: "Camping World Stadium, Orlando" },
        status: "FINISHED",
        details: {
          en: {
            stats: {
              title: "Key Statistics (Last 2 CWC Matches)",
              content: [
                "Avg. Goals Scored: Juventus 4.5 - Man City 4.0",
                "Avg. Goals Conceded: Juventus 0.5 - Man City 0.0",
                "Avg. Possession: Juventus 62% - Man City 71%",
                "Total Corners: Juventus 10 - Man City 18"
              ]
            },
            prediction: {
              title: "Expert Analysis",
              analysis: "A tactical battle for the top spot in Group G. Man City's perfect defensive record (0 goals conceded) clashes with Juventus's historical dominance in this fixture. A draw secures the top spot for Juventus, forcing City to attack. While the AI predicts a Juventus win, City's current form and territorial dominance give them a slight edge. Expect a tight match where both potent attacks find the net.",
              keyPredictions: [
                { label: "Both Teams to Score", value: "Yes", odds: "1.75" },
                { label: "Total Corners", value: "Over 9.5", odds: "1.80" },
                { label: "Match Result", value: "Draw or Man City", odds: "1.50" }
              ]
            }
          },
          es: {
            stats: {
              title: "Estadísticas Clave (Últimos 2 Partidos CWC)",
              content: [
                "Prom. Goles Anotados: Juventus 4.5 - Man City 4.0",
                "Prom. Goles Recibidos: Juventus 0.5 - Man City 0.0",
                "Prom. Posesión: Juventus 62% - Man City 71%",
                "Córners Totales: Juventus 10 - Man City 18"
              ]
            },
            prediction: {
              title: "Análisis Experto",
              analysis: "Una batalla táctica por el primer puesto del Grupo G. El récord defensivo perfecto del Man City (0 goles en contra) choca con el dominio histórico de la Juventus en este enfrentamiento. Un empate asegura el primer puesto para la Juventus, obligando al City a atacar. Aunque la IA predice una victoria de la Juventus, la forma actual del City y su dominio territorial les dan una ligera ventaja. Se espera un partido reñido en el que ambos potentes ataques encuentren la red.",
              keyPredictions: [
                { label: "Ambos Equipos Marcarán", value: "Sí", odds: "1.75" },
                { label: "Total de Córners", value: "Más de 9.5", odds: "1.80" },
                { label: "Resultado del Partido", value: "Empate o Man City", odds: "1.50" }
              ]
            }
          }
        }
      },
      {
        id: "CWC-2025-20",
        time: "14:00 COT",
        team1Id: "WYD",
        team2Id: "AIN",
        score1: 1,
        score2: 2,
        venue: { en: "Audi Field, Washington, D.C.", es: "Audi Field, Washington, D.C." },
        status: "FINISHED",
        details: {
          en: {
            stats: {
              title: "Key Statistics (Last 2 CWC Matches)",
              content: [
                "Avg. Goals Scored: WAC 0.5 - Al-Ain 0.0",
                "Avg. Goals Conceded: WAC 3.0 - Al-Ain 5.5",
                "Total Shots: WAC 27 - Al-Ain 14",
                "Total Corners: WAC 9 - Al-Ain 4"
              ]
            },
            prediction: {
              title: "Expert Analysis",
              analysis: "A match for pride between two eliminated teams. Al-Ain's attack has been completely ineffective, failing to score a single goal and generating a very low xG. WAC, while also struggling, has shown slightly more offensive capability. The statistical evidence strongly suggests a low-scoring affair, with WAC as the logical, albeit uninspiring, favorite.",
              keyPredictions: [
                { label: "Both Teams to Score", value: "No", odds: "1.90" },
                { label: "Match Winner", value: "Wydad Casablanca", odds: "2.40" },
                { label: "Total Goals", value: "Under 2.5", odds: "1.85" }
              ]
            }
          },
          es: {
            stats: {
              title: "Estadísticas Clave (Últimos 2 Partidos CWC)",
              content: [
                "Prom. Goles Anotados: WAC 0.5 - Al-Ain 0.0",
                "Prom. Goles Recibidos: WAC 3.0 - Al-Ain 5.5",
                "Tiros Totales: WAC 27 - Al-Ain 14",
                "Córners Totales: WAC 9 - Al-Ain 4"
              ]
            },
            prediction: {
              title: "Análisis Experto",
              analysis: "Un partido por el orgullo entre dos equipos ya eliminados. El ataque de Al-Ain ha sido completamente ineficaz, sin marcar un solo gol y generando un xG muy bajo. El WAC, aunque también con dificultades, ha mostrado una capacidad ofensiva ligeramente mayor. La evidencia estadística sugiere fuertemente un partido de pocos goles, con el WAC como favorito lógico, aunque poco inspirador.",
              keyPredictions: [
                { label: "Ambos Equipos Marcarán", value: "No", odds: "1.90" },
                { label: "Ganador del Partido", value: "Wydad Casablanca", odds: "2.40" },
                { label: "Total de Goles", value: "Menos de 2.5", odds: "1.85" }
              ]
            }
          }
        }
      },
      {
        id: "CWC-2025-21",
        time: "20:00 COT",
        team1Id: "RBS",
        team2Id: "RMA",
        score1: null,
        score2: null,
        venue: { en: "Lincoln Financial Field, Philadelphia", es: "Lincoln Financial Field, Filadelfia" },
        status: "SCHEDULED",
        details: {
          en: {
            stats: {
              title: "Key Statistics (Last 2 CWC Matches)",
              content: [
                "Avg. Goals Scored: RB Salzburg 1.0 - Real Madrid 2.0",
                "Avg. Goals Conceded: RB Salzburg 0.5 - Real Madrid 1.0",
                "Total Shots Conceded: RB Salzburg 30 - Real Madrid 38",
                "Total Corners: RB Salzburg 8 - Real Madrid 7"
              ]
            },
            prediction: {
              title: "Expert Analysis",
              analysis: "A high-stakes match for qualification. Real Madrid only needs a draw, while Salzburg likely needs a win. Madrid's attack is potent, but their defense has been alarmingly porous, conceding 38 shots in two games. This defensive fragility, coupled with Salzburg's need to push forward, makes a 'Both Teams to Score' prediction very strong. The AI's pick of a Madrid win seems to overlook these critical defensive issues.",
              keyPredictions: [
                { label: "Both Teams to Score", value: "Yes", odds: "1.70" },
                { label: "Match Result", value: "Draw", odds: "4.90" },
                { label: "Total Goals", value: "Over 2.5", odds: "1.76" }
              ]
            }
          },
          es: {
            stats: {
              title: "Estadísticas Clave (Últimos 2 Partidos CWC)",
              content: [
                "Prom. Goles Anotados: RB Salzburg 1.0 - Real Madrid 2.0",
                "Prom. Goles Recibidos: RB Salzburg 0.5 - Real Madrid 1.0",
                "Tiros Totales Concedidos: RB Salzburg 30 - Real Madrid 38",
                "Córners Totales: RB Salzburg 8 - Real Madrid 7"
              ]
            },
            prediction: {
              title: "Análisis Experto",
              analysis: "Un partido de alto riesgo para la clasificación. Al Real Madrid le basta un empate, mientras que el Salzburgo probablemente necesite una victoria. El ataque del Madrid es potente, pero su defensa ha sido alarmantemente porosa, concediendo 38 tiros en dos partidos. Esta fragilidad defensiva, unida a la necesidad del Salzburgo de atacar, hace que la predicción de 'Ambos Equipos Marcarán' sea muy sólida. La elección de la IA de una victoria del Madrid parece pasar por alto estos problemas defensivos críticos.",
              keyPredictions: [
                { label: "Ambos Equipos Marcarán", value: "Sí", odds: "1.70" },
                { label: "Resultado del Partido", value: "Empate", odds: "4.90" },
                { label: "Total de Goles", value: "Más de 2.5", odds: "1.76" }
              ]
            }
          }
        }
      },
      {
        id: "CWC-2025-22",
        time: "20:00 COT",
        team1Id: "HIL",
        team2Id: "PAC",
        score1: null,
        score2: null,
        venue: { en: "Geodis Park, Nashville", es: "Geodis Park, Nashville" },
        status: "SCHEDULED",
        details: {
          en: {
            stats: {
              title: "Key Statistics (Last 2 CWC Matches)",
              content: [
                "Avg. Goals Scored: Al-Hilal 0.5 - Pachuca 1.0",
                "Avg. Possession: Al-Hilal 51.5% - Pachuca 45.5%",
                "Total Corners: Al-Hilal 17 - Pachuca 15",
                "Total Shots: Al-Hilal 32 - Pachuca 42"
              ]
            },
            prediction: {
              title: "Expert Analysis",
              analysis: "A fascinating clash of motivations. Al-Hilal must win to have any chance of advancing, while Pachuca is eliminated but playing for pride. Al-Hilal has controlled possession but struggled to score without Mitrović. Pachuca's high-volume, chaotic shooting style has produced goals in both games. The tactical profiles of both teams strongly suggest a high number of corners, making the AI's prediction of 10 a significant underestimation.",
              keyPredictions: [
                { label: "Total Corners", value: "Over 11.5", odds: "1.95" },
                { label: "Both Teams to Score", value: "Yes", odds: "1.65" },
                { label: "Match Winner", value: "Al-Hilal", odds: "1.62" }
              ]
            }
          },
          es: {
            stats: {
              title: "Estadísticas Clave (Últimos 2 Partidos CWC)",
              content: [
                "Prom. Goles Anotados: Al-Hilal 0.5 - Pachuca 1.0",
                "Prom. Posesión: Al-Hilal 51.5% - Pachuca 45.5%",
                "Córners Totales: Al-Hilal 17 - Pachuca 15",
                "Tiros Totales: Al-Hilal 32 - Pachuca 42"
              ]
            },
            prediction: {
              title: "Análisis Experto",
              analysis: "Un fascinante choque de motivaciones. Al-Hilal debe ganar para tener alguna posibilidad de avanzar, mientras que Pachuca está eliminado pero juega por el orgullo. Al-Hilal ha controlado la posesión pero ha tenido dificultades para marcar sin Mitrović. El estilo de tiro caótico y de alto volumen de Pachuca ha producido goles en ambos partidos. Los perfiles tácticos de ambos equipos sugieren fuertemente un alto número de saques de esquina, lo que hace que la predicción de 10 de la IA sea una subestimación significativa.",
              keyPredictions: [
                { label: "Total de Córners", value: "Más de 11.5", odds: "1.95" },
                { label: "Ambos Equipos Marcarán", value: "Sí", odds: "1.65" },
                { label: "Ganador del Partido", value: "Al-Hilal", odds: "1.62" }
              ]
            }
          }
        }
      }
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
    metaTitle: "FIFA Club World Cup 2025 Matches | PredictPal",
    metaDescription: "Follow the FIFA Club World Cup 2025 matches, schedules, and results.",
    pageTitle: "FIFA Club World Cup 2025 Schedule",
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
      predictionColumn: "Forecast",
      outcomeColumn: "Outcome",
      oddsColumn: "Odds",
    },
    dayLabels: {
      day1: "June 14, 2025",
      day2: "June 15, 2025",
      day12: "June 25, 2025",
      day13: "June 26, 2025",
    },
    schedule: generateScheduleForLanguage('en'),
  },
  es: {
    metaTitle: "Partidos Mundial de Clubes FIFA 2025 | PredictPal",
    metaDescription: "Sigue los partidos, horarios y resultados del Mundial de Clubes FIFA 2025.",
    pageTitle: "Calendario Mundial de Clubes FIFA 2025",
    selectDayPrompt: "Selecciona un día para ver los partidos: ",
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
      predictionColumn: "Pronóstico",
      outcomeColumn: "Resultado",
      oddsColumn: "Cuotas",
    },
    dayLabels: {
      day1: "14 de Junio, 2025",
      day2: "15 de Junio, 2025",
      day12: "25 de Junio, 2025",
      day13: "26 de Junio, 2025",
    },
    schedule: generateScheduleForLanguage('es'),
  },
};
