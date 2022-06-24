import { AppConfig } from './../app.config';
import { Season } from './../model';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SeasonService {

  seasons$ = this._http.get<Season[]>(`${AppConfig.baseEndpoint}/${AppConfig.endpoints.SEASONS}`)
    .pipe(tap(data => AppConfig.logData ? console.log('Fetching Season[]', data) : ''));

  constructor(private _http: HttpClient) {}

}
