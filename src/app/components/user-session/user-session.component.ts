import {Component, OnInit} from '@angular/core';
import {User} from '../../models/User';
import {JwtHelperService} from '@auth0/angular-jwt';
import {SubSink} from 'subsink';
import {RealmService} from '../../services/realm-service/realm-service';
import {UserService} from '../../services/user-service/user-service';
import {Realm} from '../../models/Realm';

@Component({
  selector: 'app-user-session',
  templateUrl: './user-session.component.html',
  styleUrls: ['./user-session.component.css']
})
export class UserSessionComponent implements OnInit {
  users: User[];
  subSink = new SubSink();

  realm: Realm;
  displayedColumns = ['username', 'isActive', 'logout'];

  constructor(private userService: UserService, private realmService: RealmService) {
  }

  ngOnInit(): void {
    this.subSink
      .add(this.realmService.currentRealm.subscribe((realm: Realm) => {
        this.userService
          .getAllUsers(realm.name)
          .subscribe(users => {
            this.users = users;
            this.getSession();
          });
      }));
  }

  ngOnDestroy() {
    this.subSink
      .unsubscribe();
  }

  logOutUser(user: User) {
    user.token = null;
    user.refreshToken = null;
    this.userService
      .updateUserName(user.username, user, this.realm.name)
      .subscribe();
  }


  getSession() {

    const helper = new JwtHelperService();
    const date = new Date();

    this.users.forEach(function (value) {
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
