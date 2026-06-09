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
    loadComponent: () => import(
        './features/storefront/pages/product-detail/product-detail.component'
      ).then(m => m.ProductDetailComponent)
  },
  {
    path: 'wishlist',
    loadComponent: () => import(
        './features/storefront/pages/wishlist/wishlist.component'
      ).then(m => m.WishlistComponent)
  },
  {
    path: 'checkout',
    loadComponent: () => import(
      './features/storefront/pages/checkout/checkout.component'
      ).then(m => m.CheckoutComponent)
  },
  {
    path: 'orders',
    loadComponent: () => import(
      './features/storefront/pages/orders/orders.component'
    ).then(m => m.OrdersComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import(
      './features/admin/pages/dashboard/dashboard.component'
    ).then(m => m.DashboardComponent)
  },
  {
    path: 'admin/products',
    loadComponent: () => import(
      './features/admin/pages/products/products.component'
    ).then(m => m.ProductsComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
