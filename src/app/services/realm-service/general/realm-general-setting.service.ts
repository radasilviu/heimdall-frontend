import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Env} from '../../../configs/env';
import {MatSnackBar} from '@angular/material/snack-bar';
import {catchError} from 'rxjs/operators';
import {Realm} from '../../../models/Realm';

@Injectable({
  providedIn: 'root'
})
export class RealmGeneralSettingService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  update(data: any): Observable<Realm> {
    const url = Env.apiRootURL + '/api/admin/realm/general-update';
    const body = {
      id: data.id,
      name: data.name,
      displayName: data.displayName,
      enabled: data.enabled
    };

    return this.http.put<Realm>(url, body).pipe(
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
