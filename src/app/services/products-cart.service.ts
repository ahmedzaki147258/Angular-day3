import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { cartProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsCartService {
  private productsSubject = new BehaviorSubject<cartProduct[]>([]);

  getCartService() {
    return this.productsSubject.asObservable();
  }

  addProduct(product: cartProduct) {
    const productCart = this.productsSubject.value.find(p=>p.id===product.id);
    if(productCart) productCart.quantity+=product.quantity;
    else this.productsSubject.next([...this.productsSubject.value, product]);
  }

  updateQuantity(productId: number, newQuantity: number) {
    const productCart = this.productsSubject.value.find(p=>p.id===productId);
    if(productCart) productCart.quantity=newQuantity;
  }

  removeProduct(productId: number) {
    const updatedProducts = this.productsSubject.value.filter(p => p.id!==productId);
    this.productsSubject.next(updatedProducts);
  }

  getTotal(): number {
    return this.productsSubject.value.reduce((t, p) => t + p.priceAfterDiscount*p.quantity, 0);
  }
}
