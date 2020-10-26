import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GroupService} from '../../../services/group-service/group-service';
import {Router} from '@angular/router';
import {SnackBarService} from '../../../services/snack-bar/snack-bar-service';
import {Subscription} from 'rxjs';
import {RealmService} from '../../../services/realm-service/realm-service';
import {SubSink} from 'subsink';
import {Realm} from '../../../models/Realm';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {
  private subscription: Subscription;
  realm: Realm;
  subSink = new SubSink();

  constructor(private groupService: GroupService,
              private router: Router,
              private snackbar: SnackBarService,
              private realmService: RealmService) {
  }

  createGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.getRealm();
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  getRealm() {
    this.subSink.add(this.realmService.realm.subscribe((data: Realm) => {
      this.realm = data;
    }));
  }

  onSubmit() {
    this.subSink.add(this.groupService.addNewGroup(this.createGroup.value, this.realm.name).subscribe(data => {
      this.realmService.setRealm(this.realm.name);
      this.router.navigate(['/home/users-group']);
    }, error => {
      this.snackbar.openSnackBar(error.error.message, 3000);
    }));
  }
}
