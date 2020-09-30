import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IRole, Role } from 'src/app/models/Role';
import { RestApiServiceService } from '../../services/restapiservice/rest-api-service.service';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { RolesDialogComponent } from '../dialogs/roles-dialog/roles-dialog.component';

@Component({
  selector: 'app-heimdall-roles',
  templateUrl: './heimdall-roles.component.html',
  styleUrls: ['./heimdall-roles.component.css']
})
export class HeimdallRolesComponent implements OnInit {
  displayedColumns: string[] = ['Roles'];
  allRoles: IRole[];
  role:Role;
  form = new FormGroup({
    role:new FormControl('',Validators.required)
  })

  constructor(private service: RestApiServiceService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllRoles();
  }

  onSubmit(){
    this.addRole(this.form.value.role)
  }

  updateRole(currentRoleName:string) {
    const dialogRef = this.dialog.open(RolesDialogComponent);
    dialogRef.afterClosed().subscribe(data => {
      this.role = new Role(data)
      if (data !== undefined) {
        this.service.updateRoleByName(currentRoleName,this.role).subscribe(data => {
          this.getAllRoles();
        }, error => {
          this.service.openSnackBar(error.error, 2000);
        });
      }
    });
  }
  
  getAllRoles() {
    this.service.getAllRoles().subscribe(data => {
      this.allRoles = data;
    })
  }

  addRole(roleName:string) {
    this.role = new Role(roleName)
    this.service.addRole(this.role).subscribe(data => {
      this.getAllRoles();
    }, error => {
      this.service.openSnackBar(error.error, 2000)
    });
  }

  deleteRole(role) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(data => {
      if (data == "true") {
        this.service.deleteRole(role).subscribe(data => {
          this.getAllRoles();
        },error=>{
          this.service.openSnackBar(error.error,4000);
        });
      }
    })
  }
}
