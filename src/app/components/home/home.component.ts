import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  showFiller = false;
  constructor(private router: Router) { }
  ngOnInit(): void {
  }

  logout(){
    localStorage.clear();
    window.location.reload();
  }

 

}
