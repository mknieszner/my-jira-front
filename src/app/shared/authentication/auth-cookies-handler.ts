import {Injectable} from '@angular/core';
import {Cookie} from 'ng2-cookies/ng2-cookies';
const  AUTH_COOKIE_NAME = 'sticky';

@Injectable()
export class AuthCookie {

  constructor() {
  }

  static getAuth(): string {
    return Cookie.get(AUTH_COOKIE_NAME);
  }

  static setAuth(value: string, expires: number): void {
    // 0.0138889// accept day not minutes
    Cookie.set(AUTH_COOKIE_NAME, value, 0.0138889 * expires);
  }

  static deleteAuth(): void {
    Cookie.delete(AUTH_COOKIE_NAME);
  }
}
