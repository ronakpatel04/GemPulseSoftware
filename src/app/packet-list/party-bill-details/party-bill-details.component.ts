import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-party-bill-details',
  templateUrl: './party-bill-details.component.html',
  styleUrls: ['./party-bill-details.component.scss']
})
export class PartyBillDetailsComponent implements OnInit {

  billData:any;
  currentDate: string  | null = null;
  totalItems: number = 0;
  totalRawWeight: number = 0;
  totalFinalWeight: number = 0;
  totalExpactedWeight:number=0;
  totalmarkableWeight : number = 0;
  totalBill : number = 0;
  formattedBillDate: string = '';



  constructor( private ref: DynamicDialogRef,private config: DynamicDialogConfig,private datePipe: DatePipe){}

  ngOnInit(): void {
    this.billData = this.config.data.bills;
    this.currentDate = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
    this.calculateTotals();
    this.formatBillDate();

  }

  calculateTotals(): void {
    this.totalItems = this.billData.taskBills.length;
    this.totalRawWeight = this.billData.taskBills.reduce((total:any, bill:any) => total + (bill.rawWeight || 0), 0);
    this.totalBill =  this.billData.taskBills.reduce((total:any, price:any)=>total + (price.paltyBill || 0),0);
  }

  formatBillDate(): void {
    const billDate = new Date(this.billData.billDate);
    const startOfMonth = new Date(billDate.getFullYear(), billDate.getMonth(), 1);
    const endOfMonth = new Date(billDate.getFullYear(), billDate.getMonth() + 1, 0);
    const formattedStartDate = this.datePipe.transform(startOfMonth, 'dd/MM/yyyy'); 
    const formattedEndDate = this.datePipe.transform(endOfMonth, 'dd/MM/yyyy'); 
    this.formattedBillDate = `${formattedStartDate} To ${formattedEndDate}`;
  }


}
