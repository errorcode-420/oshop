import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import firebase from 'firebase/compat/app';
import { AppUser } from '../../models/app-user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  dbPath: string;

  constructor(private db: AngularFireDatabase) {
    this.dbPath = '/users/';
  }

  save(user: firebase.User) {
    const path = `${this.dbPath}${user.uid}`;
    const objRef = this.db.object(path);
    objRef.update({
      name: user.displayName,
      email: user.email
    });
  }

  get(id: string): AngularFireObject<AppUser> {
    const path = `${this.dbPath}${id}`;
    return this.db.object<AppUser>(path);
  }
  
  updateMode(userId: string, itemData: Partial<AppUser>) {
    const path = `${this.dbPath}${userId}`
    const objRef = this.db.object<AppUser>(path);
    return objRef.update(itemData);
  }

}
