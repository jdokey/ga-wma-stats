import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class FilterService {

  private selectedWma = new BehaviorSubject<number>(0);
  selectedWmaChanges$ = this.selectedWma.asObservable();

  constructor() {}

  selectedWmaChanged(wmaId: number) {
    this.selectedWma.next(wmaId);
  }

}
