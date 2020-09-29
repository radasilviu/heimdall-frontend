import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Env} from "../../configs/env";
import {catchError} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {Realm} from "../../models/Realm";

@Injectable({
  providedIn: 'root'
})
export class RealmServiceService {

  currentRealm = new BehaviorSubject<Realm>(this.parseCurrentRealm());

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  getRealms(): Observable<Array<Realm>> {
    const url = Env.apiRootURL + '/api/admin/realm/list';

    return this.http.get<Array<Realm>>(url).pipe(
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

  parseCurrentRealm(): Realm {
    return JSON.parse(localStorage.getItem('currentRealm'));
  }
}
