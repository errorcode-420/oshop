import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataTransformerService {

  toObsList<T>(fireList: AngularFireList<T>): Observable<T[]> {
    return fireList.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val() } as T)
        )
      ),
      shareReplay(1)
    );
  }

  toObsObj<T>(object: AngularFireObject<T>): Observable<T> {
    return object.snapshotChanges().pipe(
      map(c => ({ id: c.payload.key, ...c.payload.val() } as T))
    );
  }

  toArr<T>(items: T[]): T[] {
    if(!items) return [];
    return Object.values(items) as T[];
  }

}

