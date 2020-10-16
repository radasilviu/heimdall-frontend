import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Group} from '../../models/Group';
import {HttpClient} from '@angular/common/http';
import {Env} from '../../configs/env';
import {User} from '../../models/User';
import {tap} from 'rxjs/operators';
import {SnackBarService} from '../snack-bar/snack-bar-service';

const url = Env.apiRootURL + '/api/client';

@Injectable({
  providedIn: 'root'
})

export class GroupService {

  groups = new Subject<Group[]>();

  constructor(private http: HttpClient,
              private snackBar: SnackBarService) {
  }

  setGroups(realm) {
    this.getAllGroups(realm.name).subscribe(data => {
      return this.groups.next(data);
    }, error => this.snackBar.openSnackBar(error.error.message, 4000));
  }

  addUserToGroup(groupName: string, user: User, realmName: string) {
    return this.http.put(url + '/' + realmName + '/group/' + groupName + '/addUser', user).pipe(tap(() => {
      this.groups.next();
    }));
  }

  deleteUserFromGroup(group: Group, user: User, realmName: string) {
    return this.http.put<Group>(url + '/' + realmName + '/group/' + group.name + '/deleteUser/' + user.username, {}).pipe(tap(() => {
      this.groups.next();
    }));
  }

  addRoleToGroup(realmName, groupName: string, roleName: string) {
    return this.http.post<Group>(url + '/' + realmName + '/group' + '/' + groupName + '/addRole' + '/' + roleName, {}).pipe(tap(() => {
      this.groups.next();
    }));
  }

  getGroupByName(group: string, realmName: string): Observable<Group> {
    return this.http.get<Group>(url + '/' + realmName + '/group/' + group);
  }


  getAllGroups(realmName: string): Observable<Group[]> {
    return this.http.get<Group[]>(url + '/' + realmName + '/group');
  }

  addNewGroup(group: Group, realmName: string) {
    return this.http.post<Group>(url + '/' + realmName + '/group', group).pipe(tap(() => {
      this.groups.next();
    }));
  }

  deleteGroupByName(group: Group, realmName: string) {
    return this.http.request('delete', url + '/' + realmName + '/group/' + group.name).pipe(tap(() => {
      this.groups.next();
    }));
  }

}
