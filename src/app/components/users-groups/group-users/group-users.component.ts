import {Component, OnInit} from '@angular/core';
import {GroupService} from '../../../services/group-service/group-service';
import {User} from '../../../models/User';
import {Router} from '@angular/router';
import {Group} from '../../../models/Group';
import {DeleteDialogComponent} from '../../dialogs/delete-dialog/delete-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {UserService} from '../../../services/user-service/user-service';
import {SnackBarService} from '../../../services/snack-bar/snack-bar-service';
import {ParentRealm, Realm} from '../../../models/Realm';
import {RoleService} from '../../../services/role-service/role-service';
import {Role} from '../../../models/Role';
import {RealmService} from '../../../services/realm-service/realm-service';

@Component({
  selector: 'app-group-users',
  templateUrl: './group-users.component.html',
  styleUrls: ['./group-users.component.css']
})
export class GroupUsersComponent implements OnInit {
  realm: Realm;
  private subscription;

  constructor(private router: Router,
              private groupService: GroupService,
              private userService: UserService,
              private dialog: MatDialog,
              private snackbar: SnackBarService,
              private roleService: RoleService,
              private realmService:RealmService) {
  }

  group: Group;
  users: User[];
  roles: Role[];
  groupUsers: User[] = [];

  ngOnInit(): void {
    this.getData()
    this.groupService.group.subscribe((data:Group) =>{
      this.group = data;
      this.groupUsers = data.users
      // @ts-ignore
      this.realm = data.realm
    })
  }

  getData(){
  this.realmService.realm.subscribe((data:ParentRealm) =>{
    this.users = data.users
    this.roles = data.roles
  })
  }

  addRoleToAllUsers(role) {
    this.groupService.addRoleToGroup(this.realm.name, this.group.name, role.name).subscribe(() => {

    },error => this.snackbar.openSnackBar(error.error.message,4000));
  }

  addUserToGroup(user) {
    this.groupService.addUserToGroup(this.group.name, user, this.realm.name).subscribe(data => {
      this.groupService.getGroupByName(this.group.name,this.realm.name).subscribe(data =>{
        this.groupService.setGroup(data)
      })
    }, error => {
      this.snackbar.openSnackBar(error.error.message, 3000);
    });
  }

  deleteUserFromGroup(user) {
    let dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(data => {
      if (data == 'true') {
        this.groupService.deleteUserFromGroup(this.group, user, this.realm.name).subscribe(data => {
          this.groupService.getGroupByName(this.group.name,this.realm.name).subscribe(data =>{
            this.groupService.setGroup(data)
          })
        }, error => {
          this.snackbar.openSnackBar(error.error.message, 3000);
        });
      }
    }, error => this.snackbar.openSnackBar(error.error.message, 4000));
  }

  userRoles(user) {
    this.userService.getUserByUsername(user.username,this.realm.name).subscribe(data =>{
      this.userService.setUser(data)
    })
    this.router.navigate(['home/users/roles']);
  }
}

