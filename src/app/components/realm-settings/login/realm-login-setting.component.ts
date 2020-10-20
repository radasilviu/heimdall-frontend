import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ParentRealm, Realm} from '../../../models/Realm';
import {RealmService} from '../../../services/realm-service/realm-service';
import {SnackBarService} from '../../../services/snack-bar/snack-bar-service';
import {SubSink} from 'subsink';

@Component({
  selector: 'app-realm-login-setting',
  templateUrl: './realm-login-setting.component.html',
  styleUrls: ['./realm-login-setting.component.css']
})
export class RealmLoginSettingComponent implements OnInit {
  realm: Realm;
  subSink = new SubSink();
  loginForm: FormGroup = new FormGroup({
    userRegistration: new FormControl(false, Validators.required),
    editUsername: new FormControl(false, Validators.required),
    forgotPassword: new FormControl(false, Validators.required),
    rememberMe: new FormControl(false, Validators.required),
    verifyEmail: new FormControl(false, Validators.required),
    loginWithEmail: new FormControl(false, Validators.required)
  });

  constructor(private realmService: RealmService,
              private snackBar: SnackBarService) {
  }

  ngOnInit() {
    this.getRealm();
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  getRealm() {
    this.subSink.add(this.realmService.realm.subscribe((data: ParentRealm) => {
      this.realm = data.realm;
      this.loginForm.patchValue({
        userRegistration: data.realm.userRegistration,
        editUsername: data.realm.editUsername,
        forgotPassword: data.realm.forgotPassword,
        rememberMe: data.realm.rememberMe,
        verifyEmail: data.realm.verifyEmail,
        loginWithEmail: data.realm.loginWithEmail
      });
    }));
  }

  onSubmit() {
    this.subSink.add(this.realmService.updateLoginSettings(this.realm.name, this.loginForm.value).subscribe((data: Realm) => {
      this.realm = data;
    }, error => this.snackBar.openSnackBar(error.error.message, 4000)));
  }
}
