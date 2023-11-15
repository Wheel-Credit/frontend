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
      finalInstallment: [null, Validators.required],
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

    this.Algorithm();
  }

  updateFormReadiness() {
    this.formReady = this.smartPaymentForm.valid;
  }

  updateSmartPayment() {
    this.smartPayment = this.smartPaymentForm.value;
  }

  onSubmit() {
    console.log(this.smartPayment);
    this.updateSmartPayment();
    console.log(this.smartPayment);
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

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Formulas y Pruebas

  smartPaymentAux = new SmartPayment(
    16000, // sellingPriceAsset: number | null = null,
    36, // paymentPlanType: number | null = null,
    20, // initialInstallment: number | null = null,
    40, // finalInstallment: number | null = null,
    15, // interestRate: number | null = null,
    'TNA', // interestType: string = '',
    'Diaria', // capitalization: string = '',
    30, // paymentFrequency: number | null = null,
    100, // notaryCosts: number | null = null,
    'Loan', // notaryCostsType: string = '',
    75, // registrationCosts: number | null = null,
    'Loan', // registrationCostsType: string = '',
    0, // appraisal: number | null = null,
    'Loan', // appraisalType: string = '',
    0, // studyCommission: number | null = null,
    'Loan', // studyCommissionType: string = '',
    0, // activationCommission: number | null = null,
    'Loan', // activationCommissionType: string = '',
    20, // gps: number | null = null,
    3.5, // shippingCosts: number | null = null,
    3.5, // administrativeExpenses: number | null = null,
    0.049, // lifeInsurance: number | null = null,
    0.3, // riskInsurance: number | null = null,
    50 //discountRate: number | null = null
  );

  //// Variables
  // interestRate without %
  // lifeInsurance without %
  number_of_days_per_year = 360;

  Algorithm() {
    console.log('La función Algorithm se está ejecutando...');

    //TEA
    var TEA = this.GetTEA(
      this.smartPaymentAux.interestType,
      this.smartPaymentAux.interestRate!,
      this.smartPaymentAux.capitalization
    );
    console.log('TEA: ' + TEA);

    //TEP (la que se utiliza para las cuotas)
    var TEP = this.getTEP(TEA, this.smartPaymentAux.paymentFrequency!);
    console.log('TEP: ' + TEP);

    //Numero de por Año Cuotas
    var Number_of_Installments_per_year = this.GetNumInstallments(
      this.smartPaymentAux.paymentFrequency!
    );
    console.log(
      'Number of Installments per year: ' + Number_of_Installments_per_year
    );

    //Numero Total de Cuotas
    var TotalInstallments = this.smartPaymentAux.paymentPlanType;
    console.log('TotalInstallments: ' + TotalInstallments);

    //Cuota Inicial
    var InitialInstallment = this.GetInitialInstallment(
      this.smartPaymentAux.sellingPriceAsset!,
      this.smartPaymentAux.initialInstallment!
    );
    console.log('InitialInstallment: ' + InitialInstallment);

    //Cuota Final
    var FinalInstallment = this.getFinalInstallment(
      this.smartPaymentAux.sellingPriceAsset!,
      this.smartPaymentAux.finalInstallment!
    );
    console.log('FinalInstallment: ' + FinalInstallment);

    //Monto del Prestamo
    var LoanAmount = this.getLoanAmount(
      this.smartPaymentAux.sellingPriceAsset!,
      InitialInstallment,
      this.smartPaymentAux.notaryCosts!,
      this.smartPaymentAux.notaryCostsType,
      this.smartPaymentAux.registrationCosts!,
      this.smartPaymentAux.registrationCostsType,
      this.smartPaymentAux.appraisal!,
      this.smartPaymentAux.appraisalType,
      this.smartPaymentAux.studyCommission!,
      this.smartPaymentAux.studyCommissionType,
      this.smartPaymentAux.activationCommission!,
      this.smartPaymentAux.activationCommissionType
    );
    console.log('LoanAmount: ' + LoanAmount);

    //Saldo a financiar con cuotas
    var BalanceToFinanceWithInstallments =
      this.getBalanceToFinanceWithInstallments(
        LoanAmount,
        FinalInstallment,
        TEP,
        this.smartPaymentAux.lifeInsurance!,
        TotalInstallments!
      );
    console.log(
      'BalanceToFinanceWithInstallments: ' + BalanceToFinanceWithInstallments
    );

    //% de Seguro desgrav. per.
    var PercentageOfReliefInsurance =
      ((this.smartPaymentAux.lifeInsurance! / 100) *
        this.smartPaymentAux.paymentFrequency!) /
      30;
    console.log('PercentageOfReliefInsurance: ' + PercentageOfReliefInsurance);

    //Seguro riesgo
    var RiskInsurance =
      ((this.smartPaymentAux.riskInsurance! / 100) *
        this.smartPaymentAux.sellingPriceAsset!) /
      Number_of_Installments_per_year;
    console.log('RiskInsurance: ' + RiskInsurance);

    //Intereses
    var Interests = 0;

    ////Pruebas
    //Falta Comprobar
    console.log(
      'Calcular pago: ' +
        this.CalcularPago(TEP, PercentageOfReliefInsurance, 36, 9015.99)
    );
  }

  GetTEA(interestType: String, interestRate: number, capitalization: String) {
    var interestRatePorcent = interestRate / 100;

    var TN_days = 0;
    var Captitalization_days = 0;

    if (interestType == 'TNA') {
      TN_days = 360;
    }
    if (capitalization == 'Diaria') {
      Captitalization_days = 1;
    } else if (capitalization == 'Mensual') {
      Captitalization_days = 30;
    } else if (capitalization == 'Anual') {
      Captitalization_days = 360;
    }

    return (
      Math.pow(
        1 + interestRatePorcent / 360,
        this.number_of_days_per_year / Captitalization_days
      ) - 1
    );
  }

  getTEP(TEA: number, paymentFrequency: number) {
    return (
      Math.pow(1 + TEA, paymentFrequency / this.number_of_days_per_year) - 1
    );
  }

  //Conseguir el numero de Cuotas
  GetNumInstallments(paymentFrequency: number) {
    return this.number_of_days_per_year / paymentFrequency;
  }

  //Cuota Inicial
  GetInitialInstallment(sellingPriceAsset: number, initialInstallment: number) {
    return (initialInstallment / 100) * sellingPriceAsset;
  }

  getFinalInstallment(sellingPriceAsset: number, finalInstallment: number) {
    return (finalInstallment / 100) * sellingPriceAsset;
  }

  getLoanAmount(
    sellingPriceAsset: number,
    initialInstallment: number,
    notaryCosts: number,
    notaryCostsType: String,
    registrationCosts: number,
    registrationCostsType: String,
    appraisal: number,
    appraisalType: String,
    studyCommission: number,
    studyCommissionType: String,
    activationCommission: number,
    activationCommissionType: String
  ) {
    var LoanAmount = sellingPriceAsset - initialInstallment;

    if (notaryCostsType == 'Loan') {
      LoanAmount += notaryCosts;
    }
    if (registrationCostsType == 'Loan') {
      LoanAmount += registrationCosts;
    }
    if (appraisalType == 'Loan') {
      LoanAmount += appraisal;
    }
    if (studyCommissionType == 'Loan') {
      LoanAmount += studyCommission;
    }
    if (activationCommissionType == 'Loan') {
      LoanAmount += activationCommission;
    }
    return LoanAmount;
  }

  //Saldo a financiar con cuotas
  getBalanceToFinanceWithInstallments(
    LoanAmount: number,
    finalInstallment: number,
    TEP: number,
    lifeInsurance: number,
    TotalInstallments: number
  ) {
    return (
      LoanAmount -
      finalInstallment /
        Math.pow(1 + TEP + lifeInsurance / 100, TotalInstallments + 1)
    );
  }

  getInterests() {}

  getTable(
    finalInstallment: number,
    TEP: number,
    lifeInsurance: number,
    TotalInstallments: number,
    PercentageOfReliefInsurance: number,
    BalanceToFinanceWithInstallments: number,
    RiskInsurance: number
  ) {
    var NumberofInstallments = TotalInstallments + 1;

    //Saldo inicial Cuota Final
    var InitialInstallmentFinalInstallment = [];

    //Interes Cuota Final
    var FinalInstallmentInterest = [];

    //Amort. Couta Final
    var FinalInstallmentAmortization = [];

    //Seguro desgav. Cuota Final
    var CreditInsuranceFinalInstallment: number[] = [];

    //Saldo Final Cuota Final
    var FinalBalanceFinalInstallment: number[] = [];

    //Saldo Inicial Cuota
    var InitialBalanceInstallment: number[] = [];

    //Interes
    var Interest: number[] = [];

    //Cuota (inc Seg Des)
    var Installments: number[] = [];

    //Amort.
    var Amortization: number[] = [];

    //Seguro desg. Cuota
    var InsuranceCreditInstallment: number[] = [];

    //Seguro riesgo
    var RiskInsuranceTable: number[] = [];

    //GPS
    var GPSTable: number[] = [];

    //Portes
    var ShippingCostsTable: number[] = [];

    //Gastos Adm.
    var AdministrativeExpensesTable: number[] = [];

    //Saldo Final para Cuota
    var FinalBalanceInstallment: number[] = [];

    //Flujo
    var Flow: number[] = [];

    for (var i = 0; i < NumberofInstallments; i++) {
      //Saldo inicial Cuota Final
      if (i == 0) {
        InitialInstallmentFinalInstallment[i] =
          finalInstallment /
          Math.pow(1 + TEP + lifeInsurance / 100, TotalInstallments + 1);
      } else {
        InitialInstallmentFinalInstallment[i] =
          FinalBalanceFinalInstallment[i - 1];
      }

      //Interes Cuota Final
      FinalInstallmentInterest[i] =
        -InitialInstallmentFinalInstallment[i] * TEP;

      //Amort. Couta Final
      if (i == NumberofInstallments - 1) {
        FinalInstallmentAmortization[i] =
          -InitialInstallmentFinalInstallment[i] +
          FinalInstallmentInterest[i] +
          CreditInsuranceFinalInstallment[i];
      }

      //Seguro desgav. Cuota Final
      CreditInsuranceFinalInstallment[i] =
        -InitialInstallmentFinalInstallment[i] * PercentageOfReliefInsurance;

      //Saldo Final Cuota Final
      FinalBalanceFinalInstallment[i] =
        InitialInstallmentFinalInstallment[i] -
        FinalInstallmentInterest[i] -
        CreditInsuranceFinalInstallment[i] +
        FinalInstallmentAmortization[i];

      //Saldo Inicial Cuota
      if (i == 0) {
        InitialBalanceInstallment[i] = BalanceToFinanceWithInstallments;
      } else {
        if (i <= TotalInstallments) {
          InitialBalanceInstallment[i] = FinalBalanceInstallment[i - 1];
        } else {
          InitialBalanceInstallment[i] = 0;
        }
      }

      //Interes
      Interest[i] = -InitialBalanceInstallment[i] * TEP;

      //Cuota (inc Seg Des)
      if (i <= NumberofInstallments - 1) {
        if (0) {
          // En caso que sea un Plazo de Gracia Total
          Installments[i] = 0;
        }
        if (0) {
          Installments[i] = Interest[i];
        }
        if (1) {
          //Falta poner CalcularPago
        }
      } else {
        Installments[i] = 0;
      }

      //Amort.
      if (i <= NumberofInstallments - 1) {
        if (0) {
          // En caso que sea un Plazo de Gracia Total o Parcial
          Amortization[i] = 0;
        } else {
          Amortization[i] =
            Installments[i] - Interest[i] - InsuranceCreditInstallment[i];
        }
      } else {
        Amortization[i] = 0;
      }

      //Seguro desg. Cuota
      InsuranceCreditInstallment[i] =
        -InitialBalanceInstallment[i] * PercentageOfReliefInsurance;

      //Seguro riesgo
      if (i <= NumberofInstallments + 1) {
        // +1?? Según el excel es +1
        RiskInsuranceTable[i] = RiskInsurance;
      }

      //GPS
      if (i <= NumberofInstallments + 1) {
        // +1?? Según el excel es +1
        GPSTable[i] = this.smartPaymentAux.gps!;
      }

      //Portes
      if (i <= NumberofInstallments + 1) {
        // +1?? Según el excel es +1
        ShippingCostsTable[i] = this.smartPaymentAux.shippingCosts!;
      }

      //Gastos Adm.
      if (i <= NumberofInstallments + 1) {
        // +1?? Según el excel es +1
        AdministrativeExpensesTable[i] =
          this.smartPaymentAux.administrativeExpenses!;
      }

      //Saldo Final para Cuota
      if (0) {
        // Si es un Plazo de Gracia Total
        FinalBalanceInstallment[i] = InitialBalanceInstallment[i] - Interest[i];
      } else {
        FinalBalanceInstallment[i] =
          InitialBalanceInstallment[i] + Amortization[i];
      }

      //Flujo
      if (0) {
        // Si es un Plazo de Gracia Total o Parcial
        if (i == NumberofInstallments - 1) {
          Flow[i] =
            -Installments[i] +
            RiskInsuranceTable[i] +
            GPSTable[i] +
            ShippingCostsTable[i] +
            AdministrativeExpensesTable[i] +
            InsuranceCreditInstallment[i] +
            FinalInstallmentAmortization[i];
        } else {
          Flow[i] =
            -Installments[i] +
            RiskInsuranceTable[i] +
            GPSTable[i] +
            ShippingCostsTable[i] +
            AdministrativeExpensesTable[i] +
            InsuranceCreditInstallment[i];
        }
      } else {
        if (i == NumberofInstallments - 1) {
          Flow[i] =
            -Installments[i] +
            RiskInsuranceTable[i] +
            GPSTable[i] +
            ShippingCostsTable[i] +
            AdministrativeExpensesTable[i] +
            FinalInstallmentAmortization[i];
        } else {
          Flow[i] =
            -Installments[i] +
            RiskInsuranceTable[i] +
            GPSTable[i] +
            ShippingCostsTable[i] +
            AdministrativeExpensesTable[i];
        }
      }
    }
  }

  //Falta Adecuar la formula
  CalcularPago(
    TEP: number,
    PercentageOfReliefInsurance: number,
    NumberofInstallments: number,
    InitialBalanceInstallment: number
  ) {
    const pagoMensual =
      (PercentageOfReliefInsurance *
        (TEP * Math.pow(1 + TEP, NumberofInstallments))) /
      (Math.pow(1 + TEP, NumberofInstallments) - 1);
    return InitialBalanceInstallment <= NumberofInstallments ? pagoMensual : 0;
  }
}
