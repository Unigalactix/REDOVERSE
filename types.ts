export interface Phase {
  name: string;
  color: 'Purple' | 'Blue' | 'Red';
  days: number;
}

export interface Star {
  name: string;
  color: string;
  radius: number;
  x: number;
  y: number;
  description: string;
  details: { label: string; value: string }[];
}

export interface Moon {
    name: string;
    parentPlanet: string;
    color: string;
    radius: number;
    description: string;
    details: { label: string; value: string }[];
}

export interface Planet {
  name: string;
  color: string;
  orbitScale: number;
  orbitSpeed: number;
  moons: Moon[];
  moonScale: number;
  twinOffset?: number;
  description: string;
  details: { label: string; value: string }[];
}

export type CelestialBody = (Planet & { type: 'planet' }) | (Star & { type: 'star' }) | (Moon & { type: 'moon' });

export interface ZanianTime {
    day: number;
    phase: string;
    time: string;
}