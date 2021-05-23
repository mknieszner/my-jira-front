import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'clearArray'
})
export class ClearArrayPipe implements PipeTransform {
  transform(array: any[]) {
    const newArray = [];
    for (let i = 0; i < array.length; i++) {
      if (typeof array[i] !== 'undefined') { // TODO only undefined??
        newArray.push(array[i]);
      }
    }
    return newArray;
  }
}

