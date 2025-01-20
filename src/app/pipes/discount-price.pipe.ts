import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'discountPrice'
})
export class DiscountPricePipe implements PipeTransform {
  transform(price: number, discountPercentage: number): number {
     return Number.parseFloat((price*(1-discountPercentage/100)).toFixed(2));
  }
}
