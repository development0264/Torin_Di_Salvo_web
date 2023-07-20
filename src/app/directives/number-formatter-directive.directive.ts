import { Directive, OnDestroy, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[appNumberFormatterDirective]',
  providers: [DecimalPipe]
})
export class NumberFormatterDirectiveDirective implements OnInit, OnDestroy {

  private subscription: Subscription;

  constructor(private ngControl: NgControl, private decimal: DecimalPipe) {
  }

  ngOnInit() {
    const control = this.ngControl.control;
    this.subscription = control.valueChanges.pipe(
      map(value => {
        // Remove commas from the input value
        const numericValue = value.toString().replace(/,/g, '');
        return this.formatNumber(numericValue);
      })
    ).subscribe(v => control.setValue(v, { emitEvent: false }));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private formatNumber(value: string): string {
    const parts = value.split(".");
    parts[0] = this.addCommas(parts[0]);
    return parts.join('.');
  }

  private addCommas(value: string): string {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
