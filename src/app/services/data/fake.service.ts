import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


export interface FakeCustomer {
  code: number;
  name: string;
  phone: string;
  email: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})


export class FakeService {

  
  constructor() { }

  GetCustomers(): Observable<FakeCustomer[]>{
    const customers: FakeCustomer[] = [
      {
        code: 1,
        name: "John Doe",
        phone: "555-555-5555",
        email: "john.doe@gmail.com",
        status: "Active"
      },
      {
        code: 2,
        name: "Joey Doe",
        phone: "333-333-333",
        email: "joey.doe@gmail.com",
        status: "Active"
      },
    ];

    return of(customers);
  }

}
