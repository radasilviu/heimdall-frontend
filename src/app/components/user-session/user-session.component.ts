import {Component, OnInit} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {SubSink} from 'subsink';
import {RealmService} from '../../services/realm-service/realm-service';
import {UserService} from '../../services/user-service/user-service';
import {Realm} from '../../models/Realm';
import {User} from '../../models/User';

@Component({
  selector: 'app-user-session',
  templateUrl: './user-session.component.html',
  styleUrls: ['./user-session.component.css']
})
export class UserSessionComponent implements OnInit {
  users: User[];
  subSink = new SubSink();
  realm: Realm;
  displayedColumns = ['username', 'isActive'];

  constructor(private userService: UserService, private realmService: RealmService) {
  }

  ngOnInit(): void {
    this.subSink.add(this.realmService.realm$.subscribe((realm: Realm) => {
      this.userService.getAllUsers(realm.name).subscribe(users => {
        this.users = users;
        this.getSession();
      });
    }));
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  getSession() {
    const helper = new JwtHelperService();
    let date = new Date();

    for (let i in this.users) {
      if (this.users[i].token || this.users[i].refreshToken) {
        let session = this.users[i].token;
        let refresh = this.users[i].token;
        let sessionToken = helper.decodeToken(session);
        let refreshToken = helper.decodeToken(refresh);
        if (date > sessionToken.exp || date > refreshToken) {
          // @ts-ignore
          this.users[i].active = sessionToken.iat * 1000;
        }
      }
    }
  }
}
