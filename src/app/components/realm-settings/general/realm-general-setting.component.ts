import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Realm} from '../../../models/Realm';
import {RealmServiceService} from '../../../services/realm-service/realm-service.service';

@Component({
  selector: 'app-realm-general-setting',
  templateUrl: './realm-general-setting.component.html',
  styleUrls: ['./realm-general-setting.component.css']
})
export class RealmGeneralSettingComponent implements OnInit {

  realm: Realm;
  realmName: string;
  generalForm = new FormGroup({
    name: new FormControl('', Validators.required),
    displayName: new FormControl('', Validators.required),
    enabled: new FormControl('', Validators.required)
  });

  constructor(private realmService: RealmServiceService) {
  }

  ngOnInit(): void {
    this.realmService.getRealms().subscribe(() => {
      this.getRealmByName();
    });
    this.getRealmByName();
  }
  getRealmByName(){
    let realm = localStorage.getItem("realm")
    this.realmService.getRealmByName(realm).subscribe((data:Realm) => {
      this.realm = data
      this.generalForm.patchValue({
        name: data.name,
        displayName: data.displayName,
        enabled: data.enabled,
      });
    })
  }

  onSubmit(): void {
    let relam = localStorage.getItem("realm")
    this.realmService.updateRealmByName(relam, this.generalForm.value).subscribe();
  }
}
