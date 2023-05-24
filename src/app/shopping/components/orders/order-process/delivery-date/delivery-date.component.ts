import { Component } from '@angular/core';

@Component({
  selector: 'delivery-date',
  templateUrl: './delivery-date.component.html',
  styleUrls: ['./delivery-date.component.css']
})
export class DeliveryDateComponent {
  earliestDate!: Date;
  latestDate!: Date;

  constructor() {
    this.calculateDeliveryDates();
  }

  calculateDeliveryDates() {
    const today = new Date();
    this.earliestDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3);
    this.latestDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5);
  }
}
