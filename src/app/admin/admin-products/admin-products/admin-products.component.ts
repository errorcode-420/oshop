import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/data/product.service';
import { DataTransformerService } from 'src/app/shared/services/helpers/data-transformer.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Popup } from '../../../shared/components/dialogs/popup';
import { MatDialog } from '@angular/material/dialog';
import { DeleteProductPopupComponent } from '../../../shared/components/dialogs/delete-product-popup/delete-product-popup.component';
import { fade } from 'src/app/shared/services/animation.service';

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
  animations: [fade]
})
export class AdminProductsComponent implements OnDestroy {

  subscriptions: Subscription[] = [];
  products: Product[] = [];
  dataSource: any;
  displayedColumns: string[] = ['title', 'price', 'actions', 'image'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  currentProduct!: Product;

  get pageSize() {
    const pageSize = localStorage.getItem('pageSize') || "5";
    return parseInt(pageSize);
  }

  constructor(
    private dialog: MatDialog,
    private productService: ProductService, 
    private transformer: DataTransformerService,
    private router: Router
  )
  { 
    this.retrieveProducts();
  }

  async retrieveProducts(): Promise<void> {
    const productList = await this.productService.getAll();
    const products$ = this.transformer.toObsList(productList);
    const sub: Subscription = products$.subscribe(data => {
      this.products = data;  
      this.dataSource = new MatTableDataSource<Product>(this.products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;  
    });
  
    this.subscriptions.push(sub);
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.dataSource.filterPredicate = (data: Product, filter: string) => {
      return (
        data.title.toLowerCase().includes(filterValue)
      );
    };

    this.dataSource.filter = filterValue;
  }  

  edit(id: string) {
    this.router.navigate(['/admin/products', id]);
  }
  
  delete(id: string) {
    const callback = () => this.productService.delete(id);   
    new Popup(this.dialog).create(DeleteProductPopupComponent, callback); 
  }

  changePageSetting(event: PageEvent) {
    const pageSize = event.pageSize;
    localStorage.setItem('pageSize', pageSize.toString());
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }  
}
