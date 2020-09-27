import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Code } from 'src/app/models/code';
import { Env } from '../../configs/env';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ClientLoginService {

  constructor(private http: HttpClient,private snackBar: MatSnackBar) { }

  login(data: any, clientId: string, clientSecret: string): Observable<Code> {
    const url = Env.apiRootURL + '/oauth/client-login';

    const body = {
      clientId: clientId,
      clientSecret: clientSecret,
      username: data.username,
      password: data.password
    };

    return this.http.post<Code>(url, body).pipe(
      catchError(error => {
          return this.handleError(error, this.snackBar);
        })
    );
  }

  handleError(error: HttpErrorResponse, snackBar: MatSnackBar): Observable<never> {
    snackBar.open(error.error, '', {
      duration: 3000
    });
    return throwError(error.message);
  }

}
