import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Group} from '../../models/Group';
import {HttpClient} from '@angular/common/http';
import {Env} from '../../configs/env';
import {User} from '../../models/User';
import {tap} from "rxjs/operators";

const url = Env.apiRootURL + '/api/client';

@Injectable({
  providedIn: 'root'
})

export class GroupService {

  group = new BehaviorSubject({})

  constructor(private http: HttpClient) {
  }

  addUserToGroup(groupName: string, user: User, realmName: string) {
    return this.http.put(url + '/' + realmName + '/group/' + groupName + '/addUser', user);
  }

  deleteUserFromGroup(group: Group, user: User, realmName: string) {
    return this.http.put<Group>(url + '/' + realmName + '/group/' + group.name + '/deleteUser/' + user.username, {});
  }

  addRoleToGroup(realmName, groupName: string, roleName: string) {
    return this.http.post<Group>(url + '/' + realmName + '/group' + '/' + groupName + '/addRole' + '/' + roleName, {});
  }

  getGroupByName(group: string, realmName: string): Observable<Group> {
    return this.http.get<Group>(url + '/' + realmName + '/group/' + group).pipe(tap((group: Group) => this.group.next(group)));
  }

  getAllGroups(realmName: string): Observable<Group[]> {
    return this.http.get<Group[]>(url + '/' + realmName + '/group');
  }

  addNewGroup(group: Group, realmName: string) {
    return this.http.post<Group>(url + '/' + realmName + '/group', group);
  }

  deleteGroupByName(group: Group, realmName: string) {
    return this.http.request('delete', url + '/' + realmName + '/group/' + group.name);
  }
}
