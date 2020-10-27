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
import {map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-group-users',
  templateUrl: './group-users.component.html',
  styleUrls: ['./group-users.component.css']
})
export class GroupUsersComponent implements OnInit {
  realm: Realm;
  group = this.groupService.group;
  users = this.userService.users;
  roles = this.roleService.roles;
  groupUsers = this.groupService.group.pipe(map((user: Group) => user.users));
  subSink = new SubSink();
  currentGroup: Group;

  constructor(private router: Router,
              private groupService: GroupService,
              private userService: UserService,
              private dialog: MatDialog,
              private snackbar: SnackBarService,
              private roleService: RoleService,
              private realmService: RealmService) {
  }

  ngOnInit(): void {
    this.subSink.add(this.groupService.currentRealm.pipe(tap((data: Group) => this.currentGroup = data)).subscribe());

    this.subSink.add(this.realmService.realm.pipe(tap((data: Realm) => {
      this.realm = data;
      this.getUsers();
      this.getRoles();
    })).subscribe());
  }

  updateGroup() {
    this.subSink.add(this.groupService.getGroupByName(this.currentGroup.name, this.realm.name).pipe(tap(data => this.groupService.setGroup(data))).subscribe());
  }

  getUsers() {
    this.subSink.add(this.userService.getAllUsers(this.realm.name).pipe(tap(data => this.userService.setUsers(data))).subscribe());
  }

  getRoles() {
    this.subSink.add(this.roleService.getAllRoles(this.realm.name).pipe(tap(data => this.roleService.setRoles(data))).subscribe());
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }


  addRoleToAllUsers(role) {
    this.subSink.add(this.groupService.addRoleToGroup(this.realm.name, this.currentGroup.name, role.name).subscribe());
  }

  addUserToGroup(user) {
    this.subSink.add(this.groupService.addUserToGroup(this.currentGroup.name, user, this.realm.name).pipe(tap(() => this.updateGroup())).subscribe());
  }

  deleteUserFromGroup(user) {
    let dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(data => {
      if (data == 'true') {
        this.subSink.add(this.groupService.deleteUserFromGroup(this.currentGroup, user, this.realm.name).pipe(tap(() => this.updateGroup())).subscribe());
      }
    });
  }

  userRoles(user) {
    this.subSink.add(this.userService.getUserByUsername(user.username, this.realm.name).pipe(tap(data => {
      this.userService.setUser(data);
      this.router.navigate(['home/users/roles']);
    })).subscribe());
  }
}

