import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from '../main/main.component';
import { AppRoutingModule } from '../app-routing.module';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from "primeng/button";
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { EmployeeAddComponent } from '../employee-list/employee-add/employee-add.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwttokenInterceptor } from '../Interceptors/jwttoken.interceptor';
import { EmployeeViewComponent } from '../employee-list/employee-view/employee-view.component';
import { PartyListComponent } from '../party-list/party-list.component';
import { PartyAddComponent } from '../party-list/party-add/party-add.component';
import { PartyViewComponent } from '../party-list/party-view/party-view.component';
import { PacketListComponent } from '../packet-list/packet-list.component';
import { QRCodeModule } from 'angularx-qrcode';
import { PacketAddComponent } from '../packet-list/packet-add/packet-add.component';
import { PriceRangeComponent } from '../price-range/price-range.component';
import { IssueFormComponent } from '../issue-form/issue-form.component';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { ChipsModule } from 'primeng/chips';
import { IssueReturnComponent } from '../issue-form/issue-return/issue-return.component';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { IssueResolveListComponent } from '../issue-form/issue-resolve-list/issue-resolve-list.component';
import { IssueResolveFormComponent } from '../issue-form/issue-resolve-list/issue-resolve-form/issue-resolve-form.component';
import { NgxPrintModule } from 'ngx-print';
import { DiamondAssignFormComponent } from '../issue-form/diamond-assign-form/diamond-assign-form.component';
import { DiamondCompletedListComponent } from '../diamond-completed-list/diamond-completed-list.component';
import { DiamondCompletedFormComponent } from '../diamond-completed-list/diamond-completed-form/diamond-completed-form.component';
import { DiamondCalculationComponent } from '../diamond-calculation/diamond-calculation.component';
import { JangadListComponent } from '../jangad-list/jangad-list.component';
import { PrintJangadComponent } from '../print-jangad/print-jangad.component';



@NgModule({
  declarations: [LoginComponent, MainComponent, EmployeeListComponent, EmployeeAddComponent, EmployeeViewComponent, PartyListComponent, PartyAddComponent, PartyViewComponent, PacketListComponent, PacketAddComponent, PriceRangeComponent, IssueFormComponent, IssueReturnComponent, IssueResolveListComponent, IssueResolveFormComponent, DiamondAssignFormComponent , DiamondCompletedListComponent,DiamondCompletedFormComponent,DiamondCalculationComponent,JangadListComponent, PrintJangadComponent],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    TableModule,
    ButtonModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    QRCodeModule,
    DropdownModule,
    MultiSelectModule,
    ChipsModule,
    DialogModule,
    NgxPrintModule,
    ConfirmDialogModule

  ],
  exports: [LoginComponent, MainComponent, EmployeeListComponent, EmployeeAddComponent, EmployeeViewComponent, PartyListComponent, PartyAddComponent, PartyViewComponent, PacketListComponent, PacketAddComponent, PriceRangeComponent, IssueFormComponent, IssueReturnComponent, IssueResolveListComponent, IssueResolveFormComponent, DiamondAssignFormComponent,DiamondCompletedListComponent,DiamondCompletedFormComponent,DiamondCalculationComponent,JangadListComponent, PrintJangadComponent],
  providers: [DialogService, DatePipe,{
    provide: HTTP_INTERCEPTORS,
    useClass: JwttokenInterceptor,
    multi: true
  }
  ]
})
export class SharedModule { }
