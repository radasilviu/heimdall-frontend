import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RestApiServiceService } from '../../services/restapiservice/rest-api-service.service';
import { RolesDialogComponent } from '../dialogs/roles-dialog/roles-dialog.component';

@Component({
  selector: 'app-heimdall-roles',
  templateUrl: './heimdall-roles.component.html',
  styleUrls: ['./heimdall-roles.component.css']
})
export class HeimdallRolesComponent implements OnInit {

  constructor(private service:RestApiServiceService,
              public dialog: MatDialog) { }

  displayedColumns: string[] = [ 'Roles'];
  allRoles;
  newRole="";
  isAuthorized = this.service.authorized;
  
  ngOnInit(): void {
    this.getAllRoles();
  }


  openDialog(username){
    const dialogRef = this.dialog.open(RolesDialogComponent);
    dialogRef.afterClosed().subscribe(data =>{

      if(data !== undefined){
        this.service.updateRoleByName(username,data).subscribe(data =>{
          this.getAllRoles();
        },error =>{
          this.service.openSnackBar(error.error,2000);
        });
      }
    });
  }

  updateRole(name){
    this.openDialog(name);
  }

  getAllRoles(){
    if(this.service.authorized)
   this.service.getAllRoles().subscribe(data=>{
     this.allRoles = data;
   })
  }
  
  addRole(){
    if(this.service.authorized)
   this.service.addRole(this.newRole).subscribe(data =>{
     this.getAllRoles();
   },error=>{
     this.service.openSnackBar(error.error,2000)
   });
  }

  deleteRole(role){
    if(this.service.authorized)
    this.service.deleteRole(role).subscribe(data =>{
      this.getAllRoles()
    },error=>{
      this.service.openSnackBar(error.error,6000)
    });
  }

}
