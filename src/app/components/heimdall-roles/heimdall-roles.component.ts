import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {Role} from 'src/app/models/Role';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';
import {RolesDialogComponent} from '../dialogs/roles-dialog/roles-dialog.component';
import {RoleService} from '../../services/role-service/role-service';
import {SnackBarService} from '../../services/snack-bar/snack-bar-service';
import {RealmService} from '../../services/realm-service/realm-service';
import {ParentRealm} from '../../models/Realm';

@Component({
  selector: 'app-heimdall-roles',
  templateUrl: './heimdall-roles.component.html',
  styleUrls: ['./heimdall-roles.component.css']
})
export class HeimdallRolesComponent implements OnInit {
  displayedColumns: string[] = ['Roles'];
  allRoles: Role[];
  realm;

  form = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  constructor(private service: RoleService,
              private snackBar: SnackBarService,
              private dialog: MatDialog,
              private roleService: RoleService,
              private realmService: RealmService) {
  }

  ngOnInit(): void {
    this.realmService.realm.subscribe((data: ParentRealm) => {
      this.allRoles = data.roles;
      this.realm = data.realm;
    });
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
        this.service.updateRoleByName(currentRoleName, role, this.realm.name).subscribe(() => {
          this.realmService.getRealmByName(this.realm.name).subscribe(data => {
            this.allRoles = data.roles;
            this.realmService.realm.next(data);

          });
        }, error => {
          this.snackBar.openSnackBar(error.error.message, 2000);
        });
      }
    });
  }

  addRole(role: Role) {
    this.service.addRole(role, this.realm.name).subscribe(() => {
      this.realmService.getRealmByName(this.realm.name).subscribe(data => {
        this.allRoles = data.roles;
        this.realmService.realm.next(data);

      });
    }, error => {
      this.snackBar.openSnackBar(error.error.message, 2000);
    });
  }

  deleteRole(role) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(data => {
      if (data == 'true') {
        this.service.deleteRole(role, this.realm.name).subscribe(() => {
          this.realmService.getRealmByName(this.realm.name).subscribe((data: ParentRealm) => {
            this.allRoles = data.roles;
            this.realmService.realm.next(data);
          });
        }, error => {
          this.snackBar.openSnackBar(error.error.message, 4000);
        });
      }
    });
  }
}
