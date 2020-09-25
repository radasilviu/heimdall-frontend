import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Code } from 'src/app/models/code';
import { Env } from '../../configs/env';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientLoginService {

  constructor(private http: HttpClient) { }

  login(data: any, clientId: string, clientSecret: string): Observable<Code> {
    const url = Env.apiRootURL + '/oauth/client-login';

    const body = {
      clientId: clientId,
      clientSecret: clientSecret,
      username: data.username,
      password: data.password
    };

    return this.http.post<Code>(url, body).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    console.error(error);
    return throwError(
      'Something bad happened; please try again later.');
  }

}
