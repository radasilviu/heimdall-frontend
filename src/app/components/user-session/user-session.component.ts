import {Component, OnInit} from '@angular/core';
import {User} from '../../models/User';
import {ParentRealm} from '../../models/Realm';
import {JwtHelperService} from '@auth0/angular-jwt';
import {SubSink} from 'subsink';
import {RealmService} from '../../services/realm-service/realm-service';

@Component({
  selector: 'app-user-session',
  templateUrl: './user-session.component.html',
  styleUrls: ['./user-session.component.css']
})
export class UserSessionComponent implements OnInit {
  users: User[];
  subSink = new SubSink();
  displayedColumns = ['username', 'isActive'];

  constructor(private realmService: RealmService) {}

  ngOnInit(): void {
    this.subSink.add(this.realmService.realm.subscribe((data: ParentRealm) => {
      this.users = data.users;
      this.getSession();

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
