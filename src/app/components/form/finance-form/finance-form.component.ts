import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SmartPayment } from 'src/app/model/smartPayment.model';
import { TableComponent } from '../table/table.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-finance-form',
  templateUrl: './finance-form.component.html',
  styleUrls: ['./finance-form.component.css'],
})
export class FinanceFormComponent {
  smartPaymentForm: FormGroup;
  smartPayment = new SmartPayment();
  formReady = false;

  planType = [24, 36];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.smartPaymentForm = this.fb.group({
      sellingPriceAsset: [null, Validators.required],
      paymentPlanType: [24, Validators.required],
      initialInstallment: [null, Validators.required],
      finalInstallment: [null, Validators.required],
      interestRate: [null, Validators.required],
      interestType: ['TNA', Validators.required],
      capitalization: ['Diaria', Validators.required],
      paymentFrequency: [null, Validators.required],
      notaryCosts: [0, Validators.min(0)],
      notaryCostsType: ['Cash'],
      registrationCosts: [0, Validators.min(0)],
      registrationCostsType: ['Cash'],
      appraisal: [0, Validators.min(0)],
      appraisalType: ['Cash'],
      studyCommission: [0, Validators.min(0)],
      studyCommissionType: ['Cash'],
      activationCommission: [0, Validators.min(0)],
      activationCommissionType: ['Cash'],
      gps: [null, Validators.required],
      shippingCosts: [null, Validators.required],
      administrativeExpenses: [null],
      lifeInsurance: [null, Validators.required],
      riskInsurance: [null, Validators.required],
      discountRate: [null, Validators.required],
    });
  }

  updateFormReadiness() {
    this.formReady = this.smartPaymentForm.valid;
  }

  updateSmartPayment() {
    this.smartPayment = this.smartPaymentForm.value;
  }

  onSubmit() {
    this.updateSmartPayment();
    if (!this.smartPaymentForm.valid) {
      this.snackBar.open('Debe ingresar todos los campos requeridos', '', {
        duration: 2000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
      return;
    }

    const dialogRef: MatDialogRef<TableComponent> = this.dialog.open(
      TableComponent,
      {
        data: { formValues: this.smartPayment },
      }
    );
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  inputRandomData() {
    var type = this.getRandomNumber(0, 1);
    this.smartPaymentForm.patchValue({
      sellingPriceAsset: this.getRandomNumber(10000, 100000),
      paymentPlanType: 24 + type * 12,
      initialInstallment: this.getRandomNumber(10, 30),
      finalInstallment: 50 - type * 10,
      interestRate: this.getRandomNumber(5, 20),
      interestType: this.getRandomNumber(0, 1) ? 'TNA' : 'TEA',
      capitalization: this.getRandomNumber(0, 1) ? 'Diaria' : 'Mensual',
      paymentFrequency: 30,
      notaryCosts: this.getRandomNumber(50, 200),
      notaryCostsType: this.getRandomNumber(0, 1) ? 'Loan' : 'Cash',
      registrationCosts: this.getRandomNumber(50, 150),
      registrationCostsType: this.getRandomNumber(0, 1) ? 'Loan' : 'Cash',
      appraisal: this.getRandomNumber(0, 500),
      appraisalType: this.getRandomNumber(0, 1) ? 'Loan' : 'Cash',
      studyCommission: this.getRandomNumber(0, 200),
      studyCommissionType: this.getRandomNumber(0, 1) ? 'Loan' : 'Cash',
      activationCommission: this.getRandomNumber(0, 200),
      activationCommissionType: this.getRandomNumber(0, 1) ? 'Loan' : 'Cash',
      gps: this.getRandomNumber(0, 100),
      shippingCosts: this.getRandomNumber(0, 10),
      administrativeExpenses: this.getRandomNumber(0, 10),
      lifeInsurance: this.getRandomFloat(0.001, 0.3),
      riskInsurance: this.getRandomFloat(0.001, 0.3),
      discountRate: this.getRandomNumber(0, 100),
    });
    this.updateFormReadiness();
  }

  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getRandomFloat(min: number, max: number): number {
    var temp = Math.random() * (max - min) + min;
    return parseFloat(temp.toFixed(3));
  }
}
