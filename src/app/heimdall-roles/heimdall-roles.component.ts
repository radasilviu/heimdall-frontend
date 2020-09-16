import { Component, OnInit } from '@angular/core';
import { RestApiServiceService } from '../restapiservice/rest-api-service.service';

@Component({
  selector: 'app-heimdall-roles',
  templateUrl: './heimdall-roles.component.html',
  styleUrls: ['./heimdall-roles.component.css']
})
export class HeimdallRolesComponent implements OnInit {

  constructor(private service:RestApiServiceService) { }
  allRoles=[];
  newRole=""
  ngOnInit(): void {
    this.getAllRoles();
  }

  getAllRoles(){
    this.service.getAllRoles().subscribe(data=>{
      for(let role in data){
        this.allRoles.push(data[role])
      }
    })
  }
  addRole(){
    this.service.addRole(this.newRole).subscribe();
  }

}
