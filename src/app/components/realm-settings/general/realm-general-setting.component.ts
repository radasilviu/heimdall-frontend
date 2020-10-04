import {Component, Input, OnInit} from '@angular/core';
import {RealmGeneralSettingService} from '../../../services/realm-service/general/realm-general-setting.service';
import {AbstractControl, Form, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Realm} from '../../../models/Realm';
import {RealmServiceService} from '../../../services/realm-service/realm-service.service';
import {Output, EventEmitter} from '@angular/core';
import {Event} from '@angular/router';
import {interval, Observable, Subject} from 'rxjs';


@Component({
  selector: 'app-realm-general-setting',
  templateUrl: './realm-general-setting.component.html',
  styleUrls: ['./realm-general-setting.component.css']
})
export class RealmGeneralSettingComponent implements OnInit {

  realm:Realm;
  realmName:string
  generalForm = new FormGroup({
    name:new FormControl('',Validators.required),
    displayName:new FormControl('',Validators.required),
    enabled:new FormControl('', Validators.required)
  })

  constructor(private realmService: RealmServiceService) {
  }

  ngOnInit(): void {
   this.realmService.getRealm.subscribe(data => {
     this.realmName = data.name
      this.generalForm.patchValue({
      name:data.name,
      displayName:data.displayName,
      enabled:data.enabled
    })
   })
  }

  onSubmit(): void {
    this.realmService.updateRealmByName(this.realmName,this.generalForm.value).subscribe(data =>{
      this.realmService.editRealm(data);

      this.realmService.getRealms().subscribe(data =>{
        this.realmService.editRealms(data);
      })
    })

  }


}
