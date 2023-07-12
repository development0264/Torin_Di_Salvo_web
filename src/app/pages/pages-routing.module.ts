import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages/pages.component';
import { BudgetComponent } from './budget/budget.component';
import { BalanceSheetComponent } from './balance-sheet/balance-sheet.component';
import { PerformanceComponent } from './performance/performance.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './settings/profile/profile.component';
import { SecurityComponent } from './settings/security/security.component';
import { AccountsComponent } from './settings/accounts/accounts.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'budget',
        component: BudgetComponent
      },
      {
        path: 'balance-sheet',
        component: BalanceSheetComponent
      },
      {
        path: 'performance',
        component: PerformanceComponent
      },
      {
        path: 'settings',
        component: SettingsComponent,
        children:[
          {
            path: 'profile',
            component: ProfileComponent
          },
          {
            path: 'Accounts',
            component: AccountsComponent
          },
          {
            path: 'Security',
            component: SecurityComponent
          },
        ]
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
