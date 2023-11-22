import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { cloneDeep } from 'lodash';
import { SmartPayment } from 'src/app/model/smartPayment.model';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { environment } from 'src/environments/environment';
import { CatalogTableComponent } from '../catalog-table/catalog-table.component';

@Component({
  selector: 'app-catalog-list',
  templateUrl: './catalog-list.component.html',
  styleUrls: ['./catalog-list.component.css'],
})
export class CatalogListComponent {
  dataSource: SmartPayment[] = [];

  constructor(
    private paymentService: PaymentService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.dataSource = environment.catalog;
  }

  openSmartPaymentTable(smartPayment: SmartPayment, index: number) {
    const tempSmartPayment = cloneDeep(smartPayment);
    const dialogRef: MatDialogRef<CatalogTableComponent> = this.dialog.open(
      CatalogTableComponent,
      {
        data: { formValues: tempSmartPayment },
        hasBackdrop: false,
        disableClose: false,
      }
    );
    // dialogRef
    //   .afterClosed()
    //   .subscribe((updatedSmartPayment: SmartPayment | undefined) => {
    //     if (updatedSmartPayment) {
    //       const isDataChanged = this.isDataChanged(
    //         tempSmartPayment,
    //         updatedSmartPayment
    //       );

    //       if (isDataChanged) {
    //         const config = new MatSnackBarConfig();
    //         config.duration = 5000;
    //         config.panelClass = ['snackbar-container'];

    //         const snackBarRef = this.snackBar.open(
    //           'Your table was updated, do you want to save your changes?',
    //           'Update',
    //           config
    //         );

    //         snackBarRef.onAction().subscribe(() => {
    //           this.paymentService
    //             .putPayment(updatedSmartPayment.id!, updatedSmartPayment)
    //             .subscribe((response: any) => {
    //               console.log(response);
    //               this.snackBar.open('Your changes were saved', 'Close', {
    //                 duration: 2000,
    //               });
    //             });
    //         });

    //         snackBarRef.afterDismissed().subscribe((info) => {
    //           if (!info.dismissedByAction) {
    //             this.snackBar.open('Your changes were not saved', 'Close', {
    //               duration: 2000,
    //             });
    //             this.dataSource[index] = tempSmartPayment;
    //           }
    //         });
    //       }
    //     }
    //   });
  }

  isDataChanged(
    smartPayment: SmartPayment,
    updatedSmartPayment: SmartPayment
  ): boolean {
    return (
      smartPayment.name !== updatedSmartPayment.name ||
      smartPayment.description !== updatedSmartPayment.description ||
      smartPayment.image !== updatedSmartPayment.image
    );
  }
}
