import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Role} from '../../models/Role';
import {User} from '../../models/User';
import {HttpClient} from '@angular/common/http';
import {Env} from '../../configs/env';
import {tap} from 'rxjs/operators';
const url = Env.apiRootURL + '/api';

@Injectable({
  providedIn: 'root'
})
export class RoleServiceService {


   private refresh = new Subject<Role[]>();

   get pageRefresh(){
     return this.refresh;
   }

  constructor(private http: HttpClient) {}

  getAllRoles(realm:string): Observable<Role[]> {
    return this.http.get<Role[]>(url + '/role/'+ realm, );
  }

  addRole(role: Role,realm:string) {
    return this.http.post<any>(url + '/role/'+ realm, role).pipe(tap(() =>{
      this.refresh.next()
    }))
  }

  deleteRole(role: Role,realm:string) {
    return this.http.request('delete', url + '/role/'+ realm +"/" + role).pipe(tap(() =>{
      this.refresh.next()
    }))
  }

  addUserRole(role: Role, user: User,realm:string) {
    return this.http.post<any>(url + '/user/' + realm + "/" + user.username + '/addRole', role.name).pipe(tap(() =>{
      this.refresh.next()
    }))
  }

  updateRoleByName(currentRoleName: string, newRole: Role, realm:string) {
    return this.http.put(url + '/role/'+ realm +"/" + currentRoleName, newRole).pipe(tap(() =>{
      this.refresh.next()
    }))
  }

  deleteUserRole(user: User, role: Role, realm:string) {
    return this.http.request('delete', url + '/user/' + realm +"/" + user.username + '/removeRole', {body: role.name}).pipe(tap(() =>{
      this.refresh.next()
    }))
  }
}
