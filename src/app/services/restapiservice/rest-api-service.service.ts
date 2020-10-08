import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {IClient} from 'src/app/models/Client';
import {Observable} from 'rxjs';
import {IRole} from 'src/app/models/Role';
import {IUser} from 'src/app/models/User';
import {Env} from 'src/app/configs/env';


const url = Env.apiRootURL + '/api';

@Injectable({
  providedIn: 'root'
})
export class RestApiServiceService {

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
  }

  openSnackBar(message: string, time: number) {
    this._snackBar.open(message, '', {
      duration: time,
    });
  }

  updateRoleByName(currentRoleName: string, newRole: IRole) {
    return this.http.put(url + '/role/' + currentRoleName, newRole);
  }

  updateClientByName(currentClientName: string, newClient: IClient) {
    return this.http.put(url + '/client/' + currentClientName, newClient);
  }

  updateUserName(currentUserName: string, newUser: IUser) {
    return this.http.put(url + '/user/' + currentUserName, newUser);
  }

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(url + '/user');
  }

  getAllClients(): Observable<IClient[]> {
    return this.http.get<IClient[]>(url + '/client');
  }

  deleteClient(clientName: string) {
    return this.http.request('delete', url + '/client/' + clientName);
  }

  getAllRoles(): Observable<IRole[]> {
    return this.http.get<IRole[]>(url + '/role');
  }

  addRole(role: IRole) {
    return this.http.post<any>(url + '/role', role);
  }

  deleteRole(role: IRole) {
    return this.http.request('delete', url + '/role/' + role);
  }

  deleteUser(username: string) {
    return this.http.request('delete', url + '/user/' + username);
  }

  addClient(client: IClient) {
    return this.http.post<any>(url + '/client', client);
  }

  addUser(user: IUser) {
    return this.http.post<any>(url + '/user', user);
  }

  addUserRole(role: IRole, user: IUser) {
    return this.http.post<any>(url + '/user/' + user.username + '/addRole', role.name);
  }

  deleteUserRole(user: IUser, role: IRole) {
    return this.http.request('delete', url + '/user/' + user.username + '/removeRole', {body: role.name});
  }

  getUserByUsername(user: string): Observable<IUser> {
    return this.http.get<IUser>(url + '/user/' + user);
  }
}
