import { isPlatformBrowser } from "@angular/common";
import { computed, inject, Injectable, PLATFORM_ID, signal } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AdminDataService {
  
  readonly revenue = signal(84250);
  readonly orders = signal(1240);
  readonly customers = signal(312);
  readonly totalProducts = signal(1000);

  private platformId = inject(PLATFORM_ID);

  readonly averageOrderValue = computed(() => Math.round(this.revenue() / this.orders()));

  readonly productList = signal(
    Array.from(
      { length: 1000 },
      (_, index) => ({
        id: index + 1,
        name: `Product ${index + 1}`,
        category: ['Electronics', 'Fashion', 'Home', 'Sports'][index % 4],
        stock: Math.floor(Math.random() * 100),
        price: Math.floor(Math.random() * 10000)
      })
    )
  );

  constructor() {
    if(isPlatformBrowser(this.platformId)) {
      setInterval(() => {
        this.revenue.update(value => value + Math.floor(Math.random() * 500)
        );

        this.orders.update(value => value + Math.floor(Math.random() * 3));
      }, 5000);
    }
  }

  readonly recentOrders = signal([
    {
      id: 'TXN-1001',
      customer: 'John Doe',
      amount: 1499,
      status: 'Delivered',
      date: '2026-06-08'
    },
    {
      id: 'TXN-1002',
      customer: 'Sarah Smith',
      amount: 899,
      status: 'Pending',
      date: '2026-06-08'
    },
    {
      id: 'TXN-1003',
      customer: 'Mike Johnson',
      amount: 2499,
      status: 'Shipped',
      date: '2026-06-07'
    },
    {
      id: 'TXN-1004',
      customer: 'Alex Brown',
      amount: 599,
      status: 'Delivered',
      date: '2026-06-07'
    }
  ]);

  readonly inventoryAlerts = signal([
    {
      id: 1,
      productName: 'Wireless Mouse',
      stock: 3
    },
    {
      id: 2,
      productName: 'Gaming Keyboard',
      stock: 5
    },
    {
      id: 3,
      productName: 'USB-C Cable',
      stock: 1
    },
    {
      id: 4,
      productName: 'Laptop Stand',
      stock: 4
    }
  ]);

}