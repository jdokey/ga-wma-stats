import { FilterService } from './../services/filter.service';
import { AppConfig } from './../app.config';
import { HuntTypeService } from './huntType.service';
import { HunterTypeService } from './hunterType.service';
import { WeaponService } from './weapon.service';
import { SeasonService } from './season.service';
import { Hunt, Season, Wma } from './../model';
import { map, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { WmaService } from './wma.service';
import { combineLatest } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HuntService {

  huntsAll$ = this._http.get<Hunt[]>('api/hunts')
    .pipe(tap(data => AppConfig.logData ? console.log('fetching Hunt[]', data) : ''));

  hunts$ = combineLatest([
    this.huntsAll$,
    this._wmaService.wmas$,
    this._seasonService.seasons$,
    this._weaponService.weapons$,
    this._hunterTypeService.hunterTypes$,
    this._huntTypeService.huntTypes$,
    // this._filterService.selectedWmaChanges$
  ]).pipe(
    map(([hunts, wmas, seasons, weapons, hunterTypes, huntTypes]) =>
      hunts.map(hunt => ({
        ...hunt,
        wmaName: this.findSubcollectionValue(hunt, 'wma', wmas),
        // wmas.find(value => hunt.wma === value.id)?.name || 'Unknown',
        seasonYear: this.findSubcollectionValue(hunt, 'season', seasons),
        weaponName: this.findSubcollectionValue(hunt, 'weapon', weapons),
        hunterTypeName: this.findSubcollectionValue(hunt, 'hunterType', hunterTypes),
        huntTypeName: this.findSubcollectionValue(hunt, 'huntType', huntTypes),
        successRate: (hunt.totalHarvest / hunt.hunterCount) * 100
      }) as Hunt)
    ),
    // Sort by wmaName, then by startDate ...
    map(hunts => hunts.sort((a,b) => this.sortHunts(a, b))),
    // map(hunts => hunts.sort((a: any, b: any) => a.wmaName < b.wmaName ? -1 : a.wmaName > b.wmaName ? 1 : 0)),
    // Set isNotFirstWmaEntry property. This indicates when/when not to render the wma name field in the
    // "WMA" column ...
    map(hunts => hunts.map((value, index, array) => ({
      ...value,
      isNotFirstWmaEntry: array[index - 1] ? value.wma === array[index - 1].wma : false
    }))),
    shareReplay(1)
  );

  constructor(
    private _http: HttpClient,
    private _wmaService: WmaService,
    private _seasonService: SeasonService,
    private _weaponService: WeaponService,
    private _hunterTypeService: HunterTypeService,
    private _huntTypeService: HuntTypeService,
    private _filterService: FilterService) { }

  private findSubcollectionValue(object: any, property: string, array: Wma[] | Season[]): string {
    return array.find(value => object[property] === value.id)?.name || 'Unknown';
  }

  private sortHunts(a: Hunt, b: Hunt): number {

    var w1 = a.wmaName ? a.wmaName.toLowerCase() : '';
    var w2 = b.wmaName ? b.wmaName.toLowerCase() : '';

    var s1 = a.startDate ? a.startDate : 0;
    var s2 = a.startDate ? b.startDate : 0;

    if (w1 < w2) return -1;
    if (w1 > w2) return 1;
    if (s1 < s2) return -1;
    if (s1 > s2) return 1;

    return 0;

  }

}
