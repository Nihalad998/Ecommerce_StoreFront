import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Product } from '../models/product.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  private http = inject(HttpClient);

  // getProduct() {
  //   return this.http.get<any>(
  //     `${environment.apiUrl}/products?limit=195`
  //   );
  // }
  getProduct() {

    return this.http
      .get<any>(
        `${environment.apiUrl}/products?limit=180`
        ).pipe(

          map(res => {
            return {
              ...res,
              products: Array.from(
                { length: 1000 },
                (_, i) => ({
                  ...res.products[
                    i % res.products.length
                  ],
                  id: i + 1

                })
              )
            };
          })
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
