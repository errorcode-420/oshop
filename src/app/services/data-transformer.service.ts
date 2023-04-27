import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataTransformerService {

  toObservable<T>(fireList: AngularFireList<T>): Observable<T[]> {
    return fireList.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val() } as T)
        )
      ),
      shareReplay(1)
    );
  }
}

