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
  allUsers:User[];
  user:User;


  constructor(private changeDetectorRefs: ChangeDetectorRef,
    private service: RestApiServiceService,
    private roleService: RoleServiceService,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  openDialog(currentUserName:string) {
    const dialogRef = this.dialog.open(UserDialogComponent);
    dialogRef.afterClosed().subscribe(data => {
      this.user = new User(data)
      if (data !== undefined) {
        this.service.updateUserName(currentUserName, this.user).subscribe(data => {
          this.getAllUsers();
        }, error => {
          this.service.openSnackBar(error.error, 2000);
        });
      }
    });
  }
  updateUser(currentUserName:string) {
    this.openDialog(currentUserName)
  }

  getAllUsers() {
    let clients = this.service.getAllUsers();
    clients.subscribe(data => {
      this.allUsers = data as User[]
    })
  }

  addUser(username:string,password:string) {
    this.user = new User(username,password)
    this.service.addUser(this.user).subscribe(data => {
      this.getAllUsers();
    }, error => {
      this.service.openSnackBar(error.error, 2000)
    });
  }

  deleteUser(username:string) {
    this.service.deleteUser(username).subscribe(data => {
      this.getAllUsers();
    });
  }

  userRoles(user:string) {
    this.roleService.setusername(user)
    this.router.navigate(['home/users/roles']);
  }
}
