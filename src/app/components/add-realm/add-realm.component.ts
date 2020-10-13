import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordMatcher} from '../registration-page/PasswordMatcher';
import {RealmService} from '../../services/realm-service/realm-service';
import {Realm} from '../../models/Realm';

@Component({
  selector: 'app-add-realm',
  templateUrl: './add-realm.component.html',
  styleUrls: ['./add-realm.component.css']
})
export class AddRealmComponent implements OnInit {
  realm:Realm
  constructor( private formBuilder: FormBuilder,
               private realmService:RealmService,
               ) { }

  newRealm: FormGroup;


  ngOnInit(): void {



    this.newRealm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      displayName:new FormControl('',Validators.required),
    });
  }

  addNewRealm(){
    this.realmService.addNewRealm(this.newRealm.value).subscribe();
  }

}
