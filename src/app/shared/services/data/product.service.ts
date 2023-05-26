import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/compat/database';
import { Product } from '../../models/product';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  dbPath!: string;
  dbPathBase: string;
  dbPathUser: string  = '';

  constructor
  (
    private db: AngularFireDatabase, 
    private userDataService: UserDataService
  ) 
  {
      this.dbPathBase = '/products/';
  }

  getCurrentPath(): string {
    if(this.dbPathUser!='' ) return this.dbPathUser;
    else return this.dbPathBase;
  }
  
  getById(id: string): AngularFireObject<Product> {
    const path = `${this.getCurrentPath()}${id}`;
    return this.db.object(path);
  }    
  
  async getAll(): Promise<AngularFireList<Product>> {
    this.dbPathUser = await this.userDataService.create(this.dbPathBase);
    // return this.db.list(this.getCurrentPath(), ref => ref.limitToFirst(4)); // for testing with only a few products
    return this.db.list(this.getCurrentPath());
  }

  create(product: Product) {
    const path = this.getCurrentPath();
    const listRef = this.db.list<Product>(path)
    listRef.push(product);
  }

  update(id: string, product: Product) {
    const path = `${this.getCurrentPath()}${id}`;
    const objRef = this.db.object(path);
    objRef.update(product);
  }

  delete(id: string) {
    const path = `${this.getCurrentPath()}${id}`;
    const objRef = this.db.object(path);
    objRef.remove();
  }
  
}

