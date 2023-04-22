import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject, QueryFn } from '@angular/fire/compat/database';
import { Observable, filter, map, of } from 'rxjs';
import { Category } from '../models/category';
import { Product } from '../models/product';
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

  
//entfernen test
  getById(id: string): AngularFireObject<Product> {
    return this.db.object(this.dbPath + id);
  }

  getAll(): AngularFireList<Product> {
    
    //entfernen
    console.log("getAll");
    console.log(this.productsRef);
    return this.productsRef;

  }  

  create(product: any) {    

    // const newProductRef = this.productsRef.push(product);
    // const newProductId = newProductRef.key;
    
    // //entfernen
    // console.log("CREATE");
    // console.log(newProductRef);
    // console.log(newProductId);
    this.db.list<Product>(this.dbPath).push(product);
  }

  update(id: string, product: any) {
    this.db.object(this.dbPath + id).update(product);
  }

  delete(id: string) {
    this.db.object(this.dbPath + id).remove();
  }
  
  // update(key: string, value: any): Promise<void> {
  //   return this.tutorialsRef.update(key, value);
  // }


  // create(tutorial: Tutorial): any {
  //   return this.tutorialsRef.push(tutorial);
  // }

}

