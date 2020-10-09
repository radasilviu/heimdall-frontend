import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Group} from '../../models/Group';
import {HttpClient} from '@angular/common/http';
import {Env} from '../../configs/env';
import {User} from '../../models/User';

const url = Env.apiRootURL + '/api/client';

@Injectable({
  providedIn: 'root'
})
export class GroupServiceService {

  allGroups = new Subject<Group[]>();


  constructor(private http: HttpClient) {
  }

  addUserToGroup(groupName: string, user: User, realm: string) {
    return this.http.put(url + '/' + realm + "/group/" + groupName + '/addUser', user);
  }

  deleteUserFromGroup(group: Group, user: User, realm: string) {
    return this.http.put<Group>(url + '/' + realm + '/group/' + group.name + '/deleteUser/' + user.username, {});
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
    return this.http.post<Group>(url + "/" + realm + "/group" , group);
  }

  deleteGroupByName(group: Group, realm: string) {
    return this.http.request('delete', url + '/' + realm + '/group/' + group.name);
  }

}
