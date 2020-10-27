import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Env} from '../../configs/env';
import {BehaviorSubject, ReplaySubject, Subject,} from 'rxjs';
import {User} from '../../models/User';
import {Realm} from '../../models/Realm';

const url = Env.apiRootURL + '/api/admin/realm';

@Injectable({
  providedIn: 'root'
})
export class RealmService {

  private realms$ = new ReplaySubject(1);
  private realm$ = new ReplaySubject(1);

  realm = this.realm$.asObservable();

  realms = this.realms$.asObservable();

  constructor(private http: HttpClient) {
  }

  setRealms(data) {
    this.realms$.next(data);
  }

  setRealm(data) {
    this.realm$.next(data);
  }


  getRealms() {
    return this.http.get<Realm[]>(url + '/list');
  }

  getRealmByName(realmName: string) {
    return this.http.get<Realm>(url + '/' + realmName);
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
