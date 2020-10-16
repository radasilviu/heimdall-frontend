import {Component, OnInit} from '@angular/core';
import {Role} from 'src/app/models/Role';
import {User} from 'src/app/models/User';
import {RoleService} from '../../services/role-service/role-service';
import {UserService} from '../../services/user-service/user-service';
import {Subscription} from 'rxjs';
import {SnackBarService} from '../../services/snack-bar/snack-bar-service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  currentUser: User;
  userRoles: Role[];
  allRoles: Role[];
  user: User;
  private subscription: Subscription;

  displayedColumns: string[] = ['Roles'];

  constructor(private roleService: RoleService,
              private userService: UserService,
              private snackBar: SnackBarService) {
  }

  ngOnInit() {
    this.subscription = this.roleService.roles.subscribe(() => {
      this.getAllRoles();
      this.getUserRoles();
    }, error => this.snackBar.openSnackBar(error.error.message, 4000));
    this.getUserRoles();
    this.getAllRoles();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getAllRoles() {
    let realm = localStorage.getItem('realm');

    this.roleService.getAllRoles(JSON.parse(realm).name).subscribe(data => {
      this.allRoles = data;
    }, error => this.snackBar.openSnackBar(error.error.message, 4000));
  }

  getUserRoles() {
    let realm = localStorage.getItem('realm');
    let userName = localStorage.getItem('currentUser');

    this.userService.getUserByUsername(userName, JSON.parse(realm).name).subscribe((data: User) => {
      this.user = data;
      this.userRoles = data.roles;
    }, error => this.snackBar.openSnackBar(error.error.message, 4000));
  }

  addRole(role) {
    let realm = localStorage.getItem('realm');

    this.roleService.addUserRole(role, this.user, JSON.parse(realm).name).subscribe(data => {
    }, error => this.snackBar.openSnackBar(error.error.message, 4000));
  }

  deleteRole(role) {
    let realm = localStorage.getItem('realm');

    this.roleService.deleteUserRole(this.user, role, JSON.parse(realm).name).subscribe(data => {
    }, error => this.snackBar.openSnackBar(error.error.message, 4000));
  }
}
