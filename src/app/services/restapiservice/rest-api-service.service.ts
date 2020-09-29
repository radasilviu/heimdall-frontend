import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Client } from 'src/app/models/Client';
import { Observable } from 'rxjs';
import { IRole, Role } from 'src/app/models/Role';
import { User } from 'src/app/models/User'
import { Env } from 'src/app/configs/env';


const url = Env.apiRootURL + '/api';

@Injectable({
  providedIn: 'root'
})
export class RestApiServiceService {

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, time: number) {
    this._snackBar.open(message, '', {
      duration: time,
    });
  }

  updateRoleByName(currentRoleName:string, newRole:Role) {
    return this.http.put(url + "/role/" + currentRoleName, newRole);
  }

  updateClientByName(currentClientName:string, newClient:Client) {
    return this.http.put( url + "/client/" + currentClientName, newClient);
  }
  updateUserName(currentUserName:string, newUser:User) {
    return this.http.put( url + "/user/" + currentUserName, newUser);
  }

  getAllUsers() {
    return this.http.get( url + "/user");
  }

  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>( url + "/client");
  }
  deleteClient(clientName:string) {
    return this.http.request('delete', url +  "/client/" + clientName);
  }

  getAllRoles(): Observable<IRole[]> {
    return this.http.get<IRole[]>( url + "/role");
  }

  addRole(role:Role) {
    return this.http.post<any>( url + "/role", role);
  }

  deleteRole(role:Role) {
    return this.http.request('delete', url +  "/role/" + role);
  }
  deleteUser(username:string) {
    return this.http.request('delete', url + "/user/" + username);
  }

  addClient(client:Client) {
    return this.http.post<any>( url + "/client", client);
  }

  addUser(user:User) {
    return this.http.post<any>( url + "/user", user);
  }

  addUserRole(role:Role, username:string) {
    return this.http.post<any>( url + "/user/" + username + "/addRole",role);
  }

  deleteUserRole(userName:string, role:Role) {
    return this.http.request('delete', url + "/user/" + userName + "/removeRole",{body:role});
  }

  getUserByUsername(username:string): Observable<User> {
    return this.http.get<User>( url + "/user/" + username)
  }
}
