import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart,ChartOptions } from 'chart.js';
import noUiSlider from 'nouislider';
import { Options } from '@angular-slider/ngx-slider';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  ngAfterViewInit() {
    setTimeout(() => {
      this.hideMinMaxValues();
    }, 0);
  }
  @ViewChild('slider') sliderElement: ElementRef;
  Linechart: Chart;
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
  }
  
  hideMinMaxValues() {
    const sliderElement = this.sliderElement.nativeElement;
    const minMaxValueElements = sliderElement.querySelectorAll('.ngx-slider-limit');
  
    minMaxValueElements.forEach((element: HTMLElement) => {
      element.style.display = 'none';
    });
  }
  
}
