import { Component, OnInit } from '@angular/core';
import { product } from '../interfaces/product.interface';
import { ProductCardComponent } from '../product-card/product-card.component';
import {ProductsRequestService} from '../services/products-request.service';

@Component({
  selector: 'app-products-page',
  imports: [ProductCardComponent],
  templateUrl: './products-page.component.html',
  standalone: true,
  styleUrl: './products-page.component.css'
})
export class ProductsPageComponent implements OnInit {
  products: product[];
  constructor(private productsRequestService: ProductsRequestService) { this.products = []; }
  ngOnInit(): void {
    this.productsRequestService.getProducts().subscribe(res=> this.products=res);
  }
}
