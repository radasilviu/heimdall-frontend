import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestApiServiceService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get("http://localhost:7070/user");
  }

  getAllClients() {
    return this.http.get("http://localhost:7070/client");
  }
  deleteClient(id){
    return this.http.request('delete', "http://localhost:7070/client/" + id);
  }

  getAllRoles() {
    return this.http.get("http://localhost:7070/role");
  }

  addRole(role) {
    return this.http.post<any>("http://localhost:7070/role", { name: role });
  }

  deleteRole(id) {
    return this.http.request('delete', "http://localhost:7070/role/" + id);
  }

  addClient(clientName) {
    return this.http.post<any>("http://localhost:7070/client", { name: clientName });
  }

  addUser(username) {
    return this.http.post<any>("http://localhost:7070/user", { username: username });
  }

  addUserRole(newRole, id) {
    return this.http.post<any>("http://localhost:7070/user/" + id + "/addRole", { name: newRole });
  }

  deleteUserRole(role, id) {
    return this.http.request('delete', "http://localhost:7070/user/" + id + "/removeRole", { body: { name: role }});
  }

  getUserByUsername(username) {
    return this.http.get("http://localhost:7070/user/" + username)
  }
}
