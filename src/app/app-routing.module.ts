import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './guards/auth.guard';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AlreadyAuthGuard } from './guards/already-exist.guard';
import { PartyListComponent } from './party-list/party-list.component';
import { PacketListComponent } from './packet-list/packet-list.component';
import { PriceRangeComponent } from './price-range/price-range.component';
import { IssueFormComponent } from './issue-form/issue-form.component';
import { IssueResolveListComponent } from './issue-form/issue-resolve-list/issue-resolve-list.component';
import { DiamondCompletedListComponent } from './diamond-completed-list/diamond-completed-list.component';
import { DiamondCalculationComponent } from './diamond-calculation/diamond-calculation.component';
import { JangadListComponent } from './jangad-list/jangad-list.component';
import { EmployeeSalaryListComponent } from './employee-salary-list/employee-salary-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PartyBillsComponent } from './party-bills/party-bills.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'main', component: MainComponent, canActivate: [AuthGuard], children: [
      { path: 'employee', component: EmployeeListComponent },
      { path: 'party', component: PartyListComponent },
      { path: 'packet', component: PacketListComponent },
      { path: 'price', component: PriceRangeComponent },
      { path: 'issueForm', component: IssueFormComponent },
      { path: 'issueResolve', component: IssueResolveListComponent },
      { path: 'diamondComplted', component: DiamondCompletedListComponent },
      {path:'diamondCalculation' , component : DiamondCalculationComponent},
      {path:'jangadList', component:JangadListComponent},
      {path:'employeeSalary', component:EmployeeSalaryListComponent},
      {path:'dashboard', component:DashboardComponent},
      {path:'partyBills', component:PartyBillsComponent},

    ]
  }, { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
