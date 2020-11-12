import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {User} from '../../models/User';
import {SubSink} from 'subsink';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {RealmService} from '../../services/realm-service/realm-service';
import {UserService} from '../../services/user-service/user-service';
import {SnackBarService} from '../../services/snack-bar/snack-bar-service';
import {Router} from '@angular/router';
import {AdminAuthService} from '../../services/admin-auth/admin-auth.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  displayedColumns = ['username'];
  user: User;
  realm;
  subSink = new SubSink();

  emailForm = new FormGroup({
    email: new FormControl('', Validators.required)
  });

  passwordForm: FormGroup;


  constructor(private changeDetectorRefs: ChangeDetectorRef,
              private dialog: MatDialog,
              private realmService: RealmService,
              private userService: UserService,
              private snackBar: SnackBarService,
              private router: Router,
              private authService: AdminAuthService,
              private formBuilder: FormBuilder) {

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

  onSubmitEmail() {
    let form = this.emailForm.value;
    this.user.email = form.email;
    this.subSink.add(this.userService.updateUserName(this.user.username, this.user, this.realm.name).subscribe());

  }

  onSubmitPassword() {
    let form = this.passwordForm.controls.password;
    this.user.password = form.value;
    this.subSink.add(this.userService.updateUserName(this.user.username, this.user, this.realm.name).subscribe());

  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? null : {notSame: true};
  }

}
