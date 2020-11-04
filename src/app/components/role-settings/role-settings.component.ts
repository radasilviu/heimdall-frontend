import {Component, OnInit} from '@angular/core';
import {RealmService} from "../../services/realm-service/realm-service";
import {ResourcesService} from "../../services/resources-service/resources.service";
import {RoleService} from "../../services/role-service/role-service";
import {Client} from "../../models/Client";
import {MatDialog} from "@angular/material/dialog";
import {SubSink} from "subsink";
import {ResourceDialogComponent} from "../dialogs/resource-dialog/resource-dialog.component";
import {PrivilegeDialogComponent} from "../dialogs/privilege-dialog/privilege-dialog.component";

@Component({
  selector: 'app-role-settings',
  templateUrl: './role-settings.component.html',
  styleUrls: ['./role-settings.component.css']
})
export class RoleSettingsComponent implements OnInit {
  displayedColumns: string[] = ['Resources'];
  role;
  allResources;
  realm;
  subSink = new SubSink()

  constructor(private realmService: RealmService,
              private resourceService: ResourcesService,
              private dialog: MatDialog,
              private roleService: RoleService) {

  }

  getAllResources() {
    this.resourceService.getAllResources(this.role.name).subscribe(data => {
      this.allResources = data
    })
  }

  getRoleByName() {
    let roleName = localStorage.getItem("currentRoleName")
    this.roleService.getRoleByName(this.realm.name, roleName).subscribe(data => {
      this.role = data
      this.getAllResources()
    })
  }

  ngOnInit(): void {
    this.realmService.currentRealm.subscribe(realm => {
      this.realm = realm
      this.getRoleByName()
    })
  }

  addResourceToRole(resources) {
    this.resourceService.addResourceToRole(resources.name, this.role).subscribe(() => {
      this.getRoleByName()
    })
  }

  deleteRoleResource(resources) {
    this.resourceService.deleteRoleResource(resources.name, this.role).subscribe(() => {
      this.getRoleByName()
    })
  }
  deleteResource(resourceName){
    this.resourceService.deleteResource(resourceName).subscribe(() =>{
      this.getAllResources()
    })
  }

  addNewResource() {
    const dialogRef = this.dialog
      .open(ResourceDialogComponent, {
        data: {edit: true}
      });

    dialogRef.afterClosed()
      .subscribe((data: Client) => {
        if (data !== undefined) {
          this.resourceService.addNewResource(data).subscribe(() => {
            this.getAllResources()
          })
        }
      });
  }

  privilege(resources){
    localStorage.setItem("resource",resources.name)
    const dialogRef = this.dialog
      .open(PrivilegeDialogComponent, {
        width:"30vw",
        data: {edit: true}
      });

    dialogRef.afterClosed()
      .subscribe((data: Client) => {
        if (data !== undefined) {
          this.resourceService.addNewResource(data).subscribe(() => {
            this.getAllResources()
          })
        }
      });
  }

}
