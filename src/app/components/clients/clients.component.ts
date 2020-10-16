import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ClientDialogComponent} from '../dialogs/client-dialog/client-dialog.component';
import {Client} from '../../models/Client';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';
import {ClientService} from '../../services/clientService/client-service';
import {SnackBarService} from '../../services/snack-bar/snack-bar-service';
import {Realm} from '../../models/Realm';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})

export class ClientsComponent implements OnInit {
  allClients: Client[];
  realm: Realm;
  Client: Client;
  private subscription: Subscription;
  displayedColumns: string[] = ['name'];

  form = new FormGroup({
    clientName: new FormControl('', Validators.required),
  });

  constructor(private changeDetectorRefs: ChangeDetectorRef,
              private service: ClientService,
              private snackBar: SnackBarService,
              private dialog: MatDialog,
              private clientService: ClientService) {
  }

  ngOnInit(): void {
    this.subscription = this.clientService.clients.subscribe(() => {
      this.getAllClients();
    });
    this.getAllClients();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getAllClients() {
    let realm = localStorage.getItem('realm');

    this.clientService.getAllClients(JSON.parse(realm).name).subscribe(data => {
      this.allClients = data;
    }, error => this.snackBar.openSnackBar(error.message, 4000));
  }

  updateClient(currentClientName: string) {
    const dialogRef = this.dialog.open(ClientDialogComponent);
    let realm = localStorage.getItem('realm');

    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        this.Client.clientName = data;
        this.service.updateClientByName(currentClientName, this.Client, JSON.parse(realm).name).subscribe(
          data => {
          }, error => {
            this.snackBar.openSnackBar(error.error.message, 2000);
          });
      }
    });
  }

  deleteClient(clientName) {
    let realm = localStorage.getItem('realm');
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(data => {
      if (data == 'true') {
        this.service.deleteClient(clientName, JSON.parse(realm).name).subscribe(() => {
        }, error => {
          this.snackBar.openSnackBar(error.error.message, 2000);
        });
      }
    });
  }

  onSubmit() {
    let realm = localStorage.getItem('realm');

    this.service.addClient(this.form.value, JSON.parse(realm).name).subscribe(data => {
    }, error => {
      this.snackBar.openSnackBar(error.error.message, 2000);
    });
  }
}
