import {Component, HostListener, OnInit} from '@angular/core';
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
  page = 0;
  limit = 30;
  loading = false;
  hasMore = true;
  constructor(private productsRequestService: ProductsRequestService) { this.products = []; }
  ngOnInit(): void {
    this.loadMoreProducts();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (this.isScrolledToBottom() && !this.loading && this.hasMore) {
      this.loadMoreProducts();
    }
  }

  private isScrolledToBottom(): boolean {
    const threshold = 50;
    const position = window.scrollY + window.innerHeight;
    const height = document.documentElement.scrollHeight;
    return position > height - threshold;
  }

  private loadMoreProducts(): void {
    this.loading = true;
    this.productsRequestService.getProducts(this.page, this.limit).subscribe(newProducts => {
        this.products = [...this.products, ...newProducts];
        this.hasMore = newProducts.length === this.limit;
        this.page++;
        this.loading = false;
    });
  }
}
