import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { RestApiServiceService } from '../../services/restapiservice/rest-api-service.service';
import { ClientDialogComponent } from '../dialogs/client-dialog/client-dialog.component';


export interface Client {
  name: string;
}

const ELEMENT_DATA: Client[] = [
]

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})

export class ClientsComponent implements OnInit {
  newClient="";
  allCLients;
  errorMessage;
  isAuthorized = this.service.authorized;

  displayedColumns: string[] = ['name'];

  dataSource = ELEMENT_DATA;
  constructor( private changeDetectorRefs: ChangeDetectorRef,private service:RestApiServiceService,public dialog: MatDialog){}


  openDialog(clientName){
    const dialogRef = this.dialog.open(ClientDialogComponent);

    dialogRef.afterClosed().subscribe(data =>{
      if(data !== undefined){
        this.service.updateClientByName(clientName,data).subscribe(data =>{
          this.getAllClients();

        },error =>{
          this.service.openSnackBar(error.error,2000);
        });
      }
    });
  }
  
  ngOnInit(): void {
    this.getAllClients();
  }

  updateCLient(clientName){
   const newClientName = this.openDialog(clientName);
  }
  
  
  getAllClients(){
    if(this.service.authorized)
   this.service.getAllClients()
    .subscribe(data => {
     this.allCLients = data;
    },error =>{
    })
  }
  
  deleteClient(clientName){
    if(this.service.authorized)
    this.service.deleteClient(clientName).subscribe(data=>{
      this.getAllClients();
    })
  }

  addClient(){
    if(this.service.authorized)
    this.service.addClient(this.newClient).subscribe(data => {
      this.getAllClients();
     },error=>{
      this.service.openSnackBar(error.error,2000)
     })
  }
}
