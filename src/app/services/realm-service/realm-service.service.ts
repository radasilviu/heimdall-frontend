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
export class RealmServiceService {

  private realms = new Subject();

  private currentRealm = new Subject();

  get realm(){
    return this.currentRealm;
  }

  get serviceRealms(){
    return this.realms;
  }

  setRealm(realm){
    this.currentRealm.next(realm)
  }

  getRealm(realm){
    this.getRealmByName(realm).subscribe(data =>{
      this.currentRealm.next(data)
    })
  }


  getRealmByName(realmName){
    return this.http.get<Realm>(url + '/' + realmName);
  }

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) {
  }

  getAllRealms(): Observable<Realm[]> {
    return this.http.get<Realm[]>(url + '/list');
  }

  updateRealmByName(currentRealmName: string, realm: Realm) {
    return this.http.put<Realm>(url + '/general-update/' + currentRealmName, realm).pipe(tap(() =>{
      this.realms.next()
    }))
  }



  updateLoginSettings(realm, loginForm) {
    return this.http.put(url + '/login-update/' + realm, loginForm).pipe(tap(() =>{
      this.realms.next()
    }))
  }

  addNewRealm(realm: Realm) {
    return this.http.post<Realm>(url + "/", realm).pipe(tap(() =>{
      this.realms.next()
    }))
  }

  deleteRealmByName(realm: Realm) {
    return this.http.delete(url + '/' + realm.name).pipe(tap(() =>{
      this.realms.next()
    }))
  }
}
