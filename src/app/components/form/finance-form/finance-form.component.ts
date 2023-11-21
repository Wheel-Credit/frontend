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
    this.smartPaymentForm.patchValue({
      sellingPriceAsset: 16000,
      paymentPlanType: 36,
      initialInstallment: 20,
      finalInstallment: 40,
      interestRate: 15,
      interestType: 'TNA',
      capitalization: 'Diaria',
      paymentFrequency: 30,
      notaryCosts: 100,
      notaryCostsType: 'Loan',
      registrationCosts: 75,
      registrationCostsType: 'Loan',
      appraisal: 0,
      appraisalType: 'Cash',
      studyCommission: 0,
      studyCommissionType: 'Cash',
      activationCommission: 0,
      activationCommissionType: 'Cash',
      gps: 20,
      shippingCosts: 3.5,
      administrativeExpenses: 3.5,
      lifeInsurance: 0.049,
      riskInsurance: 0.3,
      discountRate: 50,
    });
    this.updateFormReadiness();
  }
}
