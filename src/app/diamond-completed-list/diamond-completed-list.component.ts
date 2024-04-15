import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AssignDiamondService } from '../services/assign-diamond.service';
import { DiamondCompletedFormComponent } from './diamond-completed-form/diamond-completed-form.component';

@Component({
  selector: 'app-diamond-completed-list',
  templateUrl: './diamond-completed-list.component.html',
  styleUrls: ['./diamond-completed-list.component.scss']
})
export class DiamondCompletedListComponent implements OnInit {
  
  loading: boolean = false;
  globalFilter!: string;
  dialogRef!: DynamicDialogRef;
  diamonds:any[] =[]

  constructor(private assignDiamondService:AssignDiamondService,private dialogService: DialogService){}

  ngOnInit(): void {
      this.completedDiamonds();
  }

  completedDiamonds()
  { 
        this.loading = true
      this.assignDiamondService.getCompletedDiamond().subscribe((response:any)=>{
            this.diamonds = response.data.map((employee: any) => {
              employee.name = `${employee.employeeId.firstName} ${employee.employeeId.lastName}`
              employee.code =  `${employee.employeeId.employeeId}`
              employee.number = `${employee.diamondId.kapanNumber}`
              return employee;
            });
            this.loading = false
          })      
  }
  
  
  openCompletedDiamondDialog()
  {
    this.dialogRef = this.dialogService.open(DiamondCompletedFormComponent, {
      header: 'Diamond Completed',
      width: '70%',
    });

    this.dialogRef.onClose.subscribe(() => {
      this.completedDiamonds();
    });

  }

}
