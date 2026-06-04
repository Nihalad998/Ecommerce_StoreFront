import { Component, inject, Input, signal } from '@angular/core';
import { Product } from '../../../../core/models/product.model';
import { CartStore } from '../../../../state/cart.store';
import { Router } from '@angular/router';
import { WishlistStore } from '../../../../state/wishlist.store';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  loading = signal(true);

  @Input({ required: true }) product!: Product;

  private cartStore = inject(CartStore);
  private router = inject(Router);

  readonly wishlistStore = inject(WishlistStore);

  addedToCart = signal(false);
  addToCart(): void {
    this.cartStore.add(this.product);

    this.addedToCart.set(true);
    setTimeout(() => {
      this.addedToCart.set(false);
    }, 1500);
  }

  openProduct(): void {
    this.router.navigate(['/products', this.product.id]);
    
  }

  toggleWishlist(event: MouseEvent): void {
    event.stopPropagation();

    this.wishlistStore.toggle(this.product);
  }

}
