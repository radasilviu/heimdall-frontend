import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RoleService} from "../../../services/role-service/role-service";
import {ResourcesService} from "../../../services/resources-service/resources.service";
import {MatDialog} from "@angular/material/dialog";
import {RolesDialogComponent} from "../../dialogs/roles-dialog/roles-dialog.component";
import {PrivilegesDialogComponent} from "../../dialogs/privileges-dialog/privileges-dialog.component";
import {Router} from "@angular/router";
import {SubSink} from "subsink";
import {Role} from "../../../models/Role";

@Component({
  selector: 'app-role-settings',
  templateUrl: './role-settings.component.html',
  styleUrls: ['./role-settings.component.css']
})
export class RoleSettingsComponent implements OnInit {
  @Output() message = new EventEmitter();
  @Input() role: Role;
  subSink = new SubSink()
  edit = false;
  isCreate = false;
  allResource;
  displayedColumns: string[] = ['Roles'];

  constructor(
    private resourceService: ResourcesService,
    private dialog: MatDialog,
    private router: Router,
    private roleService: RoleService,
  ) {
  }

  ngOnInit(): void {
    this.getAllResources()
  }

  ngOnDestroy() {
    this.subSink
      .unsubscribe()
  }

  createNewResource() {
    this.isCreate = true
  }

  getRoleResources() {
    this.resourceService.getRoleResource(this.role.realm.name, this.role.name).subscribe(data => {
      this.role.roleResources = data
    })
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
        .deleteRoleResource(resourceName, this.role)
        .subscribe(() => {
          this.getRoleResources()
        }))
  }

  addRoleResource(resourceName) {
    this.subSink.add(this.resourceService.addRoleResource(resourceName, this.role).subscribe(() => {
      this.getRoleResources()
    }))
  }

  removeResource(resourceName) {
    this.subSink
      .add(this.resourceService
        .deleteResource(resourceName)
        .subscribe(() => {
          this.getAllResources()
          this.getRoleResources()
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
              .updateRoleByName(this.role.name, data, this.role.realm.name)
              .subscribe(() => {
                this.role.name = data.name
              }))
        }
      });
  }

  receiveMessage($event) {
    this.isCreate = $event
    this.getAllResources()
  }

  back() {
    this.message.emit(this.edit)
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
                this.getRoleResources()
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
          realm: this.role.realm.name,
          role: this.role
        }
      });

    dialogRef.afterClosed()
      .subscribe(data => {
        if (data !== undefined) {
          this.getAllResources()
        }
      });
  }
}
