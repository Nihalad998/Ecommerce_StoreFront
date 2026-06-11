import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckoutStore } from '../../../../state/checkout.store';
import { CartStore } from '../../../../state/cart.store';
import { createPaymentGateway } from '../../../../core/utils/payment-gateway';
import { RouterLink } from '@angular/router';
import { OrderStore } from '../../../../state/order.store';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {

  private fb = inject(FormBuilder);

  readonly checkoutStore = inject(CheckoutStore);
  readonly cartStore = inject(CartStore);
  readonly orderStore = inject(OrderStore);

  readonly currentStep = signal(1);
  readonly progress = computed(() => (this.currentStep() / 4) * 100);

  readonly paymentLoading = signal(false);
  readonly paymentError = signal('');
  readonly transactionId = signal('');

  private gateway = createPaymentGateway();

  readonly orderSubtotal = signal(0);
  readonly orderTax = signal(0);
  readonly orderShipping = signal(0);
  readonly orderTotal = signal(0);

  nextStep(): void {
    if(this.currentStep() < 4 ) {
      this.currentStep.update(step => step + 1);
    }
  }

  previousStep(): void {
    if(this.currentStep() > 1 ) {
      this.currentStep.update(step => step - 1);
    }
  }

  // Creating Form
  shippingForm = this.fb.group({
    fullName: [
      '', [ Validators.required, Validators.minLength(3) ]
    ],
    email: [
      '', [ Validators.required, Validators.email ]
    ],
     phone: [
      '', [ Validators.required, Validators.pattern(/^[6-9]\d{9}$/) ]
    ],
    pincode: [
      '',
      [ Validators.required, Validators.pattern(/^\d{6}$/) ]
    ],
    address: [
      '', Validators.required 
    ],
    city: [
      '', Validators.required 
    ],
    state: [
      '', Validators.required 
    ]
  });

  // Save Address
  saveShippingAddress(): void {
    console.log(
        'FORM VALID',
        this.shippingForm.valid
      );

      console.log(
        this.shippingForm.value
      );

    if(this.shippingForm.invalid) {
      this.shippingForm.markAllAsTouched();
      
      return;
    }

    this.checkoutStore.shippingAddress.set(this.shippingForm.getRawValue() as any);

    this.nextStep();
  }

  // Add computed totals
  readonly tax = computed(
    () =>  Math.round( this.cartStore.totalPrice() * 0.18 )
  );
  readonly shippingCharge = computed(
    () => this.cartStore.totalPrice() > 1000 ? 0 : 50
  );
  readonly grandTotal = computed(
    () => this.cartStore.totalPrice() + this.tax() + this.shippingCharge()
  );

  // Payment Method
  async processPayment() {

    this.paymentLoading.set(true);
    this.paymentError.set('');

    try {
      const txnId = await this.gateway.pay(this.grandTotal());

      this.transactionId.set(txnId);

      // Save snapshot before clearing cart
      this.orderSubtotal.set(
        this.cartStore.totalPrice()
      );

      this.orderTax.set(
        this.tax()
      );

      this.orderShipping.set(
        this.shippingCharge()
      );

      this.orderTotal.set(
        this.grandTotal()
      );

      this.orderStore.addOrder({
        id: txnId,
        customer: this.shippingForm.getRawValue().fullName,
        date: new Date().toISOString(),
        items: [...this.cartStore.cartItem()],
        subtotal: Number(this.orderSubtotal().toFixed(2)),
        tax: Number(this.orderTax().toFixed(2)),
        shipping: Number(this.orderShipping().toFixed(2)),
        total: Number(this.orderTotal().toFixed(2)),
        status: 'Pending'
      });

      this.cartStore.clear();
      this.currentStep.set(4);
    }
    catch(error) {
      this.paymentError.set(String(error));
    }
    finally {
      this.paymentLoading.set(false);
    }
  }
}
