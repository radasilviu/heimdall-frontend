import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RestApiServiceService } from '../../services/restapiservice/rest-api-service.service';
import { RoleServiceService } from '../../services/roleservice/role-service.service';
import { UserDialogComponent } from '../dialogs/user-dialog/user-dialog.component';

export interface User {
  username: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  isRoles = false;
  displayedColumns = ['username', 'role'];
  username = "";
  password = "";
  dataSource;


  constructor(private changeDetectorRefs: ChangeDetectorRef, private service: RestApiServiceService, private roleService: RoleServiceService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllUsers();
  }
  openDialog(username){
    const dialogRef = this.dialog.open(UserDialogComponent);
    dialogRef.afterClosed().subscribe(data =>{
      if(data !== undefined){
        this.service.updateUserName(username,data).subscribe(data =>{
          this.getAllUsers();

        },error =>{
          this.service.openSnackBar(error.error,2000);
        });
      }
    });
  }
  updateUser(username){
    this.openDialog(username)
  }

  getAllUsers() {
    
    let clients = this.service.getAllUsers();
    clients.subscribe(data => {
      this.dataSource = data as User[]
      for (let i in this.dataSource) {
        this.dataSource[i].Id = i;
      }
    })
  }

  viewRoles(username, id) {
    this.roleService.setusername(username)
    this.roleService.setId(id);
    this.isRoles = true;
  }

  goBack() {
    this.isRoles = false;
  }

  addUser() {
    this.service.addUser(this.username,this.password).subscribe(data => {
      this.getAllUsers();
    },error=>{
      this.service.openSnackBar(error.error,2000)
    });
  }
  
  deleteUser(username){
    this.service.deleteUser(username).subscribe(data =>{
      this.getAllUsers();
    });
  }
}
