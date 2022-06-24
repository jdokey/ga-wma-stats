import { catchError, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Season, Wma, HuntType, HunterType } from './../model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hunt } from '../model';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

  constructor(private _http: HttpClient) { }

  public get(url: string, paramsObj?: Object): Observable<any> {
    let params = paramsObj ? this.buildParams(paramsObj) : {};
    return this._http.get<Hunt[] | Season[] | Wma[] | HuntType[] | HunterType[]>
      (url, { headers: this.headers, params: params})
      .pipe(
        retry(3),
        catchError(err => {
          throw err;
        })
      );
  }

  private buildParams(obj: Object): HttpParams {
    let params = new HttpParams()
    for (let [key, value] of Object.keys(obj)) {
      params.set(key, value);
    }
    return params;
  }

}
