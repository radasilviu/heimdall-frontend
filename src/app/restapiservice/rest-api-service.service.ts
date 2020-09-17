import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RestApiServiceService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa("admin" + ":" + "admin123") })
    return this.http.get("http://localhost:7070/user", { headers });
  }

  getAllClients() {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa("admin" + ":" + "admin123") })
    return this.http.get("http://localhost:7070/client", { headers });
  }
  deleteClient(id){
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa("admin" + ":" + "admin123") })
    return this.http.request('delete', "http://localhost:7070/client/" + id, { headers });
  }

  getAllRoles() {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa("admin" + ":" + "admin123") })
    return this.http.get("http://localhost:7070/role", { headers });
  }

  addRole(role) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa("admin" + ":" + "admin123") })
    return this.http.post<any>("http://localhost:7070/role", { name: role }, { headers });
  }

  deleteRole(id) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa("admin" + ":" + "admin123") })
    return this.http.request('delete', "http://localhost:7070/role/" + id, { headers });
  }

  addClient(clientName) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa("admin" + ":" + "admin123") })
    return this.http.post<any>("http://localhost:7070/client", { name: clientName }, { headers });
  }

  addUser(username) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa("admin" + ":" + "admin123") })
    return this.http.post<any>("http://localhost:7070/user", { username: username }, { headers });
  }

  addUserRole(newRole, id) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa("admin" + ":" + "admin123") })
    return this.http.post<any>("http://localhost:7070/user/" + id + "/addRole", { name: newRole }, { headers });
  }

  deleteUserRole(role, id) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa("admin" + ":" + "admin123") })
    return this.http.request('delete', "http://localhost:7070/user/" + id + "/removeRole", { body: { name: role }, headers });
  }

  getUserByUsername(username) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa("admin" + ":" + "admin123") })
    return this.http.get("http://localhost:7070/user/" + username, { headers })
  }
}
