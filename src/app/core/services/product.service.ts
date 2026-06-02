import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  private http = inject(HttpClient);

  getProduct() {
    return this.http.get<any>(
      `${environment.apiUrl}/products`
    );
  }

  getProductById(id: number) {
    return this.http.get<Product>(
      `${environment.apiUrl}/products/${id}`
    );
  }

  getProductsByCategory(category: string) {
    return this.http.get<any>(
      `${environment.apiUrl}/products/category/${category}`
    );
  }

  
}
