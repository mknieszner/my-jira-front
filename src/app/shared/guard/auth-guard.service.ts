import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {NavigationService} from "../navigation/navigation.service";
import {of} from "rxjs";
import {AuthCookie} from "../authentication/auth-cookies-handler";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private navigationService: NavigationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!!AuthCookie.getAuth()) {
      return of(true)
    } else {
      this.navigationService.goToLogin();
      return of(false)
    }
  }

}
