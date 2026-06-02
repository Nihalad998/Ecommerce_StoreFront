import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import(
      './features/storefront/pages/home/home.component'
    ).then(m => m.HomeComponent)
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import(
        './features/storefront/pages/product-detail/product-detail.component'
      ).then(m => m.ProductDetailComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
