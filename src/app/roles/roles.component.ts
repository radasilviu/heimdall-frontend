import { Component, OnInit } from '@angular/core';
import { RestApiServiceService } from '../restapiservice/rest-api-service.service';
import { RoleServiceService } from '../role-service.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  
  userRoles = [];
  allRoles= [];
  client;
  id;

  constructor(private service:RestApiServiceService,private roleService : RoleServiceService) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllRoles();
  }

  getAllUsers(){
    this.service.getAllUsers().subscribe(data =>{
      for(let i in data){
        if(data[i].username === this.roleService.username){
          this.userRoles = data[i].roles    
        }
      }
    })
  }

  getAllRoles(){
    this.service.getAllRoles().subscribe(data=>{
      for(let role in data){
        this.allRoles.push(data[role])
      }
    })
  }
  addRole(role){
    this.id = this.roleService.id;
    console.log(this.id)
    console.log(role)
    this.service.addRole(role,this.id).subscribe();
  }

  deleteUserRole(role){
    console.log(role)
    console.log(this.roleService.id);

    this.service.deleteUserRole(role,this.roleService.id).subscribe();

  }

}
