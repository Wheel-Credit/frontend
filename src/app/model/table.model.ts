import { SmartPayment } from './smartPayment.model';
import { tableData } from './tableData.model';

export class paymentTable {
  paymentData: SmartPayment;
  payments: tableData[];

  constructor(
    paymentData: SmartPayment = new SmartPayment(),
    payments: tableData[] = []
  ) {
    this.paymentData = paymentData;
    this.payments = payments;
  }

  updatepaymentData(paymentData: SmartPayment) {
    this.paymentData = paymentData;
  }

  addPayment(payment: tableData) {
    this.payments.push(payment);
  }

  getPayments() {
    return this.payments;
  }
  calculateTable() {}
}
