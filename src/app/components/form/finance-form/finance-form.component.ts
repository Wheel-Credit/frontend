import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SmartPayment } from 'src/app/model/smartPayment.model';
import { TableComponent } from '../table/table.component';

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
    private dialog: MatDialog
  ) {
    this.smartPaymentForm = this.fb.group({
      sellingPriceAsset: [null, Validators.required],
      paymentPlanType: [24, Validators.required],
      initialInstallment: [null, Validators.required],
      interestRate: [null, Validators.required],
      interestType: ['TNA', Validators.required],
      capitalization: ['Diaria', Validators.required],
      paymentFrequency: [null, Validators.required],
      notaryCosts: [null],
      notaryCostsType: ['Efectivo'],
      registrationCosts: [null],
      registrationCostsType: ['Efectivo'],
      appraisal: [null],
      appraisalType: ['Efectivo'],
      studyCommission: [null],
      studyCommissionType: ['Efectivo'],
      activationCommission: [null],
      activationCommissionType: ['Efectivo'],
      gps: [null, Validators.required],
      shippingCosts: [null, Validators.required],
      administrativeExpenses: [null, Validators.required],
      lifeInsurance: [null, Validators.required],
      riskInsurance: [null, Validators.required],
      discountRate: [null, Validators.required],
    });
  }

  updateFormReadiness() {
    this.formReady = this.smartPaymentForm.valid;
  }

  onSubmit() {
    console.log(this.formReady);
    console.log(this.smartPaymentForm.value);
    const dialogRef: MatDialogRef<TableComponent> = this.dialog.open(
      TableComponent,
      {
        data: { formValues: this.smartPaymentForm.value },
      }
    );
  }
}
