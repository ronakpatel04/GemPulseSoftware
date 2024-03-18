import { Component } from '@angular/core';
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

  // Define columns
  cols: any[] = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Full Name' },
    { field: 'referenceName', header: 'Reference Name' },
    { field: 'mobileNo', header: 'Mobile Number' }
  ];


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

}
