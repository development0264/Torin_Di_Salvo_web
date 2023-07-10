import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages/pages.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { BudgetComponent } from './budget/budget.component';
import { BalanceSheetComponent } from './balance-sheet/balance-sheet.component';
import { PerformanceComponent } from './performance/performance.component';


@NgModule({
  declarations: [
    PagesComponent,
    HeaderComponent,
    HomeComponent,
    BudgetComponent,
    BalanceSheetComponent,
    PerformanceComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
