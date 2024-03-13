import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import { EmployeeAddComponent } from '../employee-list/employee-add/employee-add.component';
import { PrimeNGConfig } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-packet-list',
  templateUrl: './packet-list.component.html',
  styleUrls: ['./packet-list.component.scss']
})
export class PacketListComponent {

   
  loading : boolean =  false;
  
  employees: any[] = [
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

  constructor(private primengConfig: PrimeNGConfig,private dialogService: DialogService) {}

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
openAddEmployeeDialog() {
  const ref = this.dialogService.open(EmployeeAddComponent, {
    header: 'Add Employee', // Set header for the dialog
    width: '80%' // Set width of the dialog
  });
}

public myAngularxQrCode: string = "";
public qrCodeDownloadLink: SafeUrl = "";


onChangeURL(url: SafeUrl) {
  this.qrCodeDownloadLink = url;
}


}
