import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Role} from '../../models/Role';
import {User} from '../../models/User';
import {HttpClient} from '@angular/common/http';
import {Env} from '../../configs/env';
import {tap} from 'rxjs/operators';
import {SnackBarService} from '../snack-bar/snack-bar-service';

const url = Env.apiRootURL + '/api';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  roles = new Subject<Role[]>();

  constructor(private http: HttpClient,
              private snackBar: SnackBarService) {
  }

  setRoles(realm) {
    this.getAllRoles(realm.name).subscribe(data => {
      return this.roles.next(data);
    }, error => this.snackBar.openSnackBar(error.error.message, 4000));
  }

  getAllRoles(realmName: string): Observable<Role[]> {
    return this.http.get<Role[]>(url + '/role/' + realmName);
  }
  getRoleByName(realmName: string, name: string): Observable<Role>{
    return this.http.get<Role>(url + '/role/' + realmName + '/' + name);
  }

  addRole(role: Role, realmName: string) {
    return this.http.post<any>(url + '/role/' + realmName, role).pipe(tap(() => {
      this.roles.next();
    }));
  }

  deleteRole(role: Role, realmName: string) {
    return this.http.request('delete', url + '/role/' + realmName + '/' + role).pipe(tap(() => {
      this.roles.next();
    }));
  }

  addUserRole(role: Role, user: User, realmName: string) {
    return this.http.post<any>(url + '/user/' + realmName + '/' + user.username + '/addRole', role.name).pipe(tap(() => {
      this.roles.next();
    }));
  }

  updateRoleByName(currentRoleName: string, newRole: Role, realmName: string) {
    return this.http.put(url + '/role/' + realmName + '/' + currentRoleName, newRole).pipe(tap(() => {
      this.roles.next();
    }));
  }

  deleteUserRole(user: User, role: Role, realmName: string) {
    return this.http.request('delete', url + '/user/' + realmName + '/' + user.username + '/removeRole', {body: role.name}).pipe(tap(() => {
      this.roles.next();
    }));
  }
}
