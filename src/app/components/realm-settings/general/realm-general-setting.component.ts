import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RealmService} from '../../../services/realm-service/realm-service';
import {SubSink} from 'subsink';
import {Realm} from '../../../models/Realm';
import {mergeMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-realm-general-setting',
  templateUrl: './realm-general-setting.component.html',
  styleUrls: ['./realm-general-setting.component.css']
})
export class RealmGeneralSettingComponent implements OnInit {
  realm: Realm;
  subSink = new SubSink();

  generalForm = new FormGroup({
    name: new FormControl('', Validators.required),
    displayName: new FormControl('', Validators.required),
    enabled: new FormControl('', Validators.required)
  });

  constructor(private realmService: RealmService) {
  }

  ngOnInit() {
    this.getRealm();
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  getRealm() {
    this.subSink.add(this.realmService.realm.pipe(tap((data: Realm) => {
      this.realm = data;
      this.generalForm.setValue({
        name: data.name,
        displayName: data.displayName,
        enabled: data.enabled
      });
    })).subscribe());
  }

  onSubmit(): void {
    this.subSink.add(this.realmService.updateRealmByName(this.realm.name, this.generalForm.value).pipe(mergeMap((data: Realm) => {
      this.realmService.setRealm(data);
      return this.realmService.getRealms().pipe(tap(data => this.realmService.setRealms(data)));
    })).subscribe());
  }
}

