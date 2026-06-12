import { computed, Injectable, signal } from "@angular/core";
import { Product } from "../core/models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductStore {
 
  readonly products = signal<Product[]>([]); 
  readonly search = signal('');

  readonly loading = signal(false);
  readonly error = signal('');

  readonly category = signal('');
  readonly maxPrice = signal(5000);
  readonly minRating = signal(0);
  readonly sortBy = signal('popular');

  // Compute filtered products based on search, category, price, rating
  readonly filteredProducts = computed(() => {

    const search = this.search().toLowerCase();
    const category = this.category();
    const maxPrice = this.maxPrice();
    const minRating = this.minRating();

    let filtered = this.products()
      .filter(product =>
        product.title.toLowerCase().includes(search)
        &&
        (
          !category ||
          product.category === category
        )
        &&
        product.price <= maxPrice
        &&
        product.rating >= minRating
      );

    switch (this.sortBy()) {
      case 'priceAsc':
        return [...filtered].sort(
          (a, b) => a.price - b.price
        );
      case 'priceDesc':
        return [...filtered].sort(
          (a, b) => b.price - a.price
        );
      case 'rating':
        return [...filtered].sort(
          (a, b) => b.rating - a.rating
        );
      default:
        return filtered;
    }
  });

  // Dynamically compute unique categories from products
  readonly categories = computed(() => 
    [...new Set(
      this.products().map(product => product.category)
    )]
  );

  setProducts(products: Product[]) {
    this.products.set(products);
  }

  setSearch(value: string) {
    this.search.set(value);
  }

  
  
}