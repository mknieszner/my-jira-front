import {HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {AuthCookie} from './auth-cookies-handler';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (!req.url.includes('oauth/token')) {
      if (req.method === 'GET') {
        let headers = new HttpHeaders();
        if(AuthCookie.getAuth()) {
          headers = new HttpHeaders({'Content-type': 'multipart/form-data', 'Authorization': 'Bearer ' + AuthCookie.getAuth()});
        }
        const updatedReq = req.clone({headers: headers});
        return next.handle(updatedReq);
      } else {
        const headers = new HttpHeaders({'Content-type': 'application/json', 'Authorization': 'Bearer ' + AuthCookie.getAuth()});
        const updatedReq = req.clone({headers: headers});
        return next.handle(updatedReq);
      }
    } else {
      return next.handle(req);
    }
  }
}
