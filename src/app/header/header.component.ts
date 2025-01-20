import {Component, inject, OnInit} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {ProductsCartService} from '../services/products-cart.service';

@Component({
  selector: 'app-header',
  imports: [ FontAwesomeModule, RouterLink, RouterLinkActive,],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  counter: number=0;
  productsCartService = inject(ProductsCartService);
  ngOnInit(): void {
    this.productsCartService.getCartService().subscribe(r=>this.counter=r.length);
  }
}
