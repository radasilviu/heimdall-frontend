import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/Client';
import { Role } from 'src/app/models/Role';
import { User } from 'src/app/models/User';
import { RestApiServiceService } from '../../services/restapiservice/rest-api-service.service';
import { RoleServiceService } from '../../services/roleservice/role-service.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  curentUser: User;
  allRoles: Role[];
  client: Client;
  currentUserRoles: Role[];
  id: string;

  displayedColumns: string[] = ['Roles'];

  constructor(private service: RestApiServiceService,
    private roleService: RoleServiceService,
    private router: Router) { }

  ngOnInit() {
    this.getAllRoles();
    this.getUserRoles();
  }
  back() {
    this.router.navigate(['home/users']);
  }

  getUserRoles() {
    this.service.getUserByUsername(this.roleService.user.username).subscribe(data => {
      this.currentUserRoles = data.roles;
    })
  }

  getAllRoles() {
    this.service.getAllRoles().subscribe(data => {
      this.curentUser = this.roleService.user;
      this.allRoles = data;
    })
  }

  addRole(role) {
    this.service.addUserRole(role, this.curentUser.username
    ).subscribe(data => {
      this.getUserRoles();
      this.getAllRoles();
    });
  }

  deleteUserRole(role) {
    this.service.deleteUserRole(role, this.curentUser.username).subscribe(data => {
      this.getUserRoles();
      this.getAllRoles();
    });
  }
}
