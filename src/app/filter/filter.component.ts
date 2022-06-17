import { WeaponService } from './../data.services/weapon.service';
import { SeasonService } from './../data.services/season.service';
import { FilterService } from './../services/filter.service';
import { WmaService } from './../data.services/wma.service';
import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HuntFilter } from '../model';

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
    private _formBuilder: FormBuilder,
    private _wmaService: WmaService,
    private _seasonService: SeasonService,
    private _weaponService: WeaponService,
    private _filterService: FilterService) {}

  ngOnInit(): void {

    this.filterForm = this._formBuilder.group({
      wma: [null],
      season: [null],
      weapon: [null]
    });

    this.filterForm.valueChanges.subscribe(filterValues => {
      for (let key in filterValues) {
        if (filterValues[key] === null) {
          delete filterValues[key];
        }
      }
      this.filtersChanged(filterValues);
    });

  }

  filtersChanged(value: HuntFilter) {
    this._filterService.selectedFiltersChanged(value);
  }

}
