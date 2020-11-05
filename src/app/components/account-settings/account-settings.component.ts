import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {User} from '../../models/User';
import {Realm} from '../../models/Realm';
import {SubSink} from 'subsink';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
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
import {Client} from '../../models/Client';
import {ClientService} from '../../services/clientService/client-service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  displayedColumns = ['username'];
  allUsers: User[];
  user: User;
  realm;
  subSink = new SubSink();

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    form: new FormControl('', Validators.required)
  });

  emailForm = new FormGroup({
    email: new FormControl('', Validators.email)
  });

  passwordForm: FormGroup;

  constructor(private changeDetectorRefs: ChangeDetectorRef,
              private dialog: MatDialog,
              private realmService: RealmService,
              private userService: UserService,
              private snackBar: SnackBarService,
              private router: Router,
              private authService: AdminAuthService,
              private formBuilder: FormBuilder,
              private clientService: ClientService) {

    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['']
    }, {validator: this.checkPasswords});


  }


  ngOnInit(): void {

    this.realm = this.realmService
      .currentRealm
      .getValue();
    this.getCurrentUser();

  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  getCurrentUser() {

    let token = this.authService.tokenSubject.getValue();
    this.subSink.add(this.userService.getUserByUsername(token.username, this.realm.name).subscribe(data => {
      this.user = data;
    }));
  }

  onSubmitEmail(user: User) {
    let form = this.emailForm.value;
    user.email = form.email;
    this.subSink.add(this.userService.updateUserName(user.username, user, this.realm.name).subscribe());
    console.log(user);

  }

  onSubmitPassword(user: User) {
    let form = this.passwordForm.controls.password;
    user.password = form.value;
    this.subSink.add(this.userService.updateUserName(user.username, user, this.realm.name).subscribe());

  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? null : {notSame: true};
  }

}
