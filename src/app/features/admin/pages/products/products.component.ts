import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { AdminDataService } from '../../../../core/services/admin-data.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit {

  readonly adminData = inject(AdminDataService);
  
  readonly search = signal('');
  readonly category = signal('all');
  readonly sortBy = signal('name');
  readonly lowStockOnly = signal(false);
  readonly page = signal(1);
  readonly pageSize = 20;

  readonly lowStockCount = computed(() => 
    this.adminData.productList().filter(
      product => product.stock > 0 && product.stock < 10
    ).length
  );
  readonly outOfStockCount = computed(() => 
    this.adminData.productList().filter(
      product => product.stock === 0
    ).length
  );
  readonly inventoryValue =computed(() => 
    this.adminData.productList().reduce(
      (total, product) => total + product.price * product.stock, 0 
    )
  );

  ngOnInit(): void {
    this.adminData.loadProducts();
  }

  restockProduct(productId: number): void {
    this.adminData.productList.update(products => 
      products.map(product => 
        product.id === productId 
        ? {...product, stock: product.stock + 25}      
        : product
      )
    )
  }

  readonly filterProducts = computed(() => {
    let products = [...this.adminData.productList()];

    const term = this.search().toLowerCase();

    if(this.category() !== 'all') {
      products = products.filter(product => product.category === this.category());
    }

    if(term) {
      products = products.filter(product => product.title.toLowerCase().includes(term));
    }

    if(this.lowStockOnly()) {
      products = products.filter(product => product.stock < 10);
    }

    switch(this.sortBy()) {
      case 'price':
        products.sort((a,b) => b.price - a.price);
        break;
      case 'stock':
        products.sort((a,b) => a.stock - b.stock);
        break;
      default:
        products.sort((a,b) => a.id - b.id);
    }
    
    return products;
  });

  readonly endIndex = computed(() => {
    return Math.min(
      this.page() * this.pageSize, 
      this.filterProducts().length);
  });

  readonly totalPage = computed(() => 
    Math.max(1,Math.ceil(this.filterProducts().length / this.pageSize))
  );

  readonly paginatedProducts = computed(() => {
    const start = (this.page() - 1) * this.pageSize;

    return this.filterProducts().slice(start, start + this.pageSize);
  });

  nextPage(): void {
    if(this.page() < this.totalPage()) {
      this.page.update(page => page + 1);
    }
  }

  previousPage(): void {
    if(this.page() > 1) {
      this.page.update(page => page - 1);
    }
  }

}
