import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './guards/auth.guard';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AlreadyAuthGuard } from './guards/already-exist.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent , canActivate: [AlreadyAuthGuard] },
  { path: 'employee', component: EmployeeListComponent, canActivate:[AuthGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/login' } 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
