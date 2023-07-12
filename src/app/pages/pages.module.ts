import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages/pages.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { BudgetComponent } from './budget/budget.component';
import { BalanceSheetComponent } from './balance-sheet/balance-sheet.component';
import { PerformanceComponent } from './performance/performance.component';
import { SettingsComponent } from './settings/settings.component';
import { SettingsNavbarComponent } from './settings-navbar/settings-navbar.component';
import { ProfileComponent } from './settings/profile/profile.component';
import { AccountsComponent } from './settings/accounts/accounts.component';
import { SecurityComponent } from './settings/security/security.component';


@NgModule({
  declarations: [
    PagesComponent,
    HeaderComponent,
    HomeComponent,
    BudgetComponent,
    BalanceSheetComponent,
    PerformanceComponent,
    SettingsComponent,
    SettingsNavbarComponent,
    ProfileComponent,
    AccountsComponent,
    SecurityComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
