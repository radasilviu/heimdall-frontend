import {Component, OnInit} from '@angular/core';
import {User} from '../../models/User';
import {UserService} from '../../services/user-service/user-service';
import {SnackBarService} from '../../services/snack-bar/snack-bar-service';
import {interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-user-session',
  templateUrl: './user-session.component.html',
  styleUrls: ['./user-session.component.css']
})
export class UserSessionComponent implements OnInit {
  users;

  private subscription: Subscription;


  displayedColumns = ['username', 'isActive'];


  constructor(private userService: UserService,
              private snackBar: SnackBarService) {
  }

  ngOnInit(): void {
    const source = interval(1000);

    this.subscription = source.subscribe(val => this.getSession());
  }

  getSession() {
    let realm = localStorage.getItem('realm');

    this.userService.getSessionUsers(JSON.parse(realm)).subscribe((data: User[]) => {
      this.users = data;
    });
  }


  logoutAllUsers(){
    const realm = localStorage.getItem("realm")
    this.userService.logoutAllUsers(JSON.parse(realm)).subscribe(data =>{
      console.log(data)
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logAllUserOut() {
  }
}
