import { computed, Injectable, signal } from "@angular/core";
import { Product } from "../core/models/product.model";

export interface CartItem extends Product {
  quantity: number;
}

@Injectable({
  providedIn: "root",
})
export class CartStore {
  
  private readonly items = signal<CartItem[]>([]);
  
  readonly cartItem = this.items.asReadonly();

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
  }

  increase(id: number) {
    this.items.update(
      items => items.map(
        item => item.id === id ? {
          ...item, quantity: item.quantity + 1
      } : item
    ));
  }

  decrease(id: number) {
    this.items.update(
      items => items.map(
        item => item.id === id ? {
          ...item, quantity: item.quantity - 1
        } : item
      ).filter(item => item.quantity > 0)
    );  
  }

  remove(id: number) {
    this.items.update(
      items => items.filter(
        item => item.id !== id
      )
    );
  }

  clear() {
    this.items.set([]);
  }
}