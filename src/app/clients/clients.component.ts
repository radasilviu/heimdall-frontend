import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit ,ViewChild} from '@angular/core';
import {MatTable} from '@angular/material/table';
import { RestApiServiceService } from '../restapiservice/rest-api-service.service';

export interface Client {
  name: string;
  id: any;
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

  @ViewChild(MatTable) table: MatTable<any>;

  displayedColumns: string[] = ['id', 'name'];



  dataSource = ELEMENT_DATA;
  constructor( private changeDetectorRefs: ChangeDetectorRef,private service:RestApiServiceService){}

  

  ngOnInit(): void {
    this.getAllClients();
  }
  getAllClients(){
    let clients = this.service.getAllClients();
    clients.subscribe(data => {
      this.dataSource = data as Client[]
      for(let i in this.dataSource){
        this.dataSource[i].id = i;
      }
    }
      )
    this.table.renderRows();
  }

  addClient(){
    this.service.addClient(this.newClient).subscribe();
    this.table.renderRows();
  }

}
