import {Component, OnInit} from '@angular/core';
import {User} from '../../models/User';

@Component({
  selector: 'app-user-session',
  templateUrl: './user-session.component.html',
  styleUrls: ['./user-session.component.css']
})
export class UserSessionComponent implements OnInit {
  users: User[];

  displayedColumns = ['username', 'isActive'];

  constructor() {
  }

  ngOnInit(): void {
  }
}
