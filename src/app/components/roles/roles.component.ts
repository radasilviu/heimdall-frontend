import { ChangeDetectorRef, SimpleChange, SimpleChanges } from '@angular/core';
import { Component, OnInit, OnChanges } from '@angular/core';
import { RestApiServiceService } from '../../services/restapiservice/rest-api-service.service';
import { RoleServiceService } from '../../services/roleservice/role-service.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  curentUser;
  userRoles;
  allRoles;
  client;
  id;

  displayedColumns: string[] = ['Roles'];
  constructor(private service: RestApiServiceService, private roleService: RoleServiceService, private cf: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getUserRoles();
    this.getAllRoles();
  }

  getUserRoles() {
    this.service.getUserByUsername(this.roleService.username).subscribe(data => {
      this.curentUser = data
      this.userRoles = this.curentUser.roles
    });
  }

  getAllRoles() {
    this.service.getAllRoles().subscribe(data => {
      this.allRoles = data
    })
  }

  addRole(role) {
    this.id = this.roleService.id;
    this.service.addUserRole(role, this.id).subscribe(data => {
      this.getUserRoles();
    });
  }

  deleteUserRole(role) {
    this.service.deleteUserRole(role, this.roleService.id).subscribe(data => {
      this.getUserRoles();
    });
  }
}
