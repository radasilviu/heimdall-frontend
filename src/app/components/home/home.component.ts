import { Component, OnInit, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild('first', {static: true, read: MatExpansionPanel}) first: MatExpansionPanel;
  showFiller = false;
  panelOpenState = false;
  currentRealm="Realms"

  constructor(private router: Router) { }
  ngOnInit(): void {
  }
  realms = ["Olx","Bingo"]

  logout(){
    localStorage.clear();
    window.location.reload();
  }
  
  changeRealm(realm){
    this.currentRealm = realm
  }
 

}
