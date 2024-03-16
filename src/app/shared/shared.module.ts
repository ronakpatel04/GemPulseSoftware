import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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




@NgModule({
  declarations: [LoginComponent, MainComponent, EmployeeListComponent, EmployeeAddComponent, EmployeeViewComponent, PartyListComponent, PartyAddComponent, PartyViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    TableModule,
    ButtonModule,
    ProgressSpinnerModule,
    ReactiveFormsModule


  ],
  exports: [LoginComponent, MainComponent, EmployeeListComponent, EmployeeAddComponent, EmployeeViewComponent, PartyListComponent, PartyAddComponent, PartyViewComponent],
  providers: [DialogService, {
    provide: HTTP_INTERCEPTORS,
    useClass: JwttokenInterceptor,
    multi: true
  }
  ]
})
export class SharedModule { }
