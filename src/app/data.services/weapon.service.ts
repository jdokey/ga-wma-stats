import { AppConfig } from './../app.config';
import { Weapon } from './../model';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class WeaponService {

  weapons$ = this._http.get<Weapon[]>(`${AppConfig.baseEndpoint}/${AppConfig.endpoints.WEAPONS}`)
    .pipe(tap(data => AppConfig.logData ? console.log('Fetching Weapon[]', data) : ''));

  constructor(private _http: HttpClient) {}

}
