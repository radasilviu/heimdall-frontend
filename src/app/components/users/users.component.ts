import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RestApiServiceService } from '../../services/restapiservice/rest-api-service.service';
import { RoleServiceService } from '../../services/roleservice/role-service.service';
import { UserDialogComponent } from '../dialogs/user-dialog/user-dialog.component';
import {User} from '../../models/User';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns = ['username', 'role'];
  username:string;
  password:string
  allUsers:User[];


  constructor(private changeDetectorRefs: ChangeDetectorRef,
    private service: RestApiServiceService,
    private roleService: RoleServiceService,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  openDialog(username) {
    const dialogRef = this.dialog.open(UserDialogComponent);
    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        this.service.updateUserName(username, data).subscribe(data => {
          this.getAllUsers();
        }, error => {
          this.service.openSnackBar(error.error, 2000);
        });
      }
    });
  }
  updateUser(username) {
    this.openDialog(username)
  }

  getAllUsers() {
    let clients = this.service.getAllUsers();
    clients.subscribe(data => {
      this.allUsers = data as User[]
    })
  }

  addUser() {
    this.service.addUser(this.username, this.password).subscribe(data => {
      this.getAllUsers();
    }, error => {
      this.service.openSnackBar(error.error, 2000)
    });
  }

  deleteUser(username) {
    this.service.deleteUser(username).subscribe(data => {
      this.getAllUsers();
    });
  }

  userRoles(user) {
    this.roleService.setusername(user)
    this.router.navigate(['home/users/roles']);
  }
}
