import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AdminAuthService} from 'src/app/services/admin-auth/admin-auth.service';
import {RealmService} from 'src/app/services/realm-service/realm-service';
import {Realm} from '../../models/Realm';
import {RoleService} from '../../services/role-service/role-service';
import {ClientService} from '../../services/clientService/client-service';
import {UserService} from '../../services/user-service/user-service';
import {GroupService} from '../../services/group-service/group-service';
import {User} from '../../models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  panelOpenState = false;
  realm: Realm;
  realms: Realm[];
  users: User[];

  constructor(private router: Router,
              private realmService: RealmService,
              private adminAuthService: AdminAuthService,
              private roleService: RoleService,
              private clientService: ClientService,
              private userService: UserService,
              private groupsService: GroupService) {
  }

  ngOnInit(): void {
    this.realm = JSON.parse(localStorage.getItem("realm"))
    this.getAllRealms();
  }

  getAllRealms() {
    this.realmService.getAllRealms().subscribe(data => {
      this.realms = data;
    });
  }

  changeRealm(realm) {
    this.userService.setUsers(realm);
    this.clientService.setClients(realm)
    this.realm = realm;
    localStorage.setItem('realm', JSON.stringify(realm));
  }

  goToUsers() {
    this.router.navigate(['home/users']);
  }


  logout(): void {
    this.adminAuthService.logout().subscribe();
  }
}
