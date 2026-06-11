import { Component, computed, effect, HostListener, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../../core/services/product.service';
import { ProductStore } from '../../../../state/product.store';
import { NavbarComponent } from "../../../../shared/ui/navbar/navbar.component";
import { SearchBarComponent } from "../../../../shared/ui/search-bar/search-bar.component";
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { CartDrawerComponent } from "../../components/cart-drawer/cart-drawer.component";
import { FilterPanelComponent } from "../../components/filter-panel/filter-panel.component";
import { UiStore } from '../../../../state/ui.store';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, SearchBarComponent, ProductCardComponent, CartDrawerComponent, FilterPanelComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private productService = inject(ProductService);
  readonly productStore = inject(ProductStore);
  readonly uiStore = inject(UiStore);

  readonly visibleCount = signal(20);

  readonly displayedProducts = computed(() => 
    this.productStore.filteredProducts().slice(0, this.visibleCount())
  );

  ngOnInit(): void {

    this.productService.getProduct().subscribe({
      next: (res) => {
        this.productStore.setProducts(res.products);
      }
    });
  }

  constructor() {
    effect(() => {
      
      this.productStore.filteredProducts();
      this.visibleCount.set(20);
    }, { allowSignalWrites: true });
  }

  @HostListener('window: scroll') onScroll(): void {
    const threshold = 500;
    const position = window.innerHeight + window.scrollY;
    const height = document.body.offsetHeight;

    if(position >= height - threshold) {
      const totalProducts = this.productStore.filteredProducts().length;

      if(this.visibleCount() < totalProducts) {
        this.visibleCount.update(count => count + 20);
      }
    }
  }
  
}
