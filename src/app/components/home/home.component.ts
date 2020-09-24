import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  showFiller = false;
  panelOpenState = false;
  constructor(private router: Router) { }
  ngOnInit(): void {
  }
  realms = ["Olx","Bingo"]

  logout(){
    console.log("Da")
    localStorage.clear();
    window.location.reload();
  }

 

}
