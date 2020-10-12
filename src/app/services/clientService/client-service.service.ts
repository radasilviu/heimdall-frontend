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
export class ClientServiceService {

  private refresh = new Subject<Client[]>();

  get pageRefresh(){
    return this.refresh;
  }


  getClients(realmName){
    this.getAllClients(realmName).subscribe(data =>{
      this.refresh.next(data)
    })
  }

  constructor(private http: HttpClient) {}

  updateClientByName(currentClientName: string, client: Client,realm:string) {
    return this.http.put(url + '/client/'+  realm + "/" + currentClientName, client).pipe(tap(() =>{
      this.refresh.next()
    }))
  }

  getAllClients(realm:string): Observable<Client[]> {
    return this.http.get<Client[]>(url + '/client/' + realm );
  }


  deleteClient(clientName: string,realm:string) {
    return this.http.request('delete', url + '/client/'+ realm + "/" + clientName).pipe(tap(() =>{
      this.refresh.next()
    }))
  }

  addClient(client: Client,realm:string) {
    return this.http.post<any>(url + '/client/' + realm, client).pipe(tap(() =>{
      this.refresh.next()
    }))
  }
}
