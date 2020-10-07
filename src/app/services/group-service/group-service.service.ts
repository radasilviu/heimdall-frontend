import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Group} from '../../models/Group';
import {HttpClient} from '@angular/common/http';
import {Env} from '../../configs/env';
import {G} from '@angular/cdk/keycodes';

const url = Env.apiRootURL + '/api/client/group';

@Injectable({
  providedIn: 'root'
})
export class GroupServiceService {


  private group = new BehaviorSubject(null);

  getGroup = this.group.asObservable();

  constructor(private http: HttpClient) {
  }

  setGroup(group) {
    this.group.next(group);
  }


  findGroupByName(group){
    return this.http.get<Group>(url + "/" + group.name);
  }


  updateGroupByName(Group) {
    return this.http.put(url + '/' + Group.name, Group);
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
