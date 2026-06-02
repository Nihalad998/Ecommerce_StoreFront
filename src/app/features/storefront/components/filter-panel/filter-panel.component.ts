import { Component, OnInit, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ProductStore } from '../../../../state/product.store';
import { UiStore } from '../../../../state/ui.store';

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filter-panel.component.html',
  styleUrl: './filter-panel.component.scss'
})
export class FilterPanelComponent implements OnInit {

  readonly store = inject(ProductStore);
  readonly uiStore = inject(UiStore);

  selectedCategory = '';
  selectedRating = 0;
  selectedPrice = 5000;

  ngOnInit(): void {

    this.selectedCategory = this.store.category();
    this.selectedRating = this.store.minRating();
    this.selectedPrice = this.store.maxPrice();

  }

  applyFilters(): void {

    this.store.category.set(this.selectedCategory);
    this.store.minRating.set(this.selectedRating);
    this.store.maxPrice.set(this.selectedPrice);

    if (window.innerWidth < 1024) {
      this.uiStore.closeFilter();
    }

  }

  resetFilters(): void {

    this.selectedCategory = '';
    this.selectedRating = 0;
    this.selectedPrice = 5000;

    this.store.category.set('');
    this.store.minRating.set(0);
    this.store.maxPrice.set(5000);

  }

  onDesktopFilterChange(): void {
    if (window.innerWidth >= 1024) {
      this.applyFilters();
    }
  }

}