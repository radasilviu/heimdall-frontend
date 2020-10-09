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
  defaultRealm = "Default Realm";
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
    this.getAllRealms();
  }

  getAllRealms() {
    this.realmService.getRealms().subscribe(data => {
      this.realms = data;
    });
  }


  changeRealm(realm) {
    this.realm = realm;
    this.roleService.getAllRoles(this.realm.name).subscribe(data =>{
      this.roleService.allRoles.next(data)
    })

    this.userService.getAllUsers(this.realm.name).subscribe(data =>{
      this.userService.allUsers.next(data)
    })

    this.clientService.getAllClients(this.realm.name).subscribe(data =>{
      this.clientService.allClients.next(data)
    })

    this.groupsService.getAllGroups(this.realm.name).subscribe(data =>{
      this.groupsService.allGroups.next(data)
    })
    localStorage.setItem("realm",realm.name)
  }

  logout(): void {
    this.adminAuthService.logout().subscribe();
  }

  realmSettings(): void {
    this.router.navigate(['home/realm-settings']);
  }

  gotUsers(){
    this.userService.getAllUsers(this.realm.name).subscribe(data =>{
      this.userService.allUsers.next(data)
    })
    this.router.navigate(['home/users']);
  }

  gotoRoles(){
    this.roleService.getAllRoles(this.realm.name).subscribe(data =>{
      this.roleService.allRoles.next(data)
    })
    this.router.navigate(['home/roles']);
  }

  goToClients(){
    this.clientService.getAllClients(this.realm.name).subscribe(data =>{
      this.clientService.allClients.next(data)
    })
    this.router.navigate(['home/clients']);
  }

  goToGroups(){
    this.groupsService.getAllGroups(this.realm.name).subscribe(data =>{
      this.groupsService.allGroups.next(data)
    })
    this.router.navigate(['home/users-group']);
  }

}
