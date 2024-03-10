import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';

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
  
  loading : boolean =  false;
  
  employees: Employee[] = [
    { id: 1, name: 'John Doe', position: 'Software Engineer', department: 'Engineering' },
    { id: 2, name: 'Jane Smith', position: 'Product Manager', department: 'Management' },
    { id: 3, name: 'Alice Johnson', position: 'HR Specialist', department: 'Human Resources' },
    { id: 4, name: 'Alice Johnson', position: 'HR Specialist', department: 'Human Resources' },
    { id: 5, name: 'Alice Johnson', position: 'HR Specialist', department: 'Human Resources' },
    { id: 6, name: 'Alice Johnson', position: 'HR Specialist', department: 'Human Resources' },
    { id: 7, name: 'Alice Johnson', position: 'HR Specialist', department: 'Human Resources' },
    { id: 8, name: 'Alice Johnson', position: 'HR Specialist', department: 'Human Resources' },
    { id: 9, name: 'Alice Johnson', position: 'HR Specialist', department: 'Human Resources' },
    { id: 10, name: 'Alice Johnson', position: 'HR Specialist', department: 'Human Resources' },
    // Add more employee data as needed
  ];

  // Define columns
  cols: any[] = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'position', header: 'Position' },
    { field: 'department', header: 'Department' }
  ];
  
  
  globalFilter!: string;

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    // Enable gridlines
    this.primengConfig.ripple = true;
  }

  filter(value: string, field: string) {
    this.globalFilter = value;
  }
  
  editProduct(product:any)
  {
    console.log("product =>" , product)
  }
  
  clear(table: Table) {
    table.clear();
}
  
}
