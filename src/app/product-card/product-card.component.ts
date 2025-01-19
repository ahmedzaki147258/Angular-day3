import {Component, Input, OnInit} from '@angular/core';
import { product } from '../interfaces/product.interface';
import { Router } from '@angular/router';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [
    CurrencyPipe
  ],
  templateUrl: './product-card.component.html',
  standalone: true,
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit{
  starsHtml!: string;
  @Input() product!: product;
  constructor(private router: Router) {}
  ngOnInit(): void { this.generateStars(); }

  private generateStars(): void {
    let stars='';
    const filledStars = Math.round(this.product.rating);
    for (let i=0; i<filledStars; i++) {
      stars += `<i class="fa-solid fa-star text-warning me-1"></i>`;
    }
    for (let i=filledStars; i<5; i++) {
      stars += `<i class="fa-regular fa-star text-warning me-1"></i>`;
    }
    this.starsHtml=stars;
  }

  navigateToDetails(id: number){
    this.router.navigate(['/item-details', id]).then(r=>r).catch().finally();
  }
}
