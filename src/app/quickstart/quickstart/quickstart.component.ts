import { Options } from '@angular-slider/ngx-slider';
import { Component, ElementRef, ViewChild , ChangeDetectorRef } from '@angular/core';
import Pikaday from 'pikaday';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-quickstart',
  templateUrl: './quickstart.component.html',
  styleUrls: ['./quickstart.component.css']
})
export class QuickstartComponent {
  datePickerConfig:Partial<BsDatepickerConfig>
  inputFilled: boolean = false;
  inputFilledIncome: boolean[] = [false];
  inputFilledAmtPerPay: boolean[] = [false];
  inputFilledAmount: boolean[] = [false];
  isPaycheckFrequencySelected: boolean = false;
  inputfilleddeduction:boolean=false
  isBonusOptionSelected: boolean = false;
  isAccountSelected: boolean = false;
  issavAccountSelected: boolean = false;
  issdeductionSelected: boolean = false;
//declare  the forms
  srcIncomeForm: FormGroup;
  accountForm: FormGroup;
  savingsAccntForm: FormGroup;
  pretaxForm: FormGroup;
  budgetForm: FormGroup;
  paycheckForm: FormGroup;
  bonusForm: FormGroup;
  taxDeductionForm: FormGroup;
  selectedDate: Date;
  dateofbirth;
  currentStep: number = 0;
  initializationvar:any=1;
  steps: any = null;
  maxsteps: any = 9
  showFinish: boolean;
  constructor(private router: Router, private formBuilder: FormBuilder,private route: ActivatedRoute,
    private cdr: ChangeDetectorRef) { 
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
 
  onPaycheckFrequencyChange() {
    this.isPaycheckFrequencySelected = true;
  }
  //texdudectionform config 
  initTaxDeductionForm() {
    this.taxDeductionForm = this.formBuilder.group({
      taxDeductionType: ['itemized', Validators.required],
      deductionAmount: ['', [Validators.required, Validators.pattern(/^[0-9,]+(\.[0-9]{1,2})?$/)]]
    });
  }
  get txform() {
    return this.taxDeductionForm.controls;
  }
  //bonus formconfig
  initBonusForm() {
    this.bonusForm = this.formBuilder.group({
      bonusOption: ['0', Validators.required],
      bonusDate: ['', Validators.required],
      bonusAmount: ['', [Validators.required, Validators.pattern(/^[0-9,]+(\.[0-9]{1,2})?$/)]]
    });
  }
  get form() {
    return this.bonusForm.controls;
  }
  onBonusOptionChange() {
    this.isBonusOptionSelected = true;
  }
  onAccountChange() {
    this.isAccountSelected = true;
  }
  onsavAccountChange() {
    this.issavAccountSelected = true;
  }
  ondeductionChange() {
    this.issdeductionSelected = true;
  }
  ngOnInit() {
    
    console.log("called");
    
    this.initPaycheckForm();
    this.initSrcIncomeForm()
    this.initAccountForm();
    this.initSavingsAccntForm();
    this.initPretaxForm();
    this.initBudgetForm();
    this.initBonusForm();
    this.initTaxDeductionForm();
    this.route.params.subscribe(params => {
      const id = params['id']; // Access the value of :id parameter
      this.steps=id
      console.log(this.steps);
      this.cdr.detectChanges();
      // You can use the id parameter as needed in your component logic
    });
  }
  initPaycheckForm() {
    this.paycheckForm = this.formBuilder.group({
      annualIncome: ['', [Validators.required, Validators.pattern(/^[0-9,]+(\.[0-9]{1,2})?$/)]],
      paycheckFrequency: ['0', Validators.required],
      firstPaycheckDate: ['', Validators.required],
      secondPaycheckDate: ['', Validators.required]
    });
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
      Amount: ['', [Validators.required, Validators.pattern(/^[0-9,]+(\.[0-9]{1,2})?$/)]]
    });
    }
    
  addIncomesrcItem() {
    this.incomesrc.push(this.newItem());
    this.inputFilledIncome.push(false); 
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
      accountName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]]
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
      accountName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]]
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
    this.inputFilledAmtPerPay.push(false); 
  }
  newPreTaxDeduction(): FormGroup {
    return this.formBuilder.group({
      deduction: ['Deduction', Validators.required],
      amount: ['', [Validators.required, Validators.pattern(/^[0-9,]+(\.[0-9]{1,2})?$/)]]
    });
  }
  removePreTaxDeduction(index: number) {
    this.preTaxDeductions.removeAt(index);
  }

  //Budget form config

  initBudgetForm() {
      this.budgetForm = this.formBuilder.group({
        expenses: this.formBuilder.array([this.newExpense(),this.newExpenseWithDefault()])
      });
    
  }

  get expenses(): FormArray {
    return this.budgetForm.get('expenses') as FormArray;
  }
  newExpenseWithDefault(){
    
    return this.formBuilder.group({
      expense: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern(/^[0-9,]+(\.[0-9]{1,2})?$/)]],
      paymentDate: ['',[Validators.maxLength(2)]]
    });
  }

  newExpense(): FormGroup {
      return this.formBuilder.group({
        expense: ['Rent', Validators.required],
        amount: ['', [Validators.required, Validators.pattern(/^[0-9,]+(\.[0-9]{1,2})?$/)]],
        paymentDate: ['',[Validators.max(1)]]      });
  }
  removeExpense(index: number) {
    this.expenses.removeAt(index);
  }
  addExpense() {
    this.expenses.push(this.newExpenseWithDefault());
    this.inputFilledAmount.push(false); 
  }

//next and back button config

  next() {
    this.steps++
    // this.currentStep++;
    console.log("this.step",this.steps);

    const stepsroute=parseInt(this.steps)
    console.log(this.maxsteps ==stepsroute);
    
    if (this.maxsteps === stepsroute) {
      this.showFinish = true
    }
    this.router.navigate([`quick-start/step/${stepsroute}`])
    // this.steps++;
  }
  get progress(): number {
    return Math.floor(((this.steps-1) / 8) * 100);
  }
  back() {
    // this.steps--;
    // this.currentStep--;
    this.steps--;
    const stepsrouteback=parseInt(this.steps)

    if(stepsrouteback!=9){
      this.showFinish=false
    }
    else{
      this.showFinish=true
    }
    // if (this.maxsteps === this.steps) {
    //   this.showFinish = true
    // }
    // else {
    //   this.showFinish = false
    // }
    this.router.navigate([`quick-start/step/${stepsrouteback}`])
  }
  finish() {
    this.router.navigate(['/'])
  }
  onInputEvent(event: Event) {
    console.log("called");
    
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;


    // Use RegExp to enforce the pattern of 1-31
    const pattern = new RegExp('^([1-9]|[1-2]|3[0-1])$');


    if (!pattern.test(inputValue)) {
      // If the input value doesn't match the pattern, clear the input
      inputElement.value = '';
    }
  }

}
