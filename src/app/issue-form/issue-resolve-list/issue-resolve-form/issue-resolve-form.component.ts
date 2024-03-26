import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-issue-resolve-form',
  templateUrl: './issue-resolve-form.component.html',
  styleUrls: ['./issue-resolve-form.component.scss']
})
export class IssueResolveFormComponent implements OnInit {
  employeeOptions: any[] = [];
  selectedEmployee: any;
  diamondData: any;

  constructor(private employeeService: EmployeeService, private ref: DynamicDialogRef, private config: DynamicDialogConfig) { }

  cancel(): void {
  }
  confirm() {

  }

  ngOnInit(): void {
    this.diamondData = this.config.data.diamond;
    this.selectedEmployee = this.config.data.diamond.employeeId._id
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

  onEmployeeSelect(employee: any) {

    console.log("selected Employee => ", this.selectedEmployee)
  }
  handleResolve() {
    console.log("click =>")
    this.ref.close()
  }
}
