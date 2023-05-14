import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'huntType'
})
export class HuntTypePipe implements PipeTransform {

  transform(id: number): string | undefined {
    const huntTypes = [{"_id":"62b0c3a97a044da7bc9e2830","name":"QBO","id":6},{"_id":"62b0c3a97a044da7bc9e2832","name":"ESL3D","id":8},{"_id":"62b0c3a97a044da7bc9e2831","name":"QBALD","id":7},{"_id":"62b0c3a97a044da7bc9e2839","name":"Anterless","id":15},{"_id":"62b0c3a97a044da7bc9e282e","name":"ESL2D","id":4},{"_id":"62b0c3a97a044da7bc9e282c","name":"QBA","id":2},{"_id":"62b0c3a97a044da7bc9e282b","name":"ES","id":1},{"_id":"62b0c3a97a044da7bc9e2834","name":"Hog/Dog","id":10},{"_id":"62b0c3a97a044da7bc9e2833","name":"Hog Only","id":9},{"_id":"62b0c3a97a044da7bc9e2838","name":"Antlerless","id":14},{"_id":"62b0c3a97a044da7bc9e282f","name":"ESLD","id":5},{"_id":"62b0c3a97a044da7bc9e282d","name":"BO","id":3},{"_id":"62b0c3a97a044da7bc9e2835","name":"QBAL2D","id":11},{"_id":"62b0c3a97a044da7bc9e2836","name":"AO","id":12},{"_id":"62b0c3a97a044da7bc9e2837","name":"QBAL6D","id":13}];
    return huntTypes.find(value => value.id === id)?.name;
  }

}
