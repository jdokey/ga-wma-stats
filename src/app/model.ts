export interface Hunt {
  id: number;
  season: number;
  seasonYear?: string;
  wma: number;
  wmaName?: string | null;
  weapon: number;
  weaponName?: string;
  huntType: number | null;
  huntTypeName?: string;
  hunterType: number | null | string;
  hunterTypeName?: string;
  quota?: number | null;
  isCheckIn: boolean;
  startDate: number | 0 | string;
  endDate: number | 0 | null | string;
  hunterCount: number;
  bucks: number | 0;
  does: number | 0;
  boars: number | 0;
  sows: number | 0;
  totalHarvest: number;
  deerHarvest: number | null;
  huntDuration: number | null;
  huntCount: number | null,
  successRate?: number | null;
  isNotFirstWmaEntry?: boolean
}

export interface Season {
  id: number;
  name: string;
}

export interface Wma {
  id: number;
  name: string;
}

export interface Weapon {
  id: number;
  name: string;
}

export interface HuntType {
  id: number;
  name: string;
  descr?: string;
}

export interface HunterType {
  id: number;
  name: string;
}

export interface HuntFilter {
  wma?: number | null;
  season?: number | null;
  weapon?: number | null;
  successRate?: string | null;
}



