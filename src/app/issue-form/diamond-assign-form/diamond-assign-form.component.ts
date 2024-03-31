import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-diamond-assign-form',
  templateUrl: './diamond-assign-form.component.html',
  styleUrls: ['./diamond-assign-form.component.scss']
})
export class DiamondAssignFormComponent implements OnInit, AfterViewInit {

  diamondValue: string = '';
  rawWeight !: number;
  kapnNumber!: number;
  diamondType !: string;
  carat !: number;
  blockingWeight!: number
  selectEmployee: any;
  employeeDropdown: any[] = [];
  @ViewChild('diamondInput') diamondInput!: ElementRef;



  constructor(private employeeService: EmployeeService, private toastrService: ToastrService,) { }


  ngAfterViewInit(): void {

    this.diamondInput.nativeElement.focus();

  }

  private destroy$ = new Subject();

  ngOnInit(): void {
    this.getAllEmployee();
  }




  onInputChange(newValue: string) {

    console.log("newVaalue =>", newValue)

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


  onSelectEmployee() { }

  assign() {
    console.log("assign =>")
  }

}
