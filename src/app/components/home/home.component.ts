import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AdminAuthService} from 'src/app/services/admin-auth/admin-auth.service';
import {RealmServiceService} from 'src/app/services/realm-service/realm-service.service';
import {Realm} from '../../models/Realm';
import {RoleServiceService} from '../../services/role-service/role-service.service';
import {ClientServiceService} from '../../services/clientService/client-service.service';
import {UserServiceService} from '../../services/user-service/user-service.service';
import {UsersGroupsComponent} from '../users-groups/users-groups.component';
import {GroupServiceService} from '../../services/group-service/group-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  panelOpenState = false;
  realm:Realm;
  realms: Realm[];

  constructor(private router: Router,
              private realmService: RealmServiceService,
              private adminAuthService: AdminAuthService,
              private roleService:RoleServiceService,
              private clientService:ClientServiceService,
              private userService:UserServiceService,
              private groupsService:GroupServiceService) {
  }

  ngOnInit(): void {

    this.realmService.realms.subscribe(() =>{
      this.getAllRealms();
    })
    this.getAllRealms();
  }

  getAllRealms() {
    this.realmService.getRealms().subscribe(data => {
      this.realms = data;
    });
  }


  changeRealm(realm) {
    this.realm = realm;
    localStorage.setItem("realm",realm.name)
    this.userService.getUsers(realm.name);
    this.clientService.getClients(realm.name);
    this.roleService.getRoles(realm.name);
    this.groupsService.getGroups(realm.name);

  }

  logout(): void {
    this.adminAuthService.logout().subscribe();
  }

  realmSettings(): void {
    this.router.navigate(['home/realm-settings']);
  }

  gotUsers(){
    this.router.navigate(['home/users']);
  }



  gotoRoles(){
    this.router.navigate(['home/roles']);
  }

  goToClients(){
    this.router.navigate(['home/clients']);
  }

  goToGroups(){
    this.router.navigate(['home/users-group']);
  }

}
