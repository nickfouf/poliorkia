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





