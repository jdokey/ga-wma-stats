import {MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions} from '@angular/material/tooltip';

export class AppConfig {

  static logData: boolean = false;
  static baseEndpoint: string = 'http://localhost:5005';

  static endpoints = {
    HUNTS: 'hunt',
    WMAS: 'wma',
    SEASONS: 'season',
    WEAPONS: 'weapon',
    HUNT_TYPES: 'hunttype',
    HUNTER_TYPES: 'huntertype'
  }

  static toolTipDefaults: MatTooltipDefaultOptions = {
    position: 'above',
    showDelay: 0,
    hideDelay: 0,
    touchendHideDelay: 0
  };



}
