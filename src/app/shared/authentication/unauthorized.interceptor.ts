import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {catchError} from "rxjs/operators";
import {NavigationService} from "../navigation/navigation.service";
import {SnackBarService} from "../snack-bar/snack-bar.service";
import {StoreResetService} from "../store-reset.service";
import {throwError} from "rxjs";
import {oc} from "ts-optchain";

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(private navigationService: NavigationService,
              private storeResetService: StoreResetService,
              private snackBarService: SnackBarService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(req)
      .pipe(
        catchError((response: HttpErrorResponse) => {
            console.log('response', response);
            if (response.status == 401) {
              return this.navigationService.goToLogin();
            }
            this.snackBarService.showSnackBar(oc(response).error.message("Wystąpił błąd spróbuj ponownie pozniej"));
            return throwError(response.error);
          }
        )
      );
  }
}
