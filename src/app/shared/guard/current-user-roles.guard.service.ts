import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {select, Store} from "@ngrx/store";
import * as fromUsers from "../store/user";
import {DataStorageService} from "../data-storage.service";
import {LoadedGuardUtils} from "./loaded-guard.utils";

@Injectable()
export class CurrentUserRolesGuard implements CanActivate {

  constructor(private store: Store<fromUsers.UserState>,
              private dss: DataStorageService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return LoadedGuardUtils.passWhenLoaded(
      this.store.pipe(select(fromUsers.selectCurrentUser)),
      () => this.dss.setCurrentUsername()
    );
  }
}
