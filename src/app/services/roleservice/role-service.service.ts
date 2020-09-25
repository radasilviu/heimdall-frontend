import { Injectable } from '@angular/core';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class RoleServiceService {
  user: User;

  setusername(user) {
    this.user = user;
  }
  
  constructor() { }
}
