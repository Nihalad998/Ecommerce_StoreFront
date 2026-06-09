import { Injectable, signal } from "@angular/core";

export interface Order {
  id: string;
  date: string;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderStore {

  private readonly orderSignal = signal<Order[]>(this.loadOrders());

  readonly orders = this.orderSignal.asReadonly();

  addOrder(order: Order): void {
    this.orderSignal.update(orders => [order, ...orders]);

    this.persist();
  }

  private persist(): void {
    localStorage.setItem('orders', JSON.stringify(this.orders()));
  }

  private loadOrders(): Order[] {
    if(typeof localStorage === 'undefined'){
      return [];
    }

    const data = localStorage.getItem('orders');
    return data ? JSON.parse(data) : [];
  }

}