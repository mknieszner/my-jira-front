import {Injectable} from "@angular/core";
import {InfoSnackBarComponent, SnackBarTheme} from "./info-snack-bar.component";
import {MatSnackBar, MatSnackBarRef} from "@angular/material";
import {EMPTY, Observable} from "rxjs";
import {switchMap} from "rxjs/operators";



@Injectable()
export class SnackBarService {
  snackBarRef: MatSnackBarRef<InfoSnackBarComponent>;

  constructor(public snackBar: MatSnackBar) {
  }

  public showSnackBar(message: string, color: SnackBarTheme = SnackBarTheme.danger, timeout: number = 5000, callback: Function = () => EMPTY): Observable<any> {
    return this._showSnackBar({message, color, timeout, buttonName: 'Close', callback});
  }

  public showSnackBarWithRef(data): MatSnackBarRef<InfoSnackBarComponent> {
    return this.show(data);
  }

  private _showSnackBar(data): Observable<any> {
    this.snackBarRef = this.show(data);
    this.snackBarRef.instance.ref = this.snackBarRef;
    return this.snackBarRef.instance.ref.afterDismissed()
      .pipe(
        switchMap(() => data.callback())
      );
  }

  private show(data): MatSnackBarRef<InfoSnackBarComponent> {
    return this.snackBar.openFromComponent(InfoSnackBarComponent, {
      panelClass: [data.color],
      data: {
        message: data.message,
        className: data.color,
        timeout: data.timeout,
        buttonName: data.buttonName,
      },
    });
  }

}
