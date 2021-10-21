import { Wma } from './../model';
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class FilterService {

  private selectedWma = new BehaviorSubject<number | null>(null);
  selectedWmaChanges$ = this.selectedWma.asObservable();

  constructor() {}

  selectedWmaChanged(wmaId: number) {
    this.selectedWma.next(wmaId);
  }

}
