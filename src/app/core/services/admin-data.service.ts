import { computed, inject, Injectable, signal } from "@angular/core";
import { OrderStore } from "../../state/order.store";
import { ProductService } from "./product.service";
import { Product } from "../models/product.model";

@Injectable({
  providedIn: 'root'
})

export class AdminDataService {

  private orderStore = inject(OrderStore);
  private productService = inject(ProductService);
 
  readonly revenue = computed(() => 
    this.orderStore.orders().reduce((total, order) => total + order.total, 0)
  );

  readonly orders = computed(() => this.orderStore.orders().length);

  readonly customers = computed(() => 
    new Set(
      this.orderStore.orders().map(order => order.customer).filter(Boolean)
      ).size
  );

  readonly totalProducts = computed(() => this.productList().length);

  readonly averageOrderValue = computed(() => {
    const orderCount = this.orders();

    return orderCount ? Math.round(this.revenue() / orderCount) : 0;
  });

  readonly productList = signal<Product[]>([]);

  readonly categories = computed(() => 
    [...new Set(this.productList().map(product => product.category))]
  );

  readonly productsLoaded = signal(false);

  readonly productError = signal('');

  loadProducts(): void {
    if(this.productList().length) {
      this.productsLoaded.set(true);
      return;
    }

    this.productsLoaded.set(false);
    this.productError.set('');

    this.productService.getProduct().subscribe({ 
      next: response => {
        this.productList.set(response.products);
        this.productsLoaded.set(true);
    
      }
    });

  }

  readonly recentOrders = computed(() => 
    this.orderStore.orders().slice(0, 10)
  );

  readonly ordersLoaded = this.orderStore.loaded.asReadonly();

  readonly inventoryAlerts = computed(() =>
   this.productList()
    .filter(product => product.stock < 10)
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 10)
    .map(product => ({
      id: product.id,
      productName: product.title,
      stock: product.stock
    }))
  );

}