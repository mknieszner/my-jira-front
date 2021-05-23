import {Component, OnDestroy, OnInit,} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Client} from 'stompjs/lib/stomp.js';
import {Observable} from 'rxjs/Observable';
import * as fromUsers from './shared/store/user'
import * as fromConfig from './shared/store/config'
import {Subject} from "rxjs";
import {DataStorageService} from "./shared/data-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  currentUser: Observable<string>;
  backendRunning: Observable<boolean>;
  url: string;

  private ngOnDestroy$ = new Subject();

  constructor(private store: Store<fromUsers.UserState>,
              private dss: DataStorageService) {
  }

  ngOnInit() {
    this.currentUser = this.store.pipe(select(fromUsers.selectCurrentUser));
    this.backendRunning = this.store.pipe(select(fromConfig.selectRunning));
    this.dss.setBackendRunning();
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
    this.ngOnDestroy$.complete();
  }

}
