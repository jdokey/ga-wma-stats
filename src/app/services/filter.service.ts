import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HuntFilter } from "../model";

@Injectable({ providedIn: 'root' })
export class FilterService {

  initFilterValue: HuntFilter = {};
  selectedFiltersSubject = new BehaviorSubject<HuntFilter>(this.initFilterValue);
  selectedFilters$ = this.selectedFiltersSubject.asObservable();

  constructor() {}

  selectedFiltersChanged(filters: HuntFilter) {
    // console.log('selectedFiltersChanged', filters);
    this.selectedFiltersSubject.next(filters);
  }

}
