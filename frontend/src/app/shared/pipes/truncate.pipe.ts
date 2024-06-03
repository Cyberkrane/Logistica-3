import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  constructor() {}

  transform(value: string, extension: number) {
    if (value.length > 10) {
      return value.substring(0, extension) + '...';
    }
    return value;
  }
}