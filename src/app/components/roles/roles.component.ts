import {Component, OnInit} from '@angular/core';
import {Role} from 'src/app/models/Role';
import {User} from 'src/app/models/User';
import {RoleService} from '../../services/role-service/role-service';
import {UserService} from '../../services/user-service/user-service';
import {SnackBarService} from '../../services/snack-bar/snack-bar-service';
import {TokenService} from '../../services/token-service/token.service';
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

  displayedColumns: string[] = ['Roles'];

  constructor(private roleService: RoleService,
              private userService: UserService,
              private snackBar: SnackBarService,
              private tokenService: TokenService,
              private realmService: RealmService) {
  }

  ngOnInit() {
    this.getAllRoles();
  }


  getAllRoles() {
    this.realmService.getRealm.subscribe((data: ParentRealm) => {
      this.allRoles = data.roles;
    }, error => this.snackBar.openSnackBar(error.error.message, 4000));
  }

  addRole(role) {
    let realm = this.tokenService.getRealm();

    this.roleService.addUserRole(role, this.user, realm.name).subscribe(data => {
    }, error => this.snackBar.openSnackBar(error.error.message, 4000));
  }

  deleteRole(role) {
    let realm = this.tokenService.getRealm();

    this.roleService.deleteUserRole(this.user, role, realm.name).subscribe(data => {
    }, error => this.snackBar.openSnackBar(error.error.message, 4000));
  }
}
