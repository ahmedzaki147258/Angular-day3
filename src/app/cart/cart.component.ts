import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsCartService } from '../services/products-cart.service';
import { cartProduct, product } from '../interfaces/product.interface';
import { ProductsRequestService } from '../services/products-request.service';
import { forkJoin, map, Subscription } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import {DiscountPricePipe} from '../pipes/discount-price.pipe';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, DiscountPricePipe],
  templateUrl: './cart.component.html',
  standalone: true,
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit, OnDestroy {
  products: (product & cartProduct)[] = [];
  cartProducts: cartProduct[] = [];
  private cartSubscription!: Subscription;

  constructor(private productsCartService: ProductsCartService, private productsRequestService: ProductsRequestService){}

  ngOnInit(): void {
    this.cartSubscription = this.productsCartService.getCartService().subscribe(cartProducts => {
      this.cartProducts = cartProducts;

      if (cartProducts.length === 0) {
        this.products = [];
        return;
      }

      const productObservables = cartProducts.map(cartProduct =>
        this.productsRequestService.getProductDetails(cartProduct.id).pipe(
          map(product => ({
            ...product,
            quantity: cartProduct.quantity,
            priceAfterDiscount: cartProduct.priceAfterDiscount
          }))
        )
      );

      forkJoin(productObservables).subscribe(mergedProducts => {
        this.products = mergedProducts;
      });
    });
  }

  incrementQuantity(item: product & cartProduct): void {
    if(item.quantity<item.stock) { this.productsCartService.updateQuantity(item.id, ++item.quantity); }
  }
  decrementQuantity(item: cartProduct): void {
    if(item.quantity > 1){ this.productsCartService.updateQuantity(item.id, --item.quantity); }
  }
  removeFromCart(productId: number): void {
    this.productsCartService.removeProduct(productId);
  }
  getTotalPrice(): number {
    return this.productsCartService.getTotal();
  }
  ngOnDestroy(): void {
    if(this.cartSubscription) { this.cartSubscription.unsubscribe(); }
  }
}
