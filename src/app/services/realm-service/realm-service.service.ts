import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Env} from '../../configs/env';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable, Subject,} from 'rxjs';
import {Realm} from '../../models/Realm';
import {Router} from '@angular/router';

const url = Env.apiRootURL + '/api/admin/realm';

@Injectable({
  providedIn: 'root'
})
export class RealmServiceService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) {
  }

  getRealms(): Observable<Realm[]> {
    return this.http.get<Realm[]>(url + '/list');
  }

  updateRealmByName(currentRealmName: string, realm: Realm) {
    return this.http.put<Realm>(url + '/general-update/' + currentRealmName, realm);
  }

  updateLoginSettings(realm, loginForm) {
    return this.http.put(url + '/login-update/' + realm.name, loginForm);
  }

  addNewRealm(realm: Realm) {
    return this.http.post<Realm>(url + "/", realm);
  }

  deleteRealmByName(realm: Realm) {
    return this.http.delete(url + '/' + realm.name);
  }
}
