import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { RealmServiceService } from 'src/app/services/realm-service/realm-service.service';
import {Realm} from "../../models/Realm";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  panelOpenState:boolean = false;
  currentRealm:string = ""

  realms: Array<Realm>;

  constructor(private router: Router, private realmService: RealmServiceService) {
    this.realmService.currentRealm.subscribe((realm: Realm) => {
      if (realm) {
        this.currentRealm = realm.displayName;
      }
    });
  }
  ngOnInit(): void {
    this.realmService.getRealms()
      .subscribe(
        (realms: Array<Realm>) => {
          this.realms = realms;
          this.realmService.currentRealm.next(realms[0]);
          localStorage.setItem('currentRealm', JSON.stringify(realms[0]));
        }
      );
  }

  logout() {
    localStorage.clear();
    window.location.reload();
  }

  changeRealm(realm): void {
    this.realmService.currentRealm.next(realm);
    localStorage.setItem('currentRealm', JSON.stringify(realm));
  }

  realmSettings(): void {
    this.router.navigate(['home/realm-settings']);
  }


}
