import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/shared/models/order';
import { OrderService } from 'src/app/shared/services/data/order.service';
import { DataTransformerService } from 'src/app/shared/services/helpers/data-transformer.service';
import { AppUser } from 'src/app/shared/models/app-user';
import { AuthService } from 'src/app/shared/services/authentication/auth.service';
import { Popup } from 'src/app/shared/components/dialogs/popup';
import { MatDialog } from '@angular/material/dialog';
import { DeleteOrderPopupComponent } from 'src/app/shared/components/dialogs/delete-order-popup/delete-order-popup.component';


@Component({
  selector: 'order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent {
  
  @Input('usage') usage!: string;

  subscriptions: Subscription[] = [];
  url = this.router.url;
  dataSource: any;
  displayedColumns: string[] = ['date', 'region', 'quantity', 'value', 'reference', 'actions'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  appUser!: AppUser | null; 
  orders!: Order[];
  
  get pageSize() {
    const pageSize = localStorage.getItem('pageSize') || "5";
    return parseInt(pageSize);
  }
  
  constructor(
    private dialog: MatDialog,
    private orderService: OrderService,
    private auth: AuthService,
    private transformer: DataTransformerService,
    private router: Router
  ) { 
    this.retrieveData(); 
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  } 
  

  retrieveData(): void {
    const sub = 
    this.auth.appUser$.subscribe(appUser => {
      this.appUser = appUser;
      console.log("this.appUser");
      console.log(this.appUser);
      this.retrieveOrders(); 
    });

    this.subscriptions.push(sub);
  }

  async retrieveOrders(): Promise<void> {
    let orderList;
    let orders$;

    const adminUsage = this.url === "/admin/orders" && this.appUser?.isAdmin;
    if (adminUsage) {
      orderList = await this.orderService.getAll();
      orders$ = this.transformer.toObsList(orderList);
    }
    else if (!adminUsage){
      orderList = this.orderService.getByUser(this.appUser);
      orders$ = this.transformer.toObsList(orderList);
    }
    else return;
  
    const sub: Subscription = orders$.subscribe(data => {
      this.orders = data
      data.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      this.dataSource = new MatTableDataSource<Order>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    
    this.subscriptions.push(sub);
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.dataSource.filterPredicate = (data: Order, filter: string) => {
      return (
        data.address.city.toLowerCase().includes(filterValue) ||
        data.address.zip.toString().includes(filterValue) ||
        data.reference.toLowerCase().includes(filterValue) 
      );
    };

    this.dataSource.filter = filterValue;
  }  

  details(id: string) {   
    console.log("this.url", this.url);
    console.log("id", id);
    this.router.navigate([this.url, id]);
  }

  delete(id: string) {
    const callback = () => this.orderService.delete(id);   
    new Popup(this.dialog).create(DeleteOrderPopupComponent, callback); 
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