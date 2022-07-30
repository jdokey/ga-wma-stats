import { AppConfig } from './../app.config';
import { Season } from '@model';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SeasonService {

  seasons$ = this._http.get<Season[]>(`${AppConfig.baseEndpoint}/${AppConfig.endpoints.SEASONS}`)
    .pipe(
      tap(data => AppConfig.logData ? console.log('Fetching Season[]', data) : ''),
      map(seasons => seasons.sort((s1: Season, s2: Season) => +s1.name.substring(0, 4) > +s2.name.substring(0, 4) ? -1 : 0) )
    );

  constructor(private _http: HttpClient) {}

}
