export class FinanceTable {
  index: number;
  initialBalance: number;
  creditInsurance: number;
  interest: number;
  installment: number;
  amortization: number;
  cashFlow: number;
  gp: String;

  constructor(
    index: number = 0,
    initialBalance: number = 0,
    creditInsurance: number = 0,
    interest: number = 0,
    installment: number = 0,
    amortization: number = 0,
    cashFlow: number = 0,
    gp: String = 'S'
  ) {
    this.index = index;
    this.initialBalance = initialBalance;
    this.creditInsurance = creditInsurance;
    this.interest = interest;
    this.installment = installment;
    this.amortization = amortization;
    this.cashFlow = cashFlow;
    this.gp = gp;
  }
}
