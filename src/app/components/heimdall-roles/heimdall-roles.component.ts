import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {Role} from 'src/app/models/Role';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';
import {RolesDialogComponent} from '../dialogs/roles-dialog/roles-dialog.component';
import {RoleService} from '../../services/role-service/role-service';
import {RealmService} from '../../services/realm-service/realm-service';
import {SubSink} from 'subsink';
import {Realm} from '../../models/Realm';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-heimdall-roles',
  templateUrl: './heimdall-roles.component.html',
  styleUrls: ['./heimdall-roles.component.css']
})
export class HeimdallRolesComponent implements OnInit {
  displayedColumns: string[] = ['Roles'];
  allRoles = this.roleService.roles;
  realm: Realm;
  subSink = new SubSink();

  form = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  constructor(private service: RoleService,
              private dialog: MatDialog,
              private roleService: RoleService,
              private realmService: RealmService) {
  }

  ngOnInit(): void {
    this.subSink.add(this.realmService.realm.pipe(tap((realm: Realm) => {
      this.realm = realm;
      this.getAllRoles();
    })).subscribe());
  }

  getAllRoles() {
    return this.subSink.add(this.roleService.getAllRoles(this.realm.name).pipe(tap(roles => this.roleService.setRoles(roles))).subscribe());
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  onSubmit() {
    this.addRole(this.form.value);
  }

  updateRole(currentRoleName: string) {
    const dialogRef = this.dialog.open(RolesDialogComponent);

    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        let role = {} as Role;
        role.name = data;
        this.subSink.add(this.service.updateRoleByName(currentRoleName, role, this.realm.name).pipe(tap(() => this.getAllRoles())).subscribe());
      }
    });
  }

  addRole(role: Role) {
    this.subSink.add(this.service.addRole(role, this.realm.name).pipe(tap(() => this.getAllRoles())).subscribe());
  }

  deleteRole(role) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(data => {
      if (data == 'true') {
        this.subSink.add(this.service.deleteRole(role, this.realm.name).pipe(tap(() => this.getAllRoles())).subscribe());
      }
    });
  }
}
