import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAuthService } from 'src/app/services/admin-auth/admin-auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showFiller = false;
  isClient = false;
  isRoles = false;
  isUsers = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  clients() {
    this.isClient = true;
    this.isUsers = false;
    this.isRoles = false
  }

  users() {
    this.isUsers = true;
    this.isClient = false;
    this.isRoles = false;
  }

  roles() {
    this.isRoles = true;
    this.isUsers = false;
    this.isClient = false;
  }
  logout(){
    localStorage.clear();
    window.location.reload();
  }
}
