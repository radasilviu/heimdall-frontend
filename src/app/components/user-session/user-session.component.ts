import {Component, OnInit} from '@angular/core';
import {User} from '../../models/User';
import {UserService} from '../../services/user-service/user-service';
import {SnackBarService} from '../../services/snack-bar/snack-bar-service';
import {Subscription} from 'rxjs';
import {RealmService} from '../../services/realm-service/realm-service';
import {ParentRealm} from '../../models/Realm';

@Component({
  selector: 'app-user-session',
  templateUrl: './user-session.component.html',
  styleUrls: ['./user-session.component.css']
})
export class UserSessionComponent implements OnInit {
  users: User[];
  private subscription: Subscription;
  displayedColumns = ['username', 'isActive'];

  constructor(private userService: UserService,
              private snackBar: SnackBarService,
              private realmService: RealmService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.realmService.getRealm.subscribe((data: ParentRealm) => {
      this.users = data.users;
    }, error => this.snackBar.openSnackBar(error, 4000));
  }

  logoutAllUsers() {
    const realm = localStorage.getItem('realm');
    this.userService.logoutAllUsers(JSON.parse(realm)).subscribe(data => {
    }, error => this.snackBar.openSnackBar(error, 4000));
  }

  logAllUserOut() {
  }
}
