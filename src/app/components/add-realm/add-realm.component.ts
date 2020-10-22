import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RealmService} from '../../services/realm-service/realm-service';
import {Realm} from '../../models/Realm';
import {SnackBarService} from '../../services/snack-bar/snack-bar-service';
import {SubSink} from 'subsink';

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
              private realmService: RealmService,
              private snackBar: SnackBarService) {
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
    this.subSink.add(
      this.realmService.addNewRealm(this.newRealm.value).subscribe(() => {
        this.subSink.add(this.realmService.getRealms().subscribe(data => {
          this.realmService.setRealms(data);
        }));
      }, error => this.snackBar.openSnackBar(error.error.message, 4000)));
  }
}
