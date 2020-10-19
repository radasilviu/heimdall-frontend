import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Env} from '../../configs/env';
import {BehaviorSubject, ReplaySubject,} from 'rxjs';
import {ParentRealm, Realm} from '../../models/Realm';
import {SnackBarService} from '../snack-bar/snack-bar-service';
import {User} from '../../models/User';

const url = Env.apiRootURL + '/api/admin/realm';

@Injectable({
  providedIn: 'root'
})
export class RealmService {

  realms$ = new BehaviorSubject(null);
  realm = new ReplaySubject(1);

  constructor(private http: HttpClient,
              private snackBar: SnackBarService) {
  }

  setRealms(data) {
    this.realms$.next(data);
  }

  setRealm(realmName) {
    this.getRealmByName(realmName).subscribe(data => {
      this.realm.next(data);
    }, error => this.snackBar.openSnackBar(error.error.message, 4000));
  }

  getRealms() {
    return this.http.get<Realm[]>(url + '/list');
  }

  getRealmByName(realmName: string) {
    return this.http.get<ParentRealm>(url + '/' + realmName);
  }

  updateRealmByName(realmName: string, realm: Realm) {
    return this.http.put<Realm>(url + '/general-update/' + realmName, realm);
  }

  updateLoginSettings(realmName: string, User: User) {
    return this.http.put(url + '/login-update/' + realmName, User);
  }

  addNewRealm(realm: Realm) {
    return this.http.post<Realm>(url + '/', realm);
  }

  deleteRealmByName(realm: Realm) {
    return this.http.delete(url + '/' + realm.name);
  }
}
