import { Component, Input } from '@angular/core';
import { ProductService } from '../services/data/product.service';
import { Subscription, of, switchMap } from 'rxjs';
import { Product } from '../models/product';
import { DataTransformerService } from '../services/data-transformer.service';
import { Category } from '../models/category';
import { CategoryService } from '../services/data/category.service';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../services/data/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  subscriptions: Subscription[] = [];
  products: Product[] = [];
  filteredProducts: Product[] = [];
  currentCategory!: string | null;
  cart!: any;
  
 
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService, 
    private transformer: DataTransformerService,
    private cartService: ShoppingCartService
  ) {
    this.retrieveProducts();
    this.retrieveCart();
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  retrieveProducts(): void {

    const productList = this.productService.getAll();
    const products$ = this.transformer.toObsList(productList);

    const sub =
    products$.pipe(
      switchMap(products => {
        this.products = products;
        return this.route.queryParamMap
      }))
      .subscribe(params => {
        this.currentCategory = params.get('category');
        this.filteredProducts = this.currentCategory ?
        this.products.filter(p => p.category === this.currentCategory) :
        this.products
      });
      
    this.subscriptions.push(sub);  
  }

  async retrieveCart() {
    const cartObj = await this.cartService.getCart();
    const sub = cartObj
    .valueChanges()
    .subscribe(cart => {
      if(!cart) return;
      this.cart = cart;
      //entfernen
      console.log("this.cart");
      console.log(this.cart);
    });
    
    this.subscriptions.push(sub);
  }
  

}
