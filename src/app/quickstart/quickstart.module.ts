import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { QuickstartRoutingModule } from './quickstart-routing.module';
import { QuickstartComponent } from './quickstart/quickstart.component';


@NgModule({
  declarations: [
    QuickstartComponent
  ],
  imports: [
    CommonModule,
    QuickstartRoutingModule,

  ]
})
export class QuickstartModule { }
