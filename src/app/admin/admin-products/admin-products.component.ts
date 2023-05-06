import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/data/product.service';
import { DataTransformerService } from 'src/app/services/helpers/data-transformer.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {

  subscriptions: Subscription[] = [];
  products: Product[] = [];
  dataSource: any;
  displayedColumns: string[] = ['title', 'price', 'actions'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  currentProduct!: Product;


  constructor(
    private productService: ProductService, 
    private transformer: DataTransformerService,
    private router: Router
  ) { 
    this.retrieveProducts()
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });

    this
  }


  retrieveProducts(): void {

    const productList = this.productService.getAll();
    const products$ = this.transformer.toObsList(productList);
    const sub: Subscription =  products$.subscribe(data => {
      this.products = data;      
      this.dataSource = new MatTableDataSource<Product>(this.products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.subscriptions.push(sub);
  }


  filter(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;

    console.log("dataSource")
    console.log(this.dataSource)
    console.log(filvalue)
  }

  edit(id: string) {
    this.router.navigate(['/admin/products', id]);
  }

  delete(id: string) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    this.router.navigate(['admin/products']);
    this.productService.delete(id);
  }

  

  
}
