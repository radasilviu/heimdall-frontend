import {Injectable} from '@angular/core';
import {User} from '../../models/User';
import {Observable, ReplaySubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Env} from '../../configs/env';
import {Realm} from '../../models/Realm';
import {tap} from 'rxjs/operators';

const url = Env.apiRootURL + '/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user = new ReplaySubject();

  constructor(private http: HttpClient) {
  }

  setUser(user) {
    this.user.next(user);
  }

  logoutAllUsers(realm: Realm) {
    return this.http.put(url + '/user/' + 'logoutAll', realm);
  }

  updateUserName(currentUserName: string, newUser: User, realmName: string) {
    return this.http.put(url + '/user/' + realmName + '/' + currentUserName, newUser)
  }

  getAllUsers(realmName: string): Observable<User[]> {
    return this.http.get<User[]>(url + '/user/' + realmName);
  }

  deleteUser(username: string, realm: string) {
    return this.http.request('delete', url + '/user/' + realm + '/' + username);
  }

  addUser(user: User, realmName: string) {
    return this.http.post<any>(url + '/user/' + realmName, user);
  }

  getUserByUsername(username: string, realm: string): Observable<User> {
    return this.http.get<User>(url + '/user/' + realm + '/' + username);
  }

  getUsersWithoutAdmin(realm: string): Observable<User[]>{
    return this.http.get<User[]>(url + '/user/' + realm + '/' + 'getUsersWithoutAdmin');
  }
}
