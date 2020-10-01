import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Code } from 'src/app/models/code';
import { Env } from '../../configs/env';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OAuthSocialUser } from '../../models/social_user.model'

@Injectable({
  providedIn: 'root'
})
export class ClientLoginService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  login(data: any, clientId: string, clientSecret: string): Observable<Code> {
    const url = Env.apiRootURL + '/oauth/client-login';

    const body = {
      clientId: clientId,
      clientSecret: clientSecret,
      username: data.username,
      password: data.password
    };

    const options = {
      headers: {
        'whitelist': 'true'
      }
    };

    return this.http.post<Code>(url, body, options).pipe(
      catchError(error => {
        return this.handleError(error, this.snackBar);
      })
    );
  }


  socialLogin(socialUser: OAuthSocialUser, clientId: string, clientSecret: string): Observable<Code> {
    const url = Env.apiRootURL + '/oauth2/social-login';

    socialUser.clientId = clientId;
    socialUser.clientSecret = clientSecret;

    const options = {
      headers: {
        'whitelist': 'true'
      }
    };

    return this.http.post<Code>(url, socialUser, options).pipe(
      catchError(error => {
        return this.handleError(error, this.snackBar);
      })
    );
  }

  handleError(error: HttpErrorResponse, snackBar: MatSnackBar): Observable<never> {
    snackBar.open(error.message, '', {
      duration: 3000
    });
    return throwError(error.message);
  }

}
