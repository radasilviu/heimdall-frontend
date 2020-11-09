import {Injectable} from '@angular/core';
import {Env} from "../../configs/env";
import {HttpClient} from "@angular/common/http";

const url = Env.apiRootURL + '/api/privilege/';


@Injectable({
  providedIn: 'root'
})
export class PrivilegesService {

  constructor(private http: HttpClient) {
  }

  getAllPrivileges() {
    return this.http.get(url);
  }

  getResourcePrivileges(realmName, roleName, resourceName) {
    return this.http.get(url + realmName + "/" + roleName + "/" + resourceName);
  }

  addPrivilegeToResource(resourceName, privilegeName, role) {
    return this.http.put(url + resourceName + "/" + privilegeName + "/add", role);
  }

  deletePrivilegeFromResource(resourceName, privilegeName, role) {
    return this.http.put(url + resourceName + "/" + privilegeName + "/remove", role);
  }

}
