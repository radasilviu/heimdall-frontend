import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SnackBarService} from "../snack-bar/snack-bar-service";
import {Env} from "../../configs/env";

const url = Env.apiRootURL + "/api";


@Injectable({
  providedIn: 'root'
})
export class ResourcesService {
  constructor(private http: HttpClient,
              private snackBar: SnackBarService) {
  }


  getAllResources(role) {
    return this.http.get(url + "/resources" + "/all", role);
  }

  addResourceToRole(resourceName, role) {
    return this.http.put(url + "/role/" + resourceName + "/add", role);
  }

  deleteRoleResource(resourceName, role) {
    return this.http.put(url + "/role/" + resourceName + "/remove", role)
  }

  addNewResource(resource) {
    return this.http.post(url + "/resources", resource);
  }

  getAllPrivilege() {
    return this.http.get(url + "/privilege");
  }

  getResourcePrivilege() {
    const realm = JSON.parse(localStorage.getItem("realm"))
    const roleName = localStorage.getItem("currentRoleName")
    const resourceName = localStorage.getItem("resource")

    return this.http.get(url + "/privilege/" + realm.name + "/" + roleName + "/" + resourceName,);
  }

  removePrivilegeFromResource(privilegeName, role) {
    const resourceName = localStorage.getItem("resource")
    return this.http.put(url + "/privilege/" + resourceName + "/" + privilegeName + "/remove", role);
  }

  addPrivilegeToRole(privilegeName, role) {
    const resourceName = localStorage.getItem("resource")
    return this.http.put(url + "/privilege/" + resourceName + "/" + privilegeName + "/add", role);
  }

  deleteResource() {
    const resourceName = localStorage.getItem("resource")
    return this.http.delete(url + "/resources/" + resourceName + "/removeAll");
  }

}
