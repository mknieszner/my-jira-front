import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {OauthService} from '../shared/oauth.service';
import {AuthCookie} from '../shared/authentication/auth-cookies-handler';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Router} from "@angular/router";
import {DataStorageService} from "../shared/data-storage.service";
import * as fromUsers from "../shared/store/user";


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  info: string;
  loginFailureInfo: Observable<string>;
  logoutInfo: Observable<string>;

  constructor(private oauthservice: OauthService,
              private cookie: AuthCookie,
              private router: Router,
              private dss: DataStorageService,
              private store: Store<fromUsers.UserState>) {

  }

  ngOnInit() {
    AuthCookie.deleteAuth();
    this.loginFailureInfo = this.store.pipe(select(fromUsers.selectLoginFailureInfo));
    this.logoutInfo = this.store.pipe(select(fromUsers.selectLogoutInfo));


    this.signinForm = new FormGroup({
      'username': new FormControl(),
      'password': new FormControl()
    });
  }


  onSignin() {
    this.oauthservice.obtainAccessToken({
      username: this.signinForm.value.username,
      password: this.signinForm.value.password
    });
    this.router.navigateByUrl('/home');
  }
}
