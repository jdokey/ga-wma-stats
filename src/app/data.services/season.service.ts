import { Season } from './../model';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SeasonService {

  seasons$ = this._http.get<Season[]>('api/seasons')
    .pipe(
      tap(data => console.log('Fetching Season[]', data))
    );

  constructor(private _http: HttpClient) {}

}
