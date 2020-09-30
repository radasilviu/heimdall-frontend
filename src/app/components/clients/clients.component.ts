import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RestApiServiceService } from '../../services/restapiservice/rest-api-service.service';
import { ClientDialogComponent } from '../dialogs/client-dialog/client-dialog.component';
import { Client } from '../../models/Client';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})

export class ClientsComponent implements OnInit {
  client: Client;
  allClients: Client[];
  errorMessage: string;
  displayedColumns: string[] = ['name'];
  form = new FormGroup({
    clientName:new FormControl('', Validators.required),
  })

  constructor(private changeDetectorRefs: ChangeDetectorRef, private service: RestApiServiceService, public dialog: MatDialog) { }

  updateClient(currentClientName:string) {
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
  
  deleteClient(clientName){
      const dialogRef = this.dialog.open(DeleteDialogComponent);
      dialogRef.afterClosed().subscribe(data => {
        if (data == "true") {
          this.service.deleteClient(clientName).subscribe(data => {
            this.getAllClients();
          })
        }
        else {
          console.log("nu")
        }
      })
    }

  ngOnInit(): void {
    this.getAllClients();
  }

  onSubmit(){
    this.addClient(this.form.value.clientName)
  }

  getAllClients() {
    this.service.getAllClients()
      .subscribe(data => {
        this.allClients = data;
      }, error => {})
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
