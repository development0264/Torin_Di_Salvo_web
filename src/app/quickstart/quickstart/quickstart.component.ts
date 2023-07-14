import { Component, ElementRef, ViewChild } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
@Component({
  selector: 'app-quickstart',
  templateUrl: './quickstart.component.html',
  styleUrls: ['./quickstart.component.css']
})
export class QuickstartComponent {
  @ViewChild('slider') sliderElement: ElementRef;

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
  progress: number = 1;
  currentContent: string = "Step 1";
  steps: any = 1;
  maxsteps: any = 9
  showFinish: boolean;


  next() {
    this.steps++;
    if (this.maxsteps === this.steps) {
      this.showFinish = true
    }
    if (this.progress < 100) {
      // this.progress += 25;
      this.progress = Math.floor((this.steps / this.maxsteps) * 100);
      this.updateContent();
    }
  }
  back() {
    this.steps--;
  }
  finish() {
    // Perform any action or navigate to another page after finishing
  }

  updateContent() {
    switch (this.progress) {
      case 25:
        this.currentContent = "Step 2";
        break;
      case 50:
        this.currentContent = "Step 3";
        break;
      case 75:
        this.currentContent = "Step 4";
        break;
      case 100:
        this.currentContent = "All steps completed";
        break;
      default:
        this.currentContent = "Step 1";
        break;
    }
  }
}
