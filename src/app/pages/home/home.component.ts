import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart,ChartOptions } from 'chart.js';
import { Options } from '@angular-slider/ngx-slider';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  constructor(private formBuilder: FormBuilder) {}

  @ViewChild('slider') sliderElement: ElementRef;
  @ViewChild('staticBackdrop') modalContent: ElementRef; 
  Linechart: Chart;
  assetForm: FormGroup;
  PRSForm: FormGroup;
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
  
  ngOnInit() {
    this.Linechart = new Chart('linechart', {
      type: 'line',
      data: {
        labels: ["Nov 25","dec 30","Feb 7","Mar 14","Apr 19","May 23"],
        datasets: [{
          label: 'Number of Item in months',
          data: [0,2,3,2.9,7,7.2,7.4,7.7,8,8.4,8.5],
          fill: false,
          borderColor: ' rgb(79 121 155)', // Set line color to white
          borderWidth: 2,
          pointRadius: 0 
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false // Hide the legend
          }
        },
        scales: {
          x: {
            grid: {
            display: false // Set x-axis grid color to white
            },
            ticks: {
              color: ' rgb(106 119 147)' // Set x-axis tick color to white
            }
          },
          y: {
            beginAtZero: true,// Hide the y-axis labels
            display: false, 
            ticks: {
              display: false // Hide the y-axis tick marks
            }
          },
        },
        responsive: true
      } as ChartOptions
    });
    
      this.assetForm = this.formBuilder.group({
        description: ['', Validators.required],
        type: ['', Validators.required],
        startDate: ['', Validators.required,this.validateStartDate],
        endDate: ['', Validators.required],
        targetAmount: ['', Validators.required]
      });

      this.PRSForm = this.formBuilder.group({
        type: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        targetAmount: ['', Validators.required]
      });
    
  }
  get formControls() {
    return this.assetForm.controls;
  }
  assetFormSubmit(){
    if (this.assetForm.invalid) {
      // Mark all form controls as touched to trigger validation errors
      this.assetForm.markAllAsTouched();
      return;
    }
    else{
      var assetmodal = document.getElementById('staticBackdrop');
      assetmodal.style.display = "none";
      const backdropElement = document.querySelector(".modal-backdrop.fade.show");

    // Remove the "show" class from the element's class list
    backdropElement.remove();
      
    }

  }
 
  validateStartDate(control: any) {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      return { min: true };
    }
    return null;
  }
  todayDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month: string | number = currentDate.getMonth() + 1;
    let day: string | number = currentDate.getDate();

    // Add leading zero if month or day is a single digit
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    return `${year}-${month}-${day}`;
  }
  savePRSForm(){
    if (this.PRSForm.invalid) {
      // Mark all form controls as touched to trigger validation errors
      this.PRSForm.markAllAsTouched();
      return;
    }
    else{
      var assetmodal = document.getElementById('exampleModal');
      assetmodal.style.display = "none";
      const backdropElement = document.querySelector(".modal-backdrop.fade.show");

    // Remove the "show" class from the element's class list
    backdropElement.remove()
    }

    // Perform save operation
    

    console.log(this.PRSForm.value);
    
  }
}
