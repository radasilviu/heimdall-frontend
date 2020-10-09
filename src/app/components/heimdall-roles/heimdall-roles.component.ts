import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {Role} from 'src/app/models/Role';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';
import {RolesDialogComponent} from '../dialogs/roles-dialog/roles-dialog.component';
import {RoleServiceService} from '../../services/role-service/role-service.service';
import {SnackBarServiceService} from '../../services/snack-bar/snack-bar-service.service';

@Component({
  selector: 'app-heimdall-roles',
  templateUrl: './heimdall-roles.component.html',
  styleUrls: ['./heimdall-roles.component.css']
})
export class HeimdallRolesComponent implements OnInit {
  displayedColumns: string[] = ['Roles'];
  allRoles: Role[];
  role = <Role> {};
  form = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  constructor(private service: RoleServiceService,
              private snackBar: SnackBarServiceService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllRoles();
  }

  onSubmit() {
    this.addRole(this.form.value);
  }

  updateRole(currentRoleName: string) {
    const dialogRef = this.dialog.open(RolesDialogComponent);
    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        this.role.name = data;
        this.service.updateRoleByName(currentRoleName, this.role).subscribe(() => {
          this.getAllRoles();
        }, error => {
          this.snackBar.openSnackBar(error.error, 2000);
        });
      }
    });
  }

  getAllRoles() {
    this.service.getAllRoles().subscribe(data => {
      this.allRoles = data;
    });
  }

  addRole(role: Role) {
    this.service.addRole(role).subscribe(() => {
      this.getAllRoles();
    }, error => {
      console.log(error);
      this.snackBar.openSnackBar(error.error.message, 2000);
    });
  }

  deleteRole(role) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(data => {
      if (data == 'true') {
        this.service.deleteRole(role).subscribe(() => {
          this.getAllRoles();
        }, error => {
          this.snackBar.openSnackBar(error.error.message, 4000);
        });
      }
    });
  }
}
