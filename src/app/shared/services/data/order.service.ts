import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Order } from 'src/app/shared/models/order';
import * as moment from 'moment';
import { ShoppingCartService } from './shopping-cart.service';
import { AuthService } from '../authentication/auth.service';
import { UserDataService } from './user-data.service';
import { generateRandomId } from '../helpers/id-generator.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  dbPathBase: string;
  dbPathUser: string  = '';

  constructor
  (
    private auth: AuthService,
    private db: AngularFireDatabase,
    private cartService: ShoppingCartService,
    private userDataService: UserDataService
  ) 
  {
    this.dbPathBase = '/orders/';
    this.auth.appUser$.subscribe(user => {
      if(!user) this.dbPathUser = '';
    })
  }

  getCurrentPath(): string {
    if(this.dbPathUser!='' ) return this.dbPathUser;
    else return this.dbPathBase;
  }
  
  getById(id: string): AngularFireObject<Order> {
    const path = `${this.getCurrentPath()}${id}`;
    return this.db.object(path);
  } 

  getByUser(appUser: any): AngularFireList<Order> {
    const id = appUser?.id + '';
    return this.db.list(this.getCurrentPath(), ref => ref.orderByChild('uid').equalTo(id));
  }
  
  
  async getAll(): Promise<AngularFireList<Order>> {
    console.log('load data');
    this.dbPathUser = await this.userDataService.create(this.dbPathBase);
    return this.db.list(this.getCurrentPath());
  }

  async create(order: Order): Promise<string> {
    order = this.createReference(order);
    order = this.createTimeStamp(order);
    return this.db.list<Order>(this.getCurrentPath()).push(order).then(result => {
      const orderId = result.key + "";
      this.cartService.clearCart();
      return orderId;
    });
  }

  delete(id: string) {
    const path = `${this.getCurrentPath()}${id}`;
    const objRef = this.db.object(path);
    objRef.remove();
  }
  
  createTimeStamp(order: Order) {
    const timeStamp = moment().format('YYYY.MM.DD HH:mm');
    order.date = timeStamp;
    return order;
  }  

  createReference(order: Order) {
    let reference = generateRandomId(6, 'uppercase numbers');
    order.reference = reference;
    return order;
  } 
}
