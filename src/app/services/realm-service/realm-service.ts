import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Env} from '../../configs/env';
import {Observable, ReplaySubject, Subject,} from 'rxjs';
import {ParentRealm, Realm} from '../../models/Realm';
import {SnackBarService} from '../snack-bar/snack-bar-service';
import {User} from '../../models/User';

const url = Env.apiRootURL + '/api/admin/realm';

@Injectable({
  providedIn: 'root'
})
export class RealmService {

  constructor(private http: HttpClient,
              private snackBar: SnackBarService) {
  }

  defaultRealm = new Subject<ParentRealm>();
  // @ts-ignore
  private realm = new ReplaySubject<ParentRealm>(this.defaultRealm);
  // @ts-ignore
  getRealm = this.realm.asObservable<ParentRealm>();


  setRealm(realm) {
    this.realm.next(realm);
  }

  getRealmByName(realmName: string) {
    return this.http.get<ParentRealm>(url + '/' + realmName);
  }

  getAllRealms(): Observable<Realm[]> {
    return this.http.get<Realm[]>(url + '/list');
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
