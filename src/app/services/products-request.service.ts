import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.development';
import {map, Observable} from 'rxjs';
import {product} from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsRequestService {
  constructor(private Http: HttpClient) { }
  getProducts(page: number, limit: number): Observable<product[]>{
    return this.Http.get<{ products: product[] }>(`${environment.base_url}/products?skip=${page*limit}&limit=${limit}`).pipe(map(response => response.products));
  }
  getProductDetails(id: number): Observable<product>{
    return this.Http.get<product>(`${environment.base_url}/products/${id}`);
  }
}
