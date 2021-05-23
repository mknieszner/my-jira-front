import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromUsers from "../store/user";
import {WebSocketService} from "../web-socket/web-socket.service";

@Injectable()
export class InitClientGuard implements CanActivate {

  constructor(private store: Store<fromUsers.UserState>,
              private ws: WebSocketService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.ws.init();
    return of(true);
  }
}
