import {MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions} from '@angular/material/tooltip';

export class AppConfig {

  static logData: boolean = false;

  static toolTipDefaults: MatTooltipDefaultOptions = {
    position: 'above',
    showDelay: 0,
    hideDelay: 0,
    touchendHideDelay: 0
  };

}
