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
    this.getSession();
  }

  getSession(){
    let realm = localStorage.getItem('realm');
    this.subscription = this.userService.getSessionUsers(JSON.parse(realm)).subscribe(data =>{
      console.log(data)
      this.getAllUsers();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getAllUsers() {
    let realm = localStorage.getItem('realm');

    this.userService.getAllUsers(JSON.parse(realm).name).subscribe(data => {
      this.users = data;
      console.log(data)
    });
  }

  logAllUserOut() {
  }
}
