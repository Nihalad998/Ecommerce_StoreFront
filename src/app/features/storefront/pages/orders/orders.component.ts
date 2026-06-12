import { Component, inject } from '@angular/core';
import { OrderStore } from '../../../../state/order.store';
import { Router } from '@angular/router';
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
  
  private router = inject(Router);

  goHome(): void {
    this.router.navigate(['/']);
  }
}
