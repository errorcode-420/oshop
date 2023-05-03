import { Component } from '@angular/core';
import { ProductService } from '../services/data/product.service';
import { Subscription, switchMap } from 'rxjs';
import { Product } from '../models/product';
import { DataTransformerService } from '../services/data-transformer.service';
import { Category } from '../models/category';
import { CategoryService } from '../services/data/category.service';
import { ActivatedRoute } from '@angular/router';

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
  
 
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService, 
    private categoryService: CategoryService,
    private transformer: DataTransformerService
  ) 
  {
    this.retrieveProducts();

    // const sub = route.queryParamMap.subscribe(params => {
      
    //   let category = params.get('category');      
    //   this.filteredProducts = 
    //   category ? 
    //    this.products.filter(product => product.category === category)
    //   : 
    //    this.products;
    // });
    // this.subscriptions.push(sub);
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  retrieveProducts(): void {

    const productList = this.productService.getAll();
    const products$ = this.transformer.toObservable(productList);

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

        //entfernen
        console.log("currentCategory");
        console.log(this.currentCategory);
        console.log(this.products);
      })


    // const sub: Subscription =  products$.subscribe(data => {
    //   this.filteredProducts = this.products = data;  
    // });
    this.subscriptions.push(sub);
  
  }


}
