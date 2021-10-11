import { tap } from 'rxjs/operators';
import { HunterType } from './../model';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class HuntTypeService {

  huntTypes$ = this._http.get<HunterType[]>('api/huntTypes')
    .pipe(
      tap(data => console.log('Fetching HuntType[]', data))
    );

  constructor(private _http: HttpClient) {}

}
