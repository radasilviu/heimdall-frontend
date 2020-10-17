import {Component, OnInit} from '@angular/core';
import {Role} from 'src/app/models/Role';
import {User} from 'src/app/models/User';
import {RoleService} from '../../services/role-service/role-service';
import {UserService} from '../../services/user-service/user-service';
import {SnackBarService} from '../../services/snack-bar/snack-bar-service';
import {RealmService} from '../../services/realm-service/realm-service';
import {ParentRealm} from '../../models/Realm';

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
  realm;
  displayedColumns: string[] = ['Roles'];

  constructor(private roleService: RoleService,
              private userService: UserService,
              private snackBar: SnackBarService,
              private realmService: RealmService) {
  }

  ngOnInit() {
    this.getAllRoles();
  }


  getAllRoles() {
    this.realmService.getRealm.subscribe((data: ParentRealm) => {
      this.allRoles = data.roles;
      this.realm = data.realm;
    }, error => this.snackBar.openSnackBar(error.error.message, 4000));
  }

  addRole(role) {


    this.roleService.addUserRole(role, this.user, this.realm.name).subscribe(data => {
    }, error => this.snackBar.openSnackBar(error.error.message, 4000));
  }

  deleteRole(role) {

    this.roleService.deleteUserRole(this.user, role, this.realm.name).subscribe(data => {
    }, error => this.snackBar.openSnackBar(error.error.message, 4000));
  }
}
