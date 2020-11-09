import {Component, OnInit} from '@angular/core';
import {RoleService} from "../../../services/role-service/role-service";
import {ResourcesService} from "../../../services/resources-service/resources.service";
import {MatDialog} from "@angular/material/dialog";
import {RolesDialogComponent} from "../../dialogs/roles-dialog/roles-dialog.component";
import {PrivilegesDialogComponent} from "../../dialogs/privileges-dialog/privileges-dialog.component";
import {Router} from "@angular/router";
import {SubSink} from "subsink";

@Component({
  selector: 'app-role-settings',
  templateUrl: './role-settings.component.html',
  styleUrls: ['./role-settings.component.css']
})
export class RoleSettingsComponent implements OnInit {
  currentRole;
  realm;
  roleResources;
  allResource;
  subSink = new SubSink()
  displayedColumns: string[] = ['Roles'];

  constructor(
    private resourceService: ResourcesService,
    private dialog: MatDialog,
    private router: Router,
    private roleService: RoleService,
  ) {
  }

  ngOnInit(): void {
    this.getCurrentRole();
    this.getAllResources()
  }

  ngOnDestroy() {
    this.subSink
      .unsubscribe()
  }

  getCurrentRole() {
    let role = JSON
      .parse(localStorage
        .getItem("currentRole"));

    this.subSink
      .add(this.roleService.getRoleByName(role.realm.name, role.name)
        .subscribe(() => {
          this.setCurrentRole()
        }))
  }

  setCurrentRole() {
    this.subSink
      .add(this.roleService.role.subscribe(role => {
        this.currentRole = role
        this.realm = this.currentRole.realm
        this.roleResources = this.currentRole.roleResources
      }))
  }

  getAllResources() {
    this.subSink
      .add(this.resourceService
        .getAllResources()
        .subscribe(data =>
          this.allResource = data))
  }

  deleteRoleResource(resourceName) {
    this.subSink
      .add(this.resourceService
        .deleteRoleResource(resourceName, this.currentRole)
        .subscribe(() => {
          this.getCurrentRole()
        }))
  }

  addRoleResource(resourceName) {
    this.subSink.add(this.resourceService.addRoleResource(resourceName, this.currentRole).subscribe(() => {
      this.getCurrentRole()
    }))
  }

  removeResource(resourceName) {
    this.subSink
      .add(this.resourceService
        .deleteResource(resourceName)
        .subscribe(() => {
          this.getAllResources()
          this.getCurrentRole()
        }))
  }

  updateRoleName() {
    const dialogRef = this.dialog
      .open(RolesDialogComponent, {
        data: {edit: true}
      });

    dialogRef.afterClosed()
      .subscribe(data => {
        if (data !== undefined) {
          this.subSink
            .add(this.roleService
              .updateRoleByName(this.currentRole.name, data, this.currentRole.realm.name)
              .subscribe(() => {
                this.currentRole.name = data.name
                localStorage.setItem("currentRole", JSON.stringify(this.currentRole))
                this.getCurrentRole();
              }))
        }
      });
  }

  updateResourceName(resource) {
    const dialogRef = this.dialog
      .open(RolesDialogComponent, {
        data: {edit: true}
      });

    dialogRef.afterClosed()
      .subscribe(data => {
        if (data !== undefined) {
          this.subSink
            .add(this.resourceService.updateResourceByName(resource.name, data.name)
              .subscribe(() => {
                this.getAllResources()
                this.getCurrentRole()
              }))
        }
      });
  }

  managePrivileges(resource) {
    localStorage.setItem("currentResource", JSON.stringify(resource))
    const dialogRef = this.dialog
      .open(PrivilegesDialogComponent, {
        data: {
          resource: resource.name,
          realm: this.currentRole.realm.name,
          role: this.currentRole
        }
      });

    dialogRef.afterClosed()
      .subscribe(data => {
        if (data !== undefined) {
          this.getAllResources()
          this.getCurrentRole()
        }
      });
  }
}
