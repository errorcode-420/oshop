import { Component } from '@angular/core';
import { FakeService, FakeCustomer } from '../services/data/fake.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatHeaderRowDef } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  customersList: FakeCustomer[] = [];
  dataSource: any;
  displayedColumns: string[] = ['code', 'name', 'phone', 'email', 'status', 'actions'];

  constructor(private service: FakeService) {
    this.service.GetCustomers().subscribe(data => {
      this.customersList = data;
      this.dataSource = new MatTableDataSource(this.customersList);
      console.log(this.customersList); // Do something with the data here
    });
  }

}
