import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { QuickstartRoutingModule } from './quickstart-routing.module';
import { QuickstartComponent } from './quickstart/quickstart.component';


@NgModule({
  declarations: [
    QuickstartComponent
  ],
  imports: [
    CommonModule,
    QuickstartRoutingModule,
    NgxSliderModule

  ]
})
export class QuickstartModule {
  
 }
