import { Component } from '@angular/core';
import { irr, npv } from 'financial';
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
      notaryCostsType: ['Efectivo'],
      registrationCosts: [0, Validators.min(0)],
      registrationCostsType: ['Efectivo'],
      appraisal: [0, Validators.min(0)],
      appraisalType: ['Efectivo'],
      studyCommission: [0, Validators.min(0)],
      studyCommissionType: ['Efectivo'],
      activationCommission: [0, Validators.min(0)],
      activationCommissionType: ['Efectivo'],
      gps: [null, Validators.required],
      shippingCosts: [null, Validators.required],
      administrativeExpenses: [null],
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

  // Lista de Periodos de Gracia
  CreateListofGracePeriods() {
    var List_of_Grace_Periods: String[] = [];
    for (var i = 0; i < this.smartPaymentAux.paymentPlanType! + 1; i++) {
      List_of_Grace_Periods.push('S');
    }
    return List_of_Grace_Periods;
  }

  ///////////////////////////////////////////////////////////////////////////

  //// Variables Globales

  List_of_Grace_Periods: String[] = [];

  //Saldo inicial Cuota Final
  InitialBalanceFinalInstallment: number[] = [];

  //Interes Cuota Final
  FinalInstallmentInterest: number[] = [];

  //Amort. Cuota Final
  FinalInstallmentAmortization: number[] = [];

  //Seguro desgav. Cuota Final
  CreditInsuranceFinalInstallment: number[] = [];

  //Saldo Final Cuota Final
  FinalBalanceFinalInstallment: number[] = [];

  //Saldo Inicial Cuota
  InitialBalanceInstallment: number[] = [];

  //Interes
  Interest: number[] = [];

  //Cuota (inc Seg Des)
  Installments: number[] = [];

  //Amort.
  Amortization: number[] = [];

  //Seguro desg. Cuota
  InsuranceCreditInstallment: number[] = [];

  //Seguro riesgo
  RiskInsuranceTable: number[] = [];

  //GPS
  GPSTable: number[] = [];

  //Portes
  ShippingCostsTable: number[] = [];

  //Gastos Adm.
  AdministrativeExpensesTable: number[] = [];

  //Saldo Final para Cuota
  FinalBalanceInstallment: number[] = [];

  //Flujo
  Flow: number[] = [];

  ///////////////////////////////////////////////////////////////////////////

  //// Variables
  // interestRate without %
  // lifeInsurance without %
  number_of_days_per_year = 360;

  Algorithm() {
    console.log('La función Algorithm se está ejecutando...');

    this.List_of_Grace_Periods = this.CreateListofGracePeriods();
    /*     for(var i = 0; i < this.List_of_Grace_Periods.length; i++){
      console.log("List_of_Grace_Periods[" + i + "]: " + this.List_of_Grace_Periods[i])
    } */

    //Prueba
    this.List_of_Grace_Periods[0] = 'T';
    this.List_of_Grace_Periods[1] = 'T';
    this.List_of_Grace_Periods[2] = 'T';
    this.List_of_Grace_Periods[3] = 'P';
    this.List_of_Grace_Periods[4] = 'P';
    this.List_of_Grace_Periods[5] = 'P';

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

    //Tabla
    this.getTable(
      FinalInstallment,
      TEP,
      this.smartPaymentAux.lifeInsurance!,
      TotalInstallments!,
      PercentageOfReliefInsurance,
      BalanceToFinanceWithInstallments,
      RiskInsurance
    );

    //Probar valores de la tabla
    var NumberofMonth = 36; //Recordar que en codigo empieza desde 0
    console.log('-----------------');
    console.log('-----------------');
    console.log('Pruebas de la tabla');
    console.log(
      'Saldo Inicial Cuota Final: ' +
        this.InitialBalanceFinalInstallment[NumberofMonth]
    );
    console.log(
      'Interes Cuota Final: ' + this.FinalInstallmentInterest[NumberofMonth]
    );
    console.log(
      'Amort. Cuota Final: ' + this.FinalInstallmentAmortization[NumberofMonth]
    );
    console.log(
      'Seguro desgav. Cuota Final: ' +
        this.CreditInsuranceFinalInstallment[NumberofMonth]
    );
    console.log(
      'Saldo Final Cuota Final: ' +
        this.FinalBalanceFinalInstallment[NumberofMonth]
    );
    console.log(
      'Saldo Inicial Cuota: ' + this.InitialBalanceInstallment[NumberofMonth]
    );
    console.log('Interes: ' + this.Interest[NumberofMonth]);
    console.log('Cuota (inc Seg Des): ' + this.Installments[NumberofMonth]);
    console.log('Amort.: ' + this.Amortization[NumberofMonth]);
    console.log(
      'Seguro desg. Cuota: ' + this.InsuranceCreditInstallment[NumberofMonth]
    );
    console.log('Seguro riesgo: ' + this.RiskInsuranceTable[NumberofMonth]);
    console.log('GPS: ' + this.GPSTable[NumberofMonth]);
    console.log('Portes: ' + this.ShippingCostsTable[NumberofMonth]);
    console.log(
      'Gastos Adm.: ' + this.AdministrativeExpensesTable[NumberofMonth]
    );
    console.log(
      'Saldo Final para Cuota: ' + this.FinalBalanceInstallment[NumberofMonth]
    );
    console.log('Flujo: ' + this.Flow[NumberofMonth]);
    console.log('-----------------');
    console.log('-----------------');

    //Intereses
    var Interests = this.getInterests(TotalInstallments!);
    console.log('Interests: ' + Interests);

    //Amortización del capital
    var CapitalAmortization = this.getCapitalAmortization(TotalInstallments!);
    console.log('CapitalAmortization: ' + CapitalAmortization);

    //Seguro Desgravamen
    var CreditInsurance = this.GetCreditInsurance(TotalInstallments!);
    console.log('CreditInsurance: ' + CreditInsurance);

    //Seguro contra todo Riesgo
    var InsuranceAllRisk = this.getInsuranceAllRisk(TotalInstallments!);
    console.log('InsuranceAllRisk: ' + InsuranceAllRisk);

    //GPS
    var GPS = this.getGPS(TotalInstallments!);
    console.log('GPS: ' + GPS);

    //Portes
    var ShippingCosts = this.getShippingCosts(TotalInstallments!);
    console.log('ShippingCosts: ' + ShippingCosts);

    //Gastos Administrativos
    var AdministrativeExpenses = this.getAdministrativeExpenses(
      TotalInstallments!
    );
    console.log('AdministrativeExpenses: ' + AdministrativeExpenses);

    //Tasa de Descuento
    var DiscountRate = this.getDiscountRate(
      this.smartPaymentAux.discountRate!,
      this.smartPaymentAux.paymentFrequency!
    );
    console.log('DiscountRate: ' + DiscountRate);

    //TIR
    var TIR = this.getTIR(LoanAmount);
    console.log('TIR: ' + TIR);

    //TCEA
    var TCEA = this.getTCEA(TIR, this.smartPaymentAux.paymentFrequency!);
    console.log('TCEA: ' + TCEA);

    //VAN
    var VAN = this.getVAN(LoanAmount, DiscountRate);
    console.log('VAN: ' + VAN);

    /*     const flujosEfectivo = [-1000, 200, 300, 400, 500];
    const npvCalculado = flujosEfectivo.reduce((npv, flujo, t) => npv + (flujo / Math.pow(1 + 0.10, t)), 0);
    console.log("NPV Calculado manualmente: ", npvCalculado);
    const npvBiblioteca = npv(0.10, flujosEfectivo);
    console.log("NPV Calculado con financial library: ", npvBiblioteca); */

    ////Pruebas
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

  getInterests(TotalInstallments: number) {
    var Interests = 0;
    for (var i = 0; i < TotalInstallments + 1; i++) {
      Interests +=
        this.Installments[i] -
        this.Amortization[i] -
        this.InsuranceCreditInstallment[i];
    }
    return Interests;
  }

  getCapitalAmortization(TotalInstallments: number) {
    var CapitalAmortization = 0;
    for (var i = 0; i < TotalInstallments + 1; i++) {
      CapitalAmortization -=
        this.Amortization[i] - this.FinalInstallmentAmortization[i];
    }
    return CapitalAmortization;
  }

  GetCreditInsurance(TotalInstallments: number) {
    var CreditInsurance = 0;
    for (var i = 0; i < TotalInstallments + 1; i++) {
      CreditInsurance -= this.InsuranceCreditInstallment[i];
    }
    return CreditInsurance;
  }

  getInsuranceAllRisk(TotalInstallments: number) {
    var InsuranceAllRisk = 0;
    for (var i = 0; i < TotalInstallments + 1; i++) {
      InsuranceAllRisk -= this.RiskInsuranceTable[i];
    }
    return InsuranceAllRisk;
  }

  getGPS(TotalInstallments: number) {
    var GPS = 0;
    for (var i = 0; i < TotalInstallments + 1; i++) {
      GPS -= this.GPSTable[i];
    }
    return GPS;
  }

  getShippingCosts(TotalInstallments: number) {
    var ShippingCosts = 0;
    for (var i = 0; i < TotalInstallments + 1; i++) {
      ShippingCosts -= this.ShippingCostsTable[i];
    }
    return ShippingCosts;
  }

  getAdministrativeExpenses(TotalInstallments: number) {
    var AdministrativeExpenses = 0;
    for (var i = 0; i < TotalInstallments + 1; i++) {
      AdministrativeExpenses -= this.AdministrativeExpensesTable[i];
    }
    return AdministrativeExpenses;
  }

  getDiscountRate(discountRate: number, paymentFrequency: number) {
    return (
      Math.pow(
        1 + discountRate / 100,
        paymentFrequency / this.number_of_days_per_year
      ) - 1
    );
  }

  getTIR(LoanAmount: number) {
    const Flow_with_LoanAmount = [
      LoanAmount,
      ...this.Flow.map((value) => -value),
    ];
    const TIR = irr(Flow_with_LoanAmount);
    return TIR;
  }

  getTCEA(TIR: number, paymentFrequency: number) {
    return (
      Math.pow(1 + TIR, this.number_of_days_per_year / paymentFrequency) - 1
    );
  }

  getVAN(LoanAmount: number, DiscountRate: number): number {
    const Flow_with_LoanAmount = [...this.Flow.map((value) => -value)];

    // Imprimir flujos de efectivo para depuración
    for (let i = 0; i < Flow_with_LoanAmount.length; i++) {
      console.log(`Flow_with_LoanAmount[${i}]: ${Flow_with_LoanAmount[i]}`);
    }

    console.log(`LoanAmount: ${LoanAmount}`);
    console.log(`DiscountRate: ${DiscountRate}`);

    // Calcular el NPV utilizando la función npv de la biblioteca financiera
    const npvResult = npv(DiscountRate, Flow_with_LoanAmount);
    console.log(`npv: ${npvResult}`);

    // Retornar el resultado, que es la suma del préstamo y el NPV
    return LoanAmount + npvResult;
  }

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

    for (var i = 0; i < NumberofInstallments; i++) {
      //Saldo inicial Cuota Final
      if (i == 0) {
        this.InitialBalanceFinalInstallment[i] =
          finalInstallment /
          Math.pow(1 + TEP + lifeInsurance / 100, TotalInstallments + 1);
      } else {
        this.InitialBalanceFinalInstallment[i] =
          this.FinalBalanceFinalInstallment[i - 1];
      }

      //Interes Cuota Final
      this.FinalInstallmentInterest[i] =
        -this.InitialBalanceFinalInstallment[i] * TEP;

      //Seguro desgav. Cuota Final
      this.CreditInsuranceFinalInstallment[i] =
        -this.InitialBalanceFinalInstallment[i] * PercentageOfReliefInsurance;

      //Amort. Cuota Final
      if (i == NumberofInstallments - 1) {
        this.FinalInstallmentAmortization[i] = -parseFloat(
          (
            -this.InitialBalanceFinalInstallment[i] +
            this.FinalInstallmentInterest[i] +
            this.CreditInsuranceFinalInstallment[i]
          ).toFixed(7)
        );
      } else {
        this.FinalInstallmentAmortization[i] = 0;
      }

      //Saldo Final Cuota Final
      this.FinalBalanceFinalInstallment[i] = parseFloat(
        (
          this.InitialBalanceFinalInstallment[i] -
          this.FinalInstallmentInterest[i] -
          this.CreditInsuranceFinalInstallment[i] -
          this.FinalInstallmentAmortization[i]
        ).toFixed(7)
      );

      //Saldo Inicial Cuota
      if (i == 0) {
        this.InitialBalanceInstallment[i] = BalanceToFinanceWithInstallments;
      } else {
        if (i < TotalInstallments) {
          // <=?
          this.InitialBalanceInstallment[i] =
            this.FinalBalanceInstallment[i - 1];
        } else {
          this.InitialBalanceInstallment[i] = 0;
        }
      }

      //Interes
      this.Interest[i] = -this.InitialBalanceInstallment[i] * TEP;

      //Cuota (inc Seg Des)
      if (i <= NumberofInstallments - 1) {
        if (this.List_of_Grace_Periods[i] == 'T') {
          // En caso que sea un Plazo de Gracia Total
          this.Installments[i] = 0;
        } else if (this.List_of_Grace_Periods[i] == 'P') {
          this.Installments[i] = this.Interest[i];
        } else {
          this.Installments[i] = this.CalcularPago(
            TEP,
            PercentageOfReliefInsurance,
            TotalInstallments,
            i + 1,
            this.InitialBalanceInstallment[i]
          );
        }
      } else {
        this.Installments[i] = 0;
      }

      //Seguro desg. Cuota
      this.InsuranceCreditInstallment[i] =
        -this.InitialBalanceInstallment[i] * PercentageOfReliefInsurance;

      //Amort.
      if (i <= NumberofInstallments - 1) {
        if (
          this.List_of_Grace_Periods[i] == 'T' ||
          this.List_of_Grace_Periods[i] == 'P'
        ) {
          // En caso que sea un Plazo de Gracia Total o Parcial
          this.Amortization[i] = 0;
        } else {
          this.Amortization[i] =
            this.Installments[i] -
            this.Interest[i] -
            this.InsuranceCreditInstallment[i];
        }
      } else {
        this.Amortization[i] = 0;
      }

      //Seguro riesgo
      if (i <= NumberofInstallments + 1) {
        // +1?? Según el excel es +1
        this.RiskInsuranceTable[i] = RiskInsurance;
      }

      //GPS
      if (i <= NumberofInstallments + 1) {
        // +1?? Según el excel es +1
        this.GPSTable[i] = this.smartPaymentAux.gps!;
      }

      //Portes
      if (i <= NumberofInstallments + 1) {
        // +1?? Según el excel es +1
        this.ShippingCostsTable[i] = this.smartPaymentAux.shippingCosts!;
      }

      //Gastos Adm.
      if (i <= NumberofInstallments + 1) {
        // +1?? Según el excel es +1
        this.AdministrativeExpensesTable[i] =
          this.smartPaymentAux.administrativeExpenses!;
      }

      //Saldo Final para Cuota
      if (this.List_of_Grace_Periods[i] == 'T') {
        // Si es un Plazo de Gracia Total
        this.FinalBalanceInstallment[i] =
          this.InitialBalanceInstallment[i] - this.Interest[i];
      } else {
        this.FinalBalanceInstallment[i] =
          this.InitialBalanceInstallment[i] + this.Amortization[i];
      }

      //Flujo
      if (
        this.List_of_Grace_Periods[i] == 'T' ||
        this.List_of_Grace_Periods[i] == 'P'
      ) {
        // Si es un Plazo de Gracia Total o Parcial
        if (i == NumberofInstallments - 1) {
          this.Flow[i] =
            -this.Installments[i] +
            this.RiskInsuranceTable[i] +
            this.GPSTable[i] +
            this.ShippingCostsTable[i] +
            this.AdministrativeExpensesTable[i] -
            this.InsuranceCreditInstallment[i] +
            this.FinalInstallmentAmortization[i];
        } else {
          this.Flow[i] =
            -this.Installments[i] +
            this.RiskInsuranceTable[i] +
            this.GPSTable[i] +
            this.ShippingCostsTable[i] +
            this.AdministrativeExpensesTable[i] -
            this.InsuranceCreditInstallment[i];
        }
      } else {
        if (i == NumberofInstallments - 1) {
          this.Flow[i] =
            -this.Installments[i] +
            this.RiskInsuranceTable[i] +
            this.GPSTable[i] +
            this.ShippingCostsTable[i] +
            this.AdministrativeExpensesTable[i] +
            this.FinalInstallmentAmortization[i];
        } else {
          this.Flow[i] =
            -this.Installments[i] +
            this.RiskInsuranceTable[i] +
            this.GPSTable[i] +
            this.ShippingCostsTable[i] +
            this.AdministrativeExpensesTable[i];
        }
      }
    }
  }

  CalcularPago(
    TEP: number,
    PercentageOfReliefInsurance: number,
    NumberofInstallments: number,
    NumberofCurrentInstallment: number,
    InitialBalanceInstallment: number
  ) {
    // No se porque el "-", en el excel no lo encuentro
    var divider =
      1 -
      Math.pow(
        1 + (TEP + PercentageOfReliefInsurance),
        -(NumberofInstallments - NumberofCurrentInstallment + 1)
      );
    if (divider == 0) {
      return 0;
    }
    return (
      -(InitialBalanceInstallment * (TEP + PercentageOfReliefInsurance)) /
      (1 -
        Math.pow(
          1 + (TEP + PercentageOfReliefInsurance),
          -(NumberofInstallments - NumberofCurrentInstallment + 1)
        ))
    );
  }
}
