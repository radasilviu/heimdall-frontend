import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Env} from '../../configs/env';
import {catchError} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {Realm} from '../../models/Realm';
import {Router} from '@angular/router';

const url =  Env.apiRootURL + '/api/admin/realm';

@Injectable({
  providedIn: 'root'
})
export class RealmServiceService {


  currentRealm = new BehaviorSubject<Realm>(this.parseCurrentRealm());

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) { }

  getRealms(): Observable<Array<Realm>> {
    return this.http.get<Array<Realm>>(url + "/list").pipe(
      catchError(error => {
        return this.handleError(error, this.snackBar);
      })
    );
  }



  updateRealmByName(currentRealmName: string, realm: Realm) {
    return this.http.put<Realm>(url + '/' + realm.displayName, realm);
  }


  checkRealmExists(realm: string): Observable<Realm> {
    const url = `${Env.apiRootURL}/api/realm/check/${realm}`;
    const options = {
      headers: {
        whitelist: 'true'
      }
    };

    return this.http.get<Realm>(url, options).pipe(
      catchError(error => {
        this.router.navigate(['realm/not-found']);
        return this.handleError(error, this.snackBar);
      })
    );
  }

  handleError(error: HttpErrorResponse, snackBar: MatSnackBar): Observable<never> {
    snackBar.open(error.error.message || 'Server error', '', {
      duration: 3000
    });
    return throwError(error.message);
  }

  parseCurrentRealm(): Realm {
    return JSON.parse(localStorage.getItem('currentRealm'));
  }

  addNewRealm(realm: Realm) {
    console.log(realm)
    return this.http.post<Realm>(url, realm);
  }
  deleteRealmByName(realm:Realm){
    return this.http.delete(url +"/" + realm.name);
  }
  getRealmByName(realm:Realm){
    return this.http.get(url + "/"+ realm.name);
  }
}
