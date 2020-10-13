import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ClientDialogComponent} from '../dialogs/client-dialog/client-dialog.component';
import {Client} from '../../models/Client';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';
import {ClientServiceService} from '../../services/clientService/client-service.service';
import {SnackBarServiceService} from '../../services/snack-bar/snack-bar-service.service';
import {RealmServiceService} from '../../services/realm-service/realm-service.service';
import {Realm} from '../../models/Realm';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})

export class ClientsComponent implements OnInit {
  allClients: Client[];
  errorMessage: string;
  realm: Realm;
  Client = <Client> {};

  displayedColumns: string[] = ['name'];
  form = new FormGroup({
    clientName: new FormControl('', Validators.required),
  });

  constructor(private changeDetectorRefs: ChangeDetectorRef,
              private service: ClientServiceService,
              private snackBar: SnackBarServiceService,
              public dialog: MatDialog,
              private realmService: RealmServiceService) {
  }

  ngOnInit(): void {
    this.realmService.currentRealm.subscribe((data: Realm) => {
      this.realm = data;
      this.service.pageRefresh.subscribe(() => {
        this.getAllClients();
      });
      this.getAllClients();
    });
  }

  getAllClients() {
    this.service.getAllClients(this.realm.name).subscribe((clients: Client[]) => this.allClients = clients);
  }

  updateClient(currentClientName: string) {
    const dialogRef = this.dialog.open(ClientDialogComponent);
    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        this.Client.clientName = data;
        this.service.updateClientByName(currentClientName, this.Client, this.realm.name).subscribe(
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
        });
      }
    });
  }


  onSubmit() {
    this.addClient(this.form.value);
  }


  addClient(client: Client) {

    this.service.addClient(client, this.realm.name).subscribe(data => {
    }, error => {
      this.snackBar.openSnackBar(error.error.message, 2000);
    });
  }
}
