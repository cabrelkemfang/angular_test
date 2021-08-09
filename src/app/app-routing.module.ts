import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboadComponent } from './dashboad/dashboad.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'main', component: HomeComponent, children: [
      { path: 'transaction', component: TransactionsComponent },
      { path: 'dashboard', component: DashboadComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
