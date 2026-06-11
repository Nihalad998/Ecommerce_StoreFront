import { Injectable, PLATFORM_ID, inject, signal } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { CartItem } from "./cart.store";

export interface Order {
  id: string;
  customer: string | null;
  date: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: OrderStatus;
}

export type OrderStatus = 'Pending' | 'Shipped' | 'Delivered';

@Injectable({
  providedIn: 'root'
})
export class OrderStore {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly orderSignal = signal<Order[]>([]);

  readonly orders = this.orderSignal.asReadonly();
  readonly loaded = signal(false);

  constructor() {
    if (!this.isBrowser) {
      return;
    }
    this.orderSignal.set(this.loadOrders());
    this.loaded.set(true);
  }

  addOrder(order: Order): void {
    this.orderSignal.update(orders => [order, ...orders]);
    this.persist();
  }

  private persist(): void {
    if (!this.isBrowser) {
      return;
    }

    localStorage.setItem('orders', JSON.stringify(this.orders()));
  }

  private loadOrders(): Order[] {
    try {
      const data = localStorage.getItem('orders');
      // console.log('Saved Order:', data);
      return data ? JSON.parse(data) : [];
    } catch {
      localStorage.removeItem('orders');

      return [];
    }
    
  }

  updateStatus(orderId: string, status: OrderStatus): void {
    this.orderSignal.update(orders =>
      orders.map(order =>
        order.id === orderId
          ? { ...order, status }
          : order
      )
    );

    this.persist();
  }
  
}