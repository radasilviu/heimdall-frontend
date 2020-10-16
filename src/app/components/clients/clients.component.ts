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


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})

export class ClientsComponent implements OnInit {
  allClients: Client[];
  realm: Realm;
  client: Client;
  displayedColumns: string[] = ['name'];

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
    this.getAllClients();
  }


  getAllClients() {
    this.realmService.getRealm.subscribe((data:ParentRealm) => {
      this.allClients = data.clients
      this.realm = data.realm;
    });
  }

  updateClient(currentClientName: string) {
    const dialogRef = this.dialog.open(ClientDialogComponent);

    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        this.client.clientName = data;
        this.service.updateClientByName(currentClientName, this.client, this.realm.name).subscribe(
          data => {
          }, error => {
            this.snackBar.openSnackBar(error.error.message, 2000);
          });
      }
    });
  }

  deleteClient(clientName) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(data => {
      if (data == 'true') {
        this.service.deleteClient(clientName, this.realm.name).subscribe(() => {
        }, error => {
          this.snackBar.openSnackBar(error.error.message, 2000);
        });
      }
    });
  }

  onSubmit() {
    this.service.addClient(this.form.value, this.realm.name).subscribe(data => {
    }, error => {
      this.snackBar.openSnackBar(error.error.message, 2000);
    });
  }
}
