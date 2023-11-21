import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SmartPayment } from 'src/app/model/smartPayment.model';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { cloneDeep } from 'lodash';
import { SavedTableComponent } from '../saved-table/saved-table.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  dataSource: SmartPayment[] = [];

  constructor(
    private paymentService: PaymentService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    var id = localStorage.getItem('id');
    this.paymentService
      .getPaymentByClientId(parseInt(id ?? ''))
      .subscribe((response: any) => {
        this.dataSource = response;
      });
  }

  openSmartPaymentTable(smartPayment: SmartPayment, index: number) {
    const tempSmartPayment = cloneDeep(smartPayment);
    const dialogRef: MatDialogRef<SavedTableComponent> = this.dialog.open(
      SavedTableComponent,
      {
        data: { formValues: smartPayment },
        hasBackdrop: false,
        disableClose: false,
      }
    );
    dialogRef
      .afterClosed()
      .subscribe((updatedSmartPayment: SmartPayment | undefined) => {
        if (updatedSmartPayment) {
          const isDataChanged = this.isDataChanged(
            tempSmartPayment,
            updatedSmartPayment
          );

          if (isDataChanged) {
            const config = new MatSnackBarConfig();
            config.duration = 5000;
            config.panelClass = ['snackbar-container'];

            const snackBarRef = this.snackBar.open(
              'Your table was updated, do you want to save your changes?',
              'Update',
              config
            );

            snackBarRef.onAction().subscribe(() => {
              this.paymentService
                .putPayment(updatedSmartPayment.id!, updatedSmartPayment)
                .subscribe((response: any) => {
                  console.log(response);
                  this.snackBar.open('Your changes were saved', 'Close', {
                    duration: 2000,
                  });
                });
            });

            snackBarRef.afterDismissed().subscribe((info) => {
              if (!info.dismissedByAction) {
                this.snackBar.open('Your changes were not saved', 'Close', {
                  duration: 2000,
                });
                this.dataSource[index] = tempSmartPayment;
              }
            });
          }
        }
      });
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
