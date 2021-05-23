import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Store} from '@ngrx/store';
import * as fromAppReducers from './store/app.reducers';
import {environment} from "../../environments/environment";
import {AuthCookie} from './authentication/auth-cookies-handler';
import * as fromUsers from './store/user';
import {Token} from './authentication/auth.model';


@Injectable()
export class OauthService {
  private basehost = environment.baseUrl;

  constructor(private router: Router,
              private httpClient: HttpClient,
              private store: Store<fromAppReducers.AppState>) {
  }

  obtainAccessToken(loginData: { username: string, password: string }) {
    const params = new HttpParams()
      .append('username', loginData.username)
      .append('password', loginData.password)
      .append('grant_type', 'password')
      .append('client_id', 'live-test');
    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Authorization': 'Basic ' + btoa('live-test:bG2ZS10ZXN0')
    });

    this.httpClient.post<Token>(this.basehost + '/oauth/token', null, {
      observe: 'body',
      headers: headers,
      params: params
    })
      .subscribe(
        (data: Token) => {
          this.saveToken(data, loginData.username);
          this.router.navigateByUrl('/home');
        },
        err => {
          const errorMessage = err.message;
          if (errorMessage.includes('live-test')) {
            this.store.dispatch(new fromUsers.SetLoginFailureInfo('Invalid credentials!'));
          } else {
            switch (errorMessage) {
              case 'Http failure response for (unknown url): 0 Unknown Error':
                this.store.dispatch(new fromUsers.SetLoginFailureInfo('Connection problem'));
                return;
              default:
                this.store.dispatch(new fromUsers.SetLoginFailureInfo(errorMessage));
                return;
            }
          }
          return false;
        }
      );
  }

  saveToken(token: Token, username: string) {
    AuthCookie.setAuth(token.access_token, token.expires_in);
    this.store.dispatch(new fromUsers.SetTokenAction(token.access_token));
    this.store.dispatch(new fromUsers.SetCurrentUserAction(username));
  }
}
