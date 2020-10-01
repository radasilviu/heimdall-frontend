import { Injectable } from '@angular/core';
import { IUser } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class RoleServiceService {
  user: IUser;

  setUserName(user) {
    this.user = user;
  }
  
  constructor() { }
}
