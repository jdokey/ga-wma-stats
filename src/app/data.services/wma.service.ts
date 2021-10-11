import { AppConfig } from './../app.config';
import { tap } from 'rxjs/operators';
import { Wma } from './../model';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class WmaService {

  wmas$ = this._http.get<Wma[]>('api/wmas')
    .pipe(tap(data => AppConfig.logData ? console.log('Fetching Wma[]', data) : ''));

  constructor(private _http: HttpClient) {}

}
