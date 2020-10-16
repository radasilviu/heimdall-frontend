import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {UserDialogComponent} from '../dialogs/user-dialog/user-dialog.component';
import {User} from '../../models/User';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';
import {RealmService} from '../../services/realm-service/realm-service';
import {UserService} from '../../services/user-service/user-service';
import {SnackBarService} from '../../services/snack-bar/snack-bar-service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns = ['username', 'role'];
  allUsers: User[];
  user: User;
  private subscription: Subscription;

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email)
  });

  constructor(private changeDetectorRefs: ChangeDetectorRef,
              private dialog: MatDialog,
              private realmService: RealmService,
              private userService: UserService,
              private snackBar: SnackBarService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.subscription = this.userService.users.subscribe(() => {
      this.getAllUsers();
    }, error => this.snackBar.openSnackBar(error.error.message, 4000));
    this.getAllUsers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getAllUsers() {
    let realm = localStorage.getItem('realm');
    this.userService.getAllUsers(JSON.parse(realm).name).subscribe((data: User[]) => {
      this.allUsers = data;
    }, error => this.snackBar.openSnackBar(error.error.message, 4000));
  }

  onSubmit() {
    this.addUser(this.form.value);
  }

  updateUser(currentUserName: string) {
    let realm = localStorage.getItem('realm');

    const dialogRef = this.dialog.open(UserDialogComponent);
    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        this.user.username = data;
        this.userService.updateUserName(currentUserName, this.user, JSON.parse(realm).name).subscribe(data => {
        }, error => {
          this.snackBar.openSnackBar(error.error.message, 2000);
        });
      }
    }, error => this.snackBar.openSnackBar(error.error.message, 4000));
  }


  deleteUser(username: string) {
    let realm = localStorage.getItem('realm');

    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(data => {
      if (data == 'true') {
        this.userService.deleteUser(username, JSON.parse(realm).name).subscribe(() => {
        }, error => {
          this.snackBar.openSnackBar(error.error.message, 2000);
        });
      }
    });
  }

  addUser(user: User) {
    let realm = localStorage.getItem('realm');

    this.userService.addUser(user, JSON.parse(realm).name).subscribe(data => {
    }, error => {
      this.snackBar.openSnackBar(error.error.message, 3000);
    });
  }

  userRoles(user) {
    localStorage.setItem('currentUser', user.username);
    this.router.navigate(['home/users/roles']);
  }
}
