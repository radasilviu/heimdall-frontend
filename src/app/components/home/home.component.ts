import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { RealmServiceService } from 'src/app/services/realm-service/realm-service.service';


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
