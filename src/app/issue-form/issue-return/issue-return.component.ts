import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AssignDiamondService } from 'src/app/services/assign-diamond.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-issue-return',
  templateUrl: './issue-return.component.html',
  styleUrls: ['./issue-return.component.scss'],
  providers: [
    ConfirmationService
  ]
})
export class IssueReturnComponent implements OnInit {

  diamondData: any
  employeeOptions: any[] = [];
  selectedEmployee: any
  selectedReason: any;
  returnDescription: any
  reasonOptions = [
    { label: 'Quality Issue', value: 'quality_issue' },
    { label: 'Wrong Size', value: 'wrong_size' },
    { label: 'Not as Described', value: 'not_as_described' },
    { label: 'Changed Mind', value: 'changed_mind' },
    { label: 'Damaged in Transit', value: 'damaged_in_transit' },
    { label: 'Other', value: 'other' }
  ];



  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig, private employeeService: EmployeeService, private confirmationService: ConfirmationService, private issueReturnService: AssignDiamondService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.diamondData = this.config.data.diamond;
    console.log("this.diamondId =>" , this.diamondData)
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
      const matchingEmployee = this.employeeOptions.find((employee: any) => employee._id === this.diamondData.employeeId._id);

      if (matchingEmployee) {
        this.selectedEmployee = matchingEmployee;
      } else {
      }


    }, (error) => {
      this.toastrService.error('Unknown Error !', 'Error')
    })
  }

  onEmployeeSelect(employee: any) {

  }


  assignDiamond(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to assign this diamond?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        const payload = {
          status: "Issue",
          comment: this.returnDescription,
          diamondId:this.diamondData.diamondId._id,
        }
        this.issueReturnService.polishingJobIssue(payload, this.config.data.diamond._id).subscribe((response: any) => {
          if (response && response.status) {
            this.toastrService.success("Issue generated !", 'Success');
            this.ref.close();
          }
        }, (error) => {

          this.toastrService.error('Unknown Error', 'Error');
          this.ref.close();
        })
      },
      reject: () => {
        this.ref.close();
      }
    });
  }
}

