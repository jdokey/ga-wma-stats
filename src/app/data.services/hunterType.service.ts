import { AppConfig } from './../app.config';
import { tap } from 'rxjs/operators';
import { HunterType } from './../model';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class HunterTypeService {

  hunterTypes$ = this._http.get<HunterType[]>(`${AppConfig.baseEndpoint}/${AppConfig.endpoints.HUNTER_TYPES}`)
    .pipe(tap(data => AppConfig.logData ? console.log('Fetching HunterType[]', data) : ''));

  constructor(private _http: HttpClient) {}

}
