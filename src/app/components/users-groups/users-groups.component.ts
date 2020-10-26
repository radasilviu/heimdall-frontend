import {Component, OnInit} from '@angular/core';
import {GroupService} from '../../services/group-service/group-service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';
import {SnackBarService} from '../../services/snack-bar/snack-bar-service';
import {RealmService} from '../../services/realm-service/realm-service';
import {SubSink} from 'subsink';
import {Realm} from '../../models/Realm';
import {RoleService} from '../../services/role-service/role-service';

@Component({
  selector: 'app-users-groups',
  templateUrl: './users-groups.component.html',
  styleUrls: ['./users-groups.component.css']
})
export class UsersGroupsComponent implements OnInit {
  realm: Realm;
  roles = this.roleService.roles;
  allGroups = this.groupService.groups;
  subSink = new SubSink();

  constructor(private groupService: GroupService,
              private router: Router,
              private realmService: RealmService,
              private dialog: MatDialog,
              private snackbar: SnackBarService,
              private roleService: RoleService
  ) {
  }

  ngOnInit() {
    this.subSink.add(this.realmService.realm.subscribe((data: Realm) => {
      this.realm = data;
      this.getAllGroups();
    }));
  }

  ngOnDestroy() {
  }

  getAllGroups() {
    this.subSink.add(this.groupService.getAllGroups(this.realm.name).subscribe(data => {
      this.groupService.setGroups(data);
    }));
  }

  details(group) {
    this.groupService.setGroup(group);
    this.groupService.setCurrentGroup(group);
    this.router.navigate(['/home/group-users']);
  }

  deleteGroup(group) {
    let dialogRef = this.dialog.open(DeleteDialogComponent);

    this.subSink.add(dialogRef.afterClosed().subscribe(data => {
      if (data == 'true') {
        this.subSink.add(this.groupService.deleteGroupByName(group, this.realm.name).subscribe(() => {
          this.getAllGroups();
        }));
      }
    }));
  }
}
