import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-test2',
  template:`
  <li *ngFor="let emp of employee">
    <ol>{{emp.userId }}{{emp.title}}</ol>
  </li>  
  `,
  styleUrls: ['./test2.component.css']
})
export class Test2Component implements OnInit {
  public employee:any=[]
  constructor(private _employeeService2:EmployeeService){

  }
  ngOnInit(): void {
    this._employeeService2.getEmployees().subscribe(data=>this.employee=data)
  }
}
