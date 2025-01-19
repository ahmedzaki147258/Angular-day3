import { Component, OnInit } from '@angular/core';
import { product } from '../interfaces/product.interface';
import productsData from '../../../public/products.json';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-products-page',
  imports: [ProductCardComponent],
  templateUrl: './products-page.component.html',
  standalone: true,
  styleUrl: './products-page.component.css'
})
export class ProductsPageComponent implements OnInit {
  products: product[];
  constructor() { this.products = []; }
  ngOnInit(): void { this.products = productsData.products; }
}
