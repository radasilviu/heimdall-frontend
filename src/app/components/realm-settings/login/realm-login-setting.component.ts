import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, Form, FormControl, FormGroup, Validators} from '@angular/forms';
import {Realm} from '../../../models/Realm';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RealmServiceService} from '../../../services/realm-service/realm-service.service';
import {RealmLoginServiceService} from '../../../services/realm-service/login/realm-login-service.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-realm-login-setting',
  templateUrl: './realm-login-setting.component.html',
  styleUrls: ['./realm-login-setting.component.css']
})
export class RealmLoginSettingComponent implements OnInit {
  realm: Realm;
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
    this.realmService.getRealm.subscribe(data => this.realm = data);
    this.realmService.getRealm.subscribe(data => {
      this.loginForm.patchValue({
        userRegistration: data.userRegistration,
        editUsername: data.editUsername,
        forgotPassword: data.forgotPassword,
        rememberMe: data.rememberMe,
        verifyEmail: data.verifyEmail,
        loginWithEmail: data.loginWithEmail
      });
    });
  }

  onSubmit() {
    this.realmService.updateLoginSettings(this.realm, this.loginForm.value).subscribe(data => {
      this.realmService.getRealms().subscribe(data => {
        this.realmService.editRealms(data);
      });
    });


  }
}
