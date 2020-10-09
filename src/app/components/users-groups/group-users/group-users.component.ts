import {Component, OnInit} from '@angular/core';
import {GroupServiceService} from '../../../services/group-service/group-service.service';
import {User} from '../../../models/User';
import {Router} from '@angular/router';
import {Group} from '../../../models/Group';
import {DeleteDialogComponent} from '../../dialogs/delete-dialog/delete-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {UserServiceService} from '../../../services/user-service/user-service.service';

@Component({
  selector: 'app-group-users',
  templateUrl: './group-users.component.html',
  styleUrls: ['./group-users.component.css']
})
export class GroupUsersComponent implements OnInit {

  constructor(private router: Router,
              private groupService: GroupServiceService,
              private userService: UserServiceService,
              public dialog: MatDialog) {
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
    });
    this.groupService.getUsersFromGroup(group).subscribe(data => {
      this.groupUsers = data;
    });
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }

  addUserToGroup(user) {
    let group = localStorage.getItem('groupName');
    this.groupService.addUserToGroup(group, user).subscribe(data => {
      this.getGroup();
    });
  }

  deleteUserFromGroup(user) {
    let dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(data => {
      if (data == 'true') {
        this.groupService.deleteUserFromGroup(this.group, user).subscribe(data => {
          this.getGroup();
        });
      }
    });
  }

  userRoles(user) {
    localStorage.setItem('currentUser', user.username);
    this.router.navigate(['home/users/roles']);
  }
}
