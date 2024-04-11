import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { PartyService } from '../services/party.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-print-jangad',
  templateUrl: './print-jangad.component.html',
  styleUrls: ['./print-jangad.component.scss']
})
export class PrintJangadComponent  implements OnInit{
 
  diamonds:any;
  paltyOptions:any ;
  totalItems: number = 0;
  totalRawWeight: number = 0;
  totalFinalWeight: number = 0;
  totalExpactedWeight:number=0;
  currentDate: string  | null = null;
  constructor( private ref: DynamicDialogRef, private config: DynamicDialogConfig, private paltyService: PartyService,    private datePipe: DatePipe    ) { }
  
  
  ngOnInit(): void {
      this.diamonds = this.config.data.diamonds;
      console.log("this.diamonds =>" , this.diamonds)
      this.getPaltyOptions();
      this.currentDate = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
      console.log("date => ", this.currentDate)
      this.calculateTotals();

    }

    getPaltyOptions(): void {
      this.paltyService.getParty().subscribe(options => {
        this.paltyOptions = options.data.find((party:any)=>{
            if(party._id == this.diamonds.party)
            {
              return party;
            }
        });
        console.log("jangad =>" , this.paltyOptions)
      });
    }

    calculateTotals(): void {
      this.totalItems = this.diamonds.diamonds.length;
      this.totalRawWeight = this.diamonds.diamonds.reduce((total:any, diamond:any) => total + (diamond.weight?.rawWeight || 0), 0);

      this.totalExpactedWeight = this.diamonds.diamonds.reduce((total:any, diamond:any) => total + (diamond.weight?.expectedWeight || 0), 0);
      
      this.totalFinalWeight = this.diamonds.diamonds.reduce((total:any, diamond:any) => total + (diamond.weight?.finalWeight || 0), 0);
    }

    onCance()
    {
        this.ref.close();
    }

}
