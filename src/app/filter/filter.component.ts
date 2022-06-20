import { AppConfig } from './../app.config';
import { WeaponService } from './../data.services/weapon.service';
import { SeasonService } from './../data.services/season.service';
import { FilterService } from './../services/filter.service';
import { WmaService } from './../data.services/wma.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { HuntFilter } from '../model';
import { MatSliderChange } from '@angular/material/slider';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html'
})
export class FilterComponent implements OnInit {

  filterForm!: FormGroup;

  wmas$ = this._wmaService.wmas$;
  seasons$ = this._seasonService.seasons$;
  weapons$ = this._weaponService.weapons$;

  constructor(
    private _formBuilder: NonNullableFormBuilder,
    private _wmaService: WmaService,
    private _seasonService: SeasonService,
    private _weaponService: WeaponService,
    private _filterService: FilterService) {}

  ngOnInit(): void {

    this.filterForm = this._formBuilder.group({
      wma: [null as string | null],
      season: [null as string | null],
      weapon: [null as string | null],
      successRate: [null as string | null],
      quota: [null as string | null],
      isCheckIn: [null as string | null]
    });

    this.filterForm.valueChanges.subscribe(filterValues => {
      this.filtersChanged(filterValues);
    });

  }

  filtersChanged(value: HuntFilter) {
    console.log('filtersChanged: ', value);
    this._filterService.selectedFiltersChanged(value);
  }

  clearFilter(name: string): void {
    this.filterForm.controls[name].reset(null, { emitEvent: false });
    this.filtersChanged(this.filterForm.value);
  }

  clearFilters(): void {
    this.filtersChanged({});
    this.filterForm.reset({}, { emitEvent: false });
  }

  toggleChange(ctrl: string, event: MatSlideToggleChange) {
    if (!event.checked) {
      this.filterForm.controls[ctrl].setValue(null);
    }
  }

}
