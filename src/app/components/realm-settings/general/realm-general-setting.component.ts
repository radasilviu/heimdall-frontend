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
    this.realmService.currentRealm.subscribe((data:Realm) =>{
      this.realm = data
        this.generalForm.patchValue({
          name:data.name,
          displayName:data.displayName,
          enabled:data.enabled
        })

    })
  }


  onSubmit(): void {
    this.realmService.updateRealmByName(this.realm.name, this.generalForm.value).subscribe(data =>{
      this.realmService.setRealm(data)
      localStorage.setItem("realm",data.name)
    });
  }
}
