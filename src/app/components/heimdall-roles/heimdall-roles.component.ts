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
    this.getRealmRoles();
  }

  onSubmit() {
    this.addRole(this.form.value);
  }

  updateRole(currentRoleName: string) {
    const dialogRef = this.dialog.open(RolesDialogComponent);
    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        this.role.name = data;
        let realm = localStorage.getItem("realm")
        this.service.updateRoleByName(currentRoleName, this.role,realm).subscribe(() => {
          this.updateView();
        }, error => {
          this.snackBar.openSnackBar(error.error, 2000);
        });
      }
    });
  }

  updateView(){
    let realm = localStorage.getItem("realm")
    this.service.getAllRoles(realm).subscribe(data =>{
      this.allRoles = data
    })
  }

  getRealmRoles() {
   this.service.allRoles.subscribe(data =>{
     this.allRoles = data
   })
  }

  addRole(role: Role) {
    let realm = localStorage.getItem("realm")
    this.service.addRole(role,realm).subscribe(() => {
      this.updateView();
    }, error => {
      this.snackBar.openSnackBar(error.error.message, 2000);
    });
  }

  deleteRole(role) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(data => {
      if (data == 'true') {
        let realm = localStorage.getItem("realm")
        this.service.deleteRole(role,realm).subscribe(() => {
          this.updateView();
        }, error => {
          this.snackBar.openSnackBar(error.error.message, 4000);
        });
      }
    });
  }
}
