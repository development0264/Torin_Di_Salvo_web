import { Options } from '@angular-slider/ngx-slider';
import { Component, ElementRef, ViewChild } from '@angular/core';
import Pikaday from 'pikaday';
import { Router } from '@angular/router';
@Component({
  selector: 'app-quickstart',
  templateUrl: './quickstart.component.html',
  styleUrls: ['./quickstart.component.css']
})
export class QuickstartComponent {
  constructor(private router:Router){}
  @ViewChild('slider') sliderElement: ElementRef;
  @ViewChild('datepicker1') datepickerInput1: ElementRef<HTMLInputElement>;
  @ViewChild('datepicker2') datepickerInput2: ElementRef<HTMLInputElement>;
  @ViewChild('datepicker3') datepickerInput3: ElementRef<HTMLInputElement>;
  @ViewChild('datepicker4') datepickerInput4: ElementRef<HTMLInputElement>;
  @ViewChild('datepicker5') datepickerInput5: ElementRef<HTMLInputElement>;
  public rangeSliderOptions: Options = {
    floor: 250,
    ceil: 1500,
    step: 10,
    showSelectionBar: true,
    translate: (value: number): string => {
      const percentage = ((value - 250) / (1500 - 250)) * 100;
      return `${percentage.toFixed(2)}%`;
    },
    
    getSelectionBarColor: (value: number): string => {
      if (value >= 250 && value <= 1500) {
        return '#3b82f6'; // Blue color for selected range
      }
      return '#eaeaea'; // Default color for unselected range
    }
  };
  public rangeSliderValue: number = 250;

  formatValue(value: number): string {
    const percentage = ((value - 250) / (1500 - 250)) * 100;
    return `${percentage.toFixed(2)}%`;
  }
  ngAfterViewInit(): void {
    this.pikadayInstance = new Pikaday({
      field: this.datepickerInput1.nativeElement,
      onSelect: (date: Date) => {
        // Handle date selection

      }
    });
    this.pikadayInstance = new Pikaday({
      field: this.datepickerInput2.nativeElement,
      onSelect: (date: Date) => {
        // Handle date selection
        
      }
    });
  }
  pikadayInstance: Pikaday;
  selectedDate: Date;
  dateofbirth;
  currentStep: number = 0;

  steps:any=1;
  maxsteps:any=9
  showFinish: boolean;

 
  next() {
    this.steps++;
    this.currentStep++;
    if(this.maxsteps===this.steps){
      this.showFinish=true
    }
    if (this.steps === 2) {

      setTimeout(() => {
        
        this.pikadayInstance = new Pikaday({
          field: this.datepickerInput3.nativeElement,
          onSelect: (date: Date) => {
            // Handle date selection
          }
        });
      }, 100);
    }
    if (this.steps === 8) {

      setTimeout(() => {
        
        this.pikadayInstance = new Pikaday({
          field: this.datepickerInput4.nativeElement,
          onSelect: (date: Date) => {
            // Handle date selection
          }
        });
        this.pikadayInstance = new Pikaday({
          field: this.datepickerInput5.nativeElement,
          onSelect: (date: Date) => {
            // Handle date selection
          }
        });
      }, 100);
    }
  
    
  }
  get progress(): number {
    return Math.floor((this.currentStep / 8) * 100);
  }
  back(){
    this.steps--;
    this.currentStep--;
    if(this.maxsteps===this.steps){
      this.showFinish=true
    }
    else{
      this.showFinish=false
    }
  }
  finish() {
    // Perform any action or navigate to another page after finishing
    this.router.navigate(['/'])
  }

 
}
