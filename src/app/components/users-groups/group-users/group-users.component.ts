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
  private subscription

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
    this.subscription = this.groupService.groups.subscribe(() =>{
      this.getGroupUsers()
      this.getAllUsers();
    })
    this.getGroupUsers()
    this.getAllUsers();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getAllUsers(){
    let realm = localStorage.getItem("realm")
    this.userService.getAllUsers(JSON.parse(realm).name).subscribe(data =>{
      this.users = data
    })
  }

  getGroupUsers(){
    let group = localStorage.getItem("groupName")
    let realm = localStorage.getItem("realm")

    this.groupService.getGroupByName(group,JSON.parse(realm).name).subscribe(data =>{
      this.group =data;
      this.groupUsers = data.users
    })
  }




  addUserToGroup(user) {
    let realm = localStorage.getItem('realm');
    let group = localStorage.getItem('groupName');
    this.groupService.addUserToGroup(group, user, JSON.parse(realm).name).subscribe(data => {
    }, error => {
      this.snackbar.openSnackBar(error.error.message, 3000);
    });
  }

  deleteUserFromGroup(user) {
    let realm = localStorage.getItem('realm');

    let dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(data => {
      if (data == 'true') {
        this.groupService.deleteUserFromGroup(this.group, user, JSON.parse(realm).name).subscribe(data => {
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
