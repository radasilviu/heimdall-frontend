import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Client} from '../../models/Client';
import {Observable, Subject} from 'rxjs';
import {Env} from '../../configs/env';
import {tap} from 'rxjs/operators';
import {SnackBarService} from '../snack-bar/snack-bar-service';

const url = Env.apiRootURL + '/api';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clients = new Subject<Client[]>();

  constructor(private http: HttpClient,
              private snackBar: SnackBarService) {
  }

  setClients(realm) {
    this.getAllClients(realm.name).subscribe(data => {
      return this.clients.next(data);
    }, error => this.snackBar.openSnackBar(error.error.message, 4000));
  }

  updateClientByName(currentClientName: string, client: Client, realmName: string) {
    client.clientName = currentClientName;
    return this.http.put(url + '/client/' + realmName + '/' + currentClientName, client).pipe(tap(() => {
      this.clients.next();
    }));
  }

  getAllClients(realmName: string): Observable<Client[]> {
    return this.http.get<Client[]>(url + '/client/' + realmName);
  }

  deleteClient(clientName: string, realmName: string) {
    return this.http.request('delete', url + '/client/' + realmName + '/' + clientName).pipe(tap(() => {
      this.clients.next();
    }));
  }

  addClient(client: Client, realmName: string) {
    return this.http.post<any>(url + '/client/' + realmName, client).pipe(tap(() => {
      this.clients.next();
    }));
  }
}
