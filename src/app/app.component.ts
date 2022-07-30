import { Component } from '@angular/core';
import { HuntService } from '@data-services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  filteredHunts$ = this._huntService.filteredHunts$;
  displayColumns = ['wma', 'huntType', 'dates', 'hunters', 'harvest', 'successRate']

  constructor(private _huntService: HuntService) { }

  // huntTableData = new MatTableDataSource<Hunt>(this.hunts$);

}
