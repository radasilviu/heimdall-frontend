import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ClientDialogComponent} from '../dialogs/client-dialog/client-dialog.component';
import {Client} from '../../models/Client';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';
import {ClientService} from '../../services/clientService/client-service';
import {SnackBarService} from '../../services/snack-bar/snack-bar-service';
import {ParentRealm, Realm} from '../../models/Realm';
import {RealmService} from '../../services/realm-service/realm-service';
import {SubSink} from 'subsink';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})

export class ClientsComponent implements OnInit {
  realm: Realm;
  client: Client;
  clients: Client[];
  displayedColumns: string[] = ['name'];
  subSink = new SubSink();

  form = new FormGroup({
    clientName: new FormControl('', Validators.required),
  });

  constructor(private changeDetectorRefs: ChangeDetectorRef,
              private service: ClientService,
              private snackBar: SnackBarService,
              private dialog: MatDialog,
              private clientService: ClientService,
              private realmService: RealmService) {
  }

  ngOnInit(): void {
    this.subSink.add(this.realmService.realm.subscribe((data: ParentRealm) => {
      this.clients = data.clients;
      this.realm = data.realm;
    }));
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  updateClient(currentClientName: string) {
    const dialogRef = this.dialog.open(ClientDialogComponent);

    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        let client = {} as Client;
        client.clientName = data;
        this.subSink.add(this.service.updateClientByName(currentClientName, client, this.realm.name).subscribe(
          data => {
            this.realmService.setRealm(this.realm.name);
          }, error => {
            this.snackBar.openSnackBar(error.error.message, 2000);
          }));
      }
    });
  }

  deleteClient(clientName) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(data => {
      if (data == 'true') {
        this.subSink.add(this.service.deleteClient(clientName, this.realm.name).subscribe(() => {
          this.realmService.setRealm(this.realm.name);
        }, error => {
          this.snackBar.openSnackBar(error.error.message, 2000);
        }));
      }
    });
  }

  onSubmit() {
    this.subSink.add(this.service.addClient(this.form.value, this.realm.name).subscribe(data => {
      this.realmService.setRealm(this.realm.name);
    }, error => {
      this.snackBar.openSnackBar(error.error.message, 2000);
    }));
  }
}
