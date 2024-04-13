import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AssignDiamondService } from 'src/app/services/assign-diamond.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { PacketService } from 'src/app/services/packet.service';

@Component({
  selector: 'app-diamond-assign-form',
  templateUrl: './diamond-assign-form.component.html',
  styleUrls: ['./diamond-assign-form.component.scss']
})
export class DiamondAssignFormComponent implements OnInit, AfterViewInit {

  diamondValue: string | null = null;
  rawWeight : number=0.00
  kapnNumber!: string;
  diamondType !: string;
  carat : number =0.00;
  blockingWeight!: number | null
  selectEmployee: any;
  employeeDropdown: any[] = [];
  diamondDropdown: any[] = [];
  diamondNumber !: string;
  matchingId !:string;
  timeout: any;
  loading: boolean = false;


  @ViewChild('diamondInput', { static: false }) diamondInput!: ElementRef;



  constructor(private employeeService: EmployeeService, private toastrService: ToastrService,private assignDiamondService:AssignDiamondService,private packetService:PacketService) { }


  

  private destroy$ = new Subject();

  ngOnInit(): void {
    this.getAllEmployee();
    this.getAllDiamond();
  }

  getAllDiamond(selectedParty?: any) {
    if (selectedParty) {
      this.assignDiamondService.getDiamondsByPalty(selectedParty._id).subscribe((response: any) => {
        if (response) {
          this.diamondDropdown = response;
        }
      }, (error) => {

      });
    } else {
      this.packetService.getPackets().subscribe((response: any) => {
        if (response && response.status) {
          this.diamondDropdown = response.data
        }
      }, (error) => {

      })
    }
  }


  ngAfterViewInit(): void {
    this?.diamondInput?.nativeElement.focus();
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
            this.carat = response.data[0].carat;
            this.kapnNumber = response.data[0].kapanNumber;
            this.diamondType = response.data[0].diamond_type;
            this.rawWeight = response.data[0].weight.rawWeight
            this.matchingId =  response.data[0]._id
            
          }else{
            this.loading = false
            this.carat = 0.00
            this.kapnNumber =''
            this.diamondType=''
            this.rawWeight =0.00
            this.diamondValue = null
            this.toastrService.error('Kapan number is Wrong !' , 'Error');

          }

        }),(error)=>{
          this.toastrService.error('Kapan number is Wrong !' , 'Error');
          this.loading =false
          this.carat = 0.00
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


  onSelectEmployee() { }

  assign() {
    if(this.selectEmployee)
    {
      this.polishingJob();
    }else{
      this.toastrService.error('Please Select Employee !' , 'Error');
    }
  }

  polishingJob() {
    const payload = {
      diamondId: this.matchingId,
      employeeId: this.selectEmployee,
      markableWeight: this.blockingWeight,
      status: "Started"
    };
  
    this.loading = true;
  
    this.assignDiamondService.polishingJob(payload).subscribe(
      (response: any) => {
        this.loading = false;
        if (response && response.status) {
          this.toastrService.success(response.data, 'Success');
        } else {
          this.toastrService.error("Failed to start polishing job.");
        }
        this.resetFields();
      },
      (error) => {
        this.loading = false;
        this.toastrService.error(error.error.message);
        this.resetFields();
      }
    );
  }
  
  resetFields() {
    this.carat = 0.00;
    this.kapnNumber = '';
    this.diamondType = '';
    this.rawWeight = 0.00;
    this.selectEmployee = '';
    this.blockingWeight = null;
    this.diamondValue = null;
  }
}
