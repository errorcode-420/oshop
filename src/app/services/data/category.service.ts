import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from './user.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList, QueryFn } from '@angular/fire/compat/database';
import { Category } from '../../models/category';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  dbPath: string;

  constructor(private db: AngularFireDatabase) {
    this.dbPath = '/categories/';
    this.productsRef = db.list(this.dbPath);
  }



  productsRef: AngularFireList<Category>;

  getAll(): AngularFireList<Category> {
    return this.productsRef;
  }  
  
  
}
