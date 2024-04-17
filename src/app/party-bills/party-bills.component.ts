import { Component, OnInit } from '@angular/core';
import { SalaryServiceService } from '../services/salary-service.service';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { PartyBillDetailsComponent } from '../packet-list/party-bill-details/party-bill-details.component';

@Component({
  selector: 'app-party-bills',
  templateUrl: './party-bills.component.html',
  styleUrls: ['./party-bills.component.scss']
})
export class PartyBillsComponent implements OnInit {
  selectedMonthRange: any;
  partyBillsData: any;
  loading: boolean = false
  dialogRef!: DynamicDialogRef;


  constructor(private salaryService: SalaryServiceService, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.partyBills()
  }

  partyBills(monthRange?: any) {
    this.loading = true;
    this.salaryService.getPartyBills(monthRange).subscribe((response: any) => {
      this.loading = false
      if (response && response.data) {
        this.partyBillsData = response.data
      }
    }, (error) => {
        this.loading = false
    })
  }

  viewDetails(bills: any) {
    this.dialogRef = this.dialogService.open(PartyBillDetailsComponent, {
      header: 'Party Bill Details',
      width: '80%',
      data: {
        bills: bills
      }
    });

    this.dialogRef.onClose.subscribe(() => {
      this.partyBills();
    });
  }

  

  handleDateChange(event: any) {
    const date = new Date(event);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${month.toString().padStart(2, '0')}/${year}`;
    if (formattedDate) {
      this.partyBills(formattedDate)
    }
  }
}
