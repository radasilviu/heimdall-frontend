import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Env} from '../../configs/env';
import {catchError} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {Realm} from '../../models/Realm';
import {IClient} from '../../models/Client';
import {IRole} from '../../models/Role';


const url = Env.apiRootURL + '/api/admin/realm';

@Injectable({
  providedIn: 'root'
})
export class RealmServiceService {

  currentRealm = new BehaviorSubject<Realm>(this.parseCurrentRealm());

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
  }


  getRealms(): Observable<Array<Realm>> {
    return this.http.get<Array<Realm>>(url + '/list').pipe(
      catchError(error => {
        return this.handleError(error, this._snackBar);
      })
    );
  }

  getRealmByName(currentRealmName): Observable<Realm> {
    return this.http.get<Realm>(url + '/' + currentRealmName);
  }

  updateRealmByName(currentRealmName: string, realm: Realm) {
    return this.http.put<Realm>(url + '/' + realm.displayName, realm);
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

  addNewRealm(realm: Realm) {
    console.log(realm)
    return this.http.post<Realm>(url, realm);
  }
  deleteRealmByName(realm:Realm){
    return this.http.delete(url +"/" + realm.name);
  }
}
