import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordMatcher} from '../registration-page/PasswordMatcher';
import {RealmServiceService} from '../../services/realm-service/realm-service.service';

@Component({
  selector: 'app-add-realm',
  templateUrl: './add-realm.component.html',
  styleUrls: ['./add-realm.component.css']
})
export class AddRealmComponent implements OnInit {

  constructor( private formBuilder: FormBuilder,private realmService:RealmServiceService) { }

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
