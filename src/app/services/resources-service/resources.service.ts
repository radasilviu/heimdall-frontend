import {Injectable} from '@angular/core';


import {Env} from "../../configs/env";
import {HttpClient} from "@angular/common/http";

const url = Env.apiRootURL + '/api';


@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  constructor(private http: HttpClient) {
  }

  getAllResources() {
    return this.http.get(url + '/resources/all');
  }

  deleteRoleResource(resourceName, role) {
    return this.http.put(url + '/role/' + resourceName + "/remove", role);
  }

  getRoleResource(realmName, roleName) {
    return this.http.get(url + '/resources/' + realmName + "/" + roleName);
  }

  addRoleResource(resourceName, role) {
    return this.http.put(url + '/role/' + resourceName + "/add", role);
  }

  updateResourceByName(currentResourceName, newResourceName) {
    return this.http.put(url + '/resources/' + currentResourceName, newResourceName);
  }

  addNewResource(newResource) {
    return this.http.post(url + '/resources', newResource);
  }

  deleteResource(resourceName) {
    return this.http.delete(url + '/resources/' + resourceName + "/removeAll");
  }
}


