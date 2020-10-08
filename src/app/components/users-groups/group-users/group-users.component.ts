import {Component, OnInit} from '@angular/core';
import {GroupServiceService} from '../../../services/group-service/group-service.service';
import {RestApiServiceService} from '../../../services/restapiservice/rest-api-service.service';
import {IUser} from '../../../models/User';
import {Router} from '@angular/router';
import {Group} from '../../../models/Group';

@Component({
  selector: 'app-group-users',
  templateUrl: './group-users.component.html',
  styleUrls: ['./group-users.component.css']
})
export class GroupUsersComponent implements OnInit {

  constructor(private router: Router,
              private restApiService: RestApiServiceService,
              private groupService: GroupServiceService) {
  }

  group: Group;
  users: IUser[];
  groupUsers: IUser[] = [];

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
    this.restApiService.getAllUsers().subscribe(data => {
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
    this.groupService.deleteUserFromGroup(this.group, user).subscribe(data => {
      this.getGroup();
    });
  }

  userRoles(user) {
    localStorage.setItem('currentUser', user.username);
    this.router.navigate(['home/users/roles']);
  }
}
