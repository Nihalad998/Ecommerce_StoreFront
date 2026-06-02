import { Component, inject } from '@angular/core';
import { ProductStore } from '../../../state/product.store';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {

  store = inject(ProductStore);

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    this.store.setSearch(value);
  }

}
