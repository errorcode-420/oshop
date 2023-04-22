import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {

  subscription: Subscription;
  products: Product[] = [];
  filteredProducts?: Product[];
  currentProduct!: Product;


  constructor(private productService: ProductService) { 
    this.subscription = this.productService.getAll().valueChanges()
      .subscribe(products => this.filteredProducts = this.products = products);
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  ngOnInit(): void {
    this.getProducts();
    this.currentProduct ={...this.currentProduct };
  }



  getProducts(): void {
    this.productService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val() }) //entfernen Code verstehen
        )
      )
    ).subscribe(data => {
      // this.products = data as Product[];

      //entfernen
      console.log("getProducts");
      console.log(this.products);
    });
  }

  filter(query: string) {

      //entfernen
      console.log("products 1");
      console.log(this.products);
      console.log(this.filteredProducts);


    this.filteredProducts = (query) ?
      this.products.filter(p => {
              //entfernen
      console.log("products 2");
      console.log(this.products);
      console.log(this.filteredProducts);
      console.log("------------------------------------");

        p.title.toLowerCase().includes(query.toLowerCase())
      }) :
      this.products;


      //entfernen
      console.log("products 3");
      console.log(this.products);
      console.log(this.filteredProducts);
      console.log("------------------------------------");

  }


}