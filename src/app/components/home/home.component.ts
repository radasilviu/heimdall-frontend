import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAuthService } from 'src/app/services/admin-auth/admin-auth.service';
import { RealmServiceService } from 'src/app/services/realm-service/realm-service.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  panelOpenState:boolean = false;
  currentRealm:string = "Realms"

  constructor(private router: Router, private realmService: RealmServiceService,private adminAuthService: AdminAuthService) { }
  ngOnInit(): void {
    this.realmService.setCurrentRealm(this.currentRealm);
  }

  realms = ["Olx", "Bingo"]

  logout() {
    this.adminAuthService.logout().subscribe();
  }

  changeRealm(realm) {
    this.currentRealm = realm
    this.realmService.setCurrentRealm(realm);
    this.router.navigate(['home']);
  }

  realmSettings() {
    this.router.navigate(['home/realm-settings']);
  }


}
