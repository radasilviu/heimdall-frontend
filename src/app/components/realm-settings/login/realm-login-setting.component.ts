import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Realm} from '../../../models/Realm';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RealmServiceService} from '../../../services/realm-service/realm-service.service';
import {RealmLoginServiceService} from '../../../services/realm-service/login/realm-login-service.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-realm-login-setting',
  templateUrl: './realm-login-setting.component.html',
  styleUrls: ['./realm-login-setting.component.css']
})
export class RealmLoginSettingComponent implements OnInit {
  currentRealm;
  realmLoginSettingForm: FormGroup;
  realm: Realm;
  myModel:boolean;

  constructor(private realmLoginSettingService: RealmLoginServiceService, private snackBar: MatSnackBar,
              private realmService: RealmServiceService) {
  }

  ngOnInit(): void {
    this.realmService.getRealmByName(this.realmService.currentRealm.value)
    .subscribe(data => {
      this.currentRealm = data as Realm
    },error=>{
      console.log(error)
    })

    this.realmService.currentRealm.subscribe(
      (realm: Realm) => {
        this.realm = realm;
        this.realmLoginSettingForm = new FormGroup({
          userRegistration: new FormControl(this.realm.userRegistration),
          editUsername: new FormControl(this.realm.editUsername),
          forgotPassword: new FormControl(this.realm.forgotPassword),
          rememberMe: new FormControl(this.realm.rememberMe),
          verifyEmail: new FormControl(this.realm.verifyEmail),
          loginWithEmail: new FormControl(this.realm.loginWithEmail)
        });
      });
  }


  onSubmit(): void {
    this.realmLoginSettingService
      .update(this.realmLoginSettingForm.value)
      .subscribe(
        (realm: Realm) => {
          this.snackBar.open('Updated', '', {
            duration: 3000
          });
        }
      );
  }
}
