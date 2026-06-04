import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CartStore } from '../../../state/cart.store';
import { UiStore } from '../../../state/ui.store';
import { WishlistStore } from '../../../state/wishlist.store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  cartStore = inject(CartStore);
  uiStore = inject(UiStore);

  readonly wishlistStore = inject(WishlistStore);
}
