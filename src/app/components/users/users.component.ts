import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {RestApiServiceService} from '../../services/restapiservice/rest-api-service.service';
import {UserDialogComponent} from '../dialogs/user-dialog/user-dialog.component';
import {User} from '../../models/User';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns = ['username', 'role'];
  allUsers: User[];
  user = <User>{}
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email)
  });

  constructor(private changeDetectorRefs: ChangeDetectorRef,
              private service: RestApiServiceService,
              public dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  onSubmit() {
    this.addUser(this.form.value);
  }

  updateUser(currentUserName: string) {
    const dialogRef = this.dialog.open(UserDialogComponent);
    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        this.user.username = data
        this.service.updateUserName(currentUserName, this.user).subscribe(data => {
          this.getAllUsers();
        }, error => {
          this.service.openSnackBar(error.error.message, 2000);
        });
      }
    });
  }

  deleteUser(username: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(data => {
      if (data == 'true') {
        this.service.deleteUser(username).subscribe(() => {
          this.getAllUsers();
        });
      }
    });
  }

  getAllUsers() {
    let clients = this.service.getAllUsers();
    clients.subscribe(data => {
      this.allUsers = data as User[];
    });
  }

  addUser(user: User) {
    this.service.addUser(user).subscribe(data => {
      this.getAllUsers();
    }, error => {
      this.service.openSnackBar(error.error.message, 3000);
    });
  }

  userRoles(user) {
    localStorage.setItem('currentUser', user.username);
    this.router.navigate(['home/users/roles']);
  }
}
