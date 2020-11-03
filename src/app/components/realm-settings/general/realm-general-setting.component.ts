import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RealmService} from '../../../services/realm-service/realm-service';
import {SubSink} from 'subsink';
import {Realm} from '../../../models/Realm';

@Component({
  selector: 'app-realm-general-setting',
  templateUrl: './realm-general-setting.component.html',
  styleUrls: ['./realm-general-setting.component.css']
})
export class RealmGeneralSettingComponent implements OnInit {
  subSink = new SubSink();
  realm: Realm;
  generalForm = new FormGroup({
    name: new FormControl('', Validators.required),
    displayName: new FormControl('', Validators.required),
    enabled: new FormControl('', Validators.required)
  });

  constructor(private realmService: RealmService) {
  }

  ngOnInit() {
    this.realmService.realm.subscribe((data: Realm) => {
      this.realm = data;
      this.generalForm.patchValue({
        name: data.name,
        displayName: data.displayName,
        enabled: data.enabled
      });
    });
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  onSubmit(): void {
    this.realmService.updateRealmByName(this.realm.name, this.generalForm.value).subscribe((realm) => {
      this.realmService.getAllRealms().subscribe(realms => {
        localStorage.setItem("realm", JSON.stringify(realm))
        this.realmService.setRealms(realms);
        this.realmService.setCurrentRealm(realm);
      });
    });
  }
}

