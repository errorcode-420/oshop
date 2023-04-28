
import { Component, ViewChild } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


export interface Test{//entfernen
  name:string;
  code:string;
}

@Component({
  selector: 'app-test-table',
  templateUrl: './test-table.component.html',
  styleUrls: ['./test-table.component.css']
})

export class TestTableComponent {

  testData: Test[] = [
    {name: "Mr. Yo", code: "54321"},
    {name: "Mr. Yo", code: "54321"},
    {name: "Mr. Yo", code: "54321"},
    {name: "Mr. Yo", code: "54321"},
    {name: "Mr. Yo", code: "54321"},
    {name: "Mr. Yo", code: "54321"},
    {name: "Mr. Yo", code: "54321"},
    {name: "Mr. Yo", code: "54321"},
    {name: "Mr. Yo", code: "54321"},
    {name: "Mr. Yo", code: "54321"},
    {name: "Mr. Yo", code: "54321"},
    {name: "Mr. Yo", code: "54321"},
    {name: "Mr. Yo", code: "54321"},
    {name: "Mr. Yo", code: "54321"},
    {name: "Mr. Yo", code: "54321"},
    {name: "Mr. Yo", code: "54321"},
    {name: "Mr. Yo", code: "54321"},
    {name: "Mr. Yo", code: "54321"},
    {name: "Mr. Yo", code: "54321"},
    {name: "Mr. Yo", code: "54321"},
    {name: "Mr. Yo", code: "54321"},
    {name: "Mr. Yo", code: "54321"},
    {name: "Mr. Yo", code: "54321"},
    {name: "Mr. Yo", code: "54321"},
    {name: "Mr. Yo", code: "54321"},
    {name: "Mr. Yo", code: "54321"},
    {name: "Mr. Yo", code: "54321"},
    {name: "Mr. Yo", code: "54321"},
    {name: "Mr. Yo", code: "54321"},
    {name: "Mr. Yo", code: "54321"},
    {name: "Mr. Yo", code: "54321"},
    {name: "Mr. Yo", code: "54321"},
    {name: "Mr. Yo", code: "54321"},
    {name: "Mr. Yo", code: "54321"},
    {name: "Mr. Yo", code: "54321"},
    {name: "Mr. Yo", code: "54321"},
    {name: "Jenkins", code: "12345"},
  ];
  dataSource: any;
  displayedColumns: string[] = ["code", "name"];
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    // private dialog: MatDialog
    ) {
    this.loadcustomer();
  }

  //entfernen

  getTestData(){


  }
  //entfernen
  loadcustomer() {
    this.dataSource = new MatTableDataSource<Test>(this.testData);
    this.dataSource.paginator = this.paginatior;
    this.dataSource.sort = this.sort;
}

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  editcustomer(code: any) {
    // this.Openpopup(code, 'Edit Customer');
  }

  addcustomer(){
    // this.Openpopup(0, 'Add Customer');
  }

  Openpopup(code: any, title: any) {
    // var _popup = this.dialog.open(PopupComponent, {
    //   width: '40%',
    //   enterAnimationDuration: '1000ms',
    //   exitAnimationDuration: '1000ms',
    //   data: {
    //     title: title,
    //     code: code
    //   }
    // });
    // _popup.afterClosed().subscribe(item => {
    //   // console.log(item)
    //   this.loadcustomer();
    // })
  }
}

