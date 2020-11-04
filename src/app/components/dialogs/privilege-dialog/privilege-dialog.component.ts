import {Component, OnInit} from '@angular/core';
import {ResourcesService} from "../../../services/resources-service/resources.service";
import {RoleService} from "../../../services/role-service/role-service";

@Component({
  selector: 'app-privilege-dialog',
  templateUrl: './privilege-dialog.component.html',
  styleUrls: ['./privilege-dialog.component.css']
})
export class PrivilegeDialogComponent implements OnInit {
  displayedColumns: string[] = ['Resources'];
  allPrivileges;
  resourcePrivilege;
  resourceName;
  role;

  constructor(private resourceService: ResourcesService,
              private roleService: RoleService) {
  }

  ngOnInit(): void {
    this.getAllPrivilege()
    this.getResourcePrivilege()
    this.getRoleByName()
  }

  getResourcePrivilege() {
    this.resourceService
      .getResourcePrivilege()
      .subscribe(data => {
        this.resourcePrivilege = data
      })
  }

  getAllPrivilege() {
    this.resourceService
      .getAllPrivilege()
      .subscribe(data => {
        this.allPrivileges = data
      })
  }

  getRoleByName() {
    this.roleService
      .getRoleByName()
      .subscribe(data => {
        this.role = data
      })
  }

  removePrivilegeFromResource(privilegeName) {
    this.resourceService
      .removePrivilegeFromResource(privilegeName, this.role)
      .subscribe(() => this.getResourcePrivilege())
  }

  addPrivilegeToResource(privilegeName) {
    this.resourceService
      .addPrivilegeToRole(privilegeName, this.role)
      .subscribe(() => this.getResourcePrivilege())
  }
}
