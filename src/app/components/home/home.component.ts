import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AdminAuthService} from 'src/app/services/admin-auth/admin-auth.service';
import {RealmServiceService} from 'src/app/services/realm-service/realm-service.service';
import {Realm} from '../../models/Realm';
import {RoleServiceService} from '../../services/role-service/role-service.service';
import {ClientServiceService} from '../../services/clientService/client-service.service';
import {UserServiceService} from '../../services/user-service/user-service.service';
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
     this.realmService.realm.subscribe((data:Realm) =>{
    this.realm = data
    })
    this.realmService.serviceRealms.subscribe(() =>{
      this.getAllRealms();
    })
    this.getAllRealms();
  }

  getAllRealms() {
    this.realmService.getAllRealms().subscribe(data => {
      this.realms = data;
    });
  }


  changeRealm(realm) {
    this.realmService.setRealm(realm)

    this.realmService.realm.subscribe((data:Realm) =>{
      this.realm = data
    })

    localStorage.setItem("realm",realm.name)
    this.userService.getUsers(realm.name);
    this.clientService.getClients(realm.name);
    this.roleService.getRoles(realm.name);
    this.groupsService.getGroups(realm.name);
    this.realmService.getRealm(realm.name);
  }

  logout(): void {
    this.adminAuthService.logout().subscribe();
  }

  realmSettings(): void {
    let realm = localStorage.getItem("realm")
    this.realmService.getRealmByName(realm).subscribe(data =>{
      this.realmService.setRealm(data);
      this.realmService.getRealm(realm);

    })
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
