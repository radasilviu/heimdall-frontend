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
    const realm = JSON.parse(localStorage.getItem("realm"))
    const roleName = localStorage.getItem("currentRoleName")
    const resourceName = localStorage.getItem("resource")
    this.resourceName = resourceName;

    this.resourceService.getResourcePrivilege(realm.name, roleName, resourceName).subscribe(data => {
      this.resourcePrivilege = data
    })
  }

  getAllPrivilege() {
    this.resourceService.getAllPrivilege().subscribe(data => {
      this.allPrivileges = data
    })
  }
  getRoleByName(){
    const roleName = localStorage.getItem("currentRoleName")
    const realm = JSON.parse(localStorage.getItem("realm"))
    this.roleService.getRoleByName(realm.name, roleName).subscribe(data => {
      this.role =data
    })
  }

  removePrivilegeFromResource(privilegeName) {
    this.resourceService.removePrivilegeFromResource(this.resourceName, privilegeName, this.role).subscribe(() => this.getResourcePrivilege())
  }
  addPrivilegeToResource(privilegeName){
  this.resourceService.addPrivilegeToRole(this.resourceName,privilegeName,this.role).subscribe(() => this.getResourcePrivilege())
  }
}
