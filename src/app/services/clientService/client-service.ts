import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Client} from '../../models/Client';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {Env} from '../../configs/env';

const url = Env.apiRootURL + '/api';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private clients$ = new ReplaySubject();
  clients = this.clients$.asObservable();

  setClients(clients) {
    this.clients$.next(clients);
  }

  constructor(private http: HttpClient) {
  }

  updateClientByName(currentClientName: string, client: Client, realmName: string) {
    return this.http.put(url + '/client/' + realmName + '/' + currentClientName, client);
  }

  getAllClients(realmName: string): Observable<Client[]> {
    return this.http.get<Client[]>(url + '/client/' + realmName);
  }

  deleteClient(clientName: string, realmName: string) {
    return this.http.request('delete', url + '/client/' + realmName + '/' + clientName);
  }

  addClient(client: Client, realmName: string) {
    return this.http.post<any>(url + '/client/' + realmName, client);
  }
}
