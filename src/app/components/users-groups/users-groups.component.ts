import {Component, OnInit} from '@angular/core';
import {GroupService} from '../../services/group-service/group-service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';
import {RealmService} from '../../services/realm-service/realm-service';
import {SubSink} from 'subsink';
import {Realm} from '../../models/Realm';
import {Group} from '../../models/Group';

@Component({
  selector: 'app-users-groups',
  templateUrl: './users-groups.component.html',
  styleUrls: ['./users-groups.component.css']
})
export class UsersGroupsComponent implements OnInit {
  realm: Realm;
  allGroups: Group[];
  subSink = new SubSink();

  constructor(private groupService: GroupService,
              private router: Router,
              private realmService: RealmService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.subSink
      .add(this.realmService
        .realm
        .subscribe((realm: Realm) => {
          this.realm = realm;
          this.getAllGroups();
        }));
  }

  ngOnDestroy() {
    this.subSink
      .unsubscribe();
  }

  getAllGroups() {
    this.subSink
      .add(this.groupService
        .getAllGroups(this.realm.name)
        .subscribe(data => this.allGroups = data));
  }

  details(group) {
    this.groupService
      .setGroup(group);
    this.router.navigate(['/home/group-users']);
  }

  deleteGroup(group) {
    let dialogRef = this.dialog
      .open(DeleteDialogComponent);

    dialogRef.afterClosed()
      .subscribe(data => {
        if (data == 'true') {
          this.subSink
            .add(this.groupService
              .deleteGroupByName(group, this.realm.name)
              .subscribe(() => this.getAllGroups()));
        }
      });
  }
}
