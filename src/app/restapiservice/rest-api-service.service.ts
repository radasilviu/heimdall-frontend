import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RestApiServiceService {

  constructor(private http:HttpClient) { }

  getAllUsers(){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa("admin" + ":"  + "admin")})
    return this.http.get("http://localhost:7070/user",{headers});
  }
  getAllClients(){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa("admin" + ":"  + "admin")})
    return this.http.get("http://localhost:7070/client",{headers});
  }

  getAllRoles(){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa("admin" + ":"  + "admin")})
    return this.http.get("http://localhost:7070/role",{headers});
  }

  addClient(clientName){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa("admin" + ":"  + "admin")})
    return this.http.post<any>("http://localhost:7070/client", { name: clientName },{headers});
  }
  addUser(username){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa("admin" + ":"  + "admin")})
    return this.http.post<any>("http://localhost:7070/user", { username: username },{headers});
  }
  addRole(newRole){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa("admin" + ":"  + "admin")})
    return this.http.post<any>("http://localhost:7070/role", { role: newRole },{headers});

  }
}
