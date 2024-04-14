import { Component, OnInit } from '@angular/core';
import { SalaryServiceService } from '../services/salary-service.service';

@Component({
  selector: 'app-employee-salary-list',
  templateUrl: './employee-salary-list.component.html',
  styleUrls: ['./employee-salary-list.component.scss']
})
export class EmployeeSalaryListComponent  implements OnInit{
  selectedMonthRange:any;
  loading : boolean = false;
  salaryData : any 

  constructor(private salaryService : SalaryServiceService){}
  
  ngOnInit(): void {
      this.getSalaryofEmployee() ; 
  }

  getSalaryofEmployee(monthRange?:any)
  {
    this.loading = true; 
    this.salaryService.getSalaryOfEmployee(monthRange).subscribe((response:any) =>{
        this.loading = false;
        if(response && response.status)
        {
            this.salaryData = response.data.map((salary:any)=>{
              salary.fullName =  `${salary.employeeId.firstName} ${salary.employeeId.lastName}`;
              salary.code  = `${salary.employeeId.employeeId}`
              return salary
      })
     }       
    },(error)=>{
    })
  }

  handleDateChange(event : any)
  {
  const date = new Date(event); 
  const month = date.getMonth() + 1; 
  const year = date.getFullYear(); 
  const formattedDate = `${month.toString().padStart(2, '0')}/${year}`; 
  console.log(formattedDate); 
    if(formattedDate)
    {
      this.getSalaryofEmployee(formattedDate)
    }


  }

}
