import { Component } from '@angular/core';
import { HuntService } from './data.services/hunt.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  filteredHunts$ = this._huntService.filteredHunts$;
  displayColumns = ['wma', 'huntType', 'startDate', 'endDate', 'hunters', 'harvest', 'successRate']

  constructor(private _huntService: HuntService) { }

  // huntTableData = new MatTableDataSource<Hunt>(this.hunts$);

}
