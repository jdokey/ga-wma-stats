import { HunterTypeData } from './data/hunterTypeData';
import { HuntTypeData } from './data/huntTypeData';
import { WeaponData } from './data/weaponData';
import { WmaData } from './data/wmaData';
import { SeasonData } from './data/seasonData';
import { Hunt, Season, Weapon, Wma, HuntType, HunterType } from './model';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { HuntData } from './data/huntData';

export class AppData implements InMemoryDbService {
  createDb(): {
    hunts: Hunt[],
    seasons: Season[],
    wmas: Wma[],
    weapons: Weapon[],
    huntTypes: HuntType[],
    hunterTypes: HunterType[]
  } {
    const hunts: Hunt[] = HuntData.huntData,
      seasons: Season[] = SeasonData.seasonData,
      wmas: Wma[] = WmaData.wmaData,
      weapons: Weapon[] = WeaponData.weaponData,
      huntTypes: HuntType[] = HuntTypeData.huntTypeData,
      hunterTypes: HunterType[] = HunterTypeData.hunterTypeData;
    return { hunts, seasons, wmas, weapons, huntTypes, hunterTypes }
  }
}
