import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Role} from '../../models/Role';
import {User} from '../../models/User';
import {HttpClient} from '@angular/common/http';
import {Env} from '../../configs/env';
const url = Env.apiRootURL + '/api';

@Injectable({
  providedIn: 'root'
})
export class RoleServiceService {


   allRoles = new Subject<Role[]>();

  constructor(private http: HttpClient) {}

  getAllRoles(realm:string): Observable<Role[]> {
    return this.http.get<Role[]>(url + '/role/'+ realm, );
  }

  addRole(role: Role,realm:string) {
    return this.http.post<any>(url + '/role/'+ realm, role);
  }

  deleteRole(role: Role,realm:string) {
    return this.http.request('delete', url + '/role/'+ realm +"/" + role);
  }

  addUserRole(role: Role, user: User,realm:string) {
    return this.http.post<any>(url + '/user/' + realm + "/" + user.username + '/addRole', role.name);
  }

  updateRoleByName(currentRoleName: string, newRole: Role, realm:string) {
    return this.http.put(url + '/role/'+ realm + currentRoleName, newRole);
  }

  deleteUserRole(user: User, role: Role, realm:string) {
    return this.http.request('delete', url + '/user/' + realm +"/" + user.username + '/removeRole', {body: role.name});
  }
}
