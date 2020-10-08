import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Group} from '../../models/Group';
import {HttpClient} from '@angular/common/http';
import {Env} from '../../configs/env';
import {G} from '@angular/cdk/keycodes';
import {IUser} from '../../models/User';

const url = Env.apiRootURL + '/api/client/group';

@Injectable({
  providedIn: 'root'
})
export class GroupServiceService {

  constructor(private http: HttpClient) {
  }

  addUserToGroup(groupName: string, user: IUser) {
    return this.http.put(url + '/' + groupName + '/addUser', user);
  }

  deleteUserFromGroup(group: Group, user: IUser) {
    return this.http.delete<Group>(url + '/' + group.name + '/deleteUser/' + user.username);
  }

  getUsersFromGroup(groupName: string): Observable<IUser[]> {
    return this.http.get<IUser[]>(url + '/' + groupName + '/users');
  }

  getGroupByName(group: string): Observable<Group> {
    return this.http.get<Group>(url + '/' + group);
  }


  getAllGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(url);
  }

  addNewGroup(group: Group) {
    return this.http.post<Group>(url, group);
  }

  deleteGroupByName(group: Group) {
    return this.http.request('delete', url + '/' + group.name);
  }

}
