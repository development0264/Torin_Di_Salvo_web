import { Component } from '@angular/core';

@Component({
  selector: 'app-quickstart',
  templateUrl: './quickstart.component.html',
  styleUrls: ['./quickstart.component.css']
})
export class QuickstartComponent {
  
  progress: number = 1;
  currentContent: string = "Step 1";
  steps:any=1;
  maxsteps:any=9
  showFinish: boolean;

 
  next() {
    this.steps++;
    if(this.maxsteps===this.steps){
      this.showFinish=true
    }
    if (this.progress < 100) {
      // this.progress += 25;
      this.progress = Math.floor((this.steps / this.maxsteps) * 100);
      this.updateContent();
    }
  }
  back(){
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
