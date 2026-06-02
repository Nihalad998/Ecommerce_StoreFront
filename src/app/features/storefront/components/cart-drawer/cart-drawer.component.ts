import { Component, inject } from '@angular/core';
import { CartStore } from '../../../../state/cart.store';
import { UiStore } from '../../../../state/ui.store';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [],
  templateUrl: './cart-drawer.component.html',
  styleUrl: './cart-drawer.component.scss'
})
export class CartDrawerComponent {

  cartStore = inject(CartStore);
  uiStore = inject(UiStore);

}
