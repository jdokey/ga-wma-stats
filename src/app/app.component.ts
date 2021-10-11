import { Hunt } from './model';

import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HuntService } from './data.services/hunt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  hunts$ = this._huntService.hunts$;
  displayColumns = ['wma', 'huntType', 'startDate', 'endDate', 'hunters', 'harvest', 'successRate']

  constructor(private _huntService: HuntService) { }

  // huntTableData = new MatTableDataSource<Hunt>(this.hunts$);

}
