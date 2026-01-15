export type PuliState = {
  id: number;
  owner: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
};

export interface TangentPoint {
  x: number;
  y: number;
  ang: number;
}

export interface TangentLine {
  start: TangentPoint;
  end: TangentPoint;
}

export interface HullItem {
    x: number;
    y: number;
    r: number;
    isNail: boolean;
}

export interface TeamData {
    name: string;
    icon: string;
}

export interface PlayerProfile {
    name: string;
    team: TeamData | null;
}

// --- NEW: Visual Configuration ---
export interface GameVisualConfig {
    p1Color: string;    // Host Disc Color
    p2Color: string;    // Client Disc Color
    woodColor: string;  // Board Borders/Bridge Tint
    floorColor: string; // Board Base Color
}

