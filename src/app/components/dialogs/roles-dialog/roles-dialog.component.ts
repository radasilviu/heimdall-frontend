import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ResourcesService} from "../../../services/resources-service/resources.service";
import {RoleService} from "../../../services/role-service/role-service";
import {FormControl, FormGroup} from "@angular/forms";
import {Role} from "../../../models/Role";

@Component({
  selector: 'app-roles-dialog',
  templateUrl: './roles-dialog.component.html',
  styleUrls: ['./roles-dialog.component.css']
})
export class RolesDialogComponent implements OnInit {
  allResources;
  displayedColumns: string[] = ['Roles'];
  resources;


  roleFrom = new FormGroup({
    newRole: new FormControl(),
  })

  constructor(
    private resourcesService: ResourcesService,
    private roleService: RoleService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit() {
    this.resources = this.data.role.roleResources
    this.resourcesService.getAllResources(this.data.role).subscribe(data => {

      this.data.role.realm.name
      this.allResources = data
    })
  }

  addResource(resource) {
    this.resourcesService.addResourceToRole(resource.name, this.data.role).subscribe(() => {
      this.roleService.getRoleByName(this.data.role.realm.name, this.data.role.name).subscribe((data: Role) => this.resources = data.roleResources)
    })
  }

  deleteResource(resource) {
    this.resourcesService.deleteResource(resource.name, this.data.role).subscribe(() => {
      this.roleService.getRoleByName(this.data.role.realm.name, this.data.role.name).subscribe((data: Role) => this.resources = data.roleResources)
    })
  }

}
