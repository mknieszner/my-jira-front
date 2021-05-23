import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {from, Observable} from "rxjs";
import {StoreResetService} from "../store-reset.service";

@Injectable()
export class NavigationService {

  constructor(private router: Router,
              private storeResetService: StoreResetService) {
  }

  goToLogin(): Observable<boolean> {
    this.storeResetService.resetStore();
    return from(this.router.navigateByUrl('/signin'));
  }

  goToHome(): Observable<boolean> {
    return from(this.router.navigateByUrl('/home'));
  }
}
