import { AppConfig } from './app.config';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppData } from './app-data';
import { HttpClientModule } from '@angular/common/http';

import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';

import { HuntTypePipe } from './pipes/hunt-type.pipe';
import { TotalHarvestBreakdownPipe } from './pipes/total-harvest-breakdown.pipe';

import { MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import { FilterComponent } from './filter/filter.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    HuntTypePipe,
    TotalHarvestBreakdownPipe,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    InMemoryWebApiModule.forRoot(AppData, { delay: 1000 }),
    HttpClientModule,
    MatTableModule,
    MatTooltipModule,
    MatIconModule,
    MatSelectModule
  ],
  providers: [
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: AppConfig.toolTipDefaults }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
