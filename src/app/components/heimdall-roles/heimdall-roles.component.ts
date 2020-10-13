import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {Role} from 'src/app/models/Role';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';
import {RolesDialogComponent} from '../dialogs/roles-dialog/roles-dialog.component';
import {RoleService} from '../../services/role-service/role-service';
import {SnackBarService} from '../../services/snack-bar/snack-bar-service';
import {RoleServiceService} from '../../services/role-service/role-service.service';
import {SnackBarServiceService} from '../../services/snack-bar/snack-bar-service.service';
import {RealmServiceService} from '../../services/realm-service/realm-service.service';
import {Realm} from '../../models/Realm';

@Component({
  selector: 'app-heimdall-roles',
  templateUrl: './heimdall-roles.component.html',
  styleUrls: ['./heimdall-roles.component.css']
})
export class HeimdallRolesComponent implements OnInit {
  displayedColumns: string[] = ['Roles'];
  allRoles: Role[];
  role = <Role> {};
  realm:Realm;
  form = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  constructor(private service: RoleServiceService,
              private snackBar: SnackBarServiceService,
              public dialog: MatDialog,
              private realmService: RealmServiceService) {
  }

  ngOnInit(): void {

    this.realmService.currentRealm.subscribe((data: Realm) => {
      this.realm = data;
      this.service.pageRefresh.subscribe(()=>{
        this.getAllRoles();
      })
      this.getAllRoles();
    });
  }

  getAllRoles(){
    this.service.getAllRoles(this.realm.name).subscribe(data => {
      this.allRoles = data;
    });
  }

  onSubmit() {
    this.addRole(this.form.value);
  }

  updateRole(currentRoleName: string) {
    const dialogRef = this.dialog.open(RolesDialogComponent);
    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        this.role.name = data;
        this.service.updateRoleByName(currentRoleName, this.role, realm).subscribe(() => {
        }, error => {
          this.snackBar.openSnackBar(error.error, 2000);
        });
      }
    });
  }

  addRole(role: Role) {
    this.service.addRole(role, this.realm.name).subscribe(() => {
    }, error => {
      this.snackBar.openSnackBar(error.error.message, 2000);
    });
  }

  deleteRole(role) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(data => {
      if (data == 'true') {
        this.service.deleteRole(role, this.realm.name).subscribe(() => {
        }, error => {
          this.snackBar.openSnackBar(error.error.message, 4000);
        });
      }
    });
  }
}
