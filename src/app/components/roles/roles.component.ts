import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IClient } from 'src/app/models/Client';
import { IRole } from 'src/app/models/Role';
import { IUser } from 'src/app/models/User';
import { RestApiServiceService } from '../../services/restapiservice/rest-api-service.service';
import { RoleServiceService } from '../../services/roleservice/role-service.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  currentUser: IUser;
  allRoles: IRole[];
  userRoles: IRole[];
  role:IRole;
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
      this.userRoles = data.roles;
    })
  }

  getAllRoles() {
    this.service.getAllRoles().subscribe(data => {
      this.currentUser = this.roleService.user;
      this.allRoles = data;
    })
  }

  addRole(role:string) {
    this.service.addUserRole(role, this.currentUser.username
    ).subscribe(data => {
      this.getUserRoles();
      this.getAllRoles();
    });
  }

  deleteUserRole(role:string) {
    this.service.deleteUserRole(this.currentUser.username,role).subscribe(data => {
      this.getUserRoles();
      this.getAllRoles();
    });
  }
}
