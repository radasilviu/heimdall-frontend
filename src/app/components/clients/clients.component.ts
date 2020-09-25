import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RestApiServiceService } from '../../services/restapiservice/rest-api-service.service';
import { ClientDialogComponent } from '../dialogs/client-dialog/client-dialog.component';
import { Client } from '../../models/Client';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})

export class ClientsComponent implements OnInit {
  newClient: Client;
  allCLients: Client[];
  errorMessage: string;
  displayedColumns: string[] = ['name'];

  constructor(private changeDetectorRefs: ChangeDetectorRef, private service: RestApiServiceService, public dialog: MatDialog) { }

  openDialog(clientName) {
    const dialogRef = this.dialog.open(ClientDialogComponent);

    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        this.service.updateClientByName(clientName, data).subscribe(data => {
          this.getAllClients();

        }, error => {
          this.service.openSnackBar(error.error, 2000);
        });
      }
    });
  }

  ngOnInit(): void {
    this.getAllClients();
  }

  updateCLient(clientName) {
    const newClientName = this.openDialog(clientName);
  }


  getAllClients() {
    this.service.getAllClients()
      .subscribe(data => {
        this.allCLients = data;
      }, error => {})
  }

  deleteClient(clientName) {
    this.service.deleteClient(clientName).subscribe(data => {
      this.getAllClients();
    })
  }

  addClient() {
    this.service.addClient(this.newClient).subscribe(data => {
      this.getAllClients();
    }, error => {
      this.service.openSnackBar(error.error, 2000)
    })
  }
}
