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
  role: Role;
  user: User;
  client: Client;

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, time: number) {
    this._snackBar.open(message, '', {
      duration: time,
    });
  }

  updateRoleByName(currentName, newName) {
    this.role = new Role(newName)
    return this.http.put("http://localhost:8081/api/role/" + currentName, this.role);
  }
  updateClientByName(clientName, newClientName) {
    this.client = new Client(newClientName)
    return this.http.put("http://localhost:8081/api/client/" + clientName, this.client);
  }
  updateUserName(currentUserName, newUserName) {
    this.user = new User()
    this.user.setUsername(newUserName);
    return this.http.put("http://localhost:8081/api/user/" + currentUserName, this.user);
  }

  getAllUsers() {
    return this.http.get("http://localhost:8081/api/user");
  }

  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>("http://localhost:8081/api/client");
  }
  deleteClient(clientName) {
    return this.http.request('delete', "http://localhost:8081/api/client/" + clientName);
  }

  getAllRoles(): Observable<IRole[]> {
    return this.http.get<IRole[]>("http://localhost:8081/api/role");
  }

  addRole(role) {
    this.role = new Role(role)
    return this.http.post<any>("http://localhost:8081/api/role", this.role);
  }

  deleteRole(role) {
    return this.http.request('delete', "http://localhost:8081/api/role/" + role);
  }
  deleteUser(username) {
    return this.http.request('delete', "http://localhost:8081/api/user/" + username);
  }

  addClient(clientName) {
    this.client = new Client(clientName);
    return this.http.post<any>("http://localhost:8081/api/client", this.client);
  }

  addUser(username, password) {
    this.user = new User()
    this.user.setUsernameAndPassword(username, password)
    return this.http.post<any>("http://localhost:8081/api/user", this.user);
  }

  addUserRole(newRole, username) {
    this.role = new Role(newRole)
    return this.http.post<any>("http://localhost:8081/api/user/" + username + "/addRole", this.role);
  }

  deleteUserRole(role, username) {
    this.role = new Role(role)
    return this.http.request('delete', "http://localhost:8081/api/user/" + username + "/removeRole", { body: this.role });
  }

  getUserByUsername(username): Observable<User> {
    return this.http.get<User>("http://localhost:8081/api/user/" + username)
  }
}
