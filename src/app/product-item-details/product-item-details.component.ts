import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../interfaces/product.interface';
import productsData from '../../../public/products.json';
import {CurrencyPipe} from '@angular/common';
import {DiscountPricePipe} from '../pipes/discount-price.pipe';

@Component({
  selector: 'app-product-item-details',
  imports: [
    DiscountPricePipe,
    CurrencyPipe
  ],
  templateUrl: './product-item-details.component.html',
  standalone: true,
  styleUrl: './product-item-details.component.css'
})
export class ProductItemDetailsComponent implements OnInit {
  id: number; starsHtml!: string; product?: product;
  ngOnInit(): void { this.generateStars(); }
  constructor(private route: ActivatedRoute) {
    this.id=Number(this.route.snapshot.params['id']);
    this.product=productsData.products.find(p=>p.id===this.id);
  }

  private generateStars(): void {
    let stars='';
    const filledStars = Math.round(this.product!.rating);
    for (let i=0; i<filledStars; i++) {
      stars += `<i class="fa-solid fa-star text-warning me-1"></i>`;
    }
    for (let i=filledStars; i<5; i++) {
      stars += `<i class="fa-regular fa-star text-warning me-1"></i>`;
    }
    this.starsHtml=stars;
  }
}
