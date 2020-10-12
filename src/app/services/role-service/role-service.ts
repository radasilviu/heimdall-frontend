import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Role} from '../../models/Role';
import {User} from '../../models/User';
import {HttpClient} from '@angular/common/http';
import {Env} from '../../configs/env';

const url = Env.apiRootURL + '/api';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) {}

  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(url + '/role');
  }

  addRole(role: Role) {
    return this.http.post<any>(url + '/role', role);
  }

  deleteRole(role: Role) {
    return this.http.request('delete', url + '/role/' + role);
  }

  addUserRole(role: Role, user: User) {
    return this.http.post<any>(url + '/user/' + user.username + '/addRole', role.name);
  }

  updateRoleByName(currentRoleName: string, newRole: Role) {
    return this.http.put(url + '/role/' + currentRoleName, newRole);
  }

  deleteUserRole(user: User, role: Role) {
    return this.http.request('delete', url + '/user/' + user.username + '/removeRole', {body: role.name});
  }
}
