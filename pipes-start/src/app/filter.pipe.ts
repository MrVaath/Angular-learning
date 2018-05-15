import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterStrings: string, propName: string): any {
    if (value.length === 0 || filterStrings === '') {
      return value;
    }
    const resultArray = [];
    for (const item of value) {
      if (item[propName] === filterStrings) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
