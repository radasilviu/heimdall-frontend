import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {UserDialogComponent} from '../dialogs/user-dialog/user-dialog.component';
import {User} from '../../models/User';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';
import {RealmService} from '../../services/realm-service/realm-service';
import {UserService} from '../../services/user-service/user-service';
import {SubSink} from 'subsink';
import {Realm} from '../../models/Realm';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns = ['username', 'role'];
  allUsers;
  user: User;
  realm: Realm;
  subSink = new SubSink();

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email)
  });

  constructor(private changeDetectorRefs: ChangeDetectorRef,
              private dialog: MatDialog,
              private realmService: RealmService,
              private userService: UserService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.subSink
      .add(this.realmService
        .currentRealm
        .subscribe((realm: Realm) => {
          this.realm = realm;
          this.getAlUsers();
        }));
  }

  getAlUsers() {
    this.subSink
      .add(this.userService
        .getAllUsers(this.realm.name)
        .subscribe(users => this.allUsers = users));
  }

  ngOnDestroy() {
    this.subSink
      .unsubscribe();
  }

  onSubmit() {
    this.addUser(this.form.value);
  }

  updateUser(currentUserName: string) {
    const dialogRef = this.dialog
      .open(UserDialogComponent);

    this.subSink
      .add(dialogRef.afterClosed()
        .subscribe(data => {
          if (data !== undefined) {
            let user = {} as User;
            user.username = data;
            this.subSink
              .add(this.userService
                .updateUserName(currentUserName, user, this.realm.name)
                .subscribe(() => this.getAlUsers()));
          }
        }));
  }

  deleteUser(username: string) {
    const dialogRef = this.dialog
      .open(DeleteDialogComponent);

    this.subSink
      .add(dialogRef.afterClosed()
        .subscribe(data => {
          if (data == 'true') {
            this.subSink
              .add(this.userService
                .deleteUser(username, this.realm.name)
                .subscribe(() => this.getAlUsers()));
          }
        }));
  }

  addUser(user: User) {
    this.subSink
      .add(this.userService
        .addUser(user, this.realm.name)
        .subscribe(() => this.getAlUsers()));
  }

  userRoles(user) {
    this.userService
      .setUser(user);
    this.router
      .navigate(['home/users/roles']);
  }
}
