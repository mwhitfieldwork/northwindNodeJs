import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencySelect',
  standalone: true
})
export class CurrencySelectPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
