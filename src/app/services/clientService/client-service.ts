import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Client} from '../../models/Client';
import {Observable, Subject} from 'rxjs';
import {Env} from '../../configs/env';
import {Role} from '../../models/Role';
import {tap} from 'rxjs/operators';

const url = Env.apiRootURL + '/api';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

   clients = new Subject<Client[]>();

    setClients(realm){
      this.getAllClients(realm.name).subscribe(data =>{
        return this.clients.next(data);
      })
  }

  constructor(private http: HttpClient) {}

  updateClientByName(currentClientName: string, client: Client,realm:string) {
    return this.http.put(url + '/client/'+  realm + "/" + currentClientName, client).pipe(tap(() =>{
      this.clients.next()
    }))
  }

  getAllClients(realm:string): Observable<Client[]> {
    return this.http.get<Client[]>(url + '/client/' + realm );
  }


  deleteClient(clientName: string,realm:string) {
    return this.http.request('delete', url + '/client/'+ realm + "/" + clientName).pipe(tap(() =>{
      this.clients.next()
    }))
  }

  addClient(client: Client,realm:string) {
    return this.http.post<any>(url + '/client/' + realm, client).pipe(tap(() =>{
      this.clients.next()
    }))
  }
}