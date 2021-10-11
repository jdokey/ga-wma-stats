import { shareReplay, tap } from 'rxjs/operators';
import { Wma } from './../model';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class WmaService {

  wmas$ = this._http.get<Wma[]>('api/wmas')
    .pipe(
      tap(data => console.log('Fetching Wma[]', data)),
      // shareReplay(1)
    );

  constructor(private _http: HttpClient) {}

}
