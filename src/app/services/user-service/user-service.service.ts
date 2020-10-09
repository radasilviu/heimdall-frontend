import {Injectable} from '@angular/core';
import {User} from '../../models/User';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Env} from '../../configs/env';

const url = Env.apiRootURL + '/api';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) {
  }

  updateUserName(currentUserName: string, newUser: User) {
    return this.http.put(url + '/user/' + currentUserName, newUser);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(url + '/user');
  }

  deleteUser(username: string) {
    return this.http.request('delete', url + '/user/' + username);
  }

  addUser(user: User) {
    return this.http.post<any>(url + '/user', user);
  }

  getUserByUsername(user: string): Observable<User> {
    return this.http.get<User>(url + '/user/' + user);
  }
}
