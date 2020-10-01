import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable, throwError} from 'rxjs';
import {Env} from '../../configs/env';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  changePassword(data: any, email: string, forgotPasswordCode: string): Observable<any> {
    const url = Env.apiRootURL + '/oauth/change-password';
    const body = {
      password: data.password,
      confirmPassword: data.confirmPassword,
      email: email,
      forgotPasswordCode: forgotPasswordCode
    };
    const options = {
      headers: {
        whitelist: 'true'
      }
    };

    return this.http.post(url, body, options).pipe(
      catchError(error => {
        return this.handleError(error, this.snackBar);
      })
    );
  }

  handleError(error: HttpErrorResponse, snackBar: MatSnackBar): Observable<never> {
    snackBar.open(error.error.message, '', {
      duration: 3000
    });
    return throwError(error.message);
  }
}
