import {Component, EmbeddedViewRef, Inject} from "@angular/core";
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from "@angular/material";

@Component({
  selector: 'app-snack-bar',
  template: `
    <section class="form"
             fxLayout
             fxLayoutAlign="center">
        <mat-card fxFlex.xs="100%" fxFlex="100%" style="background-color: transparent !important;">
          <mat-card-title fxLayoutAlign="center" class="text-info">{{message || 'What!!!'}}</mat-card-title>
          <mat-card-content  class="d-flex justify-content-between align-items-center">
            <button class="btn btn-outline-info" (click)="dismiss()">No</button>
            <button class="btn btn-outline-danger" (click)="dismissWithAction()">Yes</button>
          </mat-card-content>
        </mat-card>
    </section>
  `,
  styles: [`
    ::ng-deep .styled-snack {
      padding: 0;
      margin: 0;
      border: 1px solid #17a2b8!important;
      background-color: transparent !important;
    }
    mat-card-content {
      
    }
  `],
})
export class ActionSnackBarComponent {
  public ref: MatSnackBarRef<ActionSnackBarComponent>;
  message: string;
  action: string;


  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { message: string, action: string }) {
    this.message = data.message;
    this.action = data.action;
    setTimeout(() => {
      this.dismiss();
    }, 5000)

  }

  dismiss() {
    this.ref.dismiss();
  }

  dismissWithAction() {
    this.ref.dismissWithAction();
  }
}
