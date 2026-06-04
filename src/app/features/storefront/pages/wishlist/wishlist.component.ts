import { Component, inject } from '@angular/core';
import { WishlistStore } from '../../../../state/wishlist.store';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [ RouterLink, ProductCardComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {

  readonly wishlistStore = inject(WishlistStore);

}
