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
import {DeleteDialogComponent} from '../../dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-group-users',
  templateUrl: './group-users.component.html',
  styleUrls: ['./group-users.component.css']
})
export class GroupUsersComponent implements OnInit {
  realmName;
  group;
  users;
  roles;
  groupName;
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
      .add(this.realmService
        .currentRealm
        .subscribe((realm: Realm) => {
          const groupName = localStorage.getItem("currentGroupName")
          this.realmName = realm.name;
          this.groupName = groupName
          this.getRoles();
          this.getUsers();
          this.getGroup()
        }));
  }

  getGroup() {
    this.groupService.getGroupByName(this.groupName, this.realmName).subscribe(() => {
      this.groupService.group.subscribe(data => this.group = data)
    });
  }

  getUsers() {
    this.subSink
      .add(this.userService
        .getAllUsers(this.realmName)
        .subscribe(data => this.users = data));
  }

  getRoles() {
    this.subSink
      .add(this.roleService
        .getAllRoles(this.realmName)
        .subscribe(data => this.roles = data));
  }

  ngOnDestroy() {
    this.subSink
      .unsubscribe();
  }

  addRoleToAllUsers(role) {
    this.subSink
      .add(this.groupService
        .addRoleToGroup(this.realmName, this.group.name, role.name)
        .subscribe(() => this.getGroup()));
  }

  addUserToGroup(user) {
    this.subSink
      .add(this.groupService
        .addUserToGroup(this.group.name, user, this.realmName)
        .subscribe(() => this.getGroup()));
  }

  deleteUserFromGroup(user) {
    let dialogRef = this.dialog
      .open(DeleteDialogComponent);

    dialogRef.afterClosed()
      .subscribe(data => {
        if (data == 'true') {
          this.subSink
            .add(this.groupService
              .deleteUserFromGroup(this.group, user, this.realmName)
              .subscribe(() => this.getGroup()));
        }
      });
  }

  userRoles(user) {
    this.subSink
      .add(this.userService
        .getUserByUsername(user.username, this.realmName)
        .subscribe(data => {
          this.userService
            .setUser(data);
          this.router
            .navigate(['home/users/roles']);
        }));
  }
}

