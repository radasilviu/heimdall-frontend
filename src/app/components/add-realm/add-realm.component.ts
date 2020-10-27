import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RealmService} from '../../services/realm-service/realm-service';
import {Realm} from '../../models/Realm';
import {SubSink} from 'subsink';
import {mergeMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-add-realm',
  templateUrl: './add-realm.component.html',
  styleUrls: ['./add-realm.component.css']
})
export class AddRealmComponent implements OnInit {
  realm: Realm;
  newRealm: FormGroup;
  subSink = new SubSink();

  constructor(private formBuilder: FormBuilder,
              private realmService: RealmService) {
  }

  ngOnInit(): void {
    this.newRealm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      displayName: new FormControl('', Validators.required),
    });
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  addNewRealm() {
    this.subSink.add(this.realmService.addNewRealm(this.newRealm.value).pipe(mergeMap(() => {
      return this.realmService.getRealms().pipe(tap(data => this.realmService.setRealms(data)));
    })).subscribe());
  }
}
