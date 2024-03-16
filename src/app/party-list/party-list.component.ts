import { Component, OnInit } from '@angular/core';
import { PartyService } from '../services/party.service';
import { PrimeNGConfig } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-party-list',
  templateUrl: './party-list.component.html',
  styleUrls: ['./party-list.component.scss']
})
export class PartyListComponent implements OnInit {
  dialogRef!: DynamicDialogRef;

  loading: boolean = false;

  parties: any[] = [];

  // Define columns
  cols: any[] = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'email', header: 'Email' },
    { field: 'mobileNo', header: 'Mobile Number' },
    { field: 'gstNo', header: 'GST Number' },
  ];


  globalFilter!: string;

  constructor(private primengConfig: PrimeNGConfig, private dialogService: DialogService, private partyService: PartyService) { }

  ngOnInit() {
    // Enable gridlines
    this.primengConfig.ripple = true;
    this.loading = true;
    this.getEmployees()
  }

  getEmployees() {
    this.partyService.getParty().subscribe(response => {
      if (response && response.statusCode == 200 && response.status) {
        this.loading = false;
        this.parties = response.data
        console.log("this.parties =>", this.parties)
      }
    }, (error) => {
      this.loading = false;

    }, () => {
      this.loading = false;
    })

  }


  filter(value: string, field: string) {
    this.globalFilter = value;
  }

  editEmployee(employee: any) {
    // this.openAddEmployeeDialog(employee);
  }

  clear(table: Table) {
    table.clear();
  }


  // openAddEmployeeDialog(employee?: any) {
  //   this.dialogRef = this.dialogService.open(, {
  //     header: employee ? 'Edit Employee' : 'Add Employee',
  //     width: '80%',
  //     data: {
  //       employee: employee
  //     }
  //   });

  //   this.dialogRef.onClose.subscribe(() => {
  //     this.getEmployees();
  //   });

  // }

  // viewEmployee(employee?: any) {
  //   this.dialogRef = this.dialogService.open(, {
  //     header: 'Employee Details',
  //     width: '40%',
  //     data: {
  //       employee: employee
  //     }
  //   });
  // }


  openAddpartyDialog(party?: any) {

  }

}
