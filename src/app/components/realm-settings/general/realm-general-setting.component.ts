import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Realm} from '../../../models/Realm';
import {RealmService} from '../../../services/realm-service/realm-service';
import {SnackBarService} from '../../../services/snack-bar/snack-bar-service';

@Component({
  selector: 'app-realm-general-setting',
  templateUrl: './realm-general-setting.component.html',
  styleUrls: ['./realm-general-setting.component.css']
})
export class RealmGeneralSettingComponent implements OnInit {
  generalForm: FormGroup;
  subscription;
  realm;

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

    this.generalForm = new FormGroup({
      name: new FormControl(this.realm.name, Validators.required),
      displayName: new FormControl(this.realm.displayName, Validators.required),
      enabled: new FormControl(this.realm.enabled, Validators.required)
    });
  }

  onSubmit(): void {

    this.subscription = this.realmService.updateRealmByName(this.realm.name, this.generalForm.value).subscribe((data: Realm) => {
      localStorage.setItem('realm', JSON.stringify(data));
      this.realm = data;
      this.getRealm();
      this.realmService.setCurrentRealm(data);
    }, error => this.snackBar.openSnackBar(error.error.message, 4000));
  }
}

