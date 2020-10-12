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
export class UserServiceService {

  private refresh = new Subject<User[]>();

  get pageRefresh(){
    return this.refresh;
  }

  getUsers(realmName){
    this.getAllUsers(realmName).subscribe(data =>{
      this.refresh.next(data);
    })
  }

  constructor(private http: HttpClient) {
  }

  updateUserName(currentUserName: string, newUser: User,realm:string) {
    return this.http.put(url + '/user/'+realm +"/" + currentUserName, newUser).pipe(tap(()=>{
      this.pageRefresh.next()
    }))
  }

  getAllUsers(realm: string): Observable<User[]> {
    return this.http.get<User[]>(url + '/user/' + realm);
  }

  deleteUser(username: string,realm:string) {
    return this.http.request('delete', url + '/user/'+ realm + "/" + username).pipe(tap(()=>{
      this.pageRefresh.next()
    }))
  }

  addUser(user: User,realm:string) {
    return this.http.post<any>(url + '/user/'+ realm, user).pipe(tap(()=>{
      this.refresh.next();
    }))
  }

  getUserByUsername(user: string,realm:string): Observable<User> {
    return this.http.get<User>(url + '/user/' + realm + "/" + user).pipe(tap(()=>{
      this.pageRefresh.next()
    }))
  }
}
