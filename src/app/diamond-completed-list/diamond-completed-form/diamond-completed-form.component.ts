import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AssignDiamondService } from 'src/app/services/assign-diamond.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { PacketService } from 'src/app/services/packet.service';

@Component({
  selector: 'app-diamond-completed-form',
  templateUrl: './diamond-completed-form.component.html',
  styleUrls: ['./diamond-completed-form.component.scss']
})
export class DiamondCompletedFormComponent implements OnInit {
  diamondValue: string | null = null;
  rawWeight : number=0.00
  kapnNumber!: string;
  diamondType !: string;
  markableWeight : number =0.00;
  finalWeight!: number
  selectEmployee: any;
  employeeDropdown: any[] = [];
  diamondDropdown: any[] = [];
  diamondNumber !: string;
  matchingId !:string;
  timeout: any;
  loading: boolean = false;
  givenSmy:any;
  givenPolishType:any;
  givenPurity:any;
  givenCutType:any;
  polishingJobId!:string

  purityOptions: string[] = ['IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'SI3', 'I1', 'I2', 'I3', 'I4', 'I5'];
  smyOptions: string[] = ['Good', 'Very Good', 'Excellent'];
  polishTypeOptions: string[] = ['Good', 'Very Good', 'Excellent'];
  cutTypeOptins: string[]=['Good', 'Very Good', 'Excellent'] 


  constructor(private employeeService: EmployeeService, private toastrService: ToastrService,private assignDiamondService:AssignDiamondService,private packetService:PacketService,private ref: DynamicDialogRef, private config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.getAllEmployee();
  }


  onInputChange(newValue: string) {
    if (newValue !== null) {
      this.diamondNumber = newValue;
    }
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

     this.timeout =  setTimeout(() => {

        this.loading = true;
        if(this.diamondNumber !==  null){
        this.assignDiamondService.getDiamondById(this.diamondNumber).subscribe(((response:any) =>{

          if(response && response.status && response.data.length === 1)
          {
            this.loading = false ;
            this.markableWeight = response.data[0].weight.markableWeight;
             this.kapnNumber = response.data[0].kapanNumber;
            this.diamondType = response.data[0].diamond_type;
            this.rawWeight = response.data[0].weight.rawWeight;
            this.selectEmployee = response.data[0]?.employeeId?.firstName + ' ' + response?.data[0]?.employeeId?.lastName;
              
            this.polishingJobByDiamond(response.data[0]._id)

          }else{
            this.loading = false
            this.markableWeight = 0.00
            this.kapnNumber =''
            this.diamondType=''
            this.rawWeight =0.00
            this.diamondValue = null
            this.toastrService.error(response.message , 'Error')
          }
        }),(error)=>{
          this.toastrService.error('Kapan number is Wrong !' , 'Error');
          this.loading =false
          this.markableWeight = 0.00
          this.kapnNumber =''
          this.diamondType=''
          this.rawWeight =0.00
          this.diamondValue = null
    })
  }
     },700);  
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


  polishingJobByDiamond(id:string)
  {
    this.assignDiamondService.polishingJobByDiamondId(id).subscribe((response:any)=>{
        this.polishingJobId =  response.data[0]._id
    })
  }

  assign(){
    if(this.finalWeight && this.givenPolishType && this.givenSmy && this.givenCutType){
    
    const payload = {
      status :'Completed',
      finalWeight:this.finalWeight,
      polish_type:this.givenPolishType,
      smy_type:this.givenSmy,
      cut_type:this.givenCutType
    }



      if(this.polishingJobId)
      {
          this.assignDiamondService.polishingJobEnd(this.polishingJobId, payload).subscribe((response:any) =>{
          
          if(response && response.status)
                {
                  this.toastrService.success('Diamond Completed Successfully !' , 'Success');
                  this.ref.close();
                }
          else{
                    this.toastrService.error('Please try again !' , 'Error');
                    this.ref.close();
              }

            })
      }
  }
  }
}
