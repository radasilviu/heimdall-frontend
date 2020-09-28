import {Component, Inject, OnInit} from '@angular/core';
import {RealmGeneralSettingService} from '../../../services/realm-service/general/realm-general-setting.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Realm} from '../../../models/Realm';
import {RealmServiceService} from '../../../services/realm-service/realm-service.service';

@Component({
  selector: 'app-realm-general-setting',
  templateUrl: './realm-general-setting.component.html',
  styleUrls: ['./realm-general-setting.component.css']
})
export class RealmGeneralSettingComponent implements OnInit {

  realmGeneralSettingForm: FormGroup;
  realm: Realm;

  constructor(private realmGeneralSettingService: RealmGeneralSettingService, private snackBar: MatSnackBar,
              private realmService: RealmServiceService) {
  }

  ngOnInit(): void {
    this.realmService.currentRealm.subscribe(
      (realm: Realm) => {
        this.realm = realm;

        this.realmGeneralSettingForm = new FormGroup({
          id: new FormControl(this.realm.id),
          name: new FormControl(this.realm.name, [ Validators.required]),
          displayName: new FormControl(this.realm.displayName),
          enabled: new FormControl(this.realm.enabled)
        });
      });
  }

  get name(): AbstractControl { return this.realmGeneralSettingForm.get('name'); }

  get displayName(): AbstractControl { return this.realmGeneralSettingForm.get('displayName'); }

  get enabled(): AbstractControl { return this.realmGeneralSettingForm.get('enabled'); }

  onSubmit(): void {
    this.realmGeneralSettingService
      .update(this.realmGeneralSettingForm.value)
      .subscribe(
        (realm: Realm) => {
          this.snackBar.open('Updated', '',{
            duration: 3000
          });
        }
      );
  }

}
