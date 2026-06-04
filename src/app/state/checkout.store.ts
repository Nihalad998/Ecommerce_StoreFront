import { Injectable, signal } from "@angular/core";

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  pincode: string;
  address: string;
  city: string;
  state: string;
}

@Injectable({
  providedIn: 'root'
})

export class CheckoutStore {

  readonly shippingAddress = signal< ShippingAddress | null >(null);
  
}