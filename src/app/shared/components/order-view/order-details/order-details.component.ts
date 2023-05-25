import { Component, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { OrderService } from 'src/app/shared/services/data/order.service';
import { Order } from 'src/app/shared/models/order';
import { AppUser } from 'src/app/shared/models/app-user';
import { fade } from 'src/app/shared/services/animation.service';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  animations: [fade]
})
export class OrderDetailsComponent {

  @Input('usage') usage!: string;

  subscriptions: Subscription[] = [];
  id: string;
  currentOrder!: Order;
  currentUse= 0
  appUser!: AppUser;
  earliestDate!: Date;
  latestDate!: Date;

  constructor(private orderService: OrderService, private route: ActivatedRoute) 
  {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {    
      this.retrieveCurrentOrder(this.id);
    }
  }
  
  ngOnInit() {
    window.scrollTo(0, 0);
  } 

  retrieveCurrentOrder(id: string) {
    const productObj = this.orderService.getById(id);
    const sub = productObj
    .valueChanges()
    .subscribe(order=> {
      if(!order) return;
      this.currentOrder = order;  
      this.calculateDeliveryDates()
    });
    this.subscriptions.push(sub);    
  }

  calculateDeliveryDates() {
    const day = new Date(this.currentOrder.date);
    this.earliestDate = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 3);
    this.latestDate = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 5);
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }


  
  
}
