import { Component, OnInit, ViewChild } from '@angular/core';
import { PartyService } from '../services/party.service';
import { JangadService } from '../services/jangad.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PrintJangadComponent } from '../print-jangad/print-jangad.component';
import { Table } from 'primeng/table';
import { AssignDiamondService } from '../services/assign-diamond.service';
import { ToastrService } from 'ngx-toastr';

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
  @ViewChild('dt1') table!: Table;



  constructor(private paltyService: PartyService, private jangadService: JangadService, private dialogService: DialogService, private diamondAssignService: AssignDiamondService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.jangadList();
    this.getPaltyOptions();
  }

  jangadList(party?: any) {
    this.loading = true
    if (this.selectedPalty) {
      this.jangadService.getJangadList(this.selectedPalty).subscribe(
        (response: any) => {
          this.loading = false
          if (response && response.data) {
            this.jangadData = response.data.map((data: any) => {
              data.name = `${data.employeeId.firstName} ${data.employeeId.lastName}`;
              data.code = `${data.employeeId.employeeId}`;
              data.isSelected = false;
              return data;
            });
          }
        });
    } else {
      this.loading = true
      this.jangadService.getJangadList().subscribe(
        (response: any) => {
          this.loading = false
          if (response && response.data) {
            this.loading = false;
            this.jangadData = response.data.map((data: any) => {
              data.name = `${data.employeeId.firstName} ${data.employeeId.lastName}`;
              data.code = `${data.employeeId.employeeId}`;
              data.isSelected = false;
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

  getSelectedDiamonds() {

  }
  print() {
    if (this.selectedDiamonds.length > 0) {
      const data = {
        diamonds: this.selectedDiamonds,
        party: this.selectedPalty
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
  submitted() {
    const selectedPackets = this.table.selection;
    if (selectedPackets.length > 0) {
      selectedPackets.forEach((diamonds: any) => {

        if (diamonds._id) {
          const id = diamonds._id
          const payload =
          {
            polish_status: 'Submitted'
          }
          this.loading = true;
          this.diamondAssignService.diamondPolishStatusUpdate(id, payload).subscribe((response: any) => {
            this.loading = false
            if (response && response.status) {
                  this.jangadList();
            } else {
              this.toastrService.error(response.message, 'Error');
              return;
            }
          }, (error) => {
            this.toastrService.error(error.error.message, 'Error')
            return;
          });
        }
      })
    }
  }
}


