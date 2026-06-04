import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';
import { Product } from '../../../../core/models/product.model';
import { CartStore } from '../../../../state/cart.store';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartStore = inject(CartStore);

  private location = inject(Location);
  private routeBack = inject(Router);


  loading = signal(true);
  selectedImage = signal('');
  relatedProducts = signal<Product[]>([]);

  product = signal<Product | null>(null);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProductById(id).subscribe(product => {
      
      this.product.set(product);
      this.selectedImage.set(product.thumbnail);
      this.loading.set(false);

      this.productService.getProductsByCategory(product.category).subscribe(res => {
        this.relatedProducts.set(res.products.filter((p: Product) => 
          p.id !== product.id).slice(0, 4)
        );
      });
    });
  }

  addedToCart = signal(false);
  addToCart(): void {
    const product = this.product();

    if (!product) {
      return;
    }
    this.cartStore.add(product);
    this.addedToCart.set(true);

    setTimeout(() => {
      this.addedToCart.set(false);
    }, 1500);
  }

  // Product pages to home
  goBack(): void {
    // console.log("Route Back");

    if(window.history.length > 1) {
      this.location.back();
    } else {
      this.routeBack.navigate(['/']);
    }
  }
   

}
