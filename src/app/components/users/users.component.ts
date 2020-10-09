import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {UserDialogComponent} from '../dialogs/user-dialog/user-dialog.component';
import {User} from '../../models/User';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';
import {UserServiceService} from '../../services/user-service/user-service.service';
import {SnackBarServiceService} from '../../services/snack-bar/snack-bar-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns = ['username', 'role'];
  allUsers;
  user = <User> {};
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email)
  });

  constructor(private changeDetectorRefs: ChangeDetectorRef,
              private dialog: MatDialog,
              private userService: UserServiceService,
              private snackBar: SnackBarServiceService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  onSubmit() {
    this.addUser(this.form.value);
  }


  updateView() {
    let realm = localStorage.getItem('realm');
    this.userService.getAllUsers(realm).subscribe(data => {
      this.allUsers = data;
    });
  }

  getUsers() {
    this.userService.allUsers.subscribe(data => {
      this.allUsers = data;
    });
  }


  updateUser(currentUserName: string) {
    let realm = localStorage.getItem("realm")
    const dialogRef = this.dialog.open(UserDialogComponent);
    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        this.user.username = data;
        this.userService.updateUserName(currentUserName, this.user,realm).subscribe(data => {
          this.updateView();
        }, error => {
          this.snackBar.openSnackBar(error.error.message, 2000);
        });
      }
    });
  }

  deleteUser(username: string) {
    let realm = localStorage.getItem('realm');
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(data => {
      if (data == 'true') {
        this.userService.deleteUser(username, realm).subscribe(() => {
          this.updateView();
        });
      }
    });
  }


  addUser(user: User) {
    let realm = localStorage.getItem('realm');

    this.userService.addUser(user, realm).subscribe(data => {
      this.updateView();
    }, error => {
      this.snackBar.openSnackBar(error.error.message, 3000);
    });
  }

  userRoles(user) {
    localStorage.setItem('currentUser', user.username);
    this.router.navigate(['home/users/roles']);
  }
}
