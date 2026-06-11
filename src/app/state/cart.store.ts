import { computed, inject, Injectable, PLATFORM_ID, signal } from "@angular/core";
import { Product } from "../core/models/product.model";
import { isPlatformBrowser } from "@angular/common";

export interface CartItem extends Product {
  quantity: number;
}

@Injectable({
  providedIn: "root",
})
export class CartStore {

  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  
  private readonly items = signal<CartItem[]>([]);
  
  readonly cartItem = this.items.asReadonly();

  constructor() {
    if(!this.isBrowser) {
      return;
    }

    this.items.set(this.loadCart());
    this.loaded.set(true);
  }

  readonly itemCount = computed(() => 
    this.items().reduce(
      (total, item) => 
      total + item.quantity, 0
    )
  );

  readonly totalPrice = computed(() => 
    this.items().reduce(
      (total, item) => parseFloat((total + item.price * item.quantity).toFixed(2)), 0
    )
  );

  add(product: Product) {
    this.items.update(items => {
      const existing = items.find(item => item.id === product.id);

      if(existing) {
        return items.map(item =>
          item.id === product.id ? {
            ...item, quantity: item.quantity + 1
          } 
          : item
        );
      }
      return [...items, {
        ...product, quantity: 1
      }];
    });

    this.persist();
  }

  increase(id: number) {
    this.items.update(
      items => items.map(
        item => item.id === id ? {
          ...item, quantity: item.quantity + 1
      } : item
    ));

    this.persist();
  }

  decrease(id: number) {
    this.items.update(
      items => items.map(
        item => item.id === id ? {
          ...item, quantity: item.quantity - 1
        } : item
      ).filter(item => item.quantity > 0)
    );  

    this.persist();
  }

  remove(id: number) {
    this.items.update(
      items => items.filter(
        item => item.id !== id
      )
    );

    this.persist();
  }

  clear() {
    this.items.set([]);

    this.persist();
  }

  private persist(): void {
    if (!this.isBrowser) {
      return;
    }

    localStorage.setItem('cart', JSON.stringify(this.items()));
  }

  // Avoids showing "empty cart" before browser storage loads.
  // Proctects app form broken JSON in "localStorage".
  readonly loaded = signal(false);
  
  private loadCart(): CartItem[] {
    try {
      const data = localStorage.getItem('cart');

      return data ? JSON.parse(data) : [];
    } catch {
      localStorage.removeItem('cart');

      return [];
    }
  }
}