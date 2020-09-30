import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RestApiServiceService } from '../../services/restapiservice/rest-api-service.service';
import { RoleServiceService } from '../../services/roleservice/role-service.service';
import { UserDialogComponent } from '../dialogs/user-dialog/user-dialog.component';
import { User } from '../../models/User';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns = ['username', 'role'];
  allUsers: User[];
  user: User;
  isLoading: boolean = false;
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email)

  })


  constructor(private changeDetectorRefs: ChangeDetectorRef,
    private service: RestApiServiceService,
    private roleService: RoleServiceService,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  onSubmit() {
    this.addUser(this.form.value.username, this.form.value.password, this.form.value.email)
  }


  updateUserDialog(currentUserName: string) {
    const dialogRef = this.dialog.open(UserDialogComponent);
    dialogRef.afterClosed().subscribe(data => {
      let user = new User(data)
      if (data !== undefined) {
        this.service.updateUserName(currentUserName, user).subscribe(data => {
          this.getAllUsers();
        }, error => {
          this.service.openSnackBar(error.error, 2000);
        });
      }
    });
  }
  deleteUserDialog(username:string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(data => {
      if (data == "true") {
        this.service.deleteUser(username).subscribe(data => {
          this.getAllUsers();
        });
      }
      else {
        console.log("nu")
      }
    })
  }

  updateUser(currentUserName: string) {
    this.updateUserDialog(currentUserName)
  }

  getAllUsers() {
    let clients = this.service.getAllUsers();
    clients.subscribe(data => {
      this.allUsers = data as User[]
    })
  }

  addUser(username: string, password: string, email: string) {
    let user = new User(username, password, email)
    this.isLoading = true;
    this.service.addUser(user).toPromise().then(data => {
      this.isLoading = false
    })
      .catch((err) => {
        this.service.openSnackBar(err.error, 1500);
      })
  }



  deleteUser(username: string) {
    this.deleteUserDialog(username);

  }

  userRoles(user: string) {
    this.roleService.setUserName(user)
    this.router.navigate(['home/users/roles']);
  }
}
