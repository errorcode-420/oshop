import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  unsubscribeAll(subscriptions : Subscription[]){
    subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

 
}