import { HuntTypeData } from '../data/huntTypeData';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'huntType'
})
export class HuntTypePipe implements PipeTransform {

  transform(id: number): string | undefined {
    return HuntTypeData.huntTypeData.find(value => value.id === id)?.descr;
  }

}
