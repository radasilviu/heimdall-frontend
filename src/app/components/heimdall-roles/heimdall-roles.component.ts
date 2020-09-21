import { Component, OnInit } from '@angular/core';
import { RestApiServiceService } from '../../services/restapiservice/rest-api-service.service';

@Component({
  selector: 'app-heimdall-roles',
  templateUrl: './heimdall-roles.component.html',
  styleUrls: ['./heimdall-roles.component.css']
})
export class HeimdallRolesComponent implements OnInit {

  constructor(private service:RestApiServiceService) { }

  displayedColumns: string[] = [ 'Roles'];
  allRoles;
  newRole;
  ngOnInit(): void {
    this.getAllRoles();
  }

  getAllRoles(){
   this.service.getAllRoles().subscribe(data=>{
     this.allRoles = data;
   })
  }
  addRole(){
   this.service.addRole(this.newRole).subscribe(data =>{
     this.getAllRoles();
   });
  }

  deleteRole(role){
    this.service.deleteRole(role).subscribe(data =>{
      this.getAllRoles()
    });
  }

}
