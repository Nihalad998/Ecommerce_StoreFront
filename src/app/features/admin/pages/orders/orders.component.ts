import { Component, computed, inject, signal } from '@angular/core';
import { OrderStatus, OrderStore } from '../../../../state/order.store';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

  readonly orderStore = inject(OrderStore);
  
  readonly search = signal('');
  readonly statusFilter = signal('all');

  readonly filteredOrders = computed(() => {
    const term = this.search().toLowerCase().trim();
    const status = this.statusFilter();

    let orders = [...this.orderStore.orders()];

    if(term) {
      orders = orders.filter(order => 
        order.id.toLowerCase().includes(term)
        ||
        order.status.toLowerCase().includes(term)
      );
    }

    if(status !== 'all'){
      orders = orders.filter(order => order.status === status);
    }

    return orders;
  });

  readonly selectedOrder = signal<any | null>(null);

  selectOrder(order: any): void {
    this.selectedOrder.set(order);
  }

  closeDrawer(): void {
    this.selectedOrder.set(null);
  }

  updateOrderStatus(orderId: string, status: string): void {
    this.orderStore.updateStatus(orderId, status as OrderStatus);
  }


}
