import {Injectable} from '@angular/core';
import {User} from '../../models/User';
import {BehaviorSubject, Observable, ReplaySubject, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Env} from '../../configs/env';
import {tap} from 'rxjs/operators';
import {Realm} from '../../models/Realm';
import {SnackBarService} from '../snack-bar/snack-bar-service';

const url = Env.apiRootURL + '/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private snackBar: SnackBarService) {
  }

  users = new Subject();

  user = new ReplaySubject(1)


  setUser(user){
    this.user.next(user)
  }

  setUsers(realm: Realm) {
    this.getAllUsers(realm.name).subscribe(data => {
      this.users.next(data);
    }, error => this.snackBar.openSnackBar(error.error.message, 4000));
  }

  logoutAllUsers(realm: Realm) {
    return this.http.put(url + '/user/' + 'logoutAll', realm).pipe(
      tap(() => {
        this.users.next();
      })
    );
  }

  updateUserName(currentUserName: string, newUser: User, realmName: string) {
    return this.http.put(url + '/user/' + realmName + '/' + currentUserName, newUser).pipe(
      tap(() => {
        this.users.next();
      })
    );
  }

  getAllUsers(realmName: string): Observable<User[]> {
    return this.http.get<User[]>(url + '/user/' + realmName);
  }

  deleteUser(username: string, realm: string) {
    return this.http.request('delete', url + '/user/' + realm + '/' + username).pipe(
      tap(() => {
        this.users.next();
      })
    );
  }

  addUser(user: User, realmName: string) {
    return this.http.post<any>(url + '/user/' + realmName, user).pipe(
      tap(() => {
        this.users.next();
      })
    );
  }

  getUserByUsername(username: string, realm: string): Observable<User> {
    return this.http.get<User>(url + '/user/' + realm + '/' + username);
  }
}
