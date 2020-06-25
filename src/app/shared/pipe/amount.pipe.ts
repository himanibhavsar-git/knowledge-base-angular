import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amount'
})
export class AmountPipe implements PipeTransform {

  transform(value: any): number {
    const tempAmount = value ? value.toString() : '';
    const amount =  tempAmount.replace('.', ',');
    return amount ? amount : 0;
  }

}
