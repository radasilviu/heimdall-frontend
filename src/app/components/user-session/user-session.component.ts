import {Component, OnInit} from '@angular/core';
import {User} from '../../models/User';
import {UserService} from '../../services/user-service/user-service';
import {SnackBarService} from '../../services/snack-bar/snack-bar-service';
import {Subscription} from 'rxjs';

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
              private snackBar: SnackBarService) {
  }

  ngOnInit(): void {
    this.subscription = this.userService.users.subscribe(data => {
      this.getUsers();
    }, error => this.snackBar.openSnackBar(error, 4000));
    this.getUsers();
  }

  getUsers() {
    let realm = localStorage.getItem('realm');

    this.userService.getAllUsers(JSON.parse(realm).name).subscribe((data: User[]) => {
      this.users = data;
    }, error => this.snackBar.openSnackBar(error, 4000));
  }

  logoutAllUsers() {
    const realm = localStorage.getItem('realm');
    this.userService.logoutAllUsers(JSON.parse(realm)).subscribe(data => {
    }, error => this.snackBar.openSnackBar(error, 4000));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logAllUserOut() {
  }
}
