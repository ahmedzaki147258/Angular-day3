import { CanActivateFn, Router } from '@angular/router';
import productsData from '../../../public/products.json';
import { inject } from '@angular/core';

export const validateItemGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const id=Number.parseInt(route.params['id']);
  const itemExists=productsData.products.some(p=>p.id===id);
  if(!itemExists) router.navigate(['/not-found']).then(r=>r).catch().finally();
  return itemExists;
};
