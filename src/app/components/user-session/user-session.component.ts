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
    this.subscription = this.userService.users.subscribe(() => {
      this.getAllUsers();
    }, error => this.snackBar.openSnackBar(error.error.message, 4000));
    this.getAllSessionUsers();
    this.getAllUsers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getAllSessionUsers() {
    let realm = localStorage.getItem('realm');
    this.userService.getSessionUsers(realm).subscribe((data: User[]) => {
    }, error => this.snackBar.openSnackBar(error.error.message, 4000));
  }

  getAllUsers() {
    let realm = localStorage.getItem('realm');
    this.userService.getAllUsers(JSON.parse(realm).name).subscribe(data => {
      this.users = data;
    }, error => this.snackBar.openSnackBar(error.error.message, 4000));
  }

  logAllUserOut() {
  }

}
