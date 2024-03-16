import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.scss']
})
export class EmployeeViewComponent implements OnInit {
  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig, private toastrservice: ToastrService) {
  }

  employee: any

  ngOnInit(): void {

    this.employee = this.config.data.employee;

  }




}
