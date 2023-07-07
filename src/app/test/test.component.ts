import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-test',
  template: `
  <h1 class="text-red">Hi, {{siteUrl}}</h1>
  <h2>{{"Welcome"+topic1}}</h2>
  <h2>{{topic1.toUpperCase()}}</h2>
  <h2>{{greetUser() | uppercase}}</h2>
  <h2 [id]="id">hi from h2</h2>
  <button bind-disabled="true">hi from first btn</button>
  <button [disabled]="id" [class.text-danger]="hasError">hi from second btn</button>
  <button [disabled]="id" [class]="successClass">hi from third btn</button>
  <h1 [ngClass]="styleClass">testing</h1>
  <h1 [style.color]="hasError? xColor:'green'">Inline styling</h1>
  <button (click)="onClick($event)">Greet</button>
  <button (click)="greeting='Welcome Vishwas'">Greet</button>
  <h3>{{greeting}}</h3>
  <input #link type="text">
  <button (click)="logger(link.value)">Log</button>
  <input type="text" [(ngModel)]="name" placeholder="username"/>
  <h4>{{name}}</h4>
  <p *ngIf="displayBool;else myD">hide and seek</p>
  <ng-template #myD>
  <p >hide and seek hidden</p>
  </ng-template>

  <div *ngIf="!displayBool; then thenBlock; else elseBlock"></div>
  <ng-template #thenBlock>
  <p >hide and seek</p>
  </ng-template>

  <ng-template #elseBlock>
  <p >hide and seek hidden</p>
  </ng-template>

  <div [ngSwitch]="colour">
    <div *ngSwitchCase="'red'"> You picked red colour</div>
    <div *ngSwitchCase="'blue'"> You picked blue colour</div>
    <div *ngSwitchCase="'green'"> You picked green colour</div>
    <div *ngSwitchDefault>Pick again</div>
  </div>

  <div *ngFor="let color of colors; odd as j">
  <h2>{{j}} {{color}}</h2>
  </div>

  <div *ngFor="let color of colors; even as j">
  <h2>{{j}} {{color}}</h2>
  </div>

  <div *ngFor="let color of colors; first as j">
  <h2>{{j}} {{color}}</h2>
  </div>

  <div *ngFor="let color of colors; last as j">
  <h2>{{j}} {{color}}</h2>
  </div>
  <h3>Hello {{nameIncoming}}</h3>
  <!-- <button (click)="fireEvent()">Emit</button> -->
  <li *ngFor="let emp of employee">
      <ol>
        {{emp.id}}
      </ol>
  </li>
  `,
  styles:[`
  .text-red{
    color:red;
  }
  .text-danger{
    color:blue;
  }
  .text-bold{
    font-weight:100
  }
  `]
})
export class TestComponent implements OnInit {
  public employee:any=[]
 // @Input() public parentData :string=''
  @Input('parentData') public nameIncoming :string=''
  @Output() public testEvent=new EventEmitter()
  public topic1:string='Interpolation'
  public topic2:string='Property binding'
  public siteUrl:string=window.location.href
  public id:boolean=false
  public successClass:string='text-red'
  public hasError:boolean=true
  public xColor='brown'
  public greeting:string="Initially-greeting"
  public styleClass={
    'text-red':this.hasError,
    'text-danger':!this.hasError,
    'text-bold':this.hasError
  }
  public name:string=""
  public displayBool:boolean=true
  public colour:string='blue'
  public colors=[1,2,3,4,5]
  
  constructor(private _employeeService: EmployeeService){
    
  }

  ngOnInit(): void {
    this._employeeService.getEmployees().subscribe(data=>this.employee=data)
  }
  
  greetUser(){
    return "Hello "+this.topic1
  }
  onClick(event:any){
    console.log(event)
    const data=this.greeting
    if(data==="Initially-greeting"){
      this.greeting="Initial-greeting-changed-now"
    } 

    if(data==="Initial-greeting-changed-now"){
      this.greeting="Initially-greeting"
    } 
    
    window.alert(this.greeting)
  }
  logger(val:any){
    alert(val)
  }
  fireEvent(){
    console.log("im here")
    this.testEvent.emit("Hello from child")
  }
}
