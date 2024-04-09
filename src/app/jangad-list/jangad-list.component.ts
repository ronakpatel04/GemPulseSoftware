import { Component, OnInit } from '@angular/core';
import { PartyService } from '../services/party.service';
import { JangadService } from '../services/jangad.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PrintJangadComponent } from '../print-jangad/print-jangad.component';

@Component({
  selector: 'app-jangad-list',
  templateUrl: './jangad-list.component.html',
  styleUrls: ['./jangad-list.component.scss']
})
export class JangadListComponent implements OnInit {
    
  jangadData: any;
  loading: boolean = false;
  selectedPalty: any;
  paltyOptions: any[] = [];
  selectedDiamonds: any[] = [];
  isSelectAll: boolean = false;
  dialogRef!: DynamicDialogRef;


  constructor(private paltyService: PartyService, private jangadService: JangadService,private dialogService: DialogService) {}

  ngOnInit(): void {
    this.jangadList();
    this.getPaltyOptions();
    console.log("selectedDiamonds" , this.selectedDiamonds)
  }

  jangadList(party?: any) {
    if (this.selectedPalty) {
      this.jangadService.getJangadList(this.selectedPalty).subscribe(
        (response: any) => {
          if (response && response.data) {
            this.jangadData = response.data.map((data: any) => {
              data.name = `${data.employeeId.firstName} ${data.employeeId.lastName}`;
              data.code = `${data.employeeId.employeeId}`;
              data.isSelected = false; // Initialize isSelected property
              return data;
            });
          }
        });
    } else {
      this.jangadService.getJangadList().subscribe(
        (response: any) => {
          if (response && response.data) {
            this.jangadData = response.data.map((data: any) => {
              data.name = `${data.employeeId.firstName} ${data.employeeId.lastName}`;
              data.code = `${data.employeeId.employeeId}`;
              data.isSelected = false; // Initialize isSelected property
              return data;
            });
          }
        });
    }
  }

  getPaltyOptions(): void {
    this.paltyService.getParty().subscribe(options => {
      this.paltyOptions = options.data;
    });
  }

  selectParty(party: any) {
    this.jangadList(party);
  }

  getSelectedDiamonds()
  {
    console.log("selectedDiamonds" , this.selectedDiamonds)

  }
  print()
  {
      console.log("this.selctedDiamond =>" , this.selectedDiamonds)
    
    if(this.selectedDiamonds.length>0)
    {
      const data = {
          diamonds : this.selectedDiamonds,
          party:this.selectedPalty
      }

    this.dialogRef = this.dialogService.open(PrintJangadComponent, {
      header: "",
      width: '60%',
      data: {
        diamonds: data
      }
    });

    this.dialogRef.onClose.subscribe(() => {

    });
  }
}
}
