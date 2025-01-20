import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../interfaces/product.interface';
import {CurrencyPipe} from '@angular/common';
import {DiscountPricePipe} from '../pipes/discount-price.pipe';
import {ProductsCartService} from '../services/products-cart.service';
import {ProductsRequestService} from '../services/products-request.service';

@Component({
  selector: 'app-product-item-details',
  imports: [
    CurrencyPipe,
    DiscountPricePipe
  ],
  templateUrl: './product-item-details.component.html',
  standalone: true,
  styleUrl: './product-item-details.component.css',
  providers: [DiscountPricePipe]
})
export class ProductItemDetailsComponent implements OnInit {
  id: number; starsHtml!: string; product?: product; cnt: number=1; counter!: number;
  constructor(
    private route: ActivatedRoute,
    private productsCartService: ProductsCartService,
    private productsRequestService: ProductsRequestService,
    private discountPricePipe: DiscountPricePipe
  ) {
    this.id=Number(this.route.snapshot.params['id']);
  }

  ngOnInit(): void {
    this.productsRequestService.getProductDetails(this.id).subscribe(p=>{ this.product=p; this.generateStars(); });
    this.productsCartService.getCartService().subscribe(r=>this.counter=r.length);
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

  decreaseCount(){
    if(this.cnt>1){ this.cnt--; }
  }

  increaseCount(){
    if(this.cnt<this.product!.stock){ this.cnt++; }
  }

  increaseCartCounter(){
    this.productsCartService.addProduct({
      id: this.product?.id!,
      quantity: this.cnt,
      priceAfterDiscount: this.discountPricePipe.transform(this.product!.price, this.product!.discountPercentage)
    });
  }
}
