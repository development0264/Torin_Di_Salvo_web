import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { QuickstartRoutingModule } from './quickstart-routing.module';
import { QuickstartComponent } from './quickstart/quickstart.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberFormatterDirectiveDirective } from '../directives/number-formatter-directive.directive';
import { DollarsignDirective } from '../directives/dollarsign.directive';
@NgModule({
  declarations: [
    QuickstartComponent,
    NumberFormatterDirectiveDirective,
    DollarsignDirective,
  ],
  imports: [
    CommonModule,
    QuickstartRoutingModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    NgxSliderModule,
    ReactiveFormsModule
    
  ]
})
export class QuickstartModule {
  
 }
