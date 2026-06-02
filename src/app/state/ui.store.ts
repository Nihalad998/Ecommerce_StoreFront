import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UiStore {

  readonly cartOpen = signal(false);

  toggleCart() {
    this.cartOpen.update(value => !value);
  }
  closeCart() {
    this.cartOpen.set(false);
  }

  readonly filterOpen = signal(false);

  toggleFilter() {
    this.filterOpen.update(value => !value);
  }
  closeFilter() {
    this.filterOpen.set(false);
  }

}