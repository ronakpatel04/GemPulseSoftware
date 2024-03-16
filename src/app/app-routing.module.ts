import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './guards/auth.guard';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AlreadyAuthGuard } from './guards/already-exist.guard';
import { PartyListComponent } from './party-list/party-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'main', component: MainComponent, canActivate: [AuthGuard], children: [
      { path: 'employee', component: EmployeeListComponent },
      { path: 'party', component: PartyListComponent }

    ]
  }, { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
