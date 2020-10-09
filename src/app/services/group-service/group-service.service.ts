import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Group} from '../../models/Group';
import {HttpClient} from '@angular/common/http';
import {Env} from '../../configs/env';
import {User} from '../../models/User';

const url = Env.apiRootURL + '/api/client/group';

@Injectable({
  providedIn: 'root'
})
export class GroupServiceService {

  constructor(private http: HttpClient) {
  }

  addUserToGroup(groupName: string, user: User) {
    return this.http.put(url + '/' + groupName + '/addUser', user);
  }

  deleteUserFromGroup(group: Group, user: User) {
    return this.http.put<Group>(url + '/' + group.name + '/deleteUser/' + user.username,{});
  }

  getUsersFromGroup(groupName: string): Observable<User[]> {
    return this.http.get<User[]>(url + '/' + groupName + '/users');
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
