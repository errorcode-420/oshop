import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject, QueryFn } from '@angular/fire/compat/database';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  dbPath: string;

  constructor(private db: AngularFireDatabase) {
    this.dbPath = '/products/';
  }
  
  getById(id: string): AngularFireObject<Product> {
    const path = `${this.dbPath}${id}`;
    console.log(path);//entfernen

    return this.db.object(path);
  }

  // getAll(): AngularFireList<Product> {
  //   return this.db.list(this.dbPath);
  // }  
  getAll(): AngularFireList<Product> {
    return this.db.list(this.dbPath, ref => ref.limitToFirst(5));
  }  //entfernen nur 5 laden
  //methode oben wieder einfügen

  

  create(product: Product) {
    this.db.list<Product>(this.dbPath).push(product);
  }

  update(id: string, product: Product) {
    const path = `${this.dbPath}${id}`;
    console.log(path);//entfernen

    this.db.object(path).update(product);
  }

  delete(id: string) {
    const path = `${this.dbPath}${id}`;
    this.db.object(path).remove();
  }

}

