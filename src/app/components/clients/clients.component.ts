import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ClientDialogComponent} from '../dialogs/client-dialog/client-dialog.component';
import {Client} from '../../models/Client';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';
import {ClientService} from '../../services/clientService/client-service';
import {SnackBarService} from '../../services/snack-bar/snack-bar-service';
import {ParentRealm} from '../../models/Realm';
import {RealmService} from '../../services/realm-service/realm-service';
import {SubSink} from 'subsink';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})

export class ClientsComponent implements OnInit {
  realm;
  client: Client;
  clients: Client[];
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
    this.realmService.realm.subscribe((data: ParentRealm) => {
      this.realm = data.realm;
      this.getAllClients();
    });
  }

  getAllClients() {
    this.clientService.getAllClients(this.realm.name).subscribe((clients: Client[]) => {
      this.clientService.setClients(clients);
    });
    this.clientService.clients.subscribe(data => this.clients = data);
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  updateClient(currentClientName: string) {
    localStorage.setItem('clientEdit', 'true');
    const dialogRef = this.dialog.open(ClientDialogComponent);

    dialogRef.afterClosed().subscribe((data: Client) => {
      if (data !== undefined) {
        this.subSink.add(this.service.updateClientByName(currentClientName, data, this.realm.name).subscribe(
          () => {
            this.getAllClients();
          }, error => {
            this.snackBar.openSnackBar(error.message, 2000);
          }));
      }
    });
  }

  deleteClient(clientName) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(data => {
      if (data == 'true') {
        this.subSink.add(this.service.deleteClient(clientName, this.realm.name).subscribe(() => {
          this.getAllClients();
        }, error => {
          this.snackBar.openSnackBar(error.error.message, 2000);
        }));
      }
    });
  }

  addClient() {
    localStorage.setItem('clientEdit', '');
    const dialogRef = this.dialog.open(ClientDialogComponent);
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.subSink.add(this.service.addClient(data, this.realm.name).subscribe(data => {
          this.realmService.setRealm(this.realm.name);
        }, error => {
          this.snackBar.openSnackBar(error.error.message, 2000);
        }));
      }
    });
  }
}
