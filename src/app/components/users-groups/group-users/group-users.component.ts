import {Component, OnInit} from '@angular/core';
import {GroupServiceService} from '../../../services/group-service/group-service.service';
import {User} from '../../../models/User';
import {Router} from '@angular/router';
import {Group} from '../../../models/Group';
import {DeleteDialogComponent} from '../../dialogs/delete-dialog/delete-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {UserServiceService} from '../../../services/user-service/user-service.service';
import {SnackBarServiceService} from '../../../services/snack-bar/snack-bar-service.service';

@Component({
  selector: 'app-group-users',
  templateUrl: './group-users.component.html',
  styleUrls: ['./group-users.component.css']
})
export class GroupUsersComponent implements OnInit {

  constructor(private router: Router,
              private groupService: GroupServiceService,
              private userService: UserServiceService,
              private dialog: MatDialog,
              private snackbar: SnackBarServiceService ) {
  }

  group: Group;
  users: User[];
  groupUsers: User[] = [];

  ngOnInit(): void {
    this.getGroup();
    this.getAllUsers();
  }

  getGroup() {
    let group = localStorage.getItem('groupName');
    this.groupService.getGroupByName(group).subscribe(data => {
      this.group = data;
    },error => {
      this.snackbar.openSnackBar(error.error.message, 3000);
    });
    this.groupService.getUsersFromGroup(group).subscribe(data => {
      this.groupUsers = data;
    },error => {
      this.snackbar.openSnackBar(error.error.message, 3000);
    });
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    },error => {
      this.snackbar.openSnackBar(error.error.message, 3000);
    });
  }

  addUserToGroup(user) {
    let group = localStorage.getItem('groupName');
    this.groupService.addUserToGroup(group, user).subscribe(data => {
      this.getGroup();
    },error => {
      this.snackbar.openSnackBar(error.error.message, 3000);
    });
  }

  deleteUserFromGroup(user) {
    let dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(data => {
      if (data == 'true') {
        this.groupService.deleteUserFromGroup(this.group, user).subscribe(data => {
          this.getGroup();
        },error => {
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
