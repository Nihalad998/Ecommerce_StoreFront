import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { Product } from '../core/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class WishlistStore {
  
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly wishlistSignal = signal<Product[]>([]);

  readonly items = this.wishlistSignal.asReadonly();

  readonly count = computed(() => this.items().length);

  readonly loaded = signal(false);

  constructor() {
    if (!this.isBrowser) {
      return;
    }

    this.wishlistSignal.set(this.loadWishlist());
    this.loaded.set(true);
  }

  toggle(product: Product): void {
    const exists = this.items().some(item => item.id === product.id);

    if (exists) {
      this.wishlistSignal.update(items =>
        items.filter(item => item.id !== product.id)
      );
    } else {
      this.wishlistSignal.update(items => [...items, product]);
    }

    this.persist();
  }

  isWishlisted(id: number): boolean {
    return this.items().some(item => item.id === id);
  }

  private persist(): void {
    if (!this.isBrowser) {
      return;
    }

    localStorage.setItem('wishlist', JSON.stringify(this.items()));
  }

  private loadWishlist(): Product[] {
    try {
      const data = localStorage.getItem('wishlist');

      return data ? JSON.parse(data) : [];
    } catch {
      localStorage.removeItem('wishlist');

      return [];
    }
  }
}