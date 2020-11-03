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

  deleteResource(resourceName,role){
    return this.http.put(url + "/role/" + resourceName + "/remove",role)
  }

}
