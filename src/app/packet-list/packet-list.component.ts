import { Component, ViewChild } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { EmployeeAddComponent } from '../employee-list/employee-add/employee-add.component';
import { EmployeeViewComponent } from '../employee-list/employee-view/employee-view.component';
import { EmployeeService } from '../services/employee.service';
import { PacketService } from '../services/packet.service';
import { PacketAddComponent } from './packet-add/packet-add.component';

@Component({
  selector: 'app-packet-list',
  templateUrl: './packet-list.component.html',
  styleUrls: ['./packet-list.component.scss']
})
export class PacketListComponent {


  dialogRef!: DynamicDialogRef;

  loading: boolean = false;

  packets: any[] = [];


  @ViewChild('dt') table!: Table; 
  globalFilter!: string;

  constructor(private primengConfig: PrimeNGConfig, private dialogService: DialogService, private packetService: PacketService) { }

  ngOnInit() {
    // Enable gridlines
    this.primengConfig.ripple = true;
    this.loading = true;
    this.getPackets();
  }

  getPackets() {
    this.packetService.getPackets().subscribe(response => {
      if (response && response.statusCode == 200 && response.status) {
        this.loading = false;
        this.packets = response.data
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
    
    const selectedPackets = this.table.selection; // Get selected packets
    console.log("selected", selectedPackets)
    const qrCodesToPrint = selectedPackets.map((packet:any) => packet.kapanNumber); // Assuming 'kapanNumber' holds QR code data

    // Print the QR codes using ngx-print
    this.printQRs(qrCodesToPrint);
}

printQRs(qrCodes: any[]) {

  const qrImages:any[] = []

  for (let qr of qrCodes) {
    qrImages.push(document.querySelector(`.${qr}`)?.children[0].children[0].children[0])
  }

  console.log("qr", qrImages)

  let qrNo = 0
  
  const printableContent = qrImages.map(qrImage => {
    qrImage.children[1].setAttribute('transform', 'translate(200, 0)');
    qrImage.children[1].setAttribute('transform', 'scale(3)');

    return `<div>
      <svg>${qrImage.innerHTML}</svg> </div>
      `
  }).join('')

  const printableArea = document.getElementById('printableArea');
  if (printableArea) {
     console.log("PRINT", printableContent)
    printableArea.innerHTML = printableContent;
    window.print();

    qrImages.map(qrImage => qrImage.children[1].removeAttribute('transform'))
    
    printableArea.innerHTML = ""
    printableArea.remove();
  }
}


}
