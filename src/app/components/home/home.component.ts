import { Component, OnInit, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { RealmServiceService } from 'src/app/services/realm-service/realm-service.service';
import { RealmSettingsComponent } from '../realm-settings/realm-settings.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
 
public destroyed = new Subject<any>();

  showFiller = false;
  panelOpenState = false;
  currentRealm="Realms"

  constructor(private router: Router,private realmService: RealmServiceService) { }
  ngOnInit(): void {
    this.realmService.setCurrentRealm(this.currentRealm);
  }

  realms = ["Olx","Bingo"]

  logout(){
    localStorage.clear();
    window.location.reload();
  }
  changeRealm(realm){
    this.currentRealm = realm
    this.realmService.setCurrentRealm(realm);
    this.router.navigate(['home']);
  }

  realmSettings(){

    this.router.navigate(['home/realm-settings']);
  }
 

}
