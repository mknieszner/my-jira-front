import {Component, Inject} from "@angular/core";
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from "@angular/material";

export enum SnackBarTheme {
  danger = 'danger',
  info = 'info',
  primary = 'primary',
  success = 'success',
}

@Component({
  selector: 'app-snack-bar',
  template: `
    <section class="form"
             fxLayout
             fxLayoutAlign="center">
      <mat-card fxFlex.xs="100%" fxFlex="100%" style="background-color: transparent !important;">
        <mat-card-content fxLayoutAlign="center">
          <span class="text-{{className}} h5" style="margin: 5px 30px 0 0">{{(message | json) || 'Error'}}</span>
          <button *ngIf="buttonName" class="btn btn-outline-{{className}}" (click)="dismiss()">{{buttonName}}</button>
        </mat-card-content>
      </mat-card>
    </section>
  `,
  styles: [`
    ::ng-deep .info {
      padding: 0;
      margin: 0;
      background-color: transparent !important;
      color: #17a2b8 !important;
    }

    ::ng-deep .danger {
      padding: 0;
      margin: 0;
      background-color: transparent !important;
      color: #dc3545 !important;
    }

    ::ng-deep .success {
      padding: 0;
      margin: 0;
      background-color: transparent !important;
      color: #28a745 !important;
    }

    ::ng-deep .primary {
      padding: 0;
      margin: 0;
      background-color: transparent !important;
      color: #007bff !important;
    }
  `],
})
export class InfoSnackBarComponent {
  public ref: MatSnackBarRef<InfoSnackBarComponent>;
  message: string;
  className: string;
  timeout: number = 5000;
  buttonName: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { message: string, className: string, timeout: number, buttonName: string }) {
    this.message = data.message;
    this.className = data.className || SnackBarTheme.danger;
    this.buttonName = data.buttonName;
    this.timeout = data.timeout || 5000;
    setTimeout(() => {
      this.dismiss();
    }, data.timeout || 5000)
  }

  dismiss() {
    this.ref.dismiss();
  }
}
