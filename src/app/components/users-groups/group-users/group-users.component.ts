import {Component, OnInit} from '@angular/core';
import {GroupService} from '../../../services/group-service/group-service';
import {User} from '../../../models/User';
import {Router} from '@angular/router';
import {Group} from '../../../models/Group';
import {DeleteDialogComponent} from '../../dialogs/delete-dialog/delete-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {UserService} from '../../../services/user-service/user-service';
import {SnackBarService} from '../../../services/snack-bar/snack-bar-service';
import {RealmService} from '../../../services/realm-service/realm-service';
import {Realm} from '../../../models/Realm';

@Component({
  selector: 'app-group-users',
  templateUrl: './group-users.component.html',
  styleUrls: ['./group-users.component.css']
})
export class GroupUsersComponent implements OnInit {
  realm: Realm;

  constructor(private router: Router,
              private groupService: GroupService,
              private userService: UserService,
              private dialog: MatDialog,
              private snackbar: SnackBarService,
              private realmService: RealmService) {
  }

  group: Group;
  users: User[];
  groupUsers: User[] = [];

  ngOnInit(): void {
    this.getGroup();
    this.userService.pageRefresh.subscribe(() => {
      this.getAllUsers();
    });
    this.getAllUsers();
  }

  getGroup() {
    let realm = localStorage.getItem("Realm")

    this.groupService.getGroupByName(this.group.name, realm).subscribe(data => {
      this.group = data;
    }, error => {
      this.snackbar.openSnackBar(error.error.message, 3000);
    });
    this.groupService.getUsersFromGroup(this.group.name, realm).subscribe(data => {
      this.groupUsers = data;
    }, error => {
      this.snackbar.openSnackBar(error.error.message, 3000);
    });
  }

  getAllUsers() {
    let realm = localStorage.getItem("Realm")

    this.userService.getAllUsers(realm).subscribe(data => {
      this.users = data;
    });
    this.userService.getAllUsers(realm).subscribe(data => {
      this.users = data;
    }, error => {
      this.snackbar.openSnackBar(error.error.message, 3000);
    });
  }

  addUserToGroup(user) {
    let realm = localStorage.getItem('realm');
    let group = localStorage.getItem('groupName');
    this.groupService.addUserToGroup(group, user, realm).subscribe(data => {
      this.getGroup();
    }, error => {
      this.snackbar.openSnackBar(error.error.message, 3000);
    });
  }

  deleteUserFromGroup(user) {
    let realm = localStorage.getItem('realm');

    let dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(data => {
      if (data == 'true') {
        this.groupService.deleteUserFromGroup(this.group, user, realm).subscribe(data => {
          this.getGroup();
        }, error => {
          this.snackbar.openSnackBar(error.error.message, 3000);
        });
      }
    });
  }

  userRoles(user) {
    localStorage.setItem('currentUser', user.username);
    this.router.navigate(['home/users/roles']);
  }
}
