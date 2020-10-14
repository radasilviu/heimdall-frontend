import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Group} from '../../models/Group';
import {HttpClient} from '@angular/common/http';
import {Env} from '../../configs/env';
import {User} from '../../models/User';
import {tap} from 'rxjs/operators';

const url = Env.apiRootURL + '/api/client';

@Injectable({
  providedIn: 'root'
})

export class GroupService {

   groups = new Subject<Group[]>();

  setGroups(realm){
    this.getAllGroups(realm.name).subscribe(data =>{
      return this.groups.next(data);
    })
  }

  constructor(private http: HttpClient) {
  }

  addUserToGroup(groupName: string, user: User, realm: string) {
    return this.http.put(url + '/' + realm + "/group/" + groupName + '/addUser', user).pipe(tap(() =>{
      this.groups.next()
    }))
  }

  deleteUserFromGroup(group: Group, user: User, realm: string) {
    return this.http.put<Group>(url + '/' + realm + '/group/' + group.name + '/deleteUser/' + user.username, {}).pipe(tap(() =>{
      this.groups.next()
    }))
  }

 addRoleToGroup(realmName,groupName,roleName){
   return this.http.post<Group>(url + "/" + realmName + "/group" + "/" +  groupName  + "/addRole" +"/" + roleName, {}).pipe(tap(() =>{
     this.groups.next()
   }))
 }

  getGroupByName(group: string, realm: string): Observable<Group> {
    return this.http.get<Group>(url + '/' + realm + '/group/' + group);
  }


  getAllGroups(realm: string): Observable<Group[]> {
    return this.http.get<Group[]>(url +"/" +  realm + "/group" );
  }

  addNewGroup(group: Group, realm: string) {
    return this.http.post<Group>(url + "/" + realm + "/group" , group).pipe(tap(() =>{
      this.groups.next()
    }))
  }

  deleteGroupByName(group: Group, realm: string) {
    return this.http.request('delete', url + '/' + realm + '/group/' + group.name).pipe(tap(() =>{
      this.groups.next()
    }))
  }

}
