import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {StatisticsServiceModule} from "../statistics-service.module";
import {LoadedGuardUtils} from "../../shared/guard/loaded-guard.utils";
import {DataStorageService} from "../../shared/data-storage.service";
import * as fromAppReducers from "../../shared/store/app.reducers";
import * as fromTables from "../../shared/store/table";
import {select, Store} from "@ngrx/store";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: StatisticsServiceModule
})
export class TableDetailsGuard implements CanActivate {

  constructor(private dss: DataStorageService,
              private store: Store<fromAppReducers.AppState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return LoadedGuardUtils.passWhenLoaded(
      this.store.pipe(select(fromTables.selectTableDetails))
        .pipe(map(details => details)),
      () => this.dss.setTablesDetails()
    );
  }

}
