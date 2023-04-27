import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/data/product.service';
import { DataTransformerService } from 'src/app/services/data-transformer.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {

  subscriptions: Subscription[] = [];
  products: Product[] = [];
  filteredProducts?: Product[];
  currentProduct!: Product;


  //entfernen test
  dtOptions: any;


  constructor(private productService: ProductService, private transformer: DataTransformerService) { 

    this.retrieveProducts()

  }


  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }


  retrieveProducts(): void {

    const productList = this.productService.getAll();
    const products$ = this.transformer.toObservable(productList);
    const sub: Subscription =  products$.subscribe(data => {
      this.filteredProducts = this.products = data;
    });
    this.subscriptions.push(sub);
  }


  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(p => {
        return p.title.toLowerCase().includes(query.toLowerCase())
      }) :
      this.products;
  }


}