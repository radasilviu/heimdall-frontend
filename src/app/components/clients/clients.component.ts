import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ClientDialogComponent} from '../dialogs/client-dialog/client-dialog.component';
import {Client} from '../../models/Client';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';
import {ClientServiceService} from '../../services/clientService/client-service.service';
import {SnackBarServiceService} from '../../services/snack-bar/snack-bar-service.service';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})

export class ClientsComponent implements OnInit {
  allClients: Client[];
  errorMessage: string;
  Client = <Client> {};

  displayedColumns: string[] = ['name'];
  form = new FormGroup({
    clientName: new FormControl('', Validators.required),
  });

  constructor(private changeDetectorRefs: ChangeDetectorRef,
              private service: ClientServiceService,
              private snackBar: SnackBarServiceService,
              public dialog: MatDialog) {
  }

  updateClient(currentClientName: string) {
    let realm = localStorage.getItem('realm');
    const dialogRef = this.dialog.open(ClientDialogComponent);
    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        this.Client.clientName = data;
        this.service.updateClientByName(currentClientName, this.Client, realm).subscribe(
          data => {
            this.updateView();
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
        this.service.deleteClient(clientName, realm).subscribe(() => {
          this.updateView();
        });
      }
    });
  }

  ngOnInit(): void {
    this.getAllClients();
  }

  onSubmit() {
    this.addClient(this.form.value);
  }

  updateView() {
    let realm = localStorage.getItem('realm');
    this.service.getAllClients(realm).subscribe(data => {
      this.allClients = data;
    });
  }

  getAllClients() {
    this.service.allClients.subscribe(data =>{
      this.allClients = data
    })
  }

  addClient(client: Client) {
    let realm = localStorage.getItem('realm');

    this.service.addClient(client, realm).subscribe(data => {
      this.updateView();
    }, error => {
      this.snackBar.openSnackBar(error.error.message, 2000);
    });
  }
}
