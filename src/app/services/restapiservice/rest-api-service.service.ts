import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Client } from 'src/app/models/Client';
import { Observable } from 'rxjs';
import { Role } from 'src/app/models/Role';
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

  updateRoleByName(currentName, newName) {
    return this.http.put("http://localhost:8081/api/role/" + currentName, { name: newName });
  }
  updateClientByName(clientName, newClientName) {
    return this.http.put("http://localhost:8081/api/client/" + clientName, { clientName: newClientName });
  }
  updateUserName(currentUserName, newUserName) {
    return this.http.put("http://localhost:8081/api/user/" + currentUserName, { username: newUserName });
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

  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>("http://localhost:8081/api/role");
  }

  addRole(role) {
    return this.http.post<any>("http://localhost:8081/api/role", { name: role });
  }

  deleteRole(role) {
    return this.http.request('delete', "http://localhost:8081/api/role/" + role);
  }
  deleteUser(username) {
    return this.http.request('delete', "http://localhost:8081/api/user/" + username);
  }

  addClient(clientName) {
    return this.http.post<any>("http://localhost:8081/api/client", { clientName: clientName });
  }

  addUser(username, password) {
    return this.http.post<any>("http://localhost:8081/api/user", { username: username, password: password });
  }

  addUserRole(newRole, username) {
    return this.http.post<any>("http://localhost:8081/api/user/" + username + "/addRole", { name: newRole });
  }

  deleteUserRole(role, username) {
    return this.http.request('delete', "http://localhost:8081/api/user/" + username + "/removeRole", { body: { name: role } });
  }

  getUserByUsername(username): Observable<User> {
    return this.http.get<User>("http://localhost:8081/api/user/" + username)
  }
}
