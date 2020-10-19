import {Component, OnInit} from '@angular/core';
import {User} from '../../models/User';
import {UserService} from '../../services/user-service/user-service';
import {SnackBarService} from '../../services/snack-bar/snack-bar-service';
import {Subscription, timer} from 'rxjs';
import {RealmService} from '../../services/realm-service/realm-service';
import {ParentRealm} from '../../models/Realm';

@Component({
  selector: 'app-user-session',
  templateUrl: './user-session.component.html',
  styleUrls: ['./user-session.component.css']
})
export class UserSessionComponent implements OnInit {
  users: User[];
  private subscription1: Subscription;
  private subscription2: Subscription;

  displayedColumns = ['username', 'isActive'];

  constructor(private userService: UserService,
              private snackBar: SnackBarService,
              private realmService: RealmService) {
  }

  ngOnInit(): void {

    const source = timer(2000, 2000);
//output: 0
    this.subscription1 = source.subscribe(val => {
      this.realmService.realm.subscribe((data: ParentRealm) => {
      this.subscription2 =  this.userService.getAllUsers(data.realm.name).subscribe(data => {
          this.users = data;
        });
        // @ts-ignore
      });
    });
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }


  logoutAllUsers() {
    const realm = localStorage.getItem('realm');
    this.userService.logoutAllUsers(JSON.parse(realm)).subscribe(data => {
    }, error => this.snackBar.openSnackBar(error, 4000));
  }

  logAllUserOut() {
  }
}
