import { RestService } from './../services/rest.service';
import { Injectable } from "@angular/core";
import { combineLatest } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { AppConfig } from './../app.config';
import { Hunt, Season, Wma } from '@model';
import { FilterService } from './../services/filter.service';
import { HunterTypeService } from './hunterType.service';
import { HuntTypeService } from './huntType.service';
import { SeasonService } from './season.service';
import { WeaponService } from './weapon.service';
import { WmaService } from './wma.service';

@Injectable({ providedIn: 'root' })
export class HuntService {

  hunts$ = this._restService.get(
    `${AppConfig.baseEndpoint}/${AppConfig.endpoints.HUNTS}`, { 'limit': 100, 'skip': 0 })
      .pipe(
        tap(data => AppConfig.logData ? console.log('fetching Hunt[]', data) : '')
      );

  huntsWithAnxData$ = combineLatest([
    this.hunts$,
    this._wmaService.wmas$,
    this._seasonService.seasons$,
    this._weaponService.weapons$,
    this._hunterTypeService.hunterTypes$,
    this._huntTypeService.huntTypes$,
  ]).pipe(
    map(([hunts, wmas, seasons, weapons, hunterTypes, huntTypes]) =>
      hunts.map((hunt: Hunt) => ({
        ...hunt,
        wmaName: this.findSubcollectionValue(hunt, 'wma', wmas),
        seasonYear: this.findSubcollectionValue(hunt, 'season', seasons),
        weaponName: this.findSubcollectionValue(hunt, 'weapon', weapons),
        hunterTypeName: this.findSubcollectionValue(hunt, 'hunterType', hunterTypes),
        huntTypeName: this.findSubcollectionValue(hunt, 'huntType', huntTypes),
        successRate: (hunt.totalHarvest / hunt.hunterCount) * 100
      }) as Hunt)
    ),
    // Sort by wmaName, then by startDate ...
    map(hunts => hunts.sort((a: Hunt, b: Hunt) => this.sortHunts(a, b))),
    // Set isNotFirstWmaEntry property. This indicates when/when not to render the wma name field in the "WMA" column ...
    map(hunts => hunts.map((hunt: { wma: any; }, index: number, array: { wma: any; }[]) => ({
      ...hunt,
      isNotFirstWmaEntry: array[index - 1] ? hunt.wma === array[index - 1].wma : false
    }) as Hunt)),
    shareReplay(1),
    // tap(data => console.log(data))
  );

  filteredHunts$ = combineLatest([
    this.huntsWithAnxData$,
    this._filterService.selectedFilters$
  ]).pipe(
    // tap(([hunts, selectedFilters]) => console.log(selectedFilters)),
    map(([hunts, selectedFilters]) =>
      hunts.filter((hunt: Hunt) => {
        const nonNullFilters = Object.entries(selectedFilters).filter(([key, value]) => value !== null);
        if (nonNullFilters.length > 0) {
          const filtersObj = Object.fromEntries(nonNullFilters);
          let expr: string = '';
          for (const [key, value] of Object.entries(filtersObj)) {
            if (key === 'successRate') {
              expr += `hunt['${key}'] >= ${value} && `;
            } else if (key === 'quota' || key === 'isCheckIn') {
              if (value) {
                expr += `hunt['${key}'] == true && `;
              }
            } else {
              expr += `hunt['${key}'] === ${value} && `;
            }
          }
          // console.log(expr);
          return eval(expr.substring(0, expr.length - 3));
        } else {
          return true;
        }
      })
    ),
    // Set isNotFirstWmaEntry property. This indicates when/when not to render the wma name field in the "WMA" column ...
    map(hunts => hunts.map((hunt: { wma: any; }, index: number, array: { wma: any; }[]) => ({
      ...hunt,
      isNotFirstWmaEntry: array[index - 1] ? hunt.wma === array[index - 1].wma : false
    }) as Hunt)),
    tap(data => console.log('filteredHunts$ length:', data.length))
  );

  constructor(
    private _restService: RestService,
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
