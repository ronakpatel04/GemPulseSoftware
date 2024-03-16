import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeService } from '../services/employee.service';
import { EmployeeViewComponent } from './employee-view/employee-view.component';


interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
}

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {
  dialogRef!: DynamicDialogRef;

  loading: boolean = false;

  employees: Employee[] = [];

  // Define columns
  cols: any[] = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Full Name' },
    { field: 'referenceName', header: 'Reference Name' },
    { field: 'mobileNo', header: 'Mobile Number' }
  ];


  globalFilter!: string;

  constructor(private primengConfig: PrimeNGConfig, private dialogService: DialogService, private employeeService: EmployeeService) { }

  ngOnInit() {
    // Enable gridlines
    this.primengConfig.ripple = true;
    this.loading = true;
    this.getEmployees()
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe(response => {
      if (response && response.statusCode == 200 && response.status) {
        this.loading = false;
        this.employees = response.data.map((employee: any) => {
          employee.name = `${employee.firstName} ${employee.lastName}`;
          return employee;
        });
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
    this.openAddEmployeeDialog(employee);
  }

  clear(table: Table) {
    table.clear();
  }


  openAddEmployeeDialog(employee?: any) {
    this.dialogRef = this.dialogService.open(EmployeeAddComponent, {
      header: employee ? 'Edit Employee' : 'Add Employee',
      width: '80%',
      data: {
        employee: employee
      }
    });

    this.dialogRef.onClose.subscribe(() => {
      this.getEmployees();
    });

  }

  viewEmployee(employee?: any) {
    this.dialogRef = this.dialogService.open(EmployeeViewComponent, {
      header: 'Employee Details',
      width: '40%',
      data: {
        employee: employee
      }
    });
  }
}
