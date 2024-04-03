import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AssignDiamondService } from 'src/app/services/assign-diamond.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-issue-resolve-form',
  templateUrl: './issue-resolve-form.component.html',
  styleUrls: ['./issue-resolve-form.component.scss']
})
export class IssueResolveFormComponent implements OnInit {
  employeeOptions: any[] = [];
  selectedEmployee: any;
  defaultSelectEmployee: any
  diamondData: any;
  blockingWeight: any

  constructor(private employeeService: EmployeeService, private ref: DynamicDialogRef, private config: DynamicDialogConfig, private assignDiamondService: AssignDiamondService, private toastrService: ToastrService) { }

  cancel(): void {
  }
  confirm() {
  }

  ngOnInit(): void {
    this.diamondData = this.config.data.diamond;
    this.selectedEmployee = this.config.data.diamond.employeeId._id;
    this.getAllEmployee();
  }


  getAllEmployee() {
    this.employeeService.getEmployees().subscribe(response => {
      if (response && response.status) {
        this.employeeOptions = response.data.map((employee: any) => {
          employee.name = `${employee.firstName} ${employee.lastName}`;
          return employee;
        });
      }
    })
  }

  onEmployeeChange(employee: any) {

  }
  handleResolve() {

    const payload = {

      status: 'Started',
      diamondId: this.diamondData.diamondId._id,
      employeeId: this.selectedEmployee,
      markableWeight: this.blockingWeight
    }

    if (this.diamondData._id) {
      this.assignDiamondService.polishingJobUpdate(this.diamondData._id, payload).subscribe((response: any) => {
        if (response && response.data) {

          this.toastrService.success('Issue Resolve SuccessFully !' , 'Success')
          this.ref.close()

        } else {
          this.toastrService.error(response.message, 'Error')
        }
      }, (error) => {
        this.toastrService.error(error.error.message)
      })
    }

  }
}
