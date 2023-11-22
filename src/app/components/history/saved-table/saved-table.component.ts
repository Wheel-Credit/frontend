import { Component, Inject, ViewChild } from '@angular/core';
import { irr, npv } from 'financial';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SmartPayment } from 'src/app/model/smartPayment.model';
import { FinanceTable } from 'src/app/model/financeTable.model';
import { MatTable } from '@angular/material/table';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-saved-table',
  templateUrl: './saved-table.component.html',
  styleUrls: ['./saved-table.component.css'],
})
export class SavedTableComponent {
  @ViewChild(MatTable) table: MatTable<FinanceTable> | undefined;
  smartPaymentForm: FormGroup;
  smartPaymentAux = new SmartPayment();

  displayedColumns: string[] = [
    'index',
    'pg',
    'balance',
    'amortizacion',
    'creditinsurance',
    'interest',
    'cuota',
    'flujo',
  ];
  dataSource: FinanceTable[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SavedTableComponent>,
    private paymentService: PaymentService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.smartPaymentAux = data.formValues;
    this.smartPaymentForm = this.fb.group({
      name: [this.smartPaymentAux.name],
      description: [this.smartPaymentAux.description],
      image: [this.smartPaymentAux.image],
    });
  }

  ngOnInit(): void {
    this.List_of_Grace_Periods = this.CreateListofGracePeriods();

    this.Algorithm();
    for (
      let index = 0;
      index < this.smartPaymentAux.paymentPlanType! + 1;
      index++
    ) {
      const element = new FinanceTable();
      element.index = index + 1;
      element.initialBalance = parseFloat(
        this.InitialBalanceFinalInstallment[index].toFixed(2)
      );
      element.creditInsurance = -parseFloat(
        this.CreditInsuranceFinalInstallment[index].toFixed(2)
      );
      element.interest = -parseFloat(this.Interest[index].toFixed(2));
      element.installment = -parseFloat(this.Installments[index].toFixed(2));
      element.amortization = parseFloat(
        this.FinalInstallmentAmortization[index].toFixed(2)
      );
      element.cashFlow = parseFloat(this.Flow[index].toFixed(2));
      element.gp = this.List_of_Grace_Periods[index];
      this.dataSource.push(element);
    }
    this.table?.renderRows();
  }

  updateTable() {
    for (let index = 0; index < this.dataSource.length; index++) {
      const element = this.dataSource[index].gp;
      this.List_of_Grace_Periods[index] = element;
    }
    this.dataSource = [];
    this.Algorithm();
    for (
      let index = 0;
      index < this.smartPaymentAux.paymentPlanType! + 1;
      index++
    ) {
      const element = new FinanceTable();
      element.index = index + 1;
      element.initialBalance = parseFloat(
        this.InitialBalanceFinalInstallment[index].toFixed(2)
      );
      element.creditInsurance = -parseFloat(
        this.CreditInsuranceFinalInstallment[index].toFixed(2)
      );
      element.interest = -parseFloat(this.Interest[index].toFixed(2));
      element.installment = -parseFloat(this.Installments[index].toFixed(2));
      element.amortization = parseFloat(
        this.FinalInstallmentAmortization[index].toFixed(2)
      );
      element.cashFlow = parseFloat(this.Flow[index].toFixed(2));
      element.gp = this.List_of_Grace_Periods[index];
      this.dataSource.push(element);
    }
    this.table?.renderRows();
  }

  updateForm() {
    this.smartPaymentAux.name = this.smartPaymentForm.get('name')?.value;
    this.smartPaymentAux.description =
      this.smartPaymentForm.get('description')?.value;
    this.smartPaymentAux.image = this.smartPaymentForm.get('image')?.value;
  }

  closeTable() {
    this.dialogRef.close(this.smartPaymentAux);
  }

  deleteData() {
    const snackBarRef = this.snackBar.open(
      'Are you sure you want to delete this data',
      'Confirm',
      {
        duration: 3000,
      }
    );
    snackBarRef.onAction().subscribe(() => {
      this.paymentService
        .deletePayment(this.smartPaymentAux.id!)
        .subscribe((data) => {
          this.snackBar.open('Data deleted successfully', '', {
            duration: 1000,
          });
          this.smartPaymentAux.name = 'item deleted';
        });
      this.dialogRef.close(this.smartPaymentAux);
    });
  }

  // Temporal
  CreateListofGracePeriods() {
    var List_of_Grace_Periods: String[] = [];
    for (var i = 0; i < this.smartPaymentAux.paymentPlanType! + 1; i++) {
      List_of_Grace_Periods.push('S');
    }
    return List_of_Grace_Periods;
  }
  // Temporal

  // Varaibles Estaticas
  number_of_days_per_year = 360;

  // Varaibles Globales
  // Lista de periodos de gracia
  List_of_Grace_Periods: String[] = [];

  //Saldo inicial Cuota Final
  InitialBalanceFinalInstallment: number[] = []; ///////////////////////////

  //Interes Cuota Final
  FinalInstallmentInterest: number[] = [];

  //Amort. Cuota Final
  FinalInstallmentAmortization: number[] = []; ///////////////////////////

  //Seguro desgav. Cuota Final
  CreditInsuranceFinalInstallment: number[] = []; ///////////////////////////

  //Saldo Final Cuota Final
  FinalBalanceFinalInstallment: number[] = [];

  //Saldo Inicial Cuota
  InitialBalanceInstallment: number[] = [];

  //Interes
  Interest: number[] = []; ///////////////////////////

  //Cuota (inc Seg Des)
  Installments: number[] = []; ///////////////////////////

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
  Flow: number[] = []; ///////////////////////////

  // Algoritmos
  Algorithm() {
    //TEA
    var TEA = this.GetTEA(
      this.smartPaymentAux.interestType,
      this.smartPaymentAux.interestRate!,
      this.smartPaymentAux.capitalization
    );

    //TEP (la que se utiliza para las cuotas)
    var TEP = this.getTEP(TEA, this.smartPaymentAux.paymentFrequency!);

    //Numero de por Año Cuotas
    var Number_of_Installments_per_year = this.GetNumInstallments(
      this.smartPaymentAux.paymentFrequency!
    );

    //Numero Total de Cuotas
    var TotalInstallments = this.smartPaymentAux.paymentPlanType;

    //Cuota Inicial
    var InitialInstallment = this.GetInitialInstallment(
      this.smartPaymentAux.sellingPriceAsset!,
      this.smartPaymentAux.initialInstallment!
    );

    //Cuota Final
    var FinalInstallment = this.getFinalInstallment(
      this.smartPaymentAux.sellingPriceAsset!,
      this.smartPaymentAux.finalInstallment!
    );

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

    //Saldo a financiar con cuotas
    var BalanceToFinanceWithInstallments =
      this.getBalanceToFinanceWithInstallments(
        LoanAmount,
        FinalInstallment,
        TEP,
        this.smartPaymentAux.lifeInsurance!,
        TotalInstallments!
      );

    //% de Seguro desgrav. per.
    var PercentageOfReliefInsurance =
      ((this.smartPaymentAux.lifeInsurance! / 100) *
        this.smartPaymentAux.paymentFrequency!) /
      30;

    //Seguro riesgo
    var RiskInsurance =
      ((this.smartPaymentAux.riskInsurance! / 100) *
        this.smartPaymentAux.sellingPriceAsset!) /
      Number_of_Installments_per_year;

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

    //Intereses
    var Interests = this.getInterests(TotalInstallments!);

    //Amortización del capital
    var CapitalAmortization = this.getCapitalAmortization(TotalInstallments!);

    //Seguro Desgravamen
    var CreditInsurance = this.GetCreditInsurance(TotalInstallments!);

    //Seguro contra todo Riesgo
    var InsuranceAllRisk = this.getInsuranceAllRisk(TotalInstallments!);

    //GPS
    var GPS = this.getGPS(TotalInstallments!);

    //Portes
    var ShippingCosts = this.getShippingCosts(TotalInstallments!);

    //Gastos Administrativos
    var AdministrativeExpenses = this.getAdministrativeExpenses(
      TotalInstallments!
    );

    //Tasa de Descuento
    var DiscountRate = this.getDiscountRate(
      this.smartPaymentAux.discountRate!,
      this.smartPaymentAux.paymentFrequency!
    );

    //TIR
    var TIR = this.getTIR(LoanAmount);

    //TCEA
    var TCEA = this.getTCEA(TIR, this.smartPaymentAux.paymentFrequency!);

    //VAN
    var VAN = this.getVAN(LoanAmount, DiscountRate);

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
    // for (let i = 0; i < Flow_with_LoanAmount.length; i++) {
    //   console.log(`Flow_with_LoanAmount[${i}]: ${Flow_with_LoanAmount[i]}`);
    // }

    // Calcular el NPV utilizando la función npv de la biblioteca financiera
    const npvResult = npv(DiscountRate, Flow_with_LoanAmount);

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
