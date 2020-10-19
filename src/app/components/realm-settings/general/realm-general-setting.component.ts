import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ParentRealm, Realm} from '../../../models/Realm';
import {RealmService} from '../../../services/realm-service/realm-service';
import {SnackBarService} from '../../../services/snack-bar/snack-bar-service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-realm-general-setting',
  templateUrl: './realm-general-setting.component.html',
  styleUrls: ['./realm-general-setting.component.css']
})
export class RealmGeneralSettingComponent implements OnInit {
  realm: Realm;

  generalForm = new FormGroup({
    name: new FormControl('', Validators.required),
    displayName: new FormControl('', Validators.required),
    enabled: new FormControl('', Validators.required)
  });
  subscription: Subscription;

  constructor(private realmService: RealmService,
              private snackBar: SnackBarService) {
  }

  ngOnInit() {
    this.getRealm();

  }

  getRealm() {
    this.realmService.realm.subscribe((data: ParentRealm) => {
      this.realm = data.realm;
      this.generalForm.setValue({
        name: data.realm.name,
        displayName: data.realm.displayName,
        enabled: data.realm.enabled
      });
    });
  }

  onSubmit(): void {
    this.subscription = this.realmService.updateRealmByName(this.realm.name, this.generalForm.value).subscribe((data: Realm) => {
      this.realmService.getRealmByName(data.name).subscribe(data => {
        this.realmService.realm.next(data)
      })
      this.realmService.getRealms().subscribe(data =>{
        this.realmService.setRealms(data)
      })
    }, error => this.snackBar.openSnackBar(error.error.message, 4000));
  }
}

