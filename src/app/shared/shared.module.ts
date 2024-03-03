import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { FormsModule } from '@angular/forms';
import { MainComponent } from '../main/main.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [LoginComponent,MainComponent],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule
  ],
  exports:[LoginComponent,MainComponent]
})
export class SharedModule { }
