import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Client} from '../../models/Client';
import {Observable, Subject} from 'rxjs';
import {Env} from '../../configs/env';
import {Role} from '../../models/Role';

const url = Env.apiRootURL + '/api';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  allClients = new Subject<Client[]>();

  constructor(private http: HttpClient) {}

  updateClientByName(currentClientName: string, client: Client,realm:string) {

    return this.http.put(url + '/client/'+  realm + "/" + currentClientName, client);
  }

  getAllClients(realm:string): Observable<Client[]> {
    return this.http.get<Client[]>(url + '/client/' + realm );
  }


  deleteClient(clientName: string,realm:string) {
    return this.http.request('delete', url + '/client/'+ realm + "/" + clientName);
  }

  addClient(client: Client,realm:string) {
    return this.http.post<any>(url + '/client/' + realm, client);
  }

}
