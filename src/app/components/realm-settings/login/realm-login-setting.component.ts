import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Realm} from '../../../models/Realm';
import {RealmServiceService} from '../../../services/realm-service/realm-service.service';

@Component({
  selector: 'app-realm-login-setting',
  templateUrl: './realm-login-setting.component.html',
  styleUrls: ['./realm-login-setting.component.css']
})
export class RealmLoginSettingComponent implements OnInit {
  loginForm = new FormGroup({
    userRegistration: new FormControl(false, Validators.required),
    editUsername: new FormControl(false, Validators.required),
    forgotPassword: new FormControl(false, Validators.required),
    rememberMe: new FormControl(false, Validators.required),
    verifyEmail: new FormControl(false, Validators.required),
    loginWithEmail: new FormControl(false, Validators.required),
  });

  constructor(private realmService: RealmServiceService) {
  }

  ngOnInit(): void {
    let realm = localStorage.getItem("realm")
    this.realmService.serviceRealms.subscribe(() => {
      this.getRealmByName();
    });
    this.getRealmByName();
  }

  getRealmByName(){
    this.realmService.realm.subscribe((data:Realm) => {
      this.loginForm.patchValue({
        userRegistration: data.userRegistration,
        editUsername: data.editUsername,
        forgotPassword: data.forgotPassword,
        rememberMe: data.rememberMe,
        verifyEmail: data.verifyEmail,
        loginWithEmail: data.loginWithEmail
      });
    })
  }

  onSubmit() {
    let realm = localStorage.getItem("realm")

    this.realmService.updateLoginSettings(realm, this.loginForm.value).subscribe(data => {
      this.realmService.serviceRealms.subscribe(data => {
      });
    });
  }
}
