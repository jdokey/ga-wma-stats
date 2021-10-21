import { FilterService } from './../services/filter.service';
import { WmaService } from './../data.services/wma.service';
import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html'
})
export class FilterComponent implements OnInit {

  constructor(
    private wmaService: WmaService,
    private filterService: FilterService) {}

  wmas$ = this.wmaService.wmas$;

  ngOnInit(): void {}

  wmaChanged(event: MatSelectChange) {
    this.filterService.selectedWmaChanged(event.value);
  }

}
