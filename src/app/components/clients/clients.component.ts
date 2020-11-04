import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ClientDialogComponent} from '../dialogs/client-dialog/client-dialog.component';
import {Client} from '../../models/Client';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';
import {ClientService} from '../../services/clientService/client-service';
import {RealmService} from '../../services/realm-service/realm-service';
import {SubSink} from 'subsink';
import {Realm} from '../../models/Realm';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})

export class ClientsComponent implements OnInit {
  realm: Realm;
  clients;
  displayedColumns: string[] = ['name'];
  subSink = new SubSink();

  constructor(private changeDetectorRefs: ChangeDetectorRef,
              private service: ClientService,
              private dialog: MatDialog,
              private clientService: ClientService,
              private realmService: RealmService) {
  }

  ngOnInit(): void {
    this.subSink
      .add(this.realmService
        .currentRealm
        .subscribe((data: Realm) => {
          this.realm = data;
          this.getAllClients();
        }));
  }

  getAllClients() {
    this.subSink.add(this.clientService
      .getAllClients(this.realm.name)
      .subscribe((clients: Client[]) => this.clients = clients));
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  updateClient(client) {
    const dialogRef = this.dialog
      .open(ClientDialogComponent, {
        data: {edit: true}
      });

    dialogRef.afterClosed()
      .subscribe((data: Client) => {
        if (data !== undefined) {
          this.subSink
            .add(this.service
              .updateClientByName(client.clientName, data, this.realm.name)
              .subscribe(() => {
                this.getAllClients()
              }));
        }
      });
  }

  deleteClient(client) {
    const dialogRef = this.dialog
      .open(DeleteDialogComponent);

    dialogRef.afterClosed()
      .subscribe(data => {
        if (data == 'true') {
          this.subSink
            .add(this.service
              .deleteClient(client.clientName, this.realm.name)
              .subscribe(() => this.getAllClients()));
        }
      });
  }

  addClient() {
    const dialogRef = this.dialog
      .open(ClientDialogComponent);

    dialogRef.afterClosed()
      .subscribe(data => {
        if (data) {
          this.subSink
            .add(this.service
              .addClient(data, this.realm.name)
              .subscribe(() => this.getAllClients()));
        }
      });
  }
}
