import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ClientDialogComponent} from '../dialogs/client-dialog/client-dialog.component';
import {Client} from '../../models/Client';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';
import {ClientService} from '../../services/clientService/client-service';
import {RealmService} from '../../services/realm-service/realm-service';
import {SubSink} from 'subsink';
import {Realm} from '../../models/Realm';
import {mergeMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})

export class ClientsComponent implements OnInit {
  realm: Realm;
  client: Client;
  clients = this.clientService.clients;
  displayedColumns: string[] = ['name'];
  subSink = new SubSink();

  constructor(private changeDetectorRefs: ChangeDetectorRef,
              private service: ClientService,
              private dialog: MatDialog,
              private clientService: ClientService,
              private realmService: RealmService) {
  }

  ngOnInit(): void {
    this.getAllClients();
  }

  getAllClients() {
    this.subSink.add(this.realmService.realm.pipe(mergeMap(
      (realm: Realm) => {
        this.realm = realm;
        return this.clientService.getAllClients(realm.name).pipe(tap(clients => this.clientService.setClients(clients)));
      })).subscribe());
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  updateClient(currentClientName: string) {
    this.clientService.editClient.next(true);
    const dialogRef = this.dialog.open(ClientDialogComponent);

    dialogRef.afterClosed().subscribe((data: Client) => {
      if (data !== undefined) {
        this.subSink.add(this.service.updateClientByName(currentClientName, data, this.realm.name).pipe(tap(() => this.getAllClients())).subscribe());
      }
    });
  }

  deleteClient(clientName) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(data => {
      if (data == 'true') {
        this.subSink.add(this.service.deleteClient(clientName, this.realm.name).pipe(tap(() => this.getAllClients())).subscribe());
      }
    });
  }

  addClient() {
    this.clientService.editClient.next(false);

    const dialogRef = this.dialog.open(ClientDialogComponent);

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.subSink.add(this.service.addClient(data, this.realm.name).pipe(tap(() => this.getAllClients())).subscribe());
      }
    });
  }
}
