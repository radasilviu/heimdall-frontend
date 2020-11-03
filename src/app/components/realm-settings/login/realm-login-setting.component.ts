import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {RealmService} from '../../../services/realm-service/realm-service';
import {SubSink} from 'subsink';
import {Realm} from '../../../models/Realm';

@Component({
  selector: 'app-realm-login-setting',
  templateUrl: './realm-login-setting.component.html',
  styleUrls: ['./realm-login-setting.component.css']
})
export class RealmLoginSettingComponent implements OnInit {
  realm: Realm;

  subSink = new SubSink();
  loginForm = new FormGroup({
    userRegistration: new FormControl(''),
    editUsername: new FormControl(''),
    forgotPassword: new FormControl(''),
    rememberMe: new FormControl(''),
    loginWithEmail: new FormControl(''),
    verifyEmail: new FormControl(''),
  });

  constructor(private realmService: RealmService) {
  }

  ngOnInit() {
    this.subSink.add(this.realmService
      .realm
      .subscribe((realm: Realm) => {
        this.realm = realm;
        this.loginForm
          .patchValue({
            userRegistration: realm.userRegistration,
            editUsername: realm.editUsername,
            forgotPassword: realm.forgotPassword,
            rememberMe: realm.rememberMe,
            loginWithEmail: realm.loginWithEmail,
            verifyEmail: realm.verifyEmail
          });
      }));
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  onSubmit() {
    this.subSink.add(this.realmService
      .updateLoginSettings(this.realm.name, this.loginForm.value)
      .subscribe(() => {
        this.realmService
          .getRealms()
          .subscribe(realms =>
            this.realmService
              .setRealms(realms));
      }));
  }
}
