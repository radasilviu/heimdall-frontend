import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Realm} from '../../../models/Realm';
import {RealmService} from '../../../services/realm-service/realm-service';

@Component({
  selector: 'app-realm-general-setting',
  templateUrl: './realm-general-setting.component.html',
  styleUrls: ['./realm-general-setting.component.css']
})
export class RealmGeneralSettingComponent implements OnInit {

  realm: Realm;
  generalForm = new FormGroup({
    name: new FormControl("Example Username", Validators.required),
    displayName: new FormControl("Example DisplayName", Validators.required),
    enabled: new FormControl(Validators.required)
  });

  constructor(private realmService: RealmService) {
  }

  ngOnInit(): void {
      this.realmService.realm.subscribe(() =>{
        this.getRealm();
      })
    this.getRealm();
  }

  getRealm(){
      let realm = localStorage.getItem("realm")
      this.realmService.getRealmByName(JSON.parse(realm).name).subscribe(data =>{
        this.realm = data

        this.generalForm.patchValue({
          name:data.name,
          displayName:data.displayName,
          enabled:data.enabled
        })
      })
  }


  onSubmit(): void {
    let realm = localStorage.getItem("realm")
    this.realmService.updateRealmByName(JSON.parse(realm).name, this.generalForm.value).subscribe(data => {
      localStorage.setItem("realm", JSON.stringify(data))
      this.realmService.setRealm(data)
    });
  }}

