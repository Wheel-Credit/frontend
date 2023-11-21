import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SmartPayment } from 'src/app/model/smartPayment.model';
import { UserService } from 'src/app/services/auth/user.service';
import { TableComponent } from '../../form/table/table.component';

const ELEMENT_DATA: SmartPayment[] = [
  {
    name: 'Carro 1',
    description: 'Descripcion del carro 1',
    image:
      'https://cdn.pixabay.com/photo/2021/09/20/23/03/car-6642036_1280.jpg',
    paymentPlanType: 24,
    sellingPriceAsset: 10000,
    initialInstallment: 2000,
    finalInstallment: 500,
    interestRate: 5,
    interestType: 'fixed',
    capitalization: 'monthly',
    paymentFrequency: 0,
    notaryCosts: 100,
    notaryCostsType: 'fixed',
    registrationCosts: 100,
    registrationCostsType: 'fixed',
    appraisal: 100,
    appraisalType: 'fixed',
    studyCommission: 100,
    studyCommissionType: 'fixed',
    activationCommission: 100,
    activationCommissionType: 'fixed',
    gps: 100,
    shippingCosts: 100,
    administrativeExpenses: 100,
    lifeInsurance: 100,
    riskInsurance: 100,
    discountRate: 100,
  },
  {
    name: 'Carro 2',
    description: 'Descripcion del carro 2',
    image:
      'https://static.vecteezy.com/system/resources/thumbnails/008/585/294/small/3d-rendering-sport-blue-car-on-white-bakcground-jpg-free-photo.jpg',
    paymentPlanType: 24,
    sellingPriceAsset: 10000,
    initialInstallment: 2000,
    finalInstallment: 500,
    interestRate: 5,
    interestType: 'fixed',
    capitalization: 'monthly',
    paymentFrequency: 0,
    notaryCosts: 100,
    notaryCostsType: 'fixed',
    registrationCosts: 100,
    registrationCostsType: 'fixed',
    appraisal: 100,
    appraisalType: 'fixed',
    studyCommission: 100,
    studyCommissionType: 'fixed',
    activationCommission: 100,
    activationCommissionType: 'fixed',
    gps: 100,
    shippingCosts: 100,
    administrativeExpenses: 100,
    lifeInsurance: 100,
    riskInsurance: 100,
    discountRate: 100,
  },
  {
    name: 'Carro 3',
    description: 'Descripcion del carro 3',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTo5cQ05xdweolKj5Flz-QHOso7Dwux5IIxA&usqp=CAU.png',
    paymentPlanType: 24,
    sellingPriceAsset: 10000,
    initialInstallment: 2000,
    finalInstallment: 500,
    interestRate: 5,
    interestType: 'fixed',
    capitalization: 'monthly',
    paymentFrequency: 0,
    notaryCosts: 100,
    notaryCostsType: 'fixed',
    registrationCosts: 100,
    registrationCostsType: 'fixed',
    appraisal: 100,
    appraisalType: 'fixed',
    studyCommission: 100,
    studyCommissionType: 'fixed',
    activationCommission: 100,
    activationCommissionType: 'fixed',
    gps: 100,
    shippingCosts: 100,
    administrativeExpenses: 100,
    lifeInsurance: 100,
    riskInsurance: 100,
    discountRate: 100,
  },
  {
    name: 'Carro 4',
    description: 'Descripcion del carro 4',
    image:
      'https://cdn.pixabay.com/photo/2021/09/20/23/03/car-6642036_1280.jpg',
    paymentPlanType: 24,
    sellingPriceAsset: 10000,
    initialInstallment: 2000,
    finalInstallment: 500,
    interestRate: 5,
    interestType: 'fixed',
    capitalization: 'monthly',
    paymentFrequency: 0,
    notaryCosts: 100,
    notaryCostsType: 'fixed',
    registrationCosts: 100,
    registrationCostsType: 'fixed',
    appraisal: 100,
    appraisalType: 'fixed',
    studyCommission: 100,
    studyCommissionType: 'fixed',
    activationCommission: 100,
    activationCommissionType: 'fixed',
    gps: 100,
    shippingCosts: 100,
    administrativeExpenses: 100,
    lifeInsurance: 100,
    riskInsurance: 100,
    discountRate: 100,
  },
  {
    name: 'Carro 5',
    description: 'Descripcion del carro 5',
    image:
      'https://static.vecteezy.com/system/resources/thumbnails/008/585/294/small/3d-rendering-sport-blue-car-on-white-bakcground-jpg-free-photo.jpg',
    paymentPlanType: 24,
    sellingPriceAsset: 10000,
    initialInstallment: 2000,
    finalInstallment: 500,
    interestRate: 5,
    interestType: 'fixed',
    capitalization: 'monthly',
    paymentFrequency: 0,
    notaryCosts: 100,
    notaryCostsType: 'fixed',
    registrationCosts: 100,
    registrationCostsType: 'fixed',
    appraisal: 100,
    appraisalType: 'fixed',
    studyCommission: 100,
    studyCommissionType: 'fixed',
    activationCommission: 100,
    activationCommissionType: 'fixed',
    gps: 100,
    shippingCosts: 100,
    administrativeExpenses: 100,
    lifeInsurance: 100,
    riskInsurance: 100,
    discountRate: 100,
  },
  {
    name: 'Carro 6',
    description: 'Descripcion del carro 6',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTo5cQ05xdweolKj5Flz-QHOso7Dwux5IIxA&usqp=CAU.png',
    paymentPlanType: 24,
    sellingPriceAsset: 10000,
    initialInstallment: 2000,
    finalInstallment: 500,
    interestRate: 5,
    interestType: 'fixed',
    capitalization: 'monthly',
    paymentFrequency: 0,
    notaryCosts: 100,
    notaryCostsType: 'fixed',
    registrationCosts: 100,
    registrationCostsType: 'fixed',
    appraisal: 100,
    appraisalType: 'fixed',
    studyCommission: 100,
    studyCommissionType: 'fixed',
    activationCommission: 100,
    activationCommissionType: 'fixed',
    gps: 100,
    shippingCosts: 100,
    administrativeExpenses: 100,
    lifeInsurance: 100,
    riskInsurance: 100,
    discountRate: 100,
  },
];

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  dataSource: SmartPayment[] = [];

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    // this.dataSource = this.userService.getSmartPayments().subscribe((response: any) => {
    //   // consulta exitosa
    // });
    this.dataSource = ELEMENT_DATA;
  }

  openSmartPaymentTable(smartPayment: SmartPayment) {
    const dialogRef: MatDialogRef<TableComponent> = this.dialog.open(
      TableComponent,
      {
        data: { formValues: smartPayment },
      }
    );
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
