import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Category } from '../../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  dbPath: string;

  constructor(private db: AngularFireDatabase) {
    this.dbPath = '/categories/';
  }

  getAll(): AngularFireList<Category> {
    return this.db.list(this.dbPath);
  }  
}
