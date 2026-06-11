import { computed, inject, Injectable, signal } from "@angular/core";
import { map } from "rxjs";
import { OrderStore } from "../../state/order.store";
import { ProductService } from "./product.service";

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private productService = inject(ProductService);
  private orderStore = inject(OrderStore);

  readonly monthLabels = computed(() => {
    const now = new Date();

    return Array.from({ length: 6 }, (_, index) => {
      const date = new Date(now.getFullYear(), now.getMonth() - 5 + index, 1);

      return date.toLocaleString('en-US', { month: 'short' });
    });
  });

  readonly monthlyRevenue = computed(() => {
    const now = new Date();
    const totals = Array(6).fill(0);

    for (const order of this.orderStore.orders()) {
      const date = new Date(order.date);
      const monthDiff =
        (now.getFullYear() - date.getFullYear()) * 12 +
        (now.getMonth() - date.getMonth());

      const index = 5 - monthDiff;

      if (index >= 0 && index < 6) {
        totals[index] += order.total;
      }
    }

    return totals;
  });

  readonly monthlyOrders = computed(() => {
    const now = new Date();
    const totals = Array(6).fill(0);

    for (const order of this.orderStore.orders()) {
      const date = new Date(order.date);
      const monthDiff =
        (now.getFullYear() - date.getFullYear()) * 12 +
        (now.getMonth() - date.getMonth());

      const index = 5 - monthDiff;

      if (index >= 0 && index < 6) {
        totals[index]++;
      }
    }

    return totals;
  });

  readonly categoryLabels = signal<string[]>([]);
  readonly categoryValues = signal<number[]>([]);

  loadCategoryDistribution() {
    return this.productService.getProduct().pipe(
      map(response => {
        const counts = response.products.reduce(
          (acc: Record<string, number>, product: any) => {
            acc[product.category] = (acc[product.category] || 0) + 1;
            return acc;
          },
          {}
        );

        return {
          labels: Object.keys(counts),
          values: Object.values(counts) as number[]
        };
      })
    );
  }
}