import { Component, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { EmployeeAddComponent } from '../employee-list/employee-add/employee-add.component';
import { EmployeeViewComponent } from '../employee-list/employee-view/employee-view.component';
import { EmployeeService } from '../services/employee.service';
import { PacketService } from '../services/packet.service';
import { PacketAddComponent } from './packet-add/packet-add.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-packet-list',
  templateUrl: './packet-list.component.html',
  styleUrls: ['./packet-list.component.scss'],
  providers: [ConfirmationService,MessageService],

})
export class PacketListComponent {


  dialogRef!: DynamicDialogRef;

  loading: boolean = false;

  packets: any[] = [];


  @ViewChild('dt') table!: Table; 
  globalFilter!: string;

  constructor(private primengConfig: PrimeNGConfig, private dialogService: DialogService, private packetService: PacketService,private confirmationService: ConfirmationService, private messageService: MessageService, private toastrService:ToastrService) { }

  ngOnInit() {
    // Enable gridlines
    this.primengConfig.ripple = true;
    this.loading = true;
    this.getPackets();
  }

  getPackets() {
    this.loading = true
    this.packetService.getPackets().subscribe(response => {
      this.loading = false;
      if (response && response.statusCode == 200 && response.status) {
        this.packets = response.data
      }else{
        this.packets = []
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

  editPacket(packet: any) {
    this.openAddPacketDialg(packet);
  }

  clear(table: Table) {
    table.clear();
  }


  openAddPacketDialg(packet?: any) {
    this.dialogRef = this.dialogService.open(PacketAddComponent, {
      header: packet ? 'Edit Packet' : 'Add Packet',
      width: '80%',
      data: {
        packet: packet
      }
    });

    this.dialogRef.onClose.subscribe(() => {
      this.getPackets();
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

  printSelectedQRs() {
    
    const selectedPackets = this.table.selection;
    const qrCodesToPrint = selectedPackets.map((packet:any) => packet.kapanNumber); 
    this.printQRs(qrCodesToPrint);
}

printQRs(qrCodes: any[]) {

  const qrImages:any[] = []

  for (let qr of qrCodes) {
    qrImages.push(document.querySelector(`.${qr}`)?.children[0].children[0].children[0])
  }

  let qrNo = 0
  const printableContent = qrImages.map(qrImage => {
    qrImage.children[1].setAttribute('transform', 'translate(200, 0)');
    qrImage.children[1].setAttribute('transform', 'scale(5)');

    return `<div>
      <svg>${qrImage.innerHTML}</svg> </div>
      <br/>
      <div style="margin: -35px 0 100px 20px; font-size: 27px; font-weight: bold">${qrCodes[qrNo++]}</div>`
  }).join('')

  const printableArea = document.getElementById('printableArea');
  if (printableArea) {
    printableArea.innerHTML = printableContent;
    window.print();
    qrImages.map(qrImage => qrImage.children[1].removeAttribute('transform'))
    printableArea.innerHTML = ""
    printableArea.remove();
  }
}
deletePacket(packet:any)
{
  this.confirmationService.confirm({
    message: 'Are you sure you want to delete this packet?',
    accept: () => {
        
      console.log("packet =>" , packet)
      



      this.packetService.deletePacket(packet._id).subscribe((response: any) => {
        if (response && response.status) {
          this.toastrService.success("Diamond Deleted !", 'Success');
          // this.ref.close();
        }
        this.getPackets()
      }, (error) => {
        this.toastrService.error('Unknown Error', 'Error');
        // this.ref.close();
        this.getPackets()
      })
    },
    reject: () => {
      // this.ref.close();
    }
  });
    }
  }