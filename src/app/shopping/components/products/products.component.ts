import { Component } from '@angular/core';
import { ProductService } from '../../../shared/services/data/product.service';
import { Subscription, filter, switchMap } from 'rxjs';
import { Product } from '../../../shared/models/product';
import { DataTransformerService } from '../../../shared/services/helpers/data-transformer.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ShoppingCartService } from '../../../shared/services/data/shopping-cart.service';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import {  fade, slideRight  } from '../../../shared/services/animation.service';
import { CartItem } from 'src/app/shared/models/cart-item';


@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  animations: [
    slideRight,
    fade
  ]   
})

export class ProductsComponent { 

  subscriptions: Subscription[] = [];
  products: Product[] = [];
  filteredProducts: Product[] = [];
  currentCategory!: string | null;
  cart!: ShoppingCart; 
  items: CartItem[] = []; 
  
  constructor
  (
    private route: ActivatedRoute,
    private productService: ProductService, 
    private transformer: DataTransformerService,
    private cartService: ShoppingCartService
  )  
  {
    this.retrieveProducts();
    this.retrieveCart();
  }
  
  ngOnInit() {
    window.scrollTo(0, 0);
  } 

  async retrieveProducts(): Promise<void> {
    const productList = await this.productService.getAll();
    const products$ = this.transformer.toObsList(productList);
  
    const sub = products$
    .pipe(
      switchMap(products => {
        this.products = products.sort((a, b) => a.title.localeCompare(b.title)); // Sortiere die Produkte nach dem Titel
        return this.route.queryParamMap;
      })
    )
    .subscribe(params => {
      this.currentCategory = params.get('category');
      this.filteredProducts = this.currentCategory
        ? this.products.filter(p => p.category === this.currentCategory)
        : this.products;     
    });
    
    this.subscriptions.push(sub);
  }
   
  
  async retrieveCart() {
    const cartObj = await this.cartService.getCart();
    const sub = this.transformer.toObsObj(cartObj)
    .subscribe(cart => {
      this.items = cart.items;
    });   
    
    this.subscriptions.push(sub);
  } 
  
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
}
