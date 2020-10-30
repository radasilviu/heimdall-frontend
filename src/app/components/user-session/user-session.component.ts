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


  constructor(private realmService: RealmService,
              private userService: UserService,
              private roleService: RoleService) {}

  ngOnInit(): void {
    this.getRealm();
  }

  getRealm() {
    this.subSink.add(this.realmService.realm.subscribe((data: ParentRealm) => {
      this.realm = data.realm;

      return this.subSink.add(this.roleService.getRoleByName(this.realm.name, 'ROLE_ADMIN').subscribe((role: Role)  => {
        this.users = data.users;
        this.getSession();
        for (let i = 0; i < this.users.length; i++){
          let vb = this.users[i].roles.find(element => element.name === role.name);
          if (vb){
            this.users.splice(i, 1);
          }
        }

      }));
    }));
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  logOutUser(username: string){
    let user = {} as User;
    this.userService.getUserByUsername(username, this.realm.name).subscribe(data => {
      user = data;
      user.token = null;
      user.refreshToken = null;
      this.userService.updateUserName(username, user, this.realm.name).subscribe();
    }  );

  }

  getSession() {

    const helper = new JwtHelperService();
    const date = new Date();

    this.users.forEach(function(value){

      if (value.token || value.refreshToken) {
        const session = value.token;
        const refresh = value.refreshToken;

        const sessionToken = helper.decodeToken(session);
        const refreshToken = helper.decodeToken(refresh);

        if (date > sessionToken.exp || date > refreshToken) {
          // @ts-ignore
          value.active = sessionToken.iat * 1000;
        }
      }
    }
    );
  }

}
