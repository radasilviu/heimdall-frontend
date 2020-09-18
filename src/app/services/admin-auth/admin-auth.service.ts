import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Env} from '../../configs/env';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  userSubject = new BehaviorSubject<User>(this.parseUser());

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<User> {
    const url = Env.apiRootURL + '/admin/login';
    const body = {
      username: username,
      password: password
    };

    return this.http.post<User>(url, body).pipe(
      tap(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
      }),
      catchError(this.handleError)
    );
  }

  parseUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    console.error(error);
    return throwError(
      'Something bad happened; please try again later.');
  }
}
