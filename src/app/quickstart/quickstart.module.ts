import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { QuickstartRoutingModule } from './quickstart-routing.module';
import { QuickstartComponent } from './quickstart/quickstart.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    QuickstartComponent
  ],
  imports: [
    CommonModule,
    QuickstartRoutingModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    NgxSliderModule
    
  ]
})
export class QuickstartModule {
  
 }
