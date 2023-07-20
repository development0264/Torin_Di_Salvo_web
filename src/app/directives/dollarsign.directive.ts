import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { LogarithmicScale } from 'chart.js';
@Directive({
  selector: '[appDollarsign]'
})
export class DollarsignDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    
  }

  @HostListener('input', ['$event'])
  onInputChange(event: Event) {
    console.log('Input event triggered!');
    const inputElement = event.target as HTMLInputElement;
    const dollarSign = this.elementRef.nativeElement.querySelector('.position-absolute');
    console.log(dollarSign);
    
    if (dollarSign) {
      if (inputElement.value.trim() !== '') {
        
        this.renderer.setStyle(dollarSign, 'color', 'black');
      } else {
        this.renderer.setStyle(dollarSign, 'color', '');
      }
    }
  }

}
