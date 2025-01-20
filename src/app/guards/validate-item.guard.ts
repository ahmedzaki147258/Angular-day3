import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import {ProductsRequestService} from '../services/products-request.service';
import {catchError, map, of} from 'rxjs';

export const validateItemGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const productsRequestService = inject(ProductsRequestService);
  const id=Number.parseInt(route.params['id']);

  return productsRequestService.getProductDetails(id).pipe(
    map(() => true),
    catchError(() => {
      router.navigate(['/not-found']).then(r=>r).catch().finally();
      return of(false);
    })
  );
};
