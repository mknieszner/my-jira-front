import {Pipe, PipeTransform} from '@angular/core';

// @Pipe({name: 'keys'})
// export class KeyPipe implements PipeTransform {
//   transform(value: any, ...args: any[]): any {
//     return Object.keys(value);
//   }
// }

@Pipe({name: 'valueOnKey'})
export class KeyPipe implements PipeTransform {
  transform(value: {}, ...args: any[]): any {
    const key = Object.keys(value);
    return {key: key, value: value[Object.keys(value)[0]]};
  }
}
