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

  toObsObj<T>(object: AngularFireObject<T>): Observable<{ key: string | null, value: T | null }> {
    return object.snapshotChanges().pipe(
      map(c => ({ key: c.payload.key, value: c.payload.val() }))
    );
  }

}

