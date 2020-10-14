import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Realm} from '../../../models/Realm';
import {RealmService} from '../../../services/realm-service/realm-service';
import {SnackBarService} from '../../../services/snack-bar/snack-bar-service';

@Component({
  selector: 'app-realm-login-setting',
  templateUrl: './realm-login-setting.component.html',
  styleUrls: ['./realm-login-setting.component.css']
})
export class RealmLoginSettingComponent implements OnInit {
  realm: Realm;
  subscription;
  loginForm;

  constructor(private realmService: RealmService,
              private snackBar: SnackBarService) {
  }

  ngOnInit() {

    this.subscription = this.realmService.realm.subscribe(() => {
      this.getRealm();
    }, error => this.snackBar.openSnackBar(error.error.message, 4000));
    this.getRealm();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getRealm() {
    this.realm = JSON.parse(localStorage.getItem('realm'));

    this.loginForm = new FormGroup({
      userRegistration: new FormControl(this.realm.userRegistration, Validators.required),
      editUsername: new FormControl(this.realm.editUsername, Validators.required),
      forgotPassword: new FormControl(this.realm.forgotPassword, Validators.required),
      rememberMe: new FormControl(this.realm.rememberMe, Validators.required),
      verifyEmail: new FormControl(this.realm.verifyEmail, Validators.required),
      loginWithEmail: new FormControl(this.realm.loginWithEmail, Validators.required),
    });
  }

  onSubmit() {
    this.subscription = this.realmService.updateLoginSettings(this.realm.name, this.loginForm.value).subscribe((data: Realm) => {
      localStorage.setItem('realm', JSON.stringify(data));
      this.realm = data;
      this.getRealm();
      this.realmService.setCurrentRealm(data);
    }, error => this.snackBar.openSnackBar(error.error.message, 4000));
  }
}
