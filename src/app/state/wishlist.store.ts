import { Injectable, computed, signal } from '@angular/core';

import { Product } from '../core/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class WishlistStore {

  private readonly itemsSignal = signal<Product[]>(this.loadWishlist());

  readonly items = this.itemsSignal.asReadonly();

  readonly count = computed(() => this.items().length);

  toggle(product: Product): void {

    const exists = this.items().some(item => item.id === product.id);

    if (exists) {
      this.itemsSignal.update(
        items => items.filter(
            item => item.id !== product.id
          )
      );

    } 
    else {
      this.itemsSignal.update(
        items => [...items, product]
      );
    }

    this.persist();
  }

  isWishlisted(id: number): boolean {
    return this.items().some(item =>item.id === id);

  }

  private persist(): void {
    if(typeof localStorage === 'undefined'){
      return;
    } 

    localStorage.setItem('wishlist', JSON.stringify(this.items()));

  }

  private loadWishlist(): Product[] {
    if(typeof localStorage === 'undefined') {
      return [];
    }

    const data = localStorage.getItem('wishlist');
    return data? JSON.parse(data): [];

  }

}