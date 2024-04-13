import { Component, OnInit } from '@angular/core';
import { PartyService } from '../services/party.service';
import { EmployeeService } from '../services/employee.service';
import { PacketService } from '../services/packet.service';
import { AssignDiamondService } from '../services/assign-diamond.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PacketAddComponent } from '../packet-list/packet-add/packet-add.component';
import { IssueReturnComponent } from './issue-return/issue-return.component';
import { DiamondAssignFormComponent } from './diamond-assign-form/diamond-assign-form.component';

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.scss']
})
export class IssueFormComponent implements OnInit {
  formGroup!: FormGroup;

  employeeDropdown: any[] = [];
  partyDropdown: any[] = [];
  diamondDropdown: any[] = [];
  selectEmployee: any;
  selectParty: any;
  selectDiamond: any;
  values: any;
  diamonds: any[] = [];
  loading: boolean = false;
  globalFilter!: string;
  dialogRef!: DynamicDialogRef;




  constructor(private employeeService: EmployeeService, private paltyService: PartyService, private assignDiamondService: AssignDiamondService, private packetService: PacketService, private toastrService: ToastrService, private primengConfig: PrimeNGConfig, private dialogService: DialogService) { }


  ngOnInit(): void {
    this.formGroup = new FormGroup({
      values: new FormControl<string[] | null>(null)
    });

    this.getAllEmployee();
    this.getAllParty();
    this.getAllDiamond();
    this.polishingJobs()

  }

  onEmployeeSelect(event: any) {
    if (this.selectEmployee) {
      this.polishingJobs(this.selectEmployee._id);
    } else {
      this.polishingJobs();
    }
  }


  onDiamondSelect(event: any) {
    this.selectDiamond = event.value;
  }



  onSelectAllChange(event: any) {
  }


  polishingJobs(id?: string) {

    if (id) {
      this.loading = true;
      this.assignDiamondService.polishingJobByEmployee(id).subscribe((response: any) => {
        this.loading = false;
        this.diamonds = response.data.map.map((employee: any) => {
          employee.name = `${employee.employeeId.firstName} ${employee.employeeId.lastName}`;
          employee.number = `${employee.diamondId.kapanNumber}`
          return employee;
        })
      })
    } else {
      this.loading = true;
      this.assignDiamondService.polishingJobByEmployee().subscribe((response: any) => {
        this.diamonds = response.data.map((employee: any) => {
          employee.name = `${employee.employeeId.firstName} ${employee.employeeId.lastName}`;
          employee.number = `${employee.diamondId.kapanNumber}`
          return employee;
        });
        this.loading = false
      })
    }

  }



  onPartySelect(event: any) {
    if (this.selectParty) {
      this.getAllDiamond(this.selectParty);
    } else {
      this.getAllDiamond()
    }
  }



  getAllEmployee() {
    this.employeeService.getEmployees().subscribe(response => {
      if (response && response.status) {
        this.employeeDropdown = response.data.map((employee: any) => {
          employee.name = `${employee.firstName} ${employee.lastName}`;
          return employee;
        });
      }
    })
  }






  getAllParty() {
    this.paltyService.getParty().subscribe(response => {
      if (response && response.status) {
        this.partyDropdown = response.data
      }
    })
  }





  getAllDiamond(selectedParty?: any) {
    if (selectedParty) {
      this.assignDiamondService.getDiamondsByPalty(selectedParty._id).subscribe((response: any) => {
        if (response) {
          this.diamondDropdown = response;
        }
      }, (error) => {

      });
    } else {
      this.packetService.getPackets().subscribe((response: any) => {
        if (response && response.status) {
          this.diamondDropdown = response.data
        }
      }, (error) => {

      })
    }
  }




  assignChips() {
    const selectedChips = this.formGroup.get('values')?.value;
    const matchingIds: string[] = [];

    if (selectedChips) {
      for (const selectedChip of selectedChips) {
        const matchingDiamond = this.diamondDropdown.find((diamond: any) => diamond.number === selectedChip);

        if (matchingDiamond) {
          matchingIds.push(matchingDiamond._id);
        }
      }
    } else {
      this.toastrService.error("Please scan diamonds !!", 'Error')
      return
    }
    if (matchingIds.length > 0) {
      if (!this.selectEmployee) {
        this.toastrService.error("Please select employee !!", 'Error')
        return;
      }
      const payload = {
        diamondsId: matchingIds,
        employeeId: this.selectEmployee._id,
        status: "Started"
      }
      this.assignDiamondService.polishingJob(payload).subscribe((response: any) => {
        if (response && response.status) {
          this.toastrService.success(response.data, 'Success');
          this.formGroup.get('values')?.reset();
          this.polishingJobs(this.selectEmployee._id);
        }
      }, (error) => {
        this.toastrService.error(error.error.message);
      })
    } else {
      this.toastrService.error("Please verify diamonds !!", 'Error')
    }
  }



  handleReturnDiamond(diamond: any) {
    this.dialogRef = this.dialogService.open(IssueReturnComponent, {
      header: 'Diamond Return',
      width: '40%',
      data: {
        diamond: diamond
      }
    });
    this.dialogRef.onClose.subscribe(() => {

      if (this.selectEmployee) {
        this.polishingJobs(this.selectEmployee._id);
      } else {
        this.polishingJobs();
      }
    });
  }


  // New changes 


  openAssignDiamondDialog() {
    this.dialogRef = this.dialogService.open(DiamondAssignFormComponent, {
      width: '50%',
      header: 'Issue Diamonds'
    })
    this.dialogRef.onClose.subscribe(() => {
      this.polishingJobs()
    })
  }
}
