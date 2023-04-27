import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject, QueryFn } from '@angular/fire/compat/database';
import { Observable, filter, map, of } from 'rxjs';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import * as firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  dbPath: string;

  constructor(private db: AngularFireDatabase) {
    this.dbPath = '/products/';
    this.productsRef = db.list(this.dbPath);
  }

  productsRef: AngularFireList<Product>;

  
  getById(id: string): AngularFireObject<Product> {
    return this.db.object(this.dbPath + id);
  }

  getAll(): AngularFireList<Product> {
    return this.productsRef;
  }  

  create(product: any) {    
    this.db.list<Product>(this.dbPath).push(product);
  }

  update(id: string, product: any) {
    this.db.object(this.dbPath + id).update(product);
  }

  delete(id: string) {
    this.db.object(this.dbPath + id).remove();
  }

}

