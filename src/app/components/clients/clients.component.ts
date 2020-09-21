import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit ,ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { RestApiServiceService } from '../../services/restapiservice/rest-api-service.service';

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

  @ViewChild(MatTable) table: MatTable<any>;

  displayedColumns: string[] = ['name'];

  dataSource = ELEMENT_DATA;
  constructor( private changeDetectorRefs: ChangeDetectorRef,private service:RestApiServiceService){}

  ngOnInit(): void {
    this.getAllClients();
  }

  getAllClients(){
   this.service.getAllClients()
    .subscribe(data => {
     this.allCLients = data;
    })
  }
  deleteClient(clientName){
    this.service.deleteClient(clientName).subscribe(data=>{
      this.getAllClients();
    })
  }

  addClient(){
    this.service.addClient(this.newClient).subscribe(data => {
      this.getAllClients();
     })
  }
}
