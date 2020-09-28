import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Env } from '../../configs/env';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from '../../models/User';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  userSubject = new BehaviorSubject<User>(this.parseUser());

  constructor(private http: HttpClient,private snackBar: MatSnackBar) { }

  login(username: string, password: string, clientCode: string, clientSecret: string): Observable<User> {
    const url = Env.apiRootURL + '/admin/login';
    const body = {
      username: username,
      password: password,
      clientCode: clientCode,
      clientSecret: clientSecret
    };

    return this.http.post<User>(url, body).pipe(
      tap(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
      }),
      catchError(error => {
        return this.handleError(error, this.snackBar);
      })
    );
  }

  parseUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  handleError(error: HttpErrorResponse, snackBar: MatSnackBar): Observable<never> {
    snackBar.open(error.error, '', {
      duration: 3000
    });
    return throwError(error.message);
  }
}
