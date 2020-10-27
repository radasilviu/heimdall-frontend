import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GroupService} from '../../../services/group-service/group-service';
import {Router} from '@angular/router';
import {SnackBarService} from '../../../services/snack-bar/snack-bar-service';
import {RealmService} from '../../../services/realm-service/realm-service';
import {SubSink} from 'subsink';
import {Realm} from '../../../models/Realm';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {
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
    this.subSink.add(this.realmService.realm.pipe(tap((data: Realm) => this.realm = data)).subscribe());
  }

  onSubmit() {
    this.subSink.add(this.groupService.addNewGroup(this.createGroup.value, this.realm.name).pipe(tap(() => this.router.navigate(['/home/users-group']))).subscribe());
  }
}
