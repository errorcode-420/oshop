import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/data/product.service';
import { DataTransformerService } from 'src/app/services/data-transformer.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { CategoryService } from 'src/app/services/data/category.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {

  subscriptions: Subscription[] = [];
  products: Product[] = [];
  filteredProducts?: Product[];

  //new table
  dataSource: any;
  displayedColumns: string[] = ['title', 'price'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  currentProduct!: Product;


  //entfernen test
  dtOptions: any;


  constructor
  (
    private productService: ProductService, 
    private transformer: DataTransformerService,
    private categoryService: CategoryService
  ){this.retrieveProducts()}


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


      //entfernen test
      console.log("this.filteredProducts");
      console.log(this.filteredProducts);

      //new table
      this.dataSource = new MatTableDataSource<Product>(this.filteredProducts);
      this.dataSource.paginator = this.paginator;

      this.dataSource.sort=this.sort;

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