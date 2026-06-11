import { computed, inject, Injectable, signal } from "@angular/core";
import { AdminDataService } from "./admin-data.service";
import { ProductService } from "./product.service";

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  
  private adminData = inject(AdminDataService);
  private productService = inject(ProductService);

  readonly monthlyRevenue = signal([
    12000, 180000, 220000, 200000, 340000, 280000
  ]);

  readonly monthlyOrders = signal([
    120, 180, 240, 190, 340, 280
  ]);

  readonly categoryLabels = signal<string[]>([]);
  readonly categoryValues = signal<number[]>([]);

  
  // readonly categoryData = computed(() => {
  //   const products = this.adminData.productList();
  //   const counts = products.reduce((acc, product) => {
  //     acc[product.category] = (acc[product.category] || 0) + 1;

  //     return acc;
  //   },
  //   {} as Record<string, number>
  // );

  //   return {
  //     labels: Object.keys(counts),
  //     values: Object.values(counts)
  //   };
  // });

  addRevenue(amount: number): void {
    this.monthlyRevenue.update(data => {
      const updated = [...data];

      updated[updated.length - 1] += amount;

      return updated;
    });
  }

  addOrder(): void {
    this.monthlyOrders.update(data => {
      const updated = [...data];

      updated[updated.length - 1] ++;

      return updated;
    })
  }

  loadCategoryDistribution() {
    this.productService
      .getProduct().subscribe(response => {

        const counts =
          response.products.reduce(
            (
              acc: Record<string, number>,
              product: any
            ) => {

              acc[product.category] =
                (acc[product.category] || 0) + 1;

              return acc;

            },
            {}
          );
        this.categoryLabels.set(Object.keys(counts));
        this.categoryValues.set(Object.values(counts));
      });
      return this.productService.getProduct();
  }

}