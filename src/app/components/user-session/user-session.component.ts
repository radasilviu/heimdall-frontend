import {Component, OnInit} from '@angular/core';
import {User} from '../../models/User';
import {UserService} from '../../services/user-service/user-service';
import {RealmService} from '../../services/realm-service/realm-service';

@Component({
  selector: 'app-user-session',
  templateUrl: './user-session.component.html',
  styleUrls: ['./user-session.component.css']
})
export class UserSessionComponent implements OnInit {
  users: User[];

  displayedColumns = ['username','isActive'];

  constructor(private userService: UserService,
              private realmService: RealmService) {
  }

  ngOnInit(): void {
    this.realmService.currentRealm.subscribe(() => {
      this.userService.pageRefresh.subscribe(() => {
        this.getAllSessionUsers()
      });
      this.getAllSessionUsers()
    });

  }

  getAllSessionUsers(){
    let realm = localStorage.getItem("realm")
    this.userService.getSessionUsers(realm).subscribe((data:User[]) =>{
      this.users = data
    });
  }


  logAllUserOut(){

  }

}
