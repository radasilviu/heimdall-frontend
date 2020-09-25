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
  client: Client;
  allCLients: Client[];
  errorMessage: string;
  displayedColumns: string[] = ['name'];

  constructor(private changeDetectorRefs: ChangeDetectorRef, private service: RestApiServiceService, public dialog: MatDialog) { }

  openDialog(currentClientName:string) {
    const dialogRef = this.dialog.open(ClientDialogComponent);

    dialogRef.afterClosed().subscribe(data => {
      this.client = new Client(data);
      if (data !== undefined) {
        this.service.updateClientByName(currentClientName, this.client).subscribe(
          data => {
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

  updateCLient(currentClientName) {
    this.openDialog(currentClientName);
  }


  getAllClients() {
    this.service.getAllClients()
      .subscribe(data => {
        this.allCLients = data;
      }, error => {})
  }

  deleteClient(clientName:string) {
    this.service.deleteClient(clientName).subscribe(data => {
      this.getAllClients();
    })
  }

  addClient(clientName:string) {
    this.client = new Client(clientName)
    this.service.addClient(this.client).subscribe(data => {
      this.getAllClients();
    }, error => {
      this.service.openSnackBar(error.error, 2000)
    })
  }
}
