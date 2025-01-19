import { Routes } from '@angular/router';
import { ProductsPageComponent } from './products-page/products-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductItemDetailsComponent } from './product-item-details/product-item-details.component';
import { validateItemGuard } from './guards/validate-item.guard';

export const routes: Routes = [
  { path: '', component: ProductsPageComponent, title: 'Products' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'register', component: RegisterComponent, title: 'Register' },
  { path: 'cart', component: CartComponent, title: 'Cart' },
  { path: 'item-details/:id', component: ProductItemDetailsComponent, title: 'Product Details', canActivate: [validateItemGuard] },
  { path: '**', component: NotFoundComponent, title: 'Not Found Page' }
];
