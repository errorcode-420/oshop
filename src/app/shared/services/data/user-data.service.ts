import { Injectable } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { take } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { generateRandomId } from '../helpers/id-generator.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private auth: AuthService, private db: AngularFireDatabase) { }

  async create(dbPathBase: string): Promise<string> {
    return new Promise<string>((resolve) => {
      this.auth.appUser$.pipe(take(1)).subscribe(async (user) => {
        if (!user) {
          resolve(`${dbPathBase}`);
        }
        else {
          let id = user.id;
          let dbPathUser = `/user-data/${id}/${dbPathBase}/`;
          await this.setUpDefaultData(dbPathUser, dbPathBase);
          resolve(dbPathUser);
        }
      });
    });
  }   

  async setUpDefaultData(dbPathUser: string, dbPathBase: string) {
    const dataExists = await this.checkIfDataExists(dbPathUser);
  
    if (!dataExists) {
      const defaultData = await this.retrieveDefaultData(dbPathBase);
      await this.updateUserData(dbPathUser, defaultData);
    }
  }
  
  async checkIfDataExists(dbPathUser: string): Promise<boolean> {
    const currentData = await this.db.object(dbPathUser).valueChanges().pipe(take(1)).toPromise();
    return !!currentData;
  }
  
  async retrieveDefaultData(dbPathBase: string): Promise<any> {
    return this.db.list(dbPathBase).valueChanges().pipe(take(1)).toPromise();
  }
  
  async updateUserData(dbPathUser: string, data: any): Promise<void> {

    const result: { [key: string]: any } = {};
    data.forEach((item: any) => {
      const id = generateRandomId(20, ' - lowercase uppercase numbers');
      result[id] = item;
    });
    
    const dataToUpload = Object.assign({}, result);
    const objRef = this.db.object(dbPathUser);
    return objRef.update(dataToUpload);
  } 
}
