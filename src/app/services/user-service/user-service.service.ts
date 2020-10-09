import {Injectable} from '@angular/core';
import {User} from '../../models/User';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Env} from '../../configs/env';
import {Client} from '../../models/Client';

const url = Env.apiRootURL + '/api';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  allUsers = new Subject<User[]>();

  constructor(private http: HttpClient) {
  }

  updateUserName(currentUserName: string, newUser: User,realm:string) {
    return this.http.put(url + '/user/'+realm +"/" + currentUserName, newUser);
  }

  getAllUsers(realm: string): Observable<User[]> {
    return this.http.get<User[]>(url + '/user/' + realm);
  }

  deleteUser(username: string,realm:string) {
    return this.http.request('delete', url + '/user/'+ realm + "/" + username);
  }

  addUser(user: User,realm:string) {
    return this.http.post<any>(url + '/user/'+ realm, user);
  }

  getUserByUsername(user: string,realm:string): Observable<User> {
    return this.http.get<User>(url + '/user/' + realm + "/" + user);
  }
}
