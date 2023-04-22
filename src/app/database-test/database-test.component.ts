import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, Subscription, map } from 'rxjs';

@Component({
  selector: 'database-test',
  templateUrl: './database-test.component.html',
  styleUrls: ['./database-test.component.css']
})

export class DatabaseTestComponent {

  items$;
  itemCount!: number;
  subscription: Subscription;

  constructor(private db: AngularFireDatabase) {
    this.items$ = db.list<Item>('/items').valueChanges();
    this.subscription = this.items$.subscribe(items => {
      this.itemCount = items.length;
    });
  }

}

export interface Item {
  name: string;
  id: number;
}


