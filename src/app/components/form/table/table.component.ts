import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SmartPayment } from 'src/app/model/smartPayment.model';
import { paymentTable } from 'src/app/model/table.model';
import { tableData } from 'src/app/model/tableData.model';

const DATA: tableData[] = [
  new tableData(1, 'S', 0, 0, 0, 0, 0, 0, 0, 0, 102.5, 0, 0, 0, 0, 0, 0, 0),
  new tableData(2, 'S'),
  new tableData(3, 'P'),
  new tableData(4, 'P'),
  new tableData(5, 'P'),
  new tableData(6, 'T'),
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  smartPaymentForm = new SmartPayment();
  smartPaymentTable = new paymentTable();

  displayedColumns: string[] = [
    'index',
    'pg',
    'saldo',
    'interes',
    'segurodesgravamen',
    'segurovehicular',
    'amortizacion',
    'cuota',
  ];
  dataSource: tableData[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.smartPaymentForm = data.formValues;
  }

  ngOnInit(): void {
    this.smartPaymentTable.updatepaymentData(this.smartPaymentForm);
    for (let index = 0; index < DATA.length; index++) {
      const element = DATA[index];
      this.smartPaymentTable.addPayment(element);
    }
    this.dataSource = this.smartPaymentTable.getPayments();
  }
}
