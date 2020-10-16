import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Env} from '../../configs/env';
import {Observable, Subject,} from 'rxjs';
import {Realm} from '../../models/Realm';
import {tap} from 'rxjs/operators';
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

  realm = new Subject();

  currentRealm = new Subject<Realm>();

  setCurrentRealm(realm) {
    this.currentRealm.next(realm);
  }


  setRealm(realm: Realm) {
    this.getRealmByName(realm.name).subscribe(data => {
      this.realm.next(data);
    }, error => this.snackBar.openSnackBar(error.error.message, 4000));
  }

  getRealmByName(realmName: string) {
    return this.http.get<Realm>(url + '/' + realmName);
  }

  getAllRealms(): Observable<Realm[]> {
    return this.http.get<Realm[]>(url + '/list');
  }

  updateRealmByName(realmName: string, realm: Realm) {
    return this.http.put<Realm>(url + '/general-update/' + realmName, realm).pipe(tap(() => {
      this.realm.next();
    }));
  }


  updateLoginSettings(realmName: string, User: User) {
    return this.http.put(url + '/login-update/' + realmName, User).pipe(tap(() => {
      this.realm.next();
    }));
  }

  addNewRealm(realm: Realm) {
    return this.http.post<Realm>(url + '/', realm).pipe(tap(() => {
      this.realm.next();
    }));
  }

  deleteRealmByName(realm: Realm) {
    return this.http.delete(url + '/' + realm.name).pipe(tap(() => {
      this.realm.next();
    }));
  }
}
