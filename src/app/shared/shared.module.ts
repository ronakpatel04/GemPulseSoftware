import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { FormsModule } from '@angular/forms';
import { MainComponent } from '../main/main.component';
import { AppRoutingModule } from '../app-routing.module';
import { EmployeeListComponent } from '../employee-list/employee-list.component';



@NgModule({
  declarations: [LoginComponent,MainComponent,EmployeeListComponent],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule
  ],
  exports:[LoginComponent,MainComponent, EmployeeListComponent]
})
export class SharedModule { }
