import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart,ChartOptions } from 'chart.js';
import { Options } from '@angular-slider/ngx-slider';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  PrsFormHeading:any='Puerto Rico Saver'
  // AIRFormHeading:any='AirBnb Buy-Ins'
  startDate:any;
  airBnBHeadervalueTable:any='AirBnb Buy-Ins';
  airBnBHeadervalue:any='AirBnb Buy-Ins';
  minDate: Date;
  minDatePRS: Date;
  datePickerConfig:Partial<BsDatepickerConfig>
  airBnBForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.datePickerConfig=Object.assign({},{
      containerClass:'theme-dark-blue',
      adaptivePosition: true ,
      isAnimated: true 
  })
  }

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
          data: [0,2,3,2.9,7,7.2,7.4,7.7,8,8.4,10],
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
    // create assets/libilities modal form
      this.assetForm = this.formBuilder.group({
        description: ['', Validators.required],
        type: ['', Validators.required],
        startDate: ['',  Validators.required],
        endDate: ['', Validators.required],
        targetAmount: ['', Validators.required]
      });
      //PRSF mddal form
      this.PRSForm = this.formBuilder.group({
        type: ['Saver', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        targetAmount: ['', Validators.required]
      });
      //AirBnB modal form
      this.airBnBForm = this.formBuilder.group({
        type: ['Saver', Validators.required],
        targetAmount: ['', Validators.required]
      });
    
  }
  get formControls() {
    return this.assetForm.controls;
  }
  onStartDatePrsChange(newStartDatePRD:Date){

if(newStartDatePRD!=undefined){
  this.minDatePRS=newStartDatePRD
}

  }
  onStartDateChange(newStartDate: Date) {
    // Here, you can access the selected start date in the `newStartDate` variable
    // You can do any additional processing with the start date if needed
    // console.log('Selected start date:', typeof(newStartDate));
    
    if(newStartDate!=undefined){

      this.minDate=newStartDate
    }
    

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
      this.assetForm.reset()
    }

  }
  endDateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const startDateValue = this.assetForm.get('startDate').value;
      const endDateValue = control.value;
      
      if (startDateValue && endDateValue) {
        const startDate = new Date(startDateValue);
        const endDate = new Date(endDateValue);
        
        if (endDate <= startDate) {
          return { endDateLessThanStartDate: true };
        }
      }
      
      return null;
    };
  }
  EditHeader(){
    this.airBnBHeadervalueTable=this.airBnBHeadervalue
  }
  airBnBSubmit(){
    if (this.airBnBForm.invalid) {
      // Mark all form controls as touched to trigger validation errors
      this.airBnBForm.markAllAsTouched();
      return;
    }
    else{
      var assetmodal = document.getElementById('airbnbmodal');
      assetmodal.style.display = "none";
      const backdropElement = document.querySelector(".modal-backdrop.fade.show");

    // Remove the "show" class from the element's class list
    backdropElement.remove();
      this.airBnBForm.reset()
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
    this.PRSForm.reset()
    this.rangeSliderValue=0
    // Remove the "show" class from the element's class list
    backdropElement.remove()
    }
    
  }
  closeassetmodal()
{
  this.assetForm.reset()
  
}
closePRStmodal(){
  this.PRSForm.reset()
  this.rangeSliderValue=0
}
closeAirtmodal(){
  this.airBnBForm.reset()
}

}
