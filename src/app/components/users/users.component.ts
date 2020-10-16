import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {UserDialogComponent} from '../dialogs/user-dialog/user-dialog.component';
import {User} from '../../models/User';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';
import {RealmService} from '../../services/realm-service/realm-service';
import {UserService} from '../../services/user-service/user-service';
import {SnackBarService} from '../../services/snack-bar/snack-bar-service';
import {ParentRealm, Realm} from '../../models/Realm';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns = ['username', 'role'];
  allUsers: User[];
  user: User;
  realm: Realm;

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
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    // @ts-ignore
    this.realmService.getRealm.subscribe((data: ParentRealm) => {
      this.allUsers = data.users;
    }, error => this.snackBar.openSnackBar(error.error.message, 4000));
  }

  onSubmit() {
    this.addUser(this.form.value);
  }

  updateUser(currentUserName: string) {

    const dialogRef = this.dialog.open(UserDialogComponent);
    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        this.user.username = data;
        this.userService.updateUserName(currentUserName, this.user, this.realm.name).subscribe(data => {
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
        this.userService.deleteUser(username, this.realm.name).subscribe(() => {
        }, error => {
          this.snackBar.openSnackBar(error.error.message, 2000);
        });
      }
    });
  }

  addUser(user: User) {
    let realm = localStorage.getItem('realm');

    this.userService.addUser(user, this.realm.name).subscribe(data => {
    }, error => {
      this.snackBar.openSnackBar(error.error.message, 3000);
    });
  }

  userRoles(user) {
    localStorage.setItem('currentUser', user.username);
    this.router.navigate(['home/users/roles']);
  }
}
