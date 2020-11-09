import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Role} from '../../models/Role';
import {User} from '../../models/User';
import {HttpClient} from '@angular/common/http';
import {Env} from '../../configs/env';
import {tap} from "rxjs/operators";

const url = Env.apiRootURL + '/api';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  role = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
  }

  getAllRoles(realmName: string): Observable<Role[]> {
    return this.http.get<Role[]>(url + '/role/' + realmName);
  }

  getRoleByName(realmName: string, name: string): Observable<Role> {
    return this.http.get<Role>(url + '/role/' + realmName + '/' + name).pipe(tap(role => this.role.next(role)));
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
