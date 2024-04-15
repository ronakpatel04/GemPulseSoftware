import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-salary-details',
  templateUrl: './salary-details.component.html',
  styleUrls: ['./salary-details.component.scss']
})
export class SalaryDetailsComponent  implements OnInit{

  salarydata:any;
  currentDate: string  | null = null;
  totalItems: number = 0;
  totalRawWeight: number = 0;
  totalFinalWeight: number = 0;
  totalExpactedWeight:number=0;
  totalmarkableWeight : number = 0;
  totalSalary : number = 0;


  constructor( private ref: DynamicDialogRef,private config: DynamicDialogConfig,private datePipe: DatePipe){}
  
  ngOnInit(): void {
       this.salarydata = this.config.data.salary;
       this.currentDate = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
       this.calculateTotals();

       console.log("this.salaryData =>" , this.salarydata )
  }
  calculateTotals(): void {
    this.totalItems = this.salarydata.taskPrices.length;
    this.totalmarkableWeight = this.salarydata.taskPrices.reduce((total:any, salary:any) => total + (salary.weight?.markableWeight || 0), 0);
    this.totalSalary =  this.salarydata.taskPrices.reduce((total:any, salary:any)=>total + (salary.workerSalary || 0),0);
  }

}
