import {Component, OnInit} from '@angular/core';
import {User} from 'src/app/models/User';
import {RoleService} from '../../services/role-service/role-service';
import {UserService} from '../../services/user-service/user-service';
import {RealmService} from '../../services/realm-service/realm-service';
import {SubSink} from 'subsink';
import {Realm} from '../../models/Realm';
import {Role} from '../../models/Role';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  userRoles: Role[];
  allRoles: Role[];
  realm: Realm;
  subSink = new SubSink();
  displayedColumns: string[] = ['Roles'];
  user: User;

  constructor(private roleService: RoleService,
              private userService: UserService,
              private realmService: RealmService) {
  }

  ngOnInit() {
    this.subSink.add(this.realmService.realm$.subscribe((realm: Realm) => {
      this.realm = realm;
      this.userService.user.subscribe((user: User) => {
        this.userRoles = user.roles;
        this.user = user;
        this.getRoles();
      });
    }));
  }

  getRoles() {
    this.subSink.add(this.roleService.getAllRoles(this.realm.name).subscribe(roles => this.allRoles = roles));
  }

  updateUser() {
    this.subSink.add(this.userService.getUserByUsername(this.user.username, this.realm.name).subscribe(user => this.userService.setUser(user)));
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  addRole(role) {
    this.subSink.add(this.roleService.addUserRole(role, this.user, this.realm.name).subscribe(() => this.updateUser()));
  }

  deleteRole(role) {
    this.subSink.add(this.roleService.deleteUserRole(this.user, role, this.realm.name).subscribe(() => this.updateUser()));
  }
}
