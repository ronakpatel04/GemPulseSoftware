import { Component, OnInit } from '@angular/core';
import { PartyService } from '../services/party.service';
import { PrimeNGConfig } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { PartyAddComponent } from './party-add/party-add.component';
import { PartyViewComponent } from './party-view/party-view.component';

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
    this.getPalties()
  }

  getPalties() {
    this.partyService.getParty().subscribe(response => {
      if (response && response.statusCode == 200 && response.status) {
        this.loading = false;
        this.parties = response.data
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

  editEmployee(Palty: any) {
    this.openAddpartyDialog(Palty);
  }

  clear(table: Table) {
    table.clear();
  }




  openAddpartyDialog(party?: any) {

    this.dialogRef = this.dialogService.open(PartyAddComponent, {
      header: party ? 'Edit Palty' : 'Add Palty',
      width: '80%',
      data: {
        party: party
      }
    });

    this.dialogRef.onClose.subscribe(() => {
      this.getPalties();
    });

  }

  viewParty(party?: any) {
    this.dialogRef = this.dialogService.open(PartyViewComponent, {
      header: 'Party Details',
      width: '40%',
      data: {
        party: party
      }
    });
  }

}
