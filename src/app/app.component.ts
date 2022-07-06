import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from './Model/Employee';
import { MasterService } from './Service/master.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app1';
  displayedColumns: string[] = ['code', 'name', 'phone','email','action'];
  dataSource :any;
  empdata: any;

  @ViewChild(MatPaginator) paginator !:MatPaginator;
  @ViewChild(MatSort) sort !:MatSort;

  constructor(private service: MasterService) {

  }
  ngOnInit(): void {
    this.GetAll();
  }

  GetAll() {
    this.service.GetEmployee().subscribe(result => {
      this.empdata = result;

      this.dataSource=new MatTableDataSource<Employee>(this.empdata)
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    });
  }
  Filterchange(event:Event){
    const filvalue=(event.target as HTMLInputElement).value;
    this.dataSource.filter=filvalue;
  }
  getrow(row:any){
    //console.log(row);
  }
  FunctionEdit(row:any){
    console.log(row);
  }

  
}
