import { Options } from '@angular-slider/ngx-slider';
import { Component, ElementRef, ViewChild } from '@angular/core';
import Pikaday from 'pikaday';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-quickstart',
  templateUrl: './quickstart.component.html',
  styleUrls: ['./quickstart.component.css']
})
export class QuickstartComponent {
  contacts:any[] = [
    {
    expense: 'xyz',
    amount: '',
    paymentDate:''
  },
    {
    expense: 'zzz',
    amount: '',
    paymentDate:''
  },
];
  srcIncomeForm: FormGroup;
  accountForm: FormGroup;
  savingsAccntForm: FormGroup;
  pretaxForm: FormGroup;
  budgetForm: FormGroup;
  pikadayInstance: Pikaday;
  selectedDate: Date;
  dateofbirth;
  currentStep: number = 0;
  initializationvar:any=1;
  steps: any = 1;
  maxsteps: any = 9
  showFinish: boolean;
  constructor(private router: Router, private formBuilder: FormBuilder) { }
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

  ngOnInit() {
    this.initSrcIncomeForm()
    this.initAccountForm();
    this.initSavingsAccntForm();
    this.initPretaxForm();
    this.initBudgetForm();
  }
  initSrcIncomeForm() {
    this.srcIncomeForm = this.formBuilder.group({
      incomesrc: this.formBuilder.array([this.newItem()])
    });
  }
  initAccountForm() {
    this.accountForm = this.formBuilder.group({
      accounts: this.formBuilder.array([this.newAccount()])
    });
  }
  initSavingsAccntForm() {
    this.savingsAccntForm = this.formBuilder.group({
      savingsAccounts: this.formBuilder.array([this.newSavingsAccount()])
    });
  }
  get accounts(): FormArray {
    return this.accountForm.get('accounts') as FormArray;
  }
  get incomesrc(): FormArray {
    return this.srcIncomeForm.get('incomesrc') as FormArray;
  }
  get savingsAccounts(): FormArray {
    return this.savingsAccntForm.get('savingsAccounts') as FormArray;
  }
  initPretaxForm() {
    this.pretaxForm = this.formBuilder.group({
      preTaxDeductions: this.formBuilder.array([this.newPreTaxDeduction()])
    });
  }

  get preTaxDeductions(): FormArray {
    return this.pretaxForm.get('preTaxDeductions') as FormArray;
  }

  newPreTaxDeduction(): FormGroup {
    return this.formBuilder.group({
      deduction: ['Deduction', Validators.required],
      amount: ['', Validators.required]
    });
  }

  addPreTaxDeduction() {
    this.preTaxDeductions.push(this.newPreTaxDeduction());
  }
  initBudgetForm() {
      this.budgetForm = this.formBuilder.group({
        expenses: this.formBuilder.array([this.newExpense(),
        this.newExpense()])
      });
    
  }

  get expenses(): FormArray {
    return this.budgetForm.get('expenses') as FormArray;
  }

  newExpense(): FormGroup {
    
    
      return this.formBuilder.group({
        expense: ['Rent', Validators.required],
        amount: ['', Validators.required],
        paymentDate: ['']
      });
    
  }

  addExpense() {
    this.expenses.push(this.newExpense());
  }
 
  newAccount(): FormGroup {
    return this.formBuilder.group({
      accountType: ['Account Type', Validators.required],
      accountName: ['', Validators.required]
    });
  }
newItem(): FormGroup {
  return this.formBuilder.group({
    type: ['', Validators.required],
    Amount: ['', Validators.required]
  });
  }
  addIncomesrcItem() {
    this.incomesrc.push(this.newItem());
  }
  newSavingsAccount(): FormGroup {
    return this.formBuilder.group({
      accountType: ['Account Type', Validators.required],
      accountName: ['', Validators.required]
    });
  }
  next() {
    this.steps++;
    this.currentStep++;
    if (this.maxsteps === this.steps) {
      this.showFinish = true
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
      }, 500);
    }


  }
  get progress(): number {
    return Math.floor((this.currentStep / 8) * 100);
  }
  back() {
    this.steps--;
    this.currentStep--;
    if (this.maxsteps === this.steps) {
      this.showFinish = true
    }
    else {
      this.showFinish = false
    }
  }
  finish() {
    // Perform any action or navigate to another page after finishing
    this.router.navigate(['/'])
  }

  addAccount() {
    this.accounts.push(this.newAccount());
  }

  addSavingsAccount() {
    
      this.savingsAccounts.push(this.newSavingsAccount());
    
  }

 

}
