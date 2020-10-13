import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AdminAuthService} from 'src/app/services/admin-auth/admin-auth.service';
import {RealmService} from 'src/app/services/realm-service/realm-service';
import {Realm} from '../../models/Realm';
import {RoleService} from '../../services/role-service/role-service';
import {ClientService} from '../../services/clientService/client-service';
import {UserService} from '../../services/user-service/user-service';
import {GroupService} from '../../services/group-service/group-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  panelOpenState = false;
  realm: Realm;
  realms: Realm[];

  constructor(private router: Router,
              private realmService: RealmService,
              private adminAuthService: AdminAuthService,
              private roleService: RoleService,
              private clientService: ClientService,
              private userService: UserService,
              private groupsService: GroupService) {
  }

  ngOnInit(): void {
    this.realmService.currentRealm.subscribe((data: Realm) => {
      this.realm = data;
    });
    this.realmService.allRealms.subscribe(() => {
      this.getAllRealms();
    });
    this.getAllRealms();
  }

  getAllRealms() {
    this.realmService.getAllRealms().subscribe(data => {
      this.realms = data;
    });
  }


  changeRealm(realm) {
     localStorage.setItem("realm",realm.name)
    this.realmService.setRealm(realm);
  }

  logout(): void {
    this.adminAuthService.logout().subscribe();
  }
}
