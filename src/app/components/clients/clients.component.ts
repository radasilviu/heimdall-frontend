import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ClientDialogComponent} from '../dialogs/client-dialog/client-dialog.component';
import {Client} from '../../models/Client';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';
import {ClientService} from '../../services/clientService/client-service';
import {SnackBarService} from '../../services/snack-bar/snack-bar-service';
import {RealmService} from '../../services/realm-service/realm-service';
import {SubSink} from 'subsink';
import {Realm} from '../../models/Realm';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})

export class ClientsComponent implements OnInit {
  realm:Realm;
  client: Client;
  clients = this.clientService.clients;
  displayedColumns: string[] = ['name'];
  subSink = new SubSink();

  constructor(private changeDetectorRefs: ChangeDetectorRef,
              private service: ClientService,
              private snackBar: SnackBarService,
              private dialog: MatDialog,
              private clientService: ClientService,
              private realmService: RealmService) {
  }

  ngOnInit(): void {
    this.getAllClients();
  }

  getAllClients() {
    this.subSink.add(this.realmService.realm.subscribe((data: Realm) => {
      this.realm = data;
      this.subSink.add(this.clientService.getAllClients(data.name).subscribe(data => this.clientService.setClients(data)));
    }));
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  updateClient(currentClientName: string) {
    localStorage.setItem('clientEdit', 'true');
    const dialogRef = this.dialog.open(ClientDialogComponent);

    this.subSink.add(dialogRef.afterClosed().subscribe((data: Client) => {
      if (data !== undefined) {
        this.subSink.add(this.service.updateClientByName(currentClientName, data, this.realm.name).subscribe(
          () => {
            this.getAllClients();
          }, error => {
            this.snackBar.openSnackBar(error.message, 2000);
          }));
      }
    }));
  }

  deleteClient(clientName) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    this.subSink.add(dialogRef.afterClosed().subscribe(data => {
      if (data == 'true') {
        this.subSink.add(this.service.deleteClient(clientName, this.realm.name).subscribe(() => {
          this.getAllClients();
        }, error => {
          this.snackBar.openSnackBar(error.error.message, 2000);
        }));
      }
    }));
  }

  addClient() {
    localStorage.setItem('clientEdit', '');
    const dialogRef = this.dialog.open(ClientDialogComponent);
    this.subSink.add(dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.subSink.add(this.service.addClient(data, this.realm.name).subscribe(data => {
          this.getAllClients();
        }, error => {
          this.snackBar.openSnackBar(error.error.message, 2000);
        }));
      }
    }));
  }
}
