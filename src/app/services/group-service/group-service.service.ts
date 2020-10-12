import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Group} from '../../models/Group';
import {HttpClient} from '@angular/common/http';
import {Env} from '../../configs/env';
import {User} from '../../models/User';
import {tap} from 'rxjs/operators';

const url = Env.apiRootURL + '/api/client';

@Injectable({
  providedIn: 'root'
})
export class GroupServiceService {

  private refresh = new Subject<Group[]>();

  get pageRefresh(){
    return this.refresh;
  }

  constructor(private http: HttpClient) {
  }

  getGroups(realmName){
    this.getAllGroups(realmName).subscribe(data =>{
      this.refresh.next(data)
    })
  }

  addUserToGroup(groupName: string, user: User, realm: string) {
    return this.http.put(url + '/' + realm + "/group/" + groupName + '/addUser', user).pipe(tap(() =>{
      this.refresh.next()
    }))
  }

  deleteUserFromGroup(group: Group, user: User, realm: string) {
    return this.http.put<Group>(url + '/' + realm + '/group/' + group.name + '/deleteUser/' + user.username, {}).pipe(tap(() =>{
      this.refresh.next()
    }))
  }

  getUsersFromGroup(groupName: string, realm: string): Observable<User[]> {
    return this.http.get<User[]>(url + '/' + realm + '/group/' + groupName + '/users');
  }

  getGroupByName(group: string, realm: string): Observable<Group> {
    return this.http.get<Group>(url + '/' + realm + '/group/' + group);
  }


  getAllGroups(realm: string): Observable<Group[]> {
    return this.http.get<Group[]>(url +"/" +  realm + "/group" );
  }

  addNewGroup(group: Group, realm: string) {
    return this.http.post<Group>(url + "/" + realm + "/group" , group).pipe(tap(() =>{
      this.refresh.next()
    }))
  }

  deleteGroupByName(group: Group, realm: string) {
    return this.http.request('delete', url + '/' + realm + '/group/' + group.name).pipe(tap(() =>{
      this.refresh.next()
    }))
  }

}