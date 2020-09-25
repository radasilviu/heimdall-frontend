import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Client } from 'src/app/models/Client';
import { Observable } from 'rxjs';
import { IRole, Role } from 'src/app/models/Role';
import { User } from 'src/app/models/User'

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
    return this.http.put("http://localhost:8081/api/role/" + currentRoleName, newRole);
  }

  updateClientByName(currentClientName:string, newClient:Client) {
    return this.http.put("http://localhost:8081/api/client/" + currentClientName, newClient);
  }
  updateUserName(currentUserName:string, newUser:User) {
    return this.http.put("http://localhost:8081/api/user/" + currentUserName, newUser);
  }

  getAllUsers() {
    return this.http.get("http://localhost:8081/api/user");
  }

  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>("http://localhost:8081/api/client");
  }
  deleteClient(clientName:string) {
    return this.http.request('delete', "http://localhost:8081/api/client/" + clientName);
  }

  getAllRoles(): Observable<IRole[]> {
    return this.http.get<IRole[]>("http://localhost:8081/api/role");
  }

  addRole(role:Role) {
    return this.http.post<any>("http://localhost:8081/api/role", role);
  }

  deleteRole(role:Role) {
    return this.http.request('delete', "http://localhost:8081/api/role/" + role);
  }
  deleteUser(username:string) {
    return this.http.request('delete', "http://localhost:8081/api/user/" + username);
  }

  addClient(client:Client) {
    return this.http.post<any>("http://localhost:8081/api/client", client);
  }

  addUser(user:User) {
    return this.http.post<any>("http://localhost:8081/api/user", user);
  }

  addUserRole(role:Role, username:string) {
    return this.http.post<any>("http://localhost:8081/api/user/" + username + "/addRole",role);
  }

  deleteUserRole(userName:string, role:Role) {
    return this.http.request('delete', "http://localhost:8081/api/user/" + userName + "/removeRole",{body:role});
  }

  getUserByUsername(username:string): Observable<User> {
    return this.http.get<User>("http://localhost:8081/api/user/" + username)
  }
}
