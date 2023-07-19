import { Options } from '@angular-slider/ngx-slider';
import { Component, ElementRef, ViewChild } from '@angular/core';
import Pikaday from 'pikaday';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-quickstart',
  templateUrl: './quickstart.component.html',
  styleUrls: ['./quickstart.component.css']
})
export class QuickstartComponent {
  datePickerConfig:Partial<BsDatepickerConfig>

//initialize the forms
  srcIncomeForm: FormGroup;
  accountForm: FormGroup;
  savingsAccntForm: FormGroup;
  pretaxForm: FormGroup;
  budgetForm: FormGroup;
  selectedDate: Date;
  dateofbirth;
  currentStep: number = 0;
  initializationvar:any=1;
  steps: any = 1;
  maxsteps: any = 9
  showFinish: boolean;
  constructor(private router: Router, private formBuilder: FormBuilder) { 
    this.datePickerConfig=Object.assign({},{
      containerClass:'theme-dark-blue',
      adaptivePosition: true ,
      isAnimated: true 
  })
  }
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
 

  ngOnInit() {
    this.initSrcIncomeForm()
    this.initAccountForm();
    this.initSavingsAccntForm();
    this.initPretaxForm();
    this.initBudgetForm();
  }

  //income source form config

  initSrcIncomeForm() {
    this.srcIncomeForm = this.formBuilder.group({
      incomesrc: this.formBuilder.array([this.newItem()])
    });
  }
  get incomesrc(): FormArray {
    return this.srcIncomeForm.get('incomesrc') as FormArray;
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
  removeIncomesrcItem(index: number) {
    this.incomesrc.removeAt(index);
  }

  //Account Form config

  initAccountForm() {
    this.accountForm = this.formBuilder.group({
      accounts: this.formBuilder.array([this.newAccount()])
    });
  }
  get accounts(): FormArray {
    return this.accountForm.get('accounts') as FormArray;
  }
  newAccount(): FormGroup {
    return this.formBuilder.group({
      accountType: ['Account Type', Validators.required],
      accountName: ['', Validators.required]
    });
  }
  removeAccount(index: number) {
    this.accounts.removeAt(index);
  }
  addAccount() {
    this.accounts.push(this.newAccount());
  }

  //Savings Acoount Form config

  initSavingsAccntForm() {
    this.savingsAccntForm = this.formBuilder.group({
      savingsAccounts: this.formBuilder.array([this.newSavingsAccount()])
    });
  }


  get savingsAccounts(): FormArray {
    return this.savingsAccntForm.get('savingsAccounts') as FormArray;
  }
  
  addSavingsAccount() {
    this.savingsAccounts.push(this.newSavingsAccount());
}
  newSavingsAccount(): FormGroup {
    return this.formBuilder.group({
      accountType: ['Account Type', Validators.required],
      accountName: ['', Validators.required]
    });
  }
  removeSavingsAccount(index: number) {
    this.savingsAccounts.removeAt(index);
  }

  //Pretax Form config

  initPretaxForm() {
    this.pretaxForm = this.formBuilder.group({
      preTaxDeductions: this.formBuilder.array([this.newPreTaxDeduction()])
    });
  }

  get preTaxDeductions(): FormArray {
    return this.pretaxForm.get('preTaxDeductions') as FormArray;
  }

  addPreTaxDeduction() {
    this.preTaxDeductions.push(this.newPreTaxDeduction());
  }
  newPreTaxDeduction(): FormGroup {
    return this.formBuilder.group({
      deduction: ['Deduction', Validators.required],
      amount: ['', Validators.required]
    });
  }
  removePreTaxDeduction(index: number) {
    this.preTaxDeductions.removeAt(index);
  }

  //Budget form config

  initBudgetForm() {
      this.budgetForm = this.formBuilder.group({
        expenses: this.formBuilder.array([this.newExpense(),
        this.newExpenseWithDefault()])
      });
    
  }

  get expenses(): FormArray {
    return this.budgetForm.get('expenses') as FormArray;
  }
  newExpenseWithDefault(){
    
    return this.formBuilder.group({
      expense: ['', Validators.required],
      amount: ['', Validators.required],
      paymentDate: ['']
    });
  }

  newExpense(): FormGroup {
      return this.formBuilder.group({
        expense: ['Rent', Validators.required],
        amount: ['', Validators.required],
        paymentDate: ['']
      });
  }
  removeExpense(index: number) {
    this.expenses.removeAt(index);
  }
  addExpense() {
    this.expenses.push(this.newExpenseWithDefault());
  }

//next and back button config

  next() {
    this.steps++;
    this.currentStep++;
    if (this.maxsteps === this.steps) {
      this.showFinish = true
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
    this.router.navigate(['/'])
  }

}
