import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from './user.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireDatabase, QueryFn } from '@angular/fire/compat/database';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) {}

  getCategories(): Observable<Category[]> {
    const queryFn: QueryFn = ref => ref.orderByChild('name');
    return this.db.list<Category>('/categories', queryFn).valueChanges();
  }
  
}
