import {
  HttpEvent, HttpHandler,

  HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { EMPTY, Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Token } from 'src/app/models/token';
import { Constants } from 'src/app/utils/constants';
import { AdminAuthService } from '../../services/admin-auth/admin-auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AdminAuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token: Token = this.authService.tokenSubject.getValue();

    if (request.headers.get('whitelist')) {
      return next.handle(request);
    }

    if (token) {
      const now = moment();
      const tokenExpireTime = moment(token.token_expire_time);
      const refreshTokenExpireTime = moment(token.refresh_token_expire_time);

      if (now.unix() < tokenExpireTime.unix()) {
        return next.handle(this.addAuthorizationHeader(request, token));
      } else if (now.unix() < refreshTokenExpireTime.unix()) {
        return this.authService.generateNewAccessToken(token)
          .pipe(
            switchMap(
              token => {
                localStorage.setItem(Constants.TOKEN_KEY, JSON.stringify(token))
                this.authService.tokenSubject.next(token);
                return next.handle(this.addAuthorizationHeader(request, token));
              },
            ),
            catchError(error => {
              console.log(error);
              this.authService.logout().subscribe();
              return EMPTY;
            })
          );
      } else {
        this.authService.logout().subscribe();
        return EMPTY;
      }
    } else {
      return EMPTY;
    }

  }


  addAuthorizationHeader(request, token: Token): any {
    return request.clone({
      headers: request.headers.set('Authorization', `Basic ${token.access_token}`)
    });
  }
}
