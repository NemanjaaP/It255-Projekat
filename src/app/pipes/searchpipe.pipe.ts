import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'searchpipe'
})
export class SearchpipePipe implements PipeTransform {
  transform(value: Object[], anotherValue: string): Object[] {
    if (value == null) {
      return null;
    }
    if (anotherValue !== undefined) {
      return value.filter((item: Object) =>
        item['value']==anotherValue);
    } else {
      return value;
    }
  }
}