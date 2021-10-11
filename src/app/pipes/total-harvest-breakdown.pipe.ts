import { Pipe, PipeTransform } from '@angular/core';
import { Hunt } from '../model';

@Pipe({
  name: 'totalHarvestBreakdown'
})
export class TotalHarvestBreakdownPipe implements PipeTransform {

  transform(hunt: Hunt): string {
    let str: string = '';
    if (hunt.bucks > 0) {
      str += `Bucks: ${hunt.bucks}`;
    }
    if (hunt.bucks > 0 && hunt.does > 0) {
      str += ' | ';
    }
    if (hunt.does > 0) {
      // str += (hunt.bucks && hunt.bucks > 0) ? `, ` : `` +
      str += `Does: ${hunt.does}`;
    };
    if ((hunt.bucks > 0 || hunt.does > 0) && hunt.boars > 0) {
      str += ' | ';
    }
    if (hunt.boars > 0) {
      str += `Male hogs: ${hunt.boars}`;
    }
    if ((hunt.bucks > 0 || hunt.does > 0 || hunt.boars > 0) && hunt.sows > 0) {
      str += ' | ';
    }
    if (hunt.sows > 0) {
      str += `Female Hogs: ${hunt.sows}`;
    }
    return str;
  }

}
