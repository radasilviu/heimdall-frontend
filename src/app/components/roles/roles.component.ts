import {Component, OnInit} from '@angular/core';
import {Role} from 'src/app/models/Role';
import {User} from 'src/app/models/User';
import {RoleService} from '../../services/role-service/role-service';
import {UserService} from '../../services/user-service/user-service';
import {SnackBarService} from '../../services/snack-bar/snack-bar-service';
import {RealmService} from '../../services/realm-service/realm-service';
import {ParentRealm} from '../../models/Realm';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  userRoles: Role[];
  allRoles: Role[];
  user: User;
  subscription: Subscription;
  realm;
  displayedColumns: string[] = ['Roles'];

  constructor(private roleService: RoleService,
              private userService: UserService,
              private snackBar: SnackBarService,
              private realmService: RealmService) {
  }

  ngOnInit() {
    this.getRealm();
  }

  getRealm() {
    this.subscription = this.realmService.realm.subscribe((data: ParentRealm) => {
      this.realm = data.realm;
      this.allRoles = data.roles;
    });
    this.userService.user.subscribe((data: User) => {
      this.userRoles = data.roles;
      this.user = data;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addRole(role) {
    this.roleService.addUserRole(role, this.user, this.realm.name).subscribe(data => {
      this.userService.setUser(this.user.username, this.realm.name);
    }, error => this.snackBar.openSnackBar(error.error.message, 4000));
  }

  deleteRole(role) {
    this.roleService.deleteUserRole(this.user, role, this.realm.name).subscribe(data => {
      this.userService.setUser(this.user.username, this.realm.name);
    }, error => this.snackBar.openSnackBar(error.error.message, 4000));
  }
}
