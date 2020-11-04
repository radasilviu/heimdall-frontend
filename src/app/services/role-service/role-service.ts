import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {Role} from '../../models/Role';
import {User} from '../../models/User';
import {HttpClient} from '@angular/common/http';
import {Env} from '../../configs/env';

const url = Env.apiRootURL + '/api';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  roles$ = new ReplaySubject<Role[]>();

  constructor(private http: HttpClient) {
  }

  setRoles(data) {
    return this.roles$.next(data);
  }


  getRoleByName() {
    const roleName = localStorage.getItem("currentRoleName")
    const realm = JSON.parse(localStorage.getItem("realm"))
    return this.http.get(url + '/role/' + realm.name + "/" + roleName);
  }

  getAllRoles(realmName: string): Observable<Role[]> {
    return this.http.get<Role[]>(url + '/role/' + realmName);
  }
  addRole(role: Role, realmName: string) {
    return this.http.post<any>(url + '/role/' + realmName, role);
  }

  deleteRole(role: Role, realmName: string) {
    return this.http.request('delete', url + '/role/' + realmName + '/' + role);
  }

  addUserRole(role: Role, user: User, realmName: string) {
    return this.http.post<any>(url + '/user/' + realmName + '/' + user.username + '/addRole', role.name);
  }

  updateRoleByName(currentRoleName: string, newRole: Role, realmName: string) {
    return this.http.put(url + '/role/' + realmName + '/' + currentRoleName, newRole);
  }

  deleteUserRole(user: User, role: Role, realmName: string) {
    return this.http.request('delete', url + '/user/' + realmName + '/' + user.username + '/removeRole', {body: role.name});
  }
}
