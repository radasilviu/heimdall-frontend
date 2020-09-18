import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestApiServiceService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get("http://localhost:8081/api/user");
  }

  getAllClients() {
    return this.http.get("http://localhost:8081/api/client");
  }
  deleteClient(id){
    return this.http.request('delete', "http://localhost:8081/api/client/" + id);
  }

  getAllRoles() {
    return this.http.get("http://localhost:8081/api/role");
  }

  addRole(role) {
    return this.http.post<any>("http://localhost:8081/api/role", { name: role });
  }

  deleteRole(id) {
    return this.http.request('delete', "http://localhost:8081/api/role/" + id);
  }

  addClient(clientName) {
    return this.http.post<any>("http://localhost:8081/api/client", { name: clientName });
  }

  addUser(username) {
    return this.http.post<any>("http://localhost:8081/api/user", { username: username });
  }

  addUserRole(newRole, id) {
    return this.http.post<any>("http://localhost:8081/api/user/" + id + "/addRole", { name: newRole });
  }

  deleteUserRole(role, id) {
    return this.http.request('delete', "http://localhost:8081/api/user/" + id + "/removeRole", { body: { name: role }});
  }

  getUserByUsername(username) {
    return this.http.get("http://localhost:8081/api/user/" + username)
  }
}
