import {Component, OnInit} from '@angular/core';
import {User} from '../../models/User';
import {ParentRealm, Realm} from '../../models/Realm';
import {JwtHelperService} from '@auth0/angular-jwt';
import {SubSink} from 'subsink';
import {RealmService} from '../../services/realm-service/realm-service';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';
import {UserService} from '../../services/user-service/user-service';
import {Role} from '../../models/Role';
import {RoleService} from '../../services/role-service/role-service';

@Component({
  selector: 'app-user-session',
  templateUrl: './user-session.component.html',
  styleUrls: ['./user-session.component.css']
})
export class UserSessionComponent implements OnInit {
  users: User[];
  subSink = new SubSink();
  displayedColumns = ['username', 'isActive', 'logout'];
  realm: Realm;
  admin: Role;

  constructor(private realmService: RealmService,
              private userService: UserService,
              private roleService: RoleService) {}

  ngOnInit(): void {
    this.subSink.add(this.realmService.realm.subscribe((data: ParentRealm) => {
      this.users = data.users;
      this.getSession();
    }));
    this.getRealm();
    this.getAdmin();
  }

  getRealm() {
    this.subSink.add(this.realmService.realm.subscribe((data: ParentRealm) => {
      this.users = data.users;
      this.realm = data.realm;
    }));
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  logOutUser(username: string){
    let user = {} as User;
    const role = this.getAdmin();
    this.userService.getUserByUsername(username, this.realm.name).subscribe(data => {
      user = data;
      user.token = null;
      user.refreshToken = null;
      this.userService.updateUserName(username, user, this.realm.name).subscribe();
    }  );

  }
  // tslint:disable-next-line:typedef
  getAdmin(){
    return this.subSink.add(this.roleService.getRoleByName(this.realm.name, 'ROLE_ADMIN').subscribe((data: Role)  => {
      return this.admin = data;
    }));
  }
  getSession() {
    const helper = new JwtHelperService();
    const date = new Date();
    for (const i in this.users) {
      if (this.users[i].token || this.users[i].refreshToken) {
        const session = this.users[i].token;
        const refresh = this.users[i].token;

        const sessionToken = helper.decodeToken(session);
        const refreshToken = helper.decodeToken(refresh);

        if (date > sessionToken.exp || date > refreshToken) {
          // @ts-ignore
          this.users[i].active = sessionToken.iat * 1000;
        }
      }
    }
  }

}
