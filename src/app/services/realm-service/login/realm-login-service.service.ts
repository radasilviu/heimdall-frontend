import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable, throwError} from 'rxjs';
import {Realm} from '../../../models/Realm';
import {Env} from '../../../configs/env';
import {catchError} from 'rxjs/operators';
import {RealmServiceService} from '../realm-service.service';

@Injectable({
  providedIn: 'root'
})
export class RealmLoginServiceService {


  constructor(private http: HttpClient, private snackBar: MatSnackBar, private realmService: RealmServiceService) {
  }

  update(data: any): Observable<Realm> {
    const url = Env.apiRootURL + '/api/admin/realm/login-update';
    const body = {
      id: data.id,
      name: this.realmService.currentRealm.value.name,
      userRegistration: data.userRegistration,
      editUsername: data.editUsername,
      forgotPassword: data.forgotPassword,
      rememberMe: data.rememberMe,
      verifyEmail: data.verifyEmail,
      loginWithEmail: data.loginWithEmail
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
