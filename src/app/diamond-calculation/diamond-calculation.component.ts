import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AssignDiamondService } from '../services/assign-diamond.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-diamond-calculation',
  templateUrl: './diamond-calculation.component.html',
  styleUrls: ['./diamond-calculation.component.scss']
})
export class DiamondCalculationComponent implements OnInit {
  formGroup!: FormGroup;
  diamonds1:any;
  diamonds2 : any;
  loading2:boolean = false;
  loading1 : boolean = false
  
  constructor(private diamondAssignService:AssignDiamondService,private toastrService:ToastrService){}


  ngOnInit(): void {
    this.formGroup = new FormGroup({
      values: new FormControl<string[] | null>(null)
    });
  
    this.polishingJobCompletedAndReturnTomanager();
    this.polishingJobEndedByDiamond()

    this.formGroup.get('values')?.valueChanges.subscribe((values: string[] | null) => {
      console.log('Chips values changed:', values);

        this.diamonPolishStatusUpdate(values)


      // if (values && values.length > 0) {
      //   this.formGroup.get('values')?.setValue(null);
      // }
    });
  }
  
  polishingJobCompletedAndReturnTomanager()
  {
    this.diamondAssignService.polishingJobByDiamondEndAndReturnManager().subscribe((response:any)=>{
      this.diamonds2 = response.data.map((data:any) =>{
        data.name =`${data.employeeId.firstName} ${data.employeeId.lastName}`
        data.code  =  `${data.employeeId.employeeId}`
        return data;
  })
})
}

  polishingJobEndedByDiamond()
  {
    this.diamondAssignService.polishingJobByDiamondEnd().subscribe((response:any)=>{
            this.diamonds1 = response.data.map((data:any) =>{
              data.name =`${data.employeeId.firstName} ${data.employeeId.lastName}`
              data.code  =  `${data.employeeId.employeeId}`
              return data;
        })
    })
  }

  diamonPolishStatusUpdate(kapannumber:any)
  { 
    if(kapannumber){
    const kapn = kapannumber[0];
    if(kapn !== null){
    this.diamondAssignService.getDiamondById(kapn).subscribe((response : any) =>{
      if(response && response.status)
      {
           const id = response.data[0]._id
            if(id)
            {
              const payload ={
                polish_status:'Return To Manager'
              }

              this.diamondAssignService.diamondPolishStatusUpdate(id,payload).subscribe((response:any)=>{
                if(response && response.status)
                { 
                    this.toastrService.success('Diamond Return to manager !','Success')
                    this.polishingJobCompletedAndReturnTomanager();
                    this.polishingJobEndedByDiamond();
                    this.formGroup.get('values')?.setValue(null);

                }else
                {
                  this.toastrService.error(response.message, 'Error');
                  this.formGroup.get('values')?.setValue(null);
                }
              },(error)=>{
                this.toastrService.error('','Error')
                this.formGroup.get('values')?.setValue(null);

              })
            }
      }
      else{
         this.formGroup.get('values')?.setValue(null);
      } 
    },(error)=>{
      this.toastrService.error('KapnNumber is Wrong !!' , 'Error');
      this.formGroup.get('values')?.setValue(null);
    })
  }
  }
  }
}
