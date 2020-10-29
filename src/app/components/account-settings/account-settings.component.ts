import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {User} from '../../models/User';
import {ParentRealm, Realm} from '../../models/Realm';
import {SubSink} from 'subsink';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {RealmService} from '../../services/realm-service/realm-service';
import {UserService} from '../../services/user-service/user-service';
import {SnackBarService} from '../../services/snack-bar/snack-bar-service';
import {Router} from '@angular/router';
import {UserDialogComponent} from '../dialogs/user-dialog/user-dialog.component';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AdminAuthService} from '../../services/admin-auth/admin-auth.service';
import {Token} from '../../models/token';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  displayedColumns = ['username'];
  allUsers: User[];
  user: User;
  realm: Realm;
  subSink = new SubSink();

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email)
  });

  constructor(private changeDetectorRefs: ChangeDetectorRef,
              private dialog: MatDialog,
              private realmService: RealmService,
              private userService: UserService,
              private snackBar: SnackBarService,
              private router: Router,
              private authService: AdminAuthService) {
  }

  ngOnInit(): void {
    this.getRealm();

  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  getRealm() {
    this.subSink.add(this.realmService.realm.subscribe((data: ParentRealm) => {
      this.allUsers = data.users;
      this.realm = data.realm;
      this.getCurrentUser();
    }));
  }

  onSubmit() {
    this.addUser(this.form.value);
  }

  updateUser(currentUserName: string) {

    const dialogRef = this.dialog.open(UserDialogComponent);
    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        let user = {} as User;
        user.username = data;
        this.subSink.add(this.userService.updateUserName(currentUserName, user, this.realm.name).subscribe(() => {
          this.realmService.setRealm(this.realm.name);
        }, error => {
          this.snackBar.openSnackBar(error.error.message, 2000);
        }));
      }
    }, error => this.snackBar.openSnackBar(error.error.message, 4000));
  }


  deleteUser(username: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(data => {
      if (data == 'true') {
        this.subSink.add(this.userService.deleteUser(username, this.realm.name).subscribe(() => {
          this.realmService.setRealm(this.realm.name);
        }, error => {
          this.snackBar.openSnackBar(error.error.message, 2000);
        }));
      }
    });
  }

  addUser(user: User) {

    this.subSink.add(this.userService.addUser(user, this.realm.name).subscribe(data => {
      this.realmService.setRealm(this.realm.name);
    }, error => {
      this.snackBar.openSnackBar(error.error.message, 3000);
    }));
  }

  userRoles(user) {
    this.userService.setUser(user.username, this.realm.name);
    this.router.navigate(['home/users/roles']);
  }

  getCurrentUser(){
    let token = this.authService.tokenSubject.getValue();
    this.subSink.add(this.userService.getUserByUsername(token.username,this.realm.name).subscribe( data =>{
      this.user = data;
    }))
  }

}
