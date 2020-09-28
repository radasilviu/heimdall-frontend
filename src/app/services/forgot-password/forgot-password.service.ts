import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Env} from "../../configs/env";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  sendForgotPasswordEmail(data: any): Observable<any> {
    const url = Env.apiRootURL + '/forgot-password';
    const body = {
      email: data.email
    };

    return this.http.post(url, body).pipe(
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
