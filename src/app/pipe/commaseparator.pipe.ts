import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commaseparator'
})
export class CommaseparatorPipe implements PipeTransform {

  transform(value: number | string): string {
    if (typeof value === 'string') {
      value = Number(value.replace(',', ''));
    }
    return value.toLocaleString('en-US');
  }

}
