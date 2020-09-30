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
    let user = new User(this.form.value.username, this.form.value.password, this.form.value.email)
    this.addUser(user)
  }

  updateUser(currentUserName: string) {
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

  deleteUser(username: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(data => {
      if (data == "true") {
        this.service.deleteUser(username).subscribe(data => {
          this.getAllUsers();
        });
      }
    })
  }

  getAllUsers() {
    let clients = this.service.getAllUsers();
    clients.subscribe(data => {
      this.allUsers = data as User[]
    })
  }

  addUser(user: User) {
    this.isLoading = true;
    this.service.addUser(user).toPromise().then(data => {
      this.getAllUsers()
      this.isLoading = false;
    }).catch((error) => {
      this.isLoading = false
    })
  }

  userRoles(username: string) {
    this.roleService.setUserName(username)
    this.router.navigate(['home/users/roles']);
  }
}
