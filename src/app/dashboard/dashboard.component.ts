import { Component, OnInit } from '@angular/core';
import { PartyService } from '../services/party.service';
import { EmployeeService } from '../services/employee.service';
import { DashboardService } from '../services/dashboard.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  paltyOptions: any[] = [];
  employeeDropdown: any[] = [];
  statusOptions: any[] = [
    { value: 'notstarted', label: 'Not Started' },
    { value: 'started', label: 'Started' },
    { value: 'issue', label: 'Issue' },
    { value: 'ended', label: 'Ended' },
    { value: 'submitted', label: 'Submitted' },
    { value: 'returntomanager', label: 'Return to Manager' }
  ];  selectedPalty: any;
  selectEmployee: any;
  selectStatus: any;
  diamonds: any = [];
  loading: boolean = false

  constructor(private paltyService: PartyService, private employeeService: EmployeeService, private dashboardService: DashboardService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getPaltyOptions();
    this.getAllEmployee();
    this.getAllDiamonds();
  }


  getPaltyOptions(): void {
    this.paltyService.getParty().subscribe(options => {
      this.paltyOptions = options.data;
    });
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

getAllDiamonds() {
    const party = this.selectedPalty;
    const employee = this.selectEmployee;
    const status = this.selectStatus;
    this.loading = true;
    this.dashboardService.getAllDiamond(party, employee, status).subscribe((response: any) => {
      this.loading = false;
      if (response && response.data) {
        this.diamonds = response.data.map((data: any) => {
          data.name = data.employeeId 
          ? `${data.employeeId.firstName} ${data.employeeId.lastName}`
          : 'Not Assigned';
          data.code = `${data?.employeeId?.employeeId}`
          data.number =`${data.kapanNumber}`
          data.party = `${data.paltyId.name}`
          data.color = `${data.color}`
          data.purity = `${data.expected_purity}`
          data.newCutType = this.getAbbreviation(data.expected_cut_type);
          data.newPolishType = this.getAbbreviation(data.expected_polish_type);
          data.newSmyType = this.getAbbreviation(data.expected_smy_type);
          return data;
        })
      }else{    
        this.toastrService.error(response.message,'Error')

      }
    })
  }

  selectParty(party: any) {
    this.selectedPalty = party;
    this.getAllDiamonds();
  }

  selectedEmployee(employee: any) {
    this.selectEmployee = employee;
    this.getAllDiamonds();
  }



  selectedStatus(status: string) {
    this.selectStatus = status;
    this.getAllDiamonds();
  }

  clearSelection(data: any) {
    if (data == 'party') {
      this.selectedPalty = null
      this.getAllDiamonds()
    }
    else if (data == 'status') {
      this.selectStatus = null;
      this.getAllDiamonds()
    }
    else if (data == 'employee') {
      this.selectEmployee = null
      this.getAllDiamonds()
    }

  }
  getAbbreviation(value: string): string {
    switch(value) {
      case 'Excellent':
        return 'Ex';
      case 'Very Good':
        return 'VG';
      case 'Good':
        return 'GD';
      default:
        return value;
    }
  }

}
