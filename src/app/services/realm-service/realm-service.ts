import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Env} from '../../configs/env';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable, Subject,} from 'rxjs';
import {Realm} from '../../models/Realm';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';

const url = Env.apiRootURL + '/api/admin/realm';

@Injectable({
  providedIn: 'root'
})
export class RealmService {

  private realms = new Subject();

  private realm = new Subject();


  get currentRealm() {
    return this.realm;
  }

  setRealm(realm) {
    this.realm.next(realm);
  }

  setRealms(realms) {
    this.realms.next(realms);
  }

  get allRealms() {
    return this.realms;
  }

  getRealmByName(realmName) {
    return this.http.get<Realm>(url + '/' + realmName);
  }

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) {
  }

  getAllRealms(): Observable<Realm[]> {
    return this.http.get<Realm[]>(url + '/list');
  }

  updateRealmByName(currentRealmName: string, realm: Realm) {
    return this.http.put<Realm>(url + '/general-update/' + currentRealmName, realm).pipe(tap(() => {
      this.realms.next();
    }));
  }


  updateLoginSettings(realm, loginForm) {
    return this.http.put(url + '/login-update/' + realm, loginForm).pipe(tap(() => {
      this.realms.next();
    }));
  }

  addNewRealm(realm: Realm) {
    return this.http.post<Realm>(url + '/', realm).pipe(tap(() => {
      this.realms.next();
    }));
  }

  deleteRealmByName(realm: Realm) {
    return this.http.delete(url + '/' + realm.name).pipe(tap(() => {
      this.realms.next();
    }));
  }
}
