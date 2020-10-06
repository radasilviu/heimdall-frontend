import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {IClient} from '../../models/Client';
import {Group} from '../../models/Group';
import {HttpClient} from '@angular/common/http';
import {Env} from '../../configs/env';

const url = Env.apiRootURL + '/api/client/group';

@Injectable({
  providedIn: 'root'
})
export class GroupServiceService {

  private groups = new Subject();

  getGroups = this.groups.asObservable();



  constructor(private http: HttpClient) { }

  getAllGroups(): Observable<Group[]> {
    return this.http.get<Group[]>( url);
  }
  addNewGroup(group:Group){
    return this.http.post<Group>( url, group);
  }
  deleteGroupByName(group:Group){
    return this.http.request('delete', url + "/" + group.name);
  }

}
