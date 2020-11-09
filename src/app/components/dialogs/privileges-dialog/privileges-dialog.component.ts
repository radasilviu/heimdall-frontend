import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {PrivilegesService} from "../../../services/resources-service/privileges.service";
import {SubSink} from "subsink";

@Component({
  selector: 'app-resource-dialog',
  templateUrl: './privileges-dialog.component.html',
  styleUrls: ['./privileges-dialog.component.css']
})
export class PrivilegesDialogComponent implements OnInit {
  displayedColumns: string[] = ['Roles'];
  subSink = new SubSink();
  allPrivileges
  resourcePrivileges
  currentResourceName;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private privilegesService: PrivilegesService) {
  }

  ngOnInit(): void {
    this.currentResourceName = this.data.resource
    this.getAllPrivileges()
    this.getResourcePrivileges();
  }

  ngOnDestroy() {
    this.subSink
      .unsubscribe();
  }

  getAllPrivileges() {
    this.subSink.add(this.privilegesService
      .getAllPrivileges()
      .subscribe(data => {
        this.allPrivileges = data
      }))
  }

  getResourcePrivileges() {
    this.subSink.add(this.privilegesService
      .getResourcePrivileges(this.data.realm, this.data.role.name, this.data.resource)
      .subscribe(data => {
        this.resourcePrivileges = data
      }))
  }

  addPrivilegeToResource(privilege) {
    this.subSink.add(this.privilegesService
      .addPrivilegeToResource(this.data.resource, privilege.name, this.data.role)
      .subscribe(() => {
        this.getResourcePrivileges()
      }))
  }

  deletePrivilegeFromResource(privilege) {
    this.subSink.add(this.privilegesService
      .deletePrivilegeFromResource(this.data.resource, privilege.name, this.data.role)
      .subscribe(() => {
        this.getResourcePrivileges()
      }))
  }
}
