import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Client} from '../../models/Client';
import {Observable} from 'rxjs';
import {Env} from '../../configs/env';

const url = Env.apiRootURL + '/api';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  constructor(private http: HttpClient) {}

  updateClientByName(currentClientName: string, client: Client) {

    return this.http.put(url + '/client/' + currentClientName, client);
  }

  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(url + '/client');
  }


  deleteClient(clientName: string) {
    return this.http.request('delete', url + '/client/' + clientName);
  }

  addClient(client: Client) {
    return this.http.post<any>(url + '/client', client);
  }

}
