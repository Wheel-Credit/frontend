export class tableData {
  index: number;
  gracePeriod: string;
  finalInstallment: number;
  interestFinalInstallment: number;
  amortizationFinalInstallment: number;
  wearInsuranceFinalInstallment: number;
  finalBalance: number;
  initialBalance: number;
  interest: number;
  intallment: number;
  amortization: number;
  wearInsurance: number;
  riskInsurance: number;
  gps: number;
  shipping: number;
  administrativeExpenses: number;
  finalBalanceInstallment: number;
  flow: number;

  constructor(
    index: number = 1,
    gracePeriod: string = 'S',
    finalInstallment: number = 0,
    interestFinalInstallment: number = 0,
    amortizationFinalInstallment: number = 0,
    wearInsuranceFinalInstallment: number = 0,
    finalBalance: number = 0,
    initialBalance: number = 0,
    interest: number = 0,
    intallment: number = 0,
    amortization: number = 0,
    wearInsurance: number = 0,
    riskInsurance: number = 0,
    gps: number = 0,
    shipping: number = 0,
    administrativeExpenses: number = 0,
    finalBalanceInstallment: number = 0,
    flow: number = 0
  ) {
    this.index = index;
    this.gracePeriod = gracePeriod;
    this.finalInstallment = finalInstallment;
    this.interestFinalInstallment = interestFinalInstallment;
    this.amortizationFinalInstallment = amortizationFinalInstallment;
    this.wearInsuranceFinalInstallment = wearInsuranceFinalInstallment;
    this.finalBalance = finalBalance;
    this.initialBalance = initialBalance;
    this.interest = interest;
    this.intallment = intallment;
    this.amortization = amortization;
    this.wearInsurance = wearInsurance;
    this.riskInsurance = riskInsurance;
    this.gps = gps;
    this.shipping = shipping;
    this.administrativeExpenses = administrativeExpenses;
    this.finalBalanceInstallment = finalBalanceInstallment;
    this.flow = flow;
  }
}
