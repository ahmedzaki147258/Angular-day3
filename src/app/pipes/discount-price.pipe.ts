import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'discountPrice'
})
export class DiscountPricePipe implements PipeTransform {
  transform(price: number, discountPercentage: number): string {
     return (price*(1-discountPercentage/100)).toFixed(2);
  }
}
