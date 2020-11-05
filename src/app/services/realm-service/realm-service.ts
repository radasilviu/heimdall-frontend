import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Env} from '../../configs/env';
import {BehaviorSubject,} from 'rxjs';
import {User} from '../../models/User';
import {Realm} from '../../models/Realm';
import {tap} from "rxjs/operators";

const url = Env.apiRootURL + '/api/admin/realm';

@Injectable({
  providedIn: 'root'
})
export class RealmService {
  realms = new BehaviorSubject([]);
  currentRealm = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
  }

  setCurrentRealm(data?) {
    if (data) {
      localStorage.setItem("realm", JSON.stringify(data))
      this.getAllRealms().subscribe(() => this.currentRealm.next(data))
    } else {
      const realm = JSON.parse(localStorage.getItem("realm"))
      this.currentRealm.next(realm);
    }
  }

  getAllRealms() {
    return this.http.get<Realm[]>(url + '/list').pipe(tap((realms) => {
      if (!localStorage.getItem("realm")) {
        this.currentRealm.next(realms[0])
        localStorage.setItem("realm", JSON.stringify(realms[0]))
      }
      this.realms.next(realms)
    }));
  }

  updateRealmByName(realmName: string, realm: Realm) {
    return this.http.put<Realm>(url + '/general-update/' + realmName, realm).pipe(tap(realm => {
      localStorage.setItem("realm", JSON.stringify(realm))
      this.setCurrentRealm(realm);
    }))
  }

  updateLoginSettings(realmName: string, User: User) {
    return this.http.put(url + '/login-update/' + realmName, User).pipe(tap(realm => {
      localStorage.setItem("realm", JSON.stringify(realm))
      this.setCurrentRealm(realm);
    }))
  }

  addNewRealm(realm: Realm) {
    return this.http.post<Realm>(url + '/', realm);
  }

  deleteRealmByName(realm: Realm) {
    return this.http.delete(url + '/' + realm.name);
  }
}
