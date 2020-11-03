import {Component, OnInit} from '@angular/core';
import {GroupService} from '../../../services/group-service/group-service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {UserService} from '../../../services/user-service/user-service';
import {SnackBarService} from '../../../services/snack-bar/snack-bar-service';
import {RoleService} from '../../../services/role-service/role-service';
import {RealmService} from '../../../services/realm-service/realm-service';
import {SubSink} from 'subsink';
import {Realm} from '../../../models/Realm';
import {Group} from '../../../models/Group';
import {DeleteDialogComponent} from '../../dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-group-users',
  templateUrl: './group-users.component.html',
  styleUrls: ['./group-users.component.css']
})
export class GroupUsersComponent implements OnInit {
  realm: Realm;
  group;
  users;
  groupUsers;
  roles;
  subSink = new SubSink();

  constructor(private router: Router,
              private groupService: GroupService,
              private userService: UserService,
              private dialog: MatDialog,
              private snackbar: SnackBarService,
              private roleService: RoleService,
              private realmService: RealmService) {
  }

  ngOnInit(): void {
    this.subSink
      .add(this.groupService
        .group$
        .subscribe((group: Group) => {
          this.groupUsers = group.users;
          this.group = group;
        }));

    this.subSink
      .add(this.realmService
        .realm
        .subscribe((realm: Realm) => {
          this.realm = realm;
          this.getRoles();
          this.getUsers();
        }));
  }

  updateGroup() {
    this.subSink
      .add(this.groupService
        .getGroupByName(this.group.name, this.realm.name)
        .subscribe(data => this.groupService
          .setGroup(data)));
  }

  getUsers() {
    this.subSink
      .add(this.userService
        .getAllUsers(this.realm.name)
        .subscribe(data => this.users = data));
  }

  getRoles() {
    this.subSink
      .add(this.roleService
        .getAllRoles(this.realm.name)
        .subscribe(data => this.roles = data));
  }

  ngOnDestroy() {
    this.subSink
      .unsubscribe();
  }

  addRoleToAllUsers(role) {
    this.subSink
      .add(this.groupService
        .addRoleToGroup(this.realm.name, this.group.name, role.name)
        .subscribe());
  }

  addUserToGroup(user) {
    this.subSink
      .add(this.groupService
        .addUserToGroup(this.group.name, user, this.realm.name)
        .subscribe(() => this.updateGroup()));
  }

  deleteUserFromGroup(user) {
    let dialogRef = this.dialog
      .open(DeleteDialogComponent);

    dialogRef.afterClosed()
      .subscribe(data => {
        if (data == 'true') {
          this.subSink
            .add(this.groupService
              .deleteUserFromGroup(this.group, user, this.realm.name)
              .subscribe(() => this.updateGroup()));
        }
      });
  }

  userRoles(user) {
    this.subSink
      .add(this.userService
        .getUserByUsername(user.username, this.realm.name)
        .subscribe(data => {
          this.userService
            .setUser(data);
          this.router
            .navigate(['home/users/roles']);
        }));
  }
}

