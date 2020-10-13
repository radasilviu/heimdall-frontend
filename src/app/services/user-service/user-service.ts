import {Injectable} from '@angular/core';
import {User} from '../../models/User';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Env} from '../../configs/env';
import {Client} from '../../models/Client';
import {tap} from 'rxjs/operators';

const url = Env.apiRootURL + '/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

   users = new Subject();

  setUsers(realm){
    this.getAllUsers(realm.name).subscribe(data =>{
      this.users.next(data);
    })
  }




  updateUserName(currentUserName: string, newUser: User, realm: string) {
    return this.http.put(url + '/user/' + realm + '/' + currentUserName, newUser).pipe(
      tap(() =>{
        this.users.next();
      })
    )
  }

  getAllUsers(realm: string): Observable<User[]> {
    return this.http.get<User[]>(url + '/user/' + realm);
  }

  getSessionUsers(realm: string) {
    return this.http.put(url + '/user/updateState', realm);
  }

  deleteUser(username: string, realm: string) {
    return this.http.request('delete', url + '/user/' + realm + '/' + username).pipe(
      tap(() =>{
        this.users.next();
      })
    )
  }

  addUser(user: User, realm: string) {
    return this.http.post<any>(url + '/user/' + realm, user).pipe(
      tap(() =>{
        this.users.next();
      })
    )
  }

  getUserByUsername(user: string, realm: string): Observable<User> {
    return this.http.get<User>(url + '/user/' + realm + '/' + user)
  }
}
