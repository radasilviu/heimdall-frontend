import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Env} from '../../configs/env';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable, Subject, Subscription,} from 'rxjs';
import {Realm} from '../../models/Realm';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';

const url = Env.apiRootURL + '/api/admin/realm';

@Injectable({
  providedIn: 'root'
})
export class RealmService {


  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) {
  }

  realm = new Subject();

  currentRealm = new Subject<Realm>();

  getCurrentRealm(){
    return this.currentRealm.asObservable()
  }


  setCurrentRealm(realm){
    this.currentRealm.next(realm);
  }


  setRealm(realm){
    this.getRealmByName(realm.name).subscribe(data =>{
      this.realm.next(data)
    })
  }

  getRealmByName(realm) {
    return this.http.get<Realm>(url + '/' + realm);
  }

  getAllRealms(): Observable<Realm[]> {
    return this.http.get<Realm[]>(url + '/list');
  }

  updateRealmByName(currentRealmName: string, realm: Realm) {
    return this.http.put<Realm>(url + '/general-update/' + currentRealmName, realm).pipe(tap(() =>{
      this.realm.next()
    }))
  }


  updateLoginSettings(realm, loginForm) {
    return this.http.put(url + '/login-update/' + realm, loginForm).pipe(tap(() =>{
      this.realm.next()
    }))
  }

  addNewRealm(realm: Realm) {
    return this.http.post<Realm>(url + '/', realm).pipe(tap(() =>{
      this.realm.next()
    }))
  }

  deleteRealmByName(realm: Realm) {
    return this.http.delete(url + '/' + realm.name).pipe(tap(() =>{
      this.realm.next()
    }))
  }
}
