import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Token} from 'src/app/models/token';
import {Constants} from 'src/app/utils/constants';
import {Env} from '../../configs/env';
import {Realm} from '../../models/Realm';
import {User} from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  tokenSubject = new BehaviorSubject<Token>(this.parseToken());

  constructor(private http: HttpClient, private snackBar: MatSnackBar,private router:Router) { }

  login(username: string, password: string,realm:string, rememberMe:boolean): Observable<Token> {
    const url = Env.apiRootURL + '/admin/login';
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
    headers = headers.append('X-Requested-With', 'XMLHttpRequest');
    headers = headers.append('whitelist','true');

    const body = {
      username: username,
      password: password,
      realm:realm
    };

    const params = new HttpParams().append('remember-me', (rememberMe ? 'true' : 'false' ));
    const options = {
      params,
      headers
    };
    return this.http.post<Token>(url, body, options).pipe(
      tap((token: Token) => {
        localStorage.setItem('token', JSON.stringify(token));
        this.tokenSubject.next(token);
      }),
      catchError(error => {
        return this.handleError(error, this.snackBar);
      })
    );
  }

  logout(): Observable<any> {
    const url = Env.apiRootURL + '/admin/logout';
    const body = this.tokenSubject.getValue();
    const options = {
      headers: {
        'whitelist': 'true'
      }
    };

    return this.http.post(url, body, options).pipe(
      tap(response => {
        this.logoutSetup();
      }),
      catchError(error => {
        this.logoutSetup();
        return this.handleError(error, this.snackBar);
      })
    );
  }

  generateNewAccessToken(token: Token): Observable<Token> {
    const url =  Env.apiRootURL + '/admin/refreshToken';
    const options = {
      headers: {
        'whitelist': 'true'
      }
    };

    return this.http.put<Token>(url, token, options);
  }


  private logoutSetup(){
    localStorage.clear();
    this.tokenSubject.next(null);
    this.router.navigate(['']);
  }

  private parseToken(): Token {
    return JSON.parse(localStorage.getItem(Constants.TOKEN_KEY));
  }

  private handleError(error: HttpErrorResponse, snackBar: MatSnackBar): Observable<never> {
    snackBar.open(error.error.message, '', {
      duration: 3000
    });
    return throwError(error.message);
  }

  profileLogin(data: any, realm: string): Observable<Token> {
    const url = Env.apiRootURL + '/oauth/user-profile/login';
    const body = {
      username: data.username,
      password: data.password,
      realm: realm
    };
    const options = {
      headers: {
        'whitelist': 'true'
      }
    };
    return this.http.post<Token>(url, body, options).pipe(
      tap((token: Token) => {
        localStorage.setItem('token', JSON.stringify(token));
        this.tokenSubject.next(token);
      }),
      catchError(error => {
        return this.handleError(error, this.snackBar);
      })
    );
  }

  // readCookie(){
  //   const url = Env.apiRootURL + '/admin/all-cookies';
  //   return this.http.get(url);
  // }

  writeCookie(username: string){
    const url = Env.apiRootURL + '/admin/setCredentials/' + username;
    return this.http.get(url);
  }


}
